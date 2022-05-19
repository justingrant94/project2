import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Compare = () => {

  const [billionaires, setBillionaires] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [filters, setFilters] = useState({
    names: 'All',
    searchTerm: '',
  })


  useEffect(() => {
    const getBillionaires = async () => {
      try {
        const { data } = await axios.get('https://forbes400.herokuapp.com/api/forbes400/')
        console.log(data)
        // console.log(data[1].person.name)
        // console.log(data[0].finalWorth)
        // console.log(data[0].bios)
        setBillionaires(data)
      } catch (error) {
        console.log(error)
      }
    }
    getBillionaires()
  }, [])


  // const handleChange = (e) => {
  //   const newObj = {
  //     ...filters,
  //     [e.target.name]: e.target.value,
  //   }
  //   setFilters(newObj)
  // }

  // useEffect(() => {
  //   if (billionaires.length) {
  //     const billionaireList = []
  //     billionaires.forEach(indiviual => billionaireList.includes(indiviual.name) ? '' : billionaireList.push(indiviual.name))
  //     setBillionaires(billionaireList)
  //     console.log(billionaireList) // names are located here. 
  //   }
  // }, [billionaires])



  /// Billionaire fortune 400 list; 

  return (
    <>
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
                      <h2><span>Networth</span></h2>${finalWorth}
                      <h3><span>Description</span></h3><p>{abouts}</p></Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )









}

export default Compare