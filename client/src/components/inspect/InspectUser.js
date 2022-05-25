import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import anonProfile from '../../assets/anonProfile.jpg'

const InspectUser = ({ editMode, user, handleFieldChange, handleGenericChange, handleSave, handleEdit, handleDelete }) => {

  return (
    <Container className='inspect-container bg-light'>
      <Row className='image-container field'>
        <img src={user.image ? user.image : anonProfile} />
        {
          editMode
          &&
          <>
            <input type='text' name='image' value={user.image} onChange={handleFieldChange} />
            <sub>Make sure to use a valid online URL.</sub>
          </>
        }
      </Row>
      <Row className='name-container field'>
        <h2>Name</h2>
        {
          editMode
            ?
            <input type='text' name='name' value={user.name} />
            :
            <p>{user.name}</p>
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
                <input type='text' name='salary' value={user.salary} onChange={handleGenericChange}/>
              </>
              :
              <p>{'£' + user.salary}</p>
          }
        </Row>
        <Row className='savings-row'>
          <span>Savings</span>
          {
            editMode
              ?
              <div>
                <span>£</span>
                <input type='text' name='savings' value={user.savings} onChange={handleGenericChange} />
              </div>
              :
              <p>{'£' + user.savings}</p>
          }
        </Row>
      </Row>
      <Row className='description-container field'>
        <h2>Description</h2>
        <div>
          {
            editMode
              ?
              <textarea name='description' value={user.description} />
              :
              <p>{user.description}</p>
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
      {/* <Row className='public-container field'>
        <h2>Set to public?</h2>
        <input type='checkbox' value={user.public} />
        {
          editMode &&
          <sub>Public items/accounts can be seen (but not edited) by other users.</sub>
        }
      </Row>
      <Row className='ownedItems-container field'>
        <h2>Owned Items</h2>
        <div className='ownedItemsList'>

        </div>
      </Row> */}
    </Container>
  )
}

export default InspectUser