import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Inspect = () => {
  const { id } = useParams()

  const [editMode, setEditMode] = useState(false)
  const [content, setContent] = useState({
    image: 'https://i.imgur.com/tQrn3yk.jpg',
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
        const { data } = await axios.get('endpoint' + id) // ! Change !
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
      await axios.delete('endpoint' + id) // ! Change !
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
    setContent({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <Container className='inspect-container bg-light'>
      <div className='image-container field'>
        <img src={content.image} />
        {
          editMode
          &&
          <>
            <input type='text' name='image' value={content.image} onChange={handleFieldChange} />
            <sub>Make sure to use a valid online URL.</sub>
          </>
        }
      </div>
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
            <button onClick={handleSave}>Save</button>
            :
            <button onClick={handleEdit}>Edit</button>
        }
        <button onClick={handleDelete}>Delete</button>
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

export default Inspect