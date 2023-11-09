
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Uploadpdf from './Uploadpdf';
import OpenDocument from './OpenDocument';
import SingleDOcumentDetails from './SingleDOcumentDetails';
import Signup from './Signup'
//importing bootstrap 5 css
import { Autharization, LoginPageAuth } from './autherization/Autharization';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Login';





function App() {
  

 
  return (
   
      <div className="App">
      
     
          <BrowserRouter>
            <Routes>
              <Route element={<LoginPageAuth/>}>
              <Route path='/' element={ <Login/>}/>
              </Route>
              <Route element={<Autharization/>}>
            <Route path='/home' element={ <Uploadpdf/>}/>
            <Route path='/openpdfdocument' element={ <OpenDocument/>}/>
            <Route path='/opensingledocumentdetails/:id' element={ <SingleDOcumentDetails/>}/>
            </Route>
              
              <Route path='/signup' element={ <Signup/>}/>
             
            </Routes>
            </BrowserRouter> 
      
       
            
          </div>
 
  )
}




export default App;
