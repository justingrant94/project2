import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// imported components
import LeftColumn from './LeftColumn'
import ListNavBar from './ListNavBar'
import MiddleColumnCards from './MiddleColumnCards'
import RightColumn from './RightColumn'

const Compare = () => {

  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [genders, setGenders] = useState([])
  const [filters, setFilters] = useState({
    gender: 'All',
    searchTerm: '',
    category: 'fortune400',
  })

  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get('/api/items')
        setItems(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }

    const getFortune400 = async () => {
      try {
        const { data } = await axios.get('https://forbes400.herokuapp.com/api/forbes400/')
        setItems(data)
      } catch (error) {
        console.log(error)
      }
    }

    getFortune400()
    getItems()
  }, []) //empty array so it only triggers first render

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
    if (items.length) {
      const genderList = []
      items.forEach(item => {
        if (!genderList.includes(item.gender)) {
          if (item.gender) genderList.push(item.gender)
          else if (!genderList.includes('Undefined')) genderList.push('Undefined')
        }
      })
      setGenders(genderList)
    }
  }, [items])

  // useEffect that filtered the billionaires and adds them into the filtered state.
  useEffect(() => {
    //only filters billionaires if there are people to filter.
    if (items.length) {
      //generate search term 
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      //filter through billionaires and matching people to filtered billionaire state

      const filtered = items.filter(billionaire => {
        return regexSearch.test(billionaire.personName) && (billionaire.gender === filters.gender || filters.gender === 'All')
      })
      setFilteredItems(filtered)
    }
  }, [filters, items])

  return (
    <>
      {/*LEFT*/}
      <LeftColumn />
      <div className='center-container'>

        {/*MIDDLE*/}
        <ListNavBar filters={filters} setFilters={setFilters} handleChange={handleChange} genders={genders} />
        <MiddleColumnCards filteredItems={filteredItems} items={items} />

      </div >
      {/*Right*/}
      <RightColumn />
    </>
  )
}

export default Compare

/* <Container className='item-list' >
        {items.map((items) => {
          const { _id, name, image, description, value } = items
          // console.log(_id)
          // console.log(name)
          // console.log(image)
          return (
            <Col key={_id} md='5' lg='4' className='character mb-4' >
            <Card style={{ width: '18rem' }}>
                <Card.Img variant='top' src={image} />
                <Card.Body className='bg-light'>
                  <Card.Title className='text-center mb-1'>
                    <h1>Name<span></span></h1>{name}
                    <h2><span>Net worth</span></h2>${value}
                    <h3><span>Description</span></h3><p>{description}</p></Card.Title>
                    </Card.Body>
                    </Card>
            </Col>
            )
        })}

      </Container> */