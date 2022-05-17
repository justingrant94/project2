import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState(false)

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(/*postMyData*/ '', formData)
      console.log('Submitted')
      navigate('/') // ! Change !
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  return (
    <div id='content'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='record'>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder='Email' required value={formData.email} onChange={handleChange} />
        </div>
        <div className='record'>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className='input' placeholder='Password' required value={formData.password} onChange={handleChange} />
        </div>
        {errors && <p className='text-danger text-center'>Unauthorised</p>}
        <button type="submit" className='button'>Login</button>
      </form>
    </div>
  )
}

export default Login