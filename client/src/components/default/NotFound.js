import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className='not-found '>
      <h1 className='mb-5'>Page Not Found!!</h1>
      <Link to="/" className='btn btn-danger'>Back to home</Link>
    </main>
  )
}

export default NotFound