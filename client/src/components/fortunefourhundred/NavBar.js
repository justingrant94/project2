import React from 'react'


const NavBar = ({ Container, Navbar, Nav, Link }) => {

  return (
    <Container className='list-nav'>
      <Navbar bg='light' expand='sm' >
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav.Link as={Link} to='/'>Fortune400</Nav.Link>
          <Nav.Link as={Link} to='/'>Products</Nav.Link>
          <Nav.Link as={Link} to='/'>Misc</Nav.Link>
          <Nav.Link as={Link} to='/'>Users</Nav.Link>
          <Nav.Link as={Link} to='/'>Celebrity</Nav.Link>
        </Navbar.Collapse>
      </Navbar>

    </Container>

  )

}

export default NavBar 