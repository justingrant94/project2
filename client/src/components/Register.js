import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('', formData) // ! Change Me!
      navigate('/login')
    } catch (err) {
      console.log(err)
      setErrors(err.response.data.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className='record'>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" className='input' placeholder='Username' value={formData.username} onChange={handleChange} />
        {errors.username && <p className='text-danger'>{errors.username}</p>}
      </div>
      <div className='record'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
        {errors.email && <p className='text-danger'>{errors.email}</p>}
      </div>
      <div className='record'>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
        {errors.password && <p className='text-danger'>{errors.password}</p>}
      </div>
      <div className='record'>
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input type="password" name="passwordConfirmation" className='input' placeholder='Password Confirmation' value={formData.passwordConfirmation} onChange={handleChange} />
        {errors.passwordConfirmation && <p className='text-danger'>{errors.passwordConfirmation}</p>}
      </div>
      <button type="submit" className="button">Register</button>
    </form>
  )
}

export default Register