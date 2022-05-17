// import { useEffect } from 'react'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

import PageNavbar from './components/default/PageNavbar'
import Home from './components/Home'
import NotFound from './components/default/NotFound'

//Auth Components
import Register from './components/Register'
import Login from './components/Login'




const App = () => {

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        {/* <PageNavbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />



          {/* Auth routes - starting with register */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
