import React from 'react'


const ListOfBillionaires = ({ Container, billionaireList, Col, Card }) => {

  return (


    <Container className='middle-container'>
      {billionaireList.map(billionaire => {
        const { squareImage, uri } = billionaire
        console.log(billionaire)
        return (
          <Col key={uri} md='5' lg='4' className='character mb-4'>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant='top' src={squareImage} />
              {/* <Card.Body className='bg-light'> */}
            </Card>
          </Col>
        )
      })}
    </Container>

  )
}

export default ListOfBillionaires