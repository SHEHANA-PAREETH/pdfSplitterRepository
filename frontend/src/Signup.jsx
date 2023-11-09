
import React, { useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Signup.css'
import { faEye,faEyeSlash,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

import { Container } from 'react-bootstrap';
import AxiosInstance from './config/axiosinstsance';






function Signupform() {

  
  const[eye,setEye]=useState(false)
const [text,setText]=useState('')
const [errors,setErrors]=useState({
  firstName:'',
  lastName:'',
  email:'',
  number:'',
  password1:'',
  password2:''

})
  const [loginData,setLoginData]=useState ({
    firstName:'',
    lastName:'',
    email:'',
    number:'',
    password1:'',
    password2:'',
    role:false
  })



  const handleInputChange=(e)=>{
   const {name,value}=e.target
   setLoginData((prevFormData) => 
   ({ ...prevFormData, [name]:value}))


  }

  
    
  const handleSubmit= (e)=>{
    e.preventDefault()
    validateFirstname()
   validatelastname()
   validateemail()
   validatenumber()
   validatepassword1()
   validatepassword2()
   if(validateFirstname()&&
   validatelastname()&&
   validateemail()&&
   validatenumber()&&
   validatepassword1()&&
   validatepassword2()) {


  console.log('success');
  AxiosInstance.post(`/auth/register`,loginData).then((res)=>{ 
  
    console.log(res.data);
    if(res.data.usercreated){
      Swal.fire({  
        title: 'Good job!',  
        text: 'You created the account successfully.',
        icon: 'success'
      }).then(()=>{
        
       
        window.location.href=('/')
      })
     
    }
    else{
      if(res.data.serverconnected){
        setText('user exists')
        setTimeout(()=>{
          setText('')
        },3000)
      }
      else{
        setText('server issue')
        setTimeout(()=>{
          setText('')
        },3000)
      }
    }
    
  })
}

   }

    
const validateFirstname=()=>{
  if (loginData.firstName.length == 0) {
    setErrors((prevData) => 
    ({ ...prevData, firstName:'  First Name cannot be empty'}))
    
    setTimeout(()=>{
      setErrors((prevData) => 
      ({ ...prevData, firstName:''}))
      
    },3000)
    return false
    
  }
else{
  let reg=/^[a-zA-Z ]+$/;
  if(!reg.test(loginData.firstName)){
    setErrors((prevData) => 
    ({ ...prevData, firstName:'   enter a valid name'}))
    
    setTimeout(()=>{
      setErrors((prevData) => 
      ({ ...prevData, firstName:''}))
      
    },3000)
    return false
  }
  else{
    return true
  }
}
 
}
const validatelastname=()=>{
  if (loginData.lastName.length == 0) {
      
    setErrors((prevData) => 
    ({ ...prevData, lastName:'   last Name cannot be empty'}))

    setTimeout(()=>{
      setErrors((prevData) => 
      ({ ...prevData, lastName:''}))
      
    },3000)
    return false
    
  }
  else{
    let reg=/^[a-zA-Z ]+$/;
    if(!reg.test(loginData.lastName)){
      setErrors((prevData) => 
      ({ ...prevData, lastName:'    enter a valid name'}))
      
      setTimeout(()=>{
        setErrors((prevData) => 
        ({ ...prevData, lastName:''}))
        
      },3000)
      return false
    }
    else{
      return true
    }
  }
}
  const validateemail=()=>{
    if (loginData.email.length == 0) {
        
      setErrors((prevData) => 
      ({ ...prevData, email:'   email can not be empty'}))
      setTimeout(()=>{
        setErrors((prevData) => 
        ({ ...prevData, email:''}))
        
      },3000)
      
    return false
      
    }
    else{
      let reg=/^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9-_]{3,20})\.([a-z]{2,6}?$)/;
      if(!reg.test(loginData.email)){
        setErrors((prevData) => 
        ({ ...prevData, email:'    enter a valid email'}))
        
        setTimeout(()=>{
          setErrors((prevData) => 
          ({ ...prevData, email:''}))
          
        },3000)
        return false
      }
      else{
        return true
      }
    }

}
const validatenumber=()=>{
  if (loginData.number.length == 0) {
      
    setErrors((prevData) => 
    ({ ...prevData, number:'  number can not be empty'}))

    setTimeout(()=>{
      setErrors((prevData) => 
      ({ ...prevData, number:''}))
      
    },3000)
    return false
    
  }
  else{
    let reg=/^[0-9]{10}$/;
    if(!reg.test(loginData.number)){
      setErrors((prevData) => 
      ({ ...prevData, number:'  enter a valid number'}))
      
      setTimeout(()=>{
        setErrors((prevData) => 
        ({ ...prevData, number:''}))
        
      },3000)
      return false
    }
    else{
      return true
    }
  }


}

const validatepassword1=()=>{
  if (loginData.password1.length < 8) {
    setErrors((prevData) => 
    ({ ...prevData, password1:'Password must contain greater than or equal to 8 characters.'}))

    setTimeout(()=>{
      setErrors((prevData) => 
      ({ ...prevData, password1:''}))
      
    },3000)
    return false
}
else{
  let reg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if(!reg.test(loginData.password1)){
    setErrors((prevData) => 
    ({ ...prevData, password1:'password contain one uppercaseletter,lowecase letter,special character and a number'}))
    
    setTimeout(()=>{
      setErrors((prevData) => 
      ({ ...prevData, password1:''}))
      
    },3000)
    return false
  }
  else{
  return true
  }
}


}
const validatepassword2=()=>{
  if (loginData.password1 !==loginData.password2) {
    setErrors((prevData) => 
    ({ ...prevData, password2:"   Passwords don't match."}))

    setTimeout(()=>{
      setErrors((prevData) => 
      ({ ...prevData, password2:''}))
      
    },3000)
    return false
}
else{
  return true
}

}
let passwordType;
 if(eye){
  passwordType='text'
 }
 else{
 passwordType='password'
 }

 useEffect(()=>{
console.log(loginData);
 },[loginData])
  return (

<Container className='signupcontainer mt-3'>
  
    <Form onSubmit ={handleSubmit} className='w-75 my-2 mx-auto' > 
    <h2>Sign up</h2>
      {text?<p className='text-danger'> <FontAwesomeIcon icon={faCircleExclamation}/>{text}</p>:''}
    
    
      <Form.Group className="mb-3 " >
        <Form.Label className=''>First name</Form.Label>
        <Form.Control type="text" placeholder="Enter firstname" name='firstName' value={loginData.firstName} onChange={(e)=>handleInputChange(e)}/>

      </Form.Group>
     
      {errors.firstName?<p className='text-danger text-center '> <FontAwesomeIcon icon={faCircleExclamation}/>{errors.firstName}</p>:''}
      <Form.Group className="mb-3" >
        <Form.Label className=''>Last name</Form.Label>
        <Form.Control type="text" placeholder="Enter lastname" name='lastName' value={loginData.lastName} onChange={(e)=>handleInputChange(e)}/>
      </Form.Group>
      {errors.lastName?<p className='text-danger text-center'> <FontAwesomeIcon icon={faCircleExclamation}/>{errors.lastName}</p>:''}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className=''>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter email"  name='email' value={loginData.email} onChange={(e)=>handleInputChange(e)} />
      </Form.Group>
      {errors.email?<p className='text-danger text-center'> <FontAwesomeIcon icon={faCircleExclamation}/>{errors.email}</p>:''}
      
      
        
      <Form.Group className="mb-3" >
        <Form.Label className=''>Mobile </Form.Label>
        <Form.Control type="number" placeholder="Enter number" name='number' value={loginData.number} onChange={(e)=>handleInputChange(e)}/>
      </Form.Group>
      {errors.number?<p className='text-danger text-center'> <FontAwesomeIcon icon={faCircleExclamation}/>{errors.number}</p>:''}
        
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='position-relative'> Password</Form.Label>
        <Form.Control  type={passwordType} placeholder="Password" name='password1' value={loginData.password1} onChange={(e)=>handleInputChange(e)} />

      {eye?<FontAwesomeIcon className='position-absolute transl' style={{marginLeft:'21%',marginTop:'-25px'}} icon={faEyeSlash} onClick={()=>setEye(false)}/>:<FontAwesomeIcon className='position-absolute' style={{marginLeft:'21%',marginTop:'-25px'}} icon={faEye} onClick={()=>setEye(true)}/>}
      </Form.Group>
      {errors.password1?<p className='text-danger text-center'> <FontAwesomeIcon icon={faCircleExclamation}/>{errors.password1}</p>:''}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className=''>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password2' value={loginData.password2} onChange={(e)=>handleInputChange(e)} />
      </Form.Group>

      
      {errors.password2?<p className='text-danger text-center'> <FontAwesomeIcon icon={faCircleExclamation}/>{errors.password2}</p>:''}
      
     
      <Button variant=" w-50 mb-2 " className='mx-auto text-light' type="submit" style={{backgroundColor:'#D20000'}}>
        Signup
      </Button>
      
    </Form>
    </Container>
  )
  
  }

export default Signupform