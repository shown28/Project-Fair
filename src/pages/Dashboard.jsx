import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import Add from '../components/Add'
import View from '../components/View'
import { tokenAuthContext } from '../context/AuthContextAPI'


const Dashboard = () => {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  const [username,setUsername] = useState('')

  useEffect(()=>{

    if(sessionStorage.getItem('token')){
      setIsAuthorized(true)
    }else{
      setIsAuthorized(false)
    }

    if(sessionStorage.getItem('user')){
      setUsername(JSON.parse(sessionStorage.getItem('user')).username.split(" ")[0])
    }
  })

  return (
    <>

      <Header insideDashboard={true}></Header>
      <div style={{paddingTop:'100px'}} className='container-fluid'>
    <div className='row mt-3'>
      <div className='col-lg-8'>
      <h1>Welcome <span className='text-warning'> {username}</span></h1>
    
      <View></View>
      </div>
      <div className='col-lg-4'>
        <Profile></Profile>
      </div>
    </div>
      </div>
    </>
  )
}

export default Dashboard