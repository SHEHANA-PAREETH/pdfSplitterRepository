import React,{useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { BASE_URL } from './constants'
import Swal from 'sweetalert2'
import {Button,Form,Spinner} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import  FileDownload from 'js-file-download'

import AxiosInstance from './config/axiosinstsance'
import Navcomponent from './components/Navcomponent';
function SingleDOcumentDetails() {
    const [pdfURL,setPdfURL]=useState()
    const [numberofpages,setnumber]=useState(1)
   const {id}=useParams()
  const [title,setTitle]=useState()
  const navigate=useNavigate()
useEffect(()=>{
  
  getsinglefile()
},[])

const getsinglefile=()=>{
  AxiosInstance.get(`/getsinglepdf`,{params:{id:id}}).then((resp)=>{
    console.log(resp.data.data);
    setPdfURL(resp.data.data.pdf.filename)
    setTitle(resp.data.data.title)
    setnumber(resp.data.data.newpdfs)
    console.log(pdfURL);
        })
}
const [desiredpages,setdesiredpages]=useState()
const[loader,setLoader]=useState(false)
const [newpdfname,setnewpdfname]=useState()
const [errorvalue,setError]=useState(false)
const [popup,setpopup]=useState(false)

const [submutok,setsubmitok]=useState(false)
const handleSubmit=(e)=>{
  e.preventDefault()
setLoader(true)
  AxiosInstance.get(`/mergepdfs`,{params:{id:id,desiredpages:desiredpages}}).then((resp)=>{
  
  
    console.log(resp);
    setnewpdfname(resp.data.name)
    if(resp?.data?.msg==='success'){
     setError(false)
     setsubmitok(true)
 
    }
    if(resp?.data?.msg==="enter valid page numbers"){
      setError(true)
      setsubmitok(false)
      setTimeout(() => {
        setError(false)
      },1000);
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
setLoader(false)
}

const handleContinue=()=>{
  setpopup(true)

}
const getsplittedpdf=()=>{
  FileDownload(`${BASE_URL}/merges/${newpdfname}`,"splitted.pdf")
  
  
}
  return (
   <>
  
   {popup? <div>
    <Navcomponent/>
 <div className="">
 
          <h3 className="text-center">{title}</h3>
        </div>
   
        <div class="container p-5">
       
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{backgroundColor:'#D20000'}}>
  View Created Pdf
  </button>
  
 
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content" style={{height:"90vh"}}>
        <div class="modal-header">
          <h5 class="modal-title text-danger" id="exampleModalLabel">PDF</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
      <iframe
      src={`${BASE_URL}/merges/${newpdfname}`}
      frameborder="0"
    
      height="100%"
      width="100%"
  ></iframe>
        </div>
        <div class="modal-footer" className='d-flex justify-content-between'>
       
   <Button className='ms-3 mb-3' style={{backgroundColor:'#D20000'}} onClick={getsplittedpdf}>My Splitted Pdf</Button>


          <button type="button" class="btn btn-warning" data-bs-dismiss="modal" className='mb-3 me-3' style={{backgroundColor:'#D20000'}}>Close</button>
        
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>: <div>
  <Navcomponent/>
 <div className="">
          <h3 className="text-center">{title}</h3>
        </div>
        <div class="container p-5">
     
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{backgroundColor:'#D20000'}}>
    Open PDF 
  </button>


    <h5 className='mt-5'>Instructions to enter the desired pages to split pages from the pdf document</h5>
    <ListGroup as="ol" numbered className='mt-5 w-75 mx-auto'>
      <ListGroup.Item as="li" variant="warning">You can wright either single pages or range of pages or you can combine both</ListGroup.Item>
      <ListGroup.Item as="li" variant="warning">Enter single pages seperated by comma "," : EX: 10,35,60</ListGroup.Item>
      <ListGroup.Item as="li" variant="warning">Enter range of page numbers seperated by hyphen "-" : Ex: 10-50</ListGroup.Item>
      <ListGroup.Item as="li" variant="warning">Enter both methods Ex: 4-20,60,70</ListGroup.Item>

      <ListGroup.Item as="li" variant="warning">Enter the page numbers in the order you want to split</ListGroup.Item>    
      </ListGroup>

     
 
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content" style={{height:"90vh"}}>
        <div class="modal-header">
          <h5 class="modal-title text-danger" id="exampleModalLabel">PDF</h5>
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal" className='mb-3 me-3' style={{backgroundColor:'#D20000'}}>Close</button>

        </div>
        <div class="modal-body">
          
      <iframe
      src={`${BASE_URL}/uploads/${pdfURL}`}
      frameborder="0"
    
      height="100%"
      width="100%"
  ></iframe>
  
        </div>
        <div class="modal-footer" className='d-flex  justify-content-between'>
      <Form onSubmit={handleSubmit} className='ms-5'>
        <Form.Group >
         <Form.Label  class='my-2'>Enter the page numbers needed to split</Form.Label>
    

      <Form.Control type="text" placeholder='ex: 3,4,5 OR  7-10  OR   3,4,5,7-10 ' onChange={(e)=>setdesiredpages(e.target.value)}/>
      </Form.Group>
      {errorvalue?<p className='text-danger'>enter valid page numbers</p>:''}
    
      <Button class='btn'  className='my-2' style={{backgroundColor:'#D20000'}}   type="submit">Create Pdf</Button> <br/>
     {submutok?<Button class="btn btn-warning h-25 mb-5" data-bs-dismiss="modal" style={{backgroundColor:'#D20000'}} onClick={handleContinue}>continue....</Button>: <Spinner animation="border" variant="danger" size="sm"/>} 
      </Form>

      
        
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>}

   </>
  )
}

export default SingleDOcumentDetails