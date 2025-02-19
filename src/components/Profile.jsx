import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import addPhoto from '../assets/addPhoto.jpg'
import SERVER_URL from '../services/serverURL';

import { updateUserAPI } from '../services/allApi';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',email:'',password:'',github:'',linkedin:'',profileImg:''
  })
  const [preview, setPreview] = useState('')
  const [exisitingProfileImg, setExistingProfileImg] = useState('')
  
  useEffect(() => {
    if(sessionStorage.getItem('user')){
      const user = JSON.parse(sessionStorage.getItem('user'))
      setUserDetails({...userDetails,username:user.username,email:user.email,github:user.github,linkedin:user.linkedin})
      setExistingProfileImg(user.profilePic)
    }
      
  },[open])

  useEffect(() => { 
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview('')
    }
  }, [userDetails.profilePic])

  const handleUpdateProfile = async()=>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if(linkedin && github){
      const reqBody = new FormData()
      reqBody.append('username',username)
      reqBody.append('email',email)
      reqBody.append('password',password) 
      reqBody.append('github',github)
      reqBody.append('linkedin',linkedin) 
      preview ? reqBody.append('profilePic',profilePic) : reqBody.append('profilePic',exisitingProfileImg) 
      const token = sessionStorage.getItem('token')
      
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status==200){
            alert('Profile updated successfully')
            sessionStorage.setItem('user',JSON.stringify(result.data))
            setOpen(!open)

          }else{
            console.log(result)
          }
        }catch(err){
          console.log(err)
        }
      }
    }else{
      alert('Please fill all the fields')
    }
  }

  return (
    <>
    <div>
      <h3>Profile</h3>
      <button  onClick={() => setOpen(!open)} className='btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
      <Collapse in={open}>
        <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">

          <label align='center'>
        <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}} />

        {
          exisitingProfileImg == "" ?
          <img style={{ width: '200px' }} src={addPhoto} alt="Profile Picturess" />
          :
          <img style={{ width: '200px' }} src={`${SERVER_URL}/uploads/${exisitingProfileImg}`} alt="Profiles Picture" />
        }
         </label> 

        {/* div for input  */}
        <div>
              <div className='mb-2'>
                <input type="text" value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} placeholder='User Github profile link' className='form-control' />
              </div>

              <div className='mb-2'>
                <input type="text" value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} placeholder='Linked profile link' className='form-control' />
              </div>

              <div className='mb-2'>
                <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
              </div>
        </div>

        </div>
      </Collapse>
    </div> 

    </>
  )
}

export default Profile