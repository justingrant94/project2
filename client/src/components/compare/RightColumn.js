import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { getTokenFromLocalStorage } from '../../helpers/auth'
import anonProfile from '../../assets/anonProfile.jpg'

const RightColumn = ({ currentUser }) => {

  const [items, setItems] = useState([])
  const [basketItems, setBasketItems] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getAllItemsFromBasket = async () => {
      try {
        const { data } = await axios.get(`/api/users/${currentUser._id}/basket`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        console.log(data)
        setItems(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }

    if (currentUser.basket) {
      getAllItemsFromBasket()
    }

  }, [currentUser.basket])

  useEffect(() => {
    const exchangeForActualItems = () => {
      console.log(items)
      items.forEach(async (item) => {
        try {
          const { data } = await axios.get(`/api/items/${item.itemId}`)
          console.log([...basketItems, data])
          setBasketItems(
            [...basketItems, data]
          )
        } catch (error) {
          console.log(error)
          setErrors(true)
        }
      })
    }

    exchangeForActualItems()
  }, [items])

  return (
    <Container className='right-container bg-light'>
      <Row className='image-container field'>
        <img src={currentUser.image ? currentUser.image : anonProfile} />
      </Row>
      <Row className='name-container field'>
        <h2>Name</h2>
        <p>{currentUser.name}</p>
      </Row>
      <Row className='worth-container field'>
        <p>
          <span>Salary </span>
          <span>{'$' + currentUser.salary}</span>
        </p>
        <p>
          <span>Savings </span>
          <span>{'$' + currentUser.savings}</span>
        </p>
      </Row>
      <Row className='description-container field'>
        <h2>Basket</h2>
        <ul>
          {
            basketItems.map(bItem => {
              console.log(basketItems)
              return (
                <li key={bItem._id} className='basket-item'>
                  <p><span>{bItem.name}</span> <span>${bItem.value}</span></p>
                </li>
              )
            })
          }
        </ul>
      </Row>
    </Container>
  )
}

export default RightColumn