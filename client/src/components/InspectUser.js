import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import anonProfile from '../assets/anonProfile.jpg'

const InspectUser = () => {
  const { id } = useParams()

  const [editMode, setEditMode] = useState(false)
  const [content, setContent] = useState({
    image: '',
    name: 'Drew Burgess',
    salary: 23000,
    savings: 2800,
    description: 'Drew Burgess, best person alive.',
    public: false,
  })

  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getContent = async () => {
      try {
        const { data } = await axios.get(`/api/users/${id}`)
        setContent(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getContent()
  }, [id])

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleSave = () => {



    setEditMode(!editMode)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${id}`)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  const handleSavingsChange = () => {
    setContent({
      ...content,
      savings: 23000,
    })
  }

  const handleFieldChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <Container className='inspect-container bg-light'>
      <Row className='image-container field'>
        <img src={content.image ? content.image : anonProfile} />
        {
          editMode
          &&
          <>
            <input type='text' name='image' value={content.image} onChange={handleFieldChange} />
            <sub>Make sure to use a valid online URL.</sub>
          </>
        }
      </Row>
      <Row className='name-container field'>
        <h2>Name</h2>
        {
          editMode
            ?
            <input type='text' name='name' value={content.name} />
            :
            <p>{content.name}</p>
        }
      </Row>
      <Row className='worth-container field'>
        <h2>Worth</h2>
        <Row className='salary-row'>
          <span>Sarlary</span>
          {
            editMode
              ?
              <>
                <span>£</span>
                <input type='text' name='salary' value={content.salary} />
              </>
              :
              <p>{'£' + content.salary}</p>
          }
        </Row>
        <Row className='savings-row'>
          <span>Savings</span>
          {
            editMode
              ?
              <div>
                <span>£</span>
                <input type='text' name='savings' value={content.savings} onChange={handleSavingsChange} />
              </div>
              :
              <p>{'£' + content.savings}</p>
          }
        </Row>
      </Row>
      <Row className='description-container field'>
        <h2>Description</h2>
        <div>
          {
            editMode
              ?
              <textarea name='description' value={content.description} />
              :
              <p>{content.description}</p>
          }
        </div>
      </Row>
      <Row className='buttons-container field'>
        {
          editMode
            ?
            <button className='btn btn-success' onClick={handleSave}>Save</button>
            :
            <button className='btn btn-success' onClick={handleEdit}>Edit</button>
        }
        <button className='btn btn-success' onClick={handleDelete}>Delete</button>
      </Row>
      <Row className='public-container field'>
        <h2>Set to public?</h2>
        <input type='checkbox' value={content.public} />
        {
          editMode &&
          <sub>Public items/accounts can be seen (but not edited) by other users.</sub>
        }
      </Row>
      <Row className='ownedItems-container field'>
        <h2>Owned Items</h2>
        <div className='ownedItemsList'>

        </div>
      </Row>
    </Container>
  )
}

export default InspectUser