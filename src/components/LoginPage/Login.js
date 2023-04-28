import React from 'react'
import Input from '../input/Input'
import Button from '../Button/Button'
import Button2 from '../SignupButton/Button2'
import { useState, useContext } from 'react'

import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage,  } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext'

const Login = () => {

  let history = useHistory()
    
  const initialValues = {
    username: '',
    password:'',
  }

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username cannot be blank.'),
    password: Yup.string().required('Password cannot be blank.')
  })

  const {setAuthState} = useContext(AuthContext)

  const onSubmit = (data) => {
    axios.post('https://mybook12.herokuapp.com/auth/login', data).then( (response) => {
      if (response.data.error) {
        alert(response.data.error)}
      else {
        sessionStorage.setItem("accessToken", response.data.token)
        setAuthState({ username: response.data.username, id: response.data.id, status: true})
        history.push('/home')
      }
    }, [])
  }


  return (
    <div>
      <div className='loginContainer'>

        <div>
          <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
            <Form className='formContainer'>
              <div className='loginSection'>
                <div className='inputz'>
                  <label >Username: </label>
                  <ErrorMessage name='username' component='span' />
                  <Field className='input'  placeholder='Admin' name='username' />
                  <label>Password: </label>
                  <ErrorMessage name='password' component='span' />
                  <Field className='input' type='password' placeholder='***********' name='password'/>
                </div>

                <Button text='Log In' />
                <a className='resetLink' href='#'> Forgot password? </a>
                <div className='line'></div>
              </div>
              
              <div className='registerSection'>
                <Link to='/register' className='registerLink' >
                  <Button2 type='submit' text='Create new account '/>
                </Link>
              </div>
            </Form>
          </Formik>
          
        </div>

        
      </div>
    </div>
  )
}

export default Login