
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Form,Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Uploadpdf.css'
import Swal from 'sweetalert2'

import AxiosInstance from './config/axiosinstsance';
import Navcomponent from './components/Navcomponent';
function Uploadpdf() {
 
  const Navigate=useNavigate()
  const [title,setTitle]=useState('')
  const [file,setFile]=useState('')
 const [error,setError]=useState(false)
  const navigate = useNavigate();
  
const handleFilechange=(e)=>{
  setFile(e.target.files[0])
  const allowedFiles=['application/pdf']
  
}
  const submitImage=async (e)=>{
    e.preventDefault();
   
   if(title.length === 0 || file.length===0){
      Swal.fire({  
          text: ' Please upload the document before submit.',
       
      }).then(()=>{
        Navigate('/home')
      })

    }
   
      else{
        const allowedFiles=['application/pdf']
        if(file&& allowedFiles.includes(file.type)){
          const formData = new FormData();
          formData.append("title", title);
          formData.append("file", file);
          console.log(title, file);
      
          const result = await AxiosInstance.post(
            `/`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log(result);
         
         if (result?.data?.status === "ok") {
          Swal.fire({  
            title: 'Good job!',  
            text: 'You uploaded the document successfully.',
          
          }).then(()=>{
            Navigate('/home')
          })
          
        };
        }
        else{
          setError(true)
          setTimeout(()=>
          {
            setError(false)
          },1000)
        }
        
      
      }
    
   
    
}
  const getpdf=()=>{
  AxiosInstance.get(`/getallfiles`).then((resp)=>{
  console.log(resp);
  if(resp?.data?.msg==="no documents"){
    Swal.fire({  
         
      text: 'No documents to show.',
     
    }).then(()=>{
      navigate('/home')
    })
  }
else{
  navigate('/openpdfdocument')
}
}).catch((error)=>{
 console.log(error);
 if(error?.response?.data?.message==="unauthorized request"){
  Swal.fire({  
         
    text: 'something went wrong.',
   
  }).then(()=>{
localStorage.clear()
    navigate('/')
  })
 }
})
}


     
    
   
  return (
    <>
    <Navcomponent/>
<Container fluid className='  d-flex flex-column justify-content-center align-items-center set-background' >


     <Form className="50-vw " onSubmit={submitImage}>
     <h3 className='mb-3 text-light'>PDF SPLITTER</h3> 
<h5 className='mb-3'>Split PDFs in the order you want with the easiest PDF Spitter available.</h5>
     <Form.Group className="mb-3 " >
        <Form.Label className='text-light'>Enter Title</Form.Label>
        <Form.Control type="text" placeholder="title" onChange={(e)=>setTitle(e.target.value)} />

      </Form.Group>
      <Form.Group className="mb-3 " >
        <Form.Label className='text-light'>Upload pdf</Form.Label>
        <Form.Control type="file" placeholder="upload only pdf file" accept="" onChange={handleFilechange} />
{error?<h6 className='text-dark mt-2 bg-warning p-2'>Only pdf file can be uploaded</h6>:''}
      </Form.Group>
        
       
       
        <Button className="  btn text-light fw-bolder" type="submit" style={{backgroundColor:'#D20000'}} >
          Submit
        </Button>
      </Form>
      <p className='mt-1'>Click to view the uploaded documents</p>
     <Button className='btn btn-info mt-1 text-light fw-bolder' onClick={getpdf} style={{backgroundColor:'#D20000'}}>Show uploaded documents</Button>
     </Container>
    </>
   
  )
}
  
export default Uploadpdf