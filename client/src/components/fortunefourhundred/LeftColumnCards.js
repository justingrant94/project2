import React from 'react'


const LeftColumnCards = ({ Container, filteredBillionaires, billionaires, Col, Card }) => {

  return (
    <Container className='card-list' >
      {(filteredBillionaires.length ? filteredBillionaires : billionaires).map(billionaire => {
        const { uri, personName, squareImage, finalWorth, abouts } = billionaire
        // console.log(uri)
        return (
          ///the left column of the billionaires
          <Col key={uri} md='5' lg='4' className='character mb-4'>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant='top' src={squareImage} />
              <Card.Body className='bg-light'>
                <Card.Title className='text-center mb-1'>
                  <h1>Name<span></span></h1>{personName}
                  <h2><span>Net worth</span></h2>${finalWorth * 1000000}
                  <h3><span>Description</span></h3><p>{abouts}</p></Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Container>
  )
}

export default LeftColumnCards