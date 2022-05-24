import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import anonProfile from '../../assets/anonProfile.jpg'

const RightColumn = ({ currentUser }) => {

  const [basket, setBasket] = useState(currentUser.basket)

  const getOneBasketItem = async (basketItem) => await axios.get(`/api/items/${basketItem.itemId}`)

  useEffect(() => {
    currentUser.basket && setBasket(() => {
      return (
        <div>
          {
            currentUser.basket.map(basketItem => {
              return <p key={basketItem.itemId}>{() => getOneBasketItem(basketItem)}</p>
            })
          }
        </div>
      )
    }
    )

  }, [currentUser.basket])

  const handleBasket = async () => {
    // console.log(currentUser)
    if (currentUser.basket) return (
      <div>

      </div>
    )
  }

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
        {
          basket
        }
      </Row>
    </Container>
  )
}

export default RightColumn