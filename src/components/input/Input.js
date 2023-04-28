import React from 'react'
import './Input.css'

const Input = ({type, text, placeholder}) => {
  return (
    <div>
        <input className='inputBox' type={type} placeholder={placeholder}></input>
    </div>
  )
}

export default Input