import React, { useContext } from 'react'
import './postPage.css'
import Navbar from '../Navbar/Navbar'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from '../Comment/Comment'
import { AuthContext } from '../../helpers/AuthContext'

const PostPage = () => {


    let { id } = useParams()

    const [postObject, setPostObject] = useState({})

    const [commentList, setCommentList] = useState([])

    const [newComment, setNewComment] = useState('')

    const { authState } = useContext(AuthContext)

    let history = useHistory()
    
    useEffect(() => {
        axios.get(`https://mybook12.herokuapp.com/posts/byId/${id}`).then( (response) => {
            setPostObject(response.data)
        })

        axios.get(`https://mybook12.herokuapp.com/comments/${id}`).then( (response) => {
            setCommentList(response.data)
        })
    }, [])

    const deletePost = (id) => {
        axios.delete(`https://mybook12.herokuapp.com/posts/${id}`, { headers: { accessToken: sessionStorage.getItem("accessToken") } } ).then(() => {
            alert('Post deleted')
            history.push('/home')
        })
    }

    const addComment = () => {
        axios.post('https://mybook12.herokuapp.com/comments', {commentBody: newComment, PostId: id}, { headers: { accessToken: sessionStorage.getItem("accessToken") } })
        .then((response) => {
            if (response.data.error) {
                console.log(response.data.error)
            }
            else {
                const commentToAdd = {commentBody: newComment, username: response.data.username, id: response.data.id}
                setCommentList([...commentList,  commentToAdd])
                setNewComment('')
                console.log('Comment posted.')
            }
        })
    }
  return (
    <div>
        <Navbar />
        <main className='postContainer2'>
            <div className='post2'>
                <div className='postTitle'>
                    <p>{postObject.title}</p>
                    <p>{postObject.username}</p>
                </div>
                <div className='line'></div>
                <div className='postFooter'>
                    <p className='postText'>{postObject.postText}</p>
                    
                </div>
                
            </div>

            {authState.username === postObject.username ?  <button className='deleteButton' onClick={() => {deletePost(postObject.id)} }>Delete post</button> : ''}
            
            <section className='comments'>
                <h4 className='cmtTitle'> Comments: </h4>

                <section className='writeComment'>
                    
                    <input type='text' value={newComment} className='enterComment' onChange={(event) => {setNewComment(event.target.value)}} placeholder='Enter a comment...'></input>
                    <button className='submitComment' type='submit' onClick={addComment}>Submit</button>
                    
                </section> 
                
                <div className='commentList'>
                    { commentList.map((comment, key ) => {
                        return <Comment body={comment.commentBody} creator={comment.username} commentDB={comment.id}/>
                    })}
                </div>
                
                
            </section>
            
        </main>
    </div>
  )
}

export default PostPage