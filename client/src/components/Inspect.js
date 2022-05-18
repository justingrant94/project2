import React, { useState } from 'react'
import testDrew from '../assets/testDrew.jpg'

import { useParams, Link, useNavigate } from 'react-router-dom'

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

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleDelete = () => {
    //Delete the item +/- log out
  }

  const handleSavingsChange = () => {
    setContent({
      ...content,
      savings: 23000,
    })
  }

  return (
    <section className='inspect-container bg-light'>
      <div className='image-container'>
        <img src={content.image} />
        {
          editMode
          &&
          <>
            <input type='text' value={content.image} />
            <sub>Make sure to use a valid online URL.</sub>
          </>
        }
      </div>
      <div className='name-container'>
        <h2>Name</h2>
        {
          editMode
            ?
            <input type='text' value={content.name} />
            :
            <p>{content.name}</p>
        }
      </div>
      <div className='worth-container'>
        <h2>Worth</h2>
        <div>
          <span>Sarlary</span>
          {
            editMode
              ?
              <>
                <span>£</span>
                <input type='text' value={content.salary} />
              </>
              :
              <p>{'£' + content.salary}</p>
          }
          <span>Savings</span>
          {
            editMode
              ?
              <>
                <span>£</span>
                <input type='text' value={content.savings} onChange={handleSavingsChange} />
              </>
              :
              <p>{'£' + content.savings}</p>
          }
        </div>
      </div>
      <div className='description-container'>
        <h2>Description</h2>
        <div>
          {
            editMode
              ?
              <textarea value={content.description} />
              :
              <p>{content.description}</p>
          }
        </div>
      </div>
      <div className='buttons-container'>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className='ownedItems-container'>
        <h2>Owned Items</h2>
        <div className='ownedItemsList'>

        </div>
      </div>
      <div className='public-container'>
        <h2>Set to public?</h2>
        <input type='checkbox' value={content.public} />
        {
          editMode &&
          <sub>Public items/accounts can be seen (but not edited) by other users.</sub>
        }
      </div>
    </section>
  )
}

export default Inspect