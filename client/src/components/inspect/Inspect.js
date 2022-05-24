import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import InspectItem from './InspectItem'
import InspectUser from './InspectUser'

const Inspect = () => {
  const { id, type } = useParams()

  const [editMode, setEditMode] = useState(false)
  const [content, setContent] = useState(() => {
    if (type === 'user') return ({
      image: '',
      name: 'Drew Burgess',
      salary: 23000,
      savings: 2800,
      description: 'Drew Burgess, best person alive.',
      public: false,
    })
    else if (type === 'item') return ({
      name: 'Gold-plated Bugatti Veyron',
      description: 'American Rapper Flo Rida is the proud owner of this gold-plated Bugatti. The car has amazing speed that goes from 0-100 in just 2.8 seconds.',
      image: '',
      category: 'products',
      value: 10000000,
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

  const handleEdit = () => setEditMode(!editMode)

  const handleSave = async () => {
    try {
      await axios.put(`/api/${type}s/${id}`)
      setEditMode(!editMode)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${id}`)
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