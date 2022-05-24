import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import anonProfile from '../../assets/anonProfile.jpg'

const LeftColumn = (leftSelected) => {
  return (
    <Container className='left-container bg-light'>
      <Row className='image-container field'>
        <img src={leftSelected.image ? leftSelected.image : anonProfile} />
      </Row>
      <Row className='name-container field'>
        <h2>Name</h2>
      </Row>
      <Row className='worth-container field'>
        <h2>Worth</h2>
        <Row className='salary-row'>
          <span>Sarlary</span>
        </Row>
        <Row className='savings-row'>
          <span>Savings</span>
        </Row>
      </Row>
      <Row className='description-container field'>
        <h2>Description</h2>
        <div>
        </div>
      </Row>
    </Container>
  )
}

export default LeftColumn