import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


const Compare = () => {

  const [billionaires, setBillionaires] = useState([])
  const [filteredBillionaires, setFilteredBillionaires] = useState([])
  const [genders, setGenders] = useState([])
  const [filters, setFilters] = useState({
    gender: 'All',
    searchTerm: '',
  })

  useEffect(() => {
    const getBillionaires = async () => {
      try {
        const { data } = await axios.get('https://forbes400.herokuapp.com/api/forbes400/')
        // console.log(data)
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

  // This changes the gender of the the state
  const handleChange = (e) => {
    console.log(e.target.value)
    const newObj = {
      ...filters,
      [e.target.name]: e.target.value,
    }
    setFilters(newObj)
  }

  // //? useEffect to track the gender differences. 
  useEffect(() => {
    //checking there are genders to loop through in the first place
    //on initial page load, the genders wukk empty so we dont need to create a list
    if (billionaires.length) {
      const genderList = []
      billionaires.forEach(billionaire => {
        if (!genderList.includes(billionaire.gender)) {
          if (billionaire.gender) genderList.push(billionaire.gender)
          else if (!genderList.includes('Undefined')) genderList.push('Undefined')
        }
      })
      setGenders(genderList)
    }
  }, [billionaires])


  // useEffect that filtered the billionaires and adds them into the filtered state.
  useEffect(() => {
    //only filters billionaires if there are people to filter.
    if (billionaires.length) {
      //generate search term 
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      console.log(regexSearch)
      //filter through billionaires and ass matching people to fikteredbillionaire state
      const filtered = billionaires.filter(billionaire => {
        return regexSearch.test(billionaire.personName) && (billionaire.gender === filters.gender || filters.gender === 'All')
      })
      setFilteredBillionaires(filtered)
    }
  }, [filters, billionaires])


  return (
    <div className='center-container'>
      {/* contains dropdown filter & also search field. */}
      <Container className='list-nav'>
        <Navbar bg='light' expand='sm' >
          <Navbar.Brand as={Link} to='/' className=''>HomePage</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav.Link as={Link} to='/'>Fortune400</Nav.Link>
            <Nav.Link as={Link} to='/'>Products</Nav.Link>
            <Nav.Link as={Link} to='/'>Misc</Nav.Link>
            <Nav.Link as={Link} to='/'>Users</Nav.Link>
            <Nav.Link as={Link} to='/'>Celebrity</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <div className='filters'>
          <select name='gender' value={filters.gender} onChange={handleChange}>
            <option className="dropdown-menu mr-sm2" aria-labelledby="dropdownMenuButton" key='All' value="All">Filter</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </select>
          <input className='form-control mr-sm-2' type='text' name='searchTerm' placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
        </div>

      </Container>

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


    </div>

  )
}

export default Compare