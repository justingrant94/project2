import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

import anonImage from '../../assets/anonProfile.jpg'
import { getTokenFromLocalStorage } from '../../helpers/auth'

const OneCard = ({ item, setLeftItem, currentUser }) => {
  const { _id, image, name, value } = item

  const navigate = useNavigate()

  const handleAdd = async (e) => {
    const basketItem = {
      owner: currentUser._id,
      itemId: _id,
      quantity: 1,
    }
    await axios.post(`api/users/${currentUser._id}/basket`, basketItem, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
  }

  const handleRemove = async (e) => {
    await axios.delete(`api/users/${currentUser._id}/basket/${_id}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
  }

  const handleAssignLeft = () => {
    setLeftItem(item)
  }

  const sendToInspect = () => {
    navigate(`/inspect/${_id}/item`)
  }

  return (

    <Card className="one-card">
      <button className='image-button' onClick={sendToInspect}>
        <Card.Img variant='top' src={image ? image : anonImage} />
      </button>
      <Card.Body className='bg-light'>
        <Card.Title className='text-center mb-1'>
          <h2>{name}</h2>
          <h2>${value}</h2>
        </Card.Title>
        <button onClick={handleAdd} type='button'>+</button>
        <button onClick={handleRemove} type='button'>-</button>
        <button onClick={handleAssignLeft} type='button'>Assign</button>
      </Card.Body>
    </Card>
  )
}

export default OneCard