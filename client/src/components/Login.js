import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
    <section className="form-page">
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-5' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="email" name="email" className='input' placeholder='Email' required value={formData.email} onChange={handleChange} />
            <input type="password" name="password" className='input' placeholder='Password' required value={formData.password} onChange={handleChange} />
            {errors && <p className='text-danger text-center'>U n a u t h o r i s e d</p>}
            <button type="submit" className="btn btn-success w-100 mt-3">L o g i n</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}

export default Login