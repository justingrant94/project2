import React from 'react'
import Card from 'react-bootstrap/Card'

const OneCard = (billionaire) => {
  const { uri, squareImage, personName, finalWorth } = billionaire
  const handleAdd = (e) => {
    // you want to trigger every time the button is clicked
  }

  const handleRemove = (e) => {
  }

  return (
    ///the left column of the billionaires
    <Card key={uri} className="one-card">
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