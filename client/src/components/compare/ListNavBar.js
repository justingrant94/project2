import React from 'react'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

const ListNavBar = ({ filters, setFilters, handleChange, genders }) => {

  const handleButtonClick = (e) => {
    setFilters(
      {
        ...filters,
        category: e.target.name,
      }
    )
  }

  return (
    <>
      <Navbar className='list-nav bg-light'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className=''>
          <button onClick={handleButtonClick} name='fortune400'>Fortune400</button>
          <button onClick={handleButtonClick} name='products'>Products</button>
          <button onClick={handleButtonClick} name='celebrities'>Celebrities</button>
        </Navbar.Collapse>
      </Navbar>
      {
        filters.category === 'fortune400' || filters.category === 'celebrities' || filters.category === 'users'
        &&
        < div className='filters'>
          <select name='gender' value={filters.gender} onChange={handleChange}>
            <option className="dropdown-menu mr-sm2" aria-labelledby="dropdownMenuButton" key='All' value="All">Filter</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </select>
          <input className='form-control mr-sm-2' type='text' name='searchTerm' placeholder='Search...' value={filters.searchTerm} onChange={handleButtonClick} />
        </div>
      }
    </>
  )
}

export default ListNavBar 