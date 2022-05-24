import React from 'react'

import OneCard from './OneCard'

import Container from 'react-bootstrap/Container'

const MiddleColumnCards = ({ filteredItems, items }) => {
  return (
    <Container className='card-list' >
      {(filteredItems.length ? filteredItems : items).map(item => {
        return (
          <OneCard key={item.id} item={item} /> //! Change !
        )
      })}
    </Container>


  )
}

export default MiddleColumnCards