import React from 'react'
import './Hamburger.css'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios';



const Hamburger = () => {

    const { setAuthState } = useContext(AuthContext)
    const { authState } = useContext(AuthContext)


    useEffect( () => {
        axios.get('http://localhost:3001/auth/auth', { headers: {accessToken: sessionStorage.getItem('accessToken') } } ).then((response) => {
            if (response.data.error){
                setAuthState({...authState, status: false})
                

            }
            else {
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                })
            }
        })
    }, [])

    const logout = () => {
        sessionStorage.removeItem('accessToken')
        setAuthState({username: "", id: 0, status: false})

    } 

    // 

    const [classAdded, setClassAdded] = useState(false);
    
    const toggle = () => {
        setClassAdded(!classAdded)
        
    }

    let change = classAdded ? 'closed': ''

    return (

        <div  className={`hamburger ${change}`}>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <div onClick={toggle} className='lines'>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                </div>

                <div className='menu'>
                    <ul className='list'>

                        <li className='item'>
                            <Link className='link' to='/home'>Home</Link>
                        </li>

                        <li className='item'>
                            {!authState.status ? '' :  (<Link className='link' to='/create'>Create</Link>)}
                        </li>

                        <li>
                            {!authState.status ? (<Link to='/login' className='link'>Sign in</Link> )  :  (<Link to='/login' className='link' onClick={logout}>Logout</Link>)}
                        </li>

                    </ul>
                </div>
            </AuthContext.Provider>
        </div>
  )
}

export default Hamburger