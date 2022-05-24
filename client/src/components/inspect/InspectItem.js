import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import anonProfile from '../../assets/anonProfile.jpg'

const InspectItem = ({ editMode, item, handleFieldChange, handleSave, handleEdit, handleDelete }) => {

  return (
    <Container className='inspect-container bg-light'>
      <Row className='image-container field'>
        <img src={item.image ? item.image : anonProfile} />
        {
          editMode
          &&
          <>
            <input type='text' name='image' value={item.image} onChange={handleFieldChange} />
            <sub>Make sure to use a valid online URL.</sub>
          </>
        }
      </Row>
      <Row className='name-container field'>
        <h2>Name</h2>
        {
          editMode
            ?
            <input type='text' name='name' value={item.name} />
            :
            <p>{item.name}</p>
        }
      </Row>
      <Row className='worth-container field'>
        {
          item.category === 'fortune400' || item.category === 'celebrity'
            ?
            <h2>Net-Worth</h2>
            :
            <h2>Price</h2>
        }
        {
          editMode
            ?
            <>
              <span>£</span>
              <input type='text' name='salary' value={item.salary} />
            </>
            :
            <p>{'£' + item.value}</p>
        }
      </Row>
      <Row className='description-container field'>
        <h2>Description</h2>
        <div>
          {
            editMode
              ?
              <textarea name='description' value={item.description} />
              :
              <p>{item.description}</p>
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
        <input type='checkbox' value={item.public} />
        {
          editMode &&
          <sub>Public items/accounts can be seen (but not edited) by other users.</sub>
        }
      </Row>
    </Container>
  )
}

export default InspectItem