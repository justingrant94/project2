import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

// imported components
import Filters from './Filter'
import LeftColumnCards from './LeftColumnCards'
import NavBar from './NavBar'
import ListOfBillionaires from './ListOfBillionaires'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'



const Compare = () => {

  const [billionaires, setBillionaires] = useState([])

  // const [billionaireList, SetBillionaieList] = useState([])  // for middleColumn

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
      //filter through billionaires and ass matching people to fikteredbillionaire state
      const filtered = billionaires.filter(billionaire => {
        return regexSearch.test(billionaire.personName) && (billionaire.gender === filters.gender || filters.gender === 'All')
      })
      setFilteredBillionaires(filtered)
    }
  }, [filters, billionaires])

  return (
    <div className='center-container'>

      <NavBar Container={Container} Navbar={Navbar} Nav={Nav} Link={Link} />

      <Filters Container={Container} Navbar={Navbar} Nav={Nav} Link={Link} filters={filters} handleChange={handleChange} genders={genders} />

      <LeftColumnCards Container={Container} filteredBillionaires={filteredBillionaires} billionaires={billionaires} Col={Col} Card={Card} />

      <ListOfBillionaires filteredBillionaires={filteredBillionaires} billionaires={billionaires} Container={Container} Row={Row} Card={Card} Col={Col} />

    </div >
  )
}

export default Compare