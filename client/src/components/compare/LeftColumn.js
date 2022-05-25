import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import anonProfile from '../../assets/anonProfile.jpg'

const LeftColumn = ({ item }) => {
  return (
    <>
      {
        item.name
          ?
          <Container className='left-container bg-light'>
            <Row className='image-container field'>
              <img src={item.image ? item.image : anonProfile} />
            </Row>
            <Row className='name-container field'>
              <h2>Name</h2>
              <p>{item.name}</p>
            </Row>
            <Row className='worth-container field'>
              {
                item.category === 'fortune400' || item.category === 'celebrity'
                  ?
                  <h2>Net-Worth</h2>
                  :
                  <p>Price</p>
              }
              {<p>{'$' + item.value}</p>}
            </Row>
            <Row className='description-container field'>
              <h2>Description</h2>
              <p>{item.description}</p>
            </Row>
          </Container>
          :
          <Container className='left-container empty-left bg-light'>
            <p>Assign someone/thing to compare against!</p>
          </Container>

      }
    </>
  )
}

export default LeftColumn