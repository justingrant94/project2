
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import PageNavbar from './components/default/PageNavbar'
import Home from './components/Home'
import Compare from './components/fortunefourhundred/Compare'
import Inspect from './components/Inspect'
import NotFound from './components/default/NotFound'

//Auth Components
import Register from './components/Register'
import Login from './components/Login'

const App = () => {

  // console.log(process.env.REACT_APP_TOKEN)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/items')
      console.log(data)
    }
    getData()

  })

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <PageNavbar /> */}

          <Route path='/compare' element={<Compare />} />



          {/* Auth routes - starting with register */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inspect/:id" element={<Inspect />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
