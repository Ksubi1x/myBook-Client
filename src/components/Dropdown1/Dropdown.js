import React from 'react'
import './Dropdown.css'

const Dropdown = () => {
  return (
    <div>
        <select className='dropdown1' name='Month'>
            <option value='Dec'>Dec</option>
            <option value='Dec'>Nov</option>
            <option value='Dec'>Oct</option>
            <option value='Dec'>Sep</option>
            <option value='Dec'>Aug</option>
            <option value='Dec'>Jul</option>
            <option value='Dec'>Jun</option>
            <option value='Dec'>May</option>
            <option value='Dec'>Apr</option>
            <option value='Dec'>Mar</option>
            <option value='Dec'>Feb</option>
            <option value='Dec'>Jan</option>
        </select>
    </div>
  )
}

export default Dropdown