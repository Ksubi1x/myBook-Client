import React from 'react'
import './Create.css'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage,  } from 'formik'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext'
import { useContext, useEffect } from 'react'

const Create = () => {

    useEffect( () => {
        if (!sessionStorage.getItem('accessToken')) {
            history.push('/login')
        }
    }, [] )

    const { authState } = useContext(AuthContext)

    let history = useHistory()
    
    const initialValues = {
        title: '',
        postText: '',
    }

    const postSchema = Yup.object().shape({
        title: Yup.string().required('Title cannot be blank.'),
        postText: Yup.string().required('Message cannot be blank.'),
    })

    const onSubmit = (data) => {
        console.log(data)
        axios.post('https://mybook12.herokuapp.com/posts', data, { headers: {accessToken: sessionStorage.getItem('accessToken') } }).then( (response) => {
            console.log('Success')
            history.push('/home')
        })
    }



    return (
        <div className='makeContainer'>
            <div className='back'>
                <img src='/images/arrow-left-thin.svg'></img>
                <Link className='homeLink' to='/home'>Home</Link>
            </div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={postSchema} >

                <Form className='createPost'>
                    <h3> Create a post! </h3>
                    <section className='inputs'>

                        <div className='input'>
                            
                            <label>Title:</label>
                            <ErrorMessage name='title' component='span'/>
                            <Field id='title' name='title' type='text' className='input1'/>
                        
                        </div>

                        <div className='input'>

                            <label>Message:</label>
                            <ErrorMessage name='postText' component='span'/>
                            <Field id='postText'  type='text' rows='5' name='postText' className='input2' />
                        
                        </div>

                    </section>
                    <button type='submit' className='submit'>Submit</button>
                </Form>

            </Formik>
        </div>
    );
}

export default Create