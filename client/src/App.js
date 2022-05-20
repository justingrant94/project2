
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PageNavbar from './components/default/PageNavbar'
import Home from './components/Home'
import Compare from './components/fortunefourhundred/Compare'
import NotFound from './components/default/NotFound'

//Auth Components
import Register from './components/Register'
import Login from './components/Login'
import Inspect from './components/Inspect'




const App = () => {

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
          <Route path="/inspect" element={<Inspect />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
