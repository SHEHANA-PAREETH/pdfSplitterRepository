import React, { useEffect, useState } from 'react'
import { BASE_URL } from './constants'
import axios from 'axios'
import SingleDocument from './SingleDocument'
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import AxiosInstance from './config/axiosinstsance';
import { redirect, useNavigate } from 'react-router-dom';
import Navcomponent from './components/Navcomponent';
function OpenDocument() {
  const navigate=useNavigate()
    const [allPdfFiles,setAllPdfFiles]=useState([])
    useEffect(()=>{
      
  
        AxiosInstance.get(`/getallfiles`).then((resp)=>{
          if(resp?.data?.data)
 setAllPdfFiles(resp?.data?.data) 
 
          }).catch((error)=>{
            console.log(error);
            if(error.response.data.message==="unauthorized request"){
             Swal.fire({  
                    
               text: 'something went wrong.',
              
             }).then(()=>{
           localStorage.clear()
               navigate('/')
             })
            }
           }) 
     

    },[allPdfFiles])
  return (
    <>
     <Navcomponent/>
      <Container fluid className='mt-5 vw-75 mx-auto'>

      
      <Table striped bordered hover className=''>
      <thead>
        <tr>
          <th>Number</th>
          <th>Pdf title</th>
          <th>Action</th>  
        </tr>
      </thead>  
{allPdfFiles?allPdfFiles.map((obj,index)=><SingleDocument documentdetails={obj} index={index}/>):''}
</Table>
</Container>
    </>
   
   
  )
}

export default OpenDocument