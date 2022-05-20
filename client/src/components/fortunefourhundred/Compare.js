import React, { useState, useEffect } from 'react'
import axios from 'axios'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

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
      // console.log(filtered)
    }
  }, [filters, billionaires])


  return (
    <>
      <div className='container'>
        <div className='filter-container'>
          <select name='gender' value={filters.gender} onChange={handleChange}>
            <option key='All' value="All">All</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </select>
          {/* Search Field */}
          <input type='text' name='searchTerm' placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
        </div>
      </div>


      <Container className='billionaire-list'>
        <Row>
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