import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState(false)

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('sei-63-cheesebored', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login/', formData)
      setTokenToLocalStorage(data.token)
      console.log('Submitted')
      navigate('/compare')
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
    <section className="form-page">
      <Container>
        <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-5' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input type="email" name="email" className='input' placeholder='Email' required value={formData.email} onChange={handleChange} />
          <input type="password" name="password" className='input' placeholder='Password' required value={formData.password} onChange={handleChange} />
          {errors && <p className='text-danger text-center'>Unauthorised</p>}
          <button type="submit" className="btn btn-success w-100 mt-3">Login</button>
        </form>
      </Container>
    </section>
  )
}

export default Login