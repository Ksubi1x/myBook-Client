import React from 'react'
import './Register.css'
import Button2 from '../SignupButton/Button2'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage,  } from 'formik'
import * as Yup from 'yup'

const Register = () => {


    const initialValues = {
        username: '',
        password:'',
    }

    const registerSchema = Yup.object().shape({
        username: Yup.string().required('Username cannot be blank.'),
        password: Yup.string().required('Password cannot be blank.')
    })

    const onSubmit = (data) => {
        
        axios.post('https://mybook12.herokuapp.com/auth', data).then( (response) => {
            console.log(response)
            console.log(data)
        })
       
    }

  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registerSchema}>
            <Form className='registerForm' >

                <div className='registerTitle'>
                    <div className='text'>
                        <h2>Sign Up</h2>
                        <p>It's quick and easy.</p>
                    </div>
                    <Link to='/login' className='backLink'>X</Link>
                </div>

                <div className='line'></div>
                <label>Username: </label>
                <ErrorMessage name='username' component='span'/>
                <Field className='input' id='username'  name='username' placeholder='admin'/>
                <label>Password: </label>
                <ErrorMessage name='password' component='span'/>
                <Field className='input' id='password' type='password' name='password' placeholder='*********'/>

               
                <div className='signupButton'>
                    <button className='registerButton' type='submit'>Submit</button>
                </div>

            </Form> 
        </Formik>
    </div>
  )
}

export default Register;