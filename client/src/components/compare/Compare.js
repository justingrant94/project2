import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// imported components
import LeftColumn from './LeftColumn'
import ListNavBar from './ListNavBar'
import MiddleColumnCards from './MiddleColumnCards'
import RightColumn from './RightColumn'
import { getPayload } from '../../helpers/auth'

const Compare = () => {

  const payload = getPayload()

  const [leftItem, setLeftItem] = useState({})
  const [currentUser, setCurrentUser] = useState({})

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
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${payload.sub}`)
        setCurrentUser(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCurrentUser()
  }, [payload.sub])

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get('/api/items')
        console.log(data)
        setItems(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getItems()
  }, [])

  useEffect(() => {
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

  useEffect(() => {
    if (items.length) {
      const categoryItems = items.filter(item => item.category === filters.category)
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = categoryItems.filter(item => {
        return regexSearch.test(item.name)
      })
      setFilteredItems(filtered)
    }
  }, [filters, items])

  useEffect(() => {

  }, [leftItem])

  const handleChange = (e) => {
    console.log(e.target.value)
    const newObj = {
      ...filters,
      [e.target.name]: e.target.value,
    }
    setFilters(newObj)
  }

  return (
    <>
      {/*LEFT*/}
      <LeftColumn item={leftItem} />
      <div className='center-container'>

        {/*MIDDLE*/}
        <ListNavBar filters={filters} setFilters={setFilters} handleChange={handleChange} genders={genders} />
        <MiddleColumnCards filteredItems={filteredItems} items={items} setLeftItem={setLeftItem} currentUser={currentUser}/>

      </div >
      {/*Right*/}
      <RightColumn currentUser={currentUser} />
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
