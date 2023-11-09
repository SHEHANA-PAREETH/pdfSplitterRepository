import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navcomponent from './components/Navcomponent';

function SingleDocument({documentdetails,index}) {
const Navigate=useNavigate()
  

const handleClick=()=>{
    console.log(documentdetails._id);
    Navigate(`/opensingledocumentdetails/${documentdetails._id}`)
  }
  return (
  <>

       <tbody>
        <tr>
          <td>{index+1}</td>
          <td ><p>{documentdetails.title}</p></td>
          <td onClick={handleClick} style={{cursor:'pointer'}}>click to open</td>   
        </tr>
        </tbody>
  </>
   


   
  )
}

export default SingleDocument