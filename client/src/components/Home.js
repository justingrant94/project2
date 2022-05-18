import React from 'react'

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='hero text-center'>
      <div className='hero-container bg-light'>
        <h1 className='display-3'>Worth-y 💶 </h1>
        <hr className='my-3' />
        <p className='lead'>Compare any of your favourite <br />
          (or least favourite) <br />
          people in the world</p>
        <Link to='/register' className='btn btn-success'>R e g i s t er</Link>
        <Link to='/login' className='btn btn-success'>L o g i n</Link>
      </div>
    </div>
  )
}

export default Home