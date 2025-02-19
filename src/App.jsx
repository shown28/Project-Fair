
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { useContext, useEffect, useState } from "react";
import AuthContextAPI from './context/AuthContextAPI'
import Pnf from './pages/Pnf'
import { tokenAuthContext } from './context/AuthContextAPI'

function App() {
 
const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

useEffect(() => { 
  if(sessionStorage.getItem('token')){
    setIsAuthorized(true)
  }else{
    setIsAuthorized(false)
  }
},[isAuthorized]) 
 
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      {
        isAuthorized &&
       <>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
       </>
      }
      <Route path='/login' element={<Auth/>}></Route>
      <Route path='/register' element={<Auth insideRegister = {true} />}></Route> 
      <Route path='/*' element={<Pnf/>}></Route>
     </Routes>

     <Footer/>
    </>
   
  )
}

export default App
