import React from 'react'


//This component contains the searchField and the filter 


const Filter = ({ Container, Navbar, Nav, Link, filters, handleChange, genders }) => {

  return (

    <div className='filters'>
      <select name='gender' value={filters.gender} onChange={handleChange}>
        <option className="dropdown-menu mr-sm2" aria-labelledby="dropdownMenuButton" key='All' value="All">Filter</option>
        {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
      </select>
      <input className='form-control mr-sm-2' type='text' name='searchTerm' placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
    </div>

  )

}

export default Filter