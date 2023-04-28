import React from 'react'
import './Comment.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext'
import axios from 'axios'

const Comment = ( { body, creator, commentDB } ) => {

  const { setAuthState } = useContext(AuthContext)
  const { authState } = useContext(AuthContext)

  let currentUser = authState.username

  const deleteComment = (commentDB) => {
    console.log(commentDB)
    axios.delete(`https://mybook12.herokuapp.com/comments/${commentDB}`)
  }

  return (
    <div>
        <AuthContext.Provider value={{ authState, setAuthState }}>

          <div className='comment'>
              <div className='userComment'>
                <p>{body}</p>
                <div className='edit'>
                  <p className='creator'>{ creator }</p>
                  {/* { creator === currentUser ? <button onClick={ () => {deleteComment(commentDB)} }>X</button> : '' } */}
                </div>
            </div>
          </div>

        </AuthContext.Provider>

    </div>
  )
}

export default Comment