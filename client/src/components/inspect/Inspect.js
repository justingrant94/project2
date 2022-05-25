import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import InspectItem from './InspectItem'
import InspectUser from './InspectUser'
import { userIsOwner, getTokenFromLocalStorage } from '../../helpers/auth'

const Inspect = () => {
  const { id, type } = useParams()

  const [editMode, setEditMode] = useState(false)
  const [content, setContent] = useState(() => {
    if (type === 'user') return ({
      name: 'John/Jane Doe',
      salary: 0,
      savings: 0,
      description: 'Blah-die blah.',
      image: '',
      public: false,
    })
    else if (type === 'item') return ({
      name: 'Generic Item',
      description: 'Blah-die blah.',
      image: '',
      category: 'products',
      value: 0,
    })
  })

  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getContent = async () => {
      try {
        const { data } = await axios.get(`/api/${type}s/${id}`)
        setContent(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getContent()
  }, [id])

  // useEffect(() => {
  //   if (content) {
  //     !userIsOwner(content) && setEditMode(false)
  //   }
  // }, [content, editMode])

  const handleEdit = () => setEditMode(!editMode)

  const handleSave = async () => {
    try {
      await axios.put(`/api/${type}s/${id}`, content, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      setEditMode(false)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/${type}s/${id}`)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  const handleGenericChange = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    })
  }

  const handleFieldChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }
  
  return (
    <>
      {
        type === 'item'
        &&
        < InspectItem
          editMode={editMode}
          item={content}
          handleFieldChange={handleFieldChange}
          handleGenericChange={handleGenericChange}
          handleSave={handleSave} handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      }
      {
        type === 'user'
        &&
        <InspectUser
          editMode={editMode}
          user={content}
          handleFieldChange={handleFieldChange}
          handleGenericChange={handleGenericChange}
          handleSave={handleSave} handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      }
    </>
  )

}

export default Inspect