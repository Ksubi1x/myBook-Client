import React from 'react'
import './HomePage.css'
import Navbar from '../Navbar/Navbar'
import Post from '../Post/Post'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../helpers/AuthContext'

const Home = () => {
 
  const { authState } = useContext(AuthContext)

  let history = useHistory()
  
  const [listOfPosts, setListOfPosts] = useState([])
  
  useEffect( () => {
    
    if(!sessionStorage.getItem('accessToken') ) {
      history.push('/login')
    } else {
      axios.get('https://mybook12.herokuapp.com/posts').then( (response) => {
        console.log(response.data)
        setListOfPosts(response.data)
      })
    }
    
    
    
  }, [])

  return (
    <div>
      
      <div className='homePage'>
        
        <div className='postArea'>
          
          {listOfPosts.map((value,key) => {
            return <div className='postInteract' onClick={ () => {history.push(`/post/${value.id}`)} }>
              <Post  title={value.title} username={value.username} text={value.postText} />
            </div> 
            
          })}

        </div>
        
      </div>

    </div>
  )
}

export default Home