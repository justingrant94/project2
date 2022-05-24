import React from 'react'


const ListOfBillionaires = ({ filteredBillionaires, billionaires, Container, Row, Card, Col }) => {

  return (
    <Container className='middle-container'>
      <Row>
        {(filteredBillionaires.length ? filteredBillionaires : billionaires).map(billionaire => {
          const { uri, squareImage } = billionaire
          // console.log(billionaire)
          return (
            <Col key={uri} md='6' lg='4' className='character mb-4'>
              <Card>
                <Card.Img variant='top' src={squareImage} />
                <Card.Body className='bd-light'>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default ListOfBillionaires