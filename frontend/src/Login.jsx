
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import {Container,Form }from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { redirect, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import './Login.css'
import { setUser } from './toolkit/userSlice';
import { useDispatch } from 'react-redux';
import AxiosInstance from './config/axiosinstsance';


function Login() {

 
  const dispatch=useDispatch( )
    const navigate=useNavigate()

  const [invalid,setInvalid]=useState('')
 
const [loginData,setLoginData]=useState({
  email:'',
  password:''
})


const handleInputChange=(e)=>{
  const {name,value}=e.target
  setLoginData((prevFormData) => 
  ({ ...prevFormData, [name]:value}))


 }

 const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(loginData);
  AxiosInstance.post(`/auth/login`,loginData).then((res)=>{
    console.log(res?.data?.msg);
    if(res?.data?.msg==="user login success"){

      Swal.fire({  
         
        text: 'login successfully.',
        icon: 'success'
      }).then(()=>{
        localStorage.setItem('token',res.data.token)
      
        dispatch(setUser(res.data.user))
        navigate('/home')
      
      })
      
    }
    if(res.data.msg==="invalid credentials"){
setInvalid("account doesn't exist,create new account" )
setTimeout(()=>{
  setInvalid('')
},3000)
    }
    if(res.data.msg==='password incorrect'){
      setInvalid("Password is incorrect" )
setTimeout(()=>{
  setInvalid('')
},3000)
    }
  })
 }
  return (
   <Container className='logincontainer mt-5'>
     <h1 className='' style={{color:'#D20000'}} >PDF SPLITTER </h1>
      <Form onSubmit={handleSubmit} className='w-50 mx-auto'>
       
    <h4 className='mt-4'>Create an account </h4>
    <h5 className='mt-4'>handle your PDF documents</h5>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={loginData.email} onChange={handleInputChange}/>
       
      </Form.Group>
     

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={loginData.password} onChange={handleInputChange}/>
      </Form.Group>
      <Button variant="  mb-3" type="submit" style={{backgroundColor:'#D20000',color:'white'}}>
        LOG IN
      </Button>
      {invalid?<p className='text-danger ms-5 fw-bold'> <FontAwesomeIcon icon={faCircleExclamation}/> {invalid}</p>:''}
    <div className='d-flex w-50 mx-auto mt-3'>
    <p className='me-2'>Don't have an aacount??</p> 
    <Nav.Link href="/signup" className='fw-bold  me-3' style={{color:'#D20000'}}>register</Nav.Link>
     

    </div>
     
    </Form>
   </Container>
  
  )

}

export default Login