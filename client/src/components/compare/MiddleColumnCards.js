import React from 'react'

import OneCard from './OneCard'

import Container from 'react-bootstrap/Container'

const MiddleColumnCards = ({ filteredItems, items, setLeftItem, currentUser }) => {
  return (
    <Container className='card-list' >
      {(filteredItems.length ? filteredItems : items).map(item => {
        return (
          <OneCard key={item._id} item={item} setLeftItem={setLeftItem} currentUser={currentUser}/> //! Change !
        )
      })}
    </Container>


  )
}

export default MiddleColumnCards