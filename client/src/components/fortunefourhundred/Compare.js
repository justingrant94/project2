import React, { useState, useEffect } from 'react'
import axios from 'axios'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Compare = () => {

  const [billionaires, setBillionaires] = useState([])
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)


  const [filters, setFilters] = useState({
    names: '',
  })



  useEffect(() => {
    const getBillionaires = async () => {
      try {
        const { data } = await axios.get('https://forbes400.herokuapp.com/api/forbes400/')
        setBillionaires(data)
      } catch (error) {
        setErrors(true)
      }
      setLoading(false)
    }
    getBillionaires()
  }, [])


  // 
  const handleSubmit = (e) => {
    e.prevent.default()
    console.log('sub')
  }

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })

  }







  /// Billionaire fortune 400 list; 
  return (
    <main className='container'>
      {loading ?
        <p>Loading....</p>
        :
        errors ?
          <p>Unable to get data, please try again!</p>
          :
          <>
            <form onSubmit={handleSubmit}>
              <input type='text' name='names' placeholder='Search...' id='names' value={filters.names} onChange={handleChange} />


            </form>

            <Container className='billionaire-list'>
              <Row>
                {billionaires.map(billionaire => {
                  const { uri, personName, squareImage, finalWorth, abouts } = billionaire
                  // console.log(uri)
                  return (
                    <Col key={uri} md='5' lg='4' className='character mb-4'>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant='top' src={squareImage} />
                        <Card.Body className='bd-light'>
                          <Card.Title className='text-center mb-1'>
                            <h1>Name<span></span></h1>{personName}
                            <h2><span>Net worth</span></h2>${finalWorth}
                            <h3><span>Description</span></h3><p>{abouts}</p></Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </Container>
          </>
      }
    </main>




  )
}

export default Compare


{/* <Container className='middle-col'>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">Fortune400</a>
          <a className="navbar-brand" href="#">Products</a>
          <a className="navbar-brand" href="#">Misc</a>
          <a className="navbar-brand" href="#">Users</a>
          <a className="navbar-brand" href="#">Celebrities</a>
        </nav> */}

{/* Search Bar */ }
{/* <input className='form-control form-control-sm' id='2' type='text'
          name='searchTerm' placeholder='Search..' /> */}
{/* 
    </Container> */}