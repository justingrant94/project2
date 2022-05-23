import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    savings: 0,
    salary: 0,
    image: '',
    password: '',
    passwordConfirmation: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    savings: 0,
    salary: 0,
    image: '',
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
      await axios.post('/api/register', formData)
      navigate('/login')
    } catch (err) {
      console.log(err)
      setErrors(err.response.data.errors)
    }
  }

  return (
    <section className="form-page">
      <Container>
        <Row>
          <form className='col-8 offset-5 col-lg-8 offset-md-2 col-lg-6 offset-lg-3 mt-4' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <h3>Sign up to compare<br />
              yourself to the 1% </h3>
            
            <input type="text" name="name" className='input' placeholder='Name' value={formData.name} onChange={handleChange} />
            {errors.name && <p className='text-danger'>{errors.name}</p>}
            <input type="email" name="email" className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
            {errors.email && <p className='text-danger'>{errors.email}</p>}
            <input type="number" name="salary" className='input' placeholder='Salary' value={formData.salary} onChange={handleChange} />
            {errors.salary && <p className='text-danger'>{errors.salary}</p>}
            <input type="number" name="savings" className='input' placeholder='Savings' value={formData.savings} onChange={handleChange} />
            {errors.savings && <p className='text-danger'>{errors.savings}</p>}
            <input type="url" name="image" className='input' placeholder='Image URL' value={formData.image} onChange={handleChange} />
            {errors.image && <p className='text-danger'>{errors.image}</p>}
            <input type="password" name="password" className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
            {errors.password && <p className='text-danger'>{errors.password}</p>}
            <input type="password" name="passwordConfirmation" className='input' placeholder='Password Confirmation' value={formData.passwordConfirmation} onChange={handleChange} />
            {errors.passwordConfirmation && <p className='text-danger'>{errors.passwordConfirmation}</p>}
            <button type="submit" className="btn btn-success w-100 mt-4">Register  🤑</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}

export default Register