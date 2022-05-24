import React from 'react'
import Card from 'react-bootstrap/Card'

const OneCard = (item) => {
  const { id, squareImage, personName, finalWorth } = item

  const handleAdd = (e) => {
    // ! To basket !
  }
  
  const handleRemove = (e) => {
    // ! To basket !
  }

  return (
    <Card key={id} className="one-card">
      <Card.Img variant='top' src={squareImage} />
      <Card.Body className='bg-light'>
        <Card.Title className='text-center mb-1'>
          <h1>Name<span></span></h1>{personName}
          <h2><span>Net worth</span></h2>${finalWorth * 1000000}
        </Card.Title>
        <button onClick={handleAdd} type='button'>+</button>
        <button onClick={handleRemove} type='button'>-</button>
      </Card.Body>
    </Card>
  )
}

export default OneCard