import React, { useContext } from 'react'
import './Navbar.css'
import Hamburger from './hamburger/Hamburger'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios';




const Header = () => {

    const { setAuthState } = useContext(AuthContext)
    const { authState } = useContext(AuthContext)

    const logout = () => {
        sessionStorage.removeItem('accessToken')
        setAuthState({username: "", id: 0, status: false})
    }

  return (

    <div>
        <AuthContext.Provider value={{ authState, setAuthState }}>

            <div className='header'>

                <div className='headerMenu'>

                    <h2 className='brandTitle'>myBook</h2>

                    <div className='menuH'>

                        <ul className='linksH'>
                            <li>
                                <Link className='linkH' to='/home'>Home</Link>
                            </li>

                            <li>
                                {!authState.status ? '' :  (<Link className='linkH' to='/create'>Create Post</Link>)}
                            </li>

                            <li>
                                {!authState.status ? (<Link to='/login' className='linkH'> Sign in </Link>)  :  (<Link to='/login' className='linkH' onClick={logout}>Logout</Link>)}
                            </li>
                            
                        </ul>
                    </div>

                    <Hamburger />

                </div>
                
            </div>

        </AuthContext.Provider>
    </div>
  )
}

export default Header