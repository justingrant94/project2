import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const PageNavbar = () => {

  return (
    < div className='hiding'>
      <Navbar bg='light' expand='sm'>
        <Container>
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav.Link as={Link} to='/'>My Account</Nav.Link>
            <Nav.Link as={Link} to='/'>Log out</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default PageNavbar