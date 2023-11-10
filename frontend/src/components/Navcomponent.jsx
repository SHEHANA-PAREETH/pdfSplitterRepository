
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap'

import Swal from 'sweetalert2'
import {  useNavigate } from 'react-router-dom';






function Navcomponent() {
 const navigate=useNavigate()
//const {user}=useSelector((state)=>state.user)
const user=JSON.parse(localStorage.getItem('user'))
//console.log(user.firstName);
  const handleLogout=()=>{
  localStorage.clear()
    Swal.fire({    
      text: 'logout successfully.',
      icon: 'success'
    }).then(()=>{
    navigate('/')
   
   })

  
}


  return (

      <Navbar expand="lg" style={{backgroundColor:'#D20000'}} >
     
      <Container>
      
        <Navbar.Brand href="/"><h2 className='text-light'>Pdf Splitter</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='text-light bg-light' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
    <Nav.Link href="/home" className='fw-bold text-light me-3'>Home</Nav.Link>
      <Nav.Link href="/openpdfdocument" className='text-light '>Show Pdfs</Nav.Link>
      <Nav.Link href="#" id="basic-nav-dropdown" className='text-light fs-5 text-uppercase fw-bold ms-2'>{user?`${user.firstName} ${user.lastName}`:` `}</Nav.Link>
          </Nav>
          <Button className="ms-4 fw-bold" style={{backgroundColor:'#D20000'}} onClick={handleLogout}>Log out</Button>
            
        </Navbar.Collapse>
      
        
      </Container>
    </Navbar>


      
     

   
    
  

  )
}

export default Navcomponent