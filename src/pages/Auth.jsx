import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI,loginAPI } from '../services/allApi';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import { tokenAuthContext } from '../context/AuthContextAPI'

const Auth = ({ insideRegister }) => {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  const [inputData,setInputData] = useState({
    username:'',
    email:'',
    password:''
  })  

  const navigate = useNavigate(); 
  const [isLoged,setIsLoged] = useState(false)

// console.log(inputData)

const handleRegister = async (e) =>{
  e.preventDefault()
  if(inputData.username && inputData.email && inputData.password)
  {
    
    try{
      const result = await registerAPI(inputData)
      console.log(result.status);
      if(result.status == 200){
        alert(`Welcom ${result.data?.username},Please login to explore our website`);
        navigate('/login')
        setInputData({username:'',email:'',password:''})
      }
      else{
        if(result.response.status== 406){
          alert(result.response.data)
          setInputData({username:'',email:'',password:''})
        }
      }
    }
    catch(err){
      console.log(err)

    }

  }
  else{
    alert('please fill the form')
  }
}

const handleLogin = async(e)=>{
  e.preventDefault()
  if(inputData.email && inputData.password){
    try{
      const result = await loginAPI(inputData)
      if(result.status == 200){
        sessionStorage.setItem('user',JSON.stringify(result.data.user))
        sessionStorage.setItem('token',result.data.token)
        setIsAuthorized(true)
        setIsLoged(true)
        setTimeout(() => {
          setInputData({username:"",email:"",password:""})
          navigate('/')
          setIsLoged(false)
        }, 2000);
        
        
      }
      else{
        if(result.response.status == 404){
          alert(result.response.data)
        }
      } 
    }catch(err){
        console.log(err);
    }
  }else{
    alert("Please fill the form comletly");
  }
}

  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex align-items-center justify-content-center' >
      <div className='container w-75'>
        <div className='shadow card p-2'>

          {/* div for card */}
          <div className='row align-items-center'>
            {/* image */}
            <div style={{ width: '30rem' }} className='col-lg-6'>
              <img style={{ width: '100%', objectFit: 'cover' }} src="https://nordvpn.com/wp-content/uploads/blog-social-securing-cryptocurrency-a-way-out-of-the-hackers-target.svg" alt="userAuth" />
            </div>
            {/* content */}
            <div className='col-lg-6'>
              <h1><i className='fa-brands fa-docker'></i> Project Fair</h1>
              <h5>Sign {insideRegister ? 'up' : 'in'} to your account</h5>
              <Form>
                {
                  insideRegister &&
                  <FloatingLabel 
                    controlId="floatingInputName"
                    label="UserName"
                    className="mb-3"
                  >
                    <Form.Control onChange={e=> setInputData({...inputData,username:e.target.value})} type="text" placeholder="User Name" />
                  </FloatingLabel>
                }

                <FloatingLabel
                  
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control onChange={e=> setInputData({...inputData,email:e.target.value})} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control onChange={e=> setInputData({...inputData,password:e.target.value})} type="password" placeholder="Password" />
                </FloatingLabel>

                {
                  insideRegister ?
                    <div>
                      <button className='btn btn-success' onClick={handleRegister}>Register</button>
                      <p>Already User ? Click here to <Link to={'/login'} >Login</Link> </p>
                    </div>
                    : 
                    <div>
                      <button className='btn btn-success' onClick={handleLogin} >Login
                        {
                          isLoged &&
                          <Spinner animation="border" variant="light" />
                        }
                      </button>
                      <p>New user ? Please click here to  <Link to={'/register'}>Register</Link> </p>
                    </div>
                }


              </Form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Auth