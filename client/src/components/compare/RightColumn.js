import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { getTokenFromLocalStorage } from '../../helpers/auth'
import anonProfile from '../../assets/anonProfile.jpg'

const RightColumn = ({ currentUser, leftItem }) => {

  const [items, setItems] = useState([])
  const [basketItems, setBasketItems] = useState([])
  const [sumOfBasket, setSumOfBasket] = useState(0)
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
    const exchangeForActualItems = async () => {
      console.log(items)
      const holdItems = []
      for (let count = 0; count < items.length; count++) {
        try {
          const { data } = await axios.get(`/api/items/${items[count].itemId}`)
          holdItems.push(data)
        } catch (error) {
          console.log(error)
          setErrors(true)
        }
      }
      setBasketItems(holdItems)
    }
    exchangeForActualItems()
  }, [items])

  useEffect(() => {

    const getSumOfBasket = () => {
      let sum = 0
      for (let count = 0; count < basketItems.length; count++) {
        const holdItem = items.find(item => item.itemId === basketItems[count]._id)
        sum += basketItems[count].value * holdItem.quantity
      }
      return sum
    }

    setSumOfBasket(getSumOfBasket())

  }, [basketItems])

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

      <Row className='worth-container field'>
        <p>
          <span>Total Value of Basket</span>
          <span> ${sumOfBasket}</span>
        </p>
        <p>
          <span>Relative Value</span>
          {
            leftItem.value
              ?
              <span> {Math.round((sumOfBasket / leftItem.value * 100))}%</span>
              :
              <span> ...%</span>
          }
        </p>
      </Row>

      <Row className='description-container field'>
        <h2>Basket</h2>
        <ul>
          {
            basketItems.map(bItem => {
              console.log(bItem)
              return (
                <li key={bItem._id} className='basket-item'>
                  <p>
                    {
                      items.find(item => item.itemId === bItem._id).quantity
                    }x {bItem.name} ${bItem.value}
                  </p>
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