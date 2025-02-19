import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import addPhoto from '../assets/addPhoto.jpg'
import { addProjectAPI } from '../services/allApi';
import { addprojectResponseContext } from '../context/ContextAPI';
  

const Add = () => { 
  const {addProjectResponse,setAddProjectResponse} = useContext(addprojectResponseContext)
  const [preview,setPreview] = useState('')
  const [show, setShow] = useState(false);
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState({
    title:'',languages:'',overview:'',github:'',website:'',projectImg:''
  })
  console.log(projectDetails)

  useEffect(()=>{
    if(projectDetails.projectImg.type == 'image/png' || projectDetails.projectImg.type == 'image/jpeg' || projectDetails.projectImg.type == 'image/jpg')
    {
      // valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
    else{
      // invalid image
      setImageFileStatus(false)
      setProjectDetails({...projectDetails,projectImg:''})
    }

  },[projectDetails.projectImg])

  const handleClose = () =>
    {
     
      setPreview('')
      setImageFileStatus(false)
       
    
      setShow(false);
    } 

  const handleAddProject =async ()=>{
    const {title,languages,overview,github,website,projectImg} = projectDetails
    console.log(`inside handleproject`)
    if(title && languages && overview && github && website && projectImg){
    
        const reqBody = new FormData()
        reqBody.append('title',title),
        reqBody.append('languages',languages),
        reqBody.append('overview',overview),
        reqBody.append('github',github),
        reqBody.append('website',website),
        reqBody.append('projectImg',projectImg)

        const token = sessionStorage.getItem('token')

        if(token){
          const reqHeaders = {
            "Content-type":"multipart/form-data",
            "Authorization":`Bearer ${token }`
          }
          // make api call
          try{
            const result = await addProjectAPI(reqBody,reqHeaders)
            if(result.status == 200){
              alert('Project added successfully')
              setAddProjectResponse(result)
              handleClose()
            }else{
              alert(result.response.data);
            }
          }catch(err){
            console.log(err);
          }

        }
        

    }else{
      alert("please fill the form")
    }
  } 
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='btn btn-primary' onClick={handleShow}>+ New Project</button>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex'>
            <div>

             <label>
              <input type="file" onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} style={{display:'none'}} />

               <img style={{ width: '200px' }} src={preview?preview:addPhoto} alt="" />
               </label>
               {
                !imageFileStatus &&
                <div className='text-primary'>Please upload image in correct format</div>

                
               }
            
            </div>

            <div className='w-100'>
              <div className='mb-2' >
              <input type="text " value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} className='form-control' placeholder='Project Title' />
              </div>
              
              <div className='mb-2' >
                <input type="text " value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} className='form-control' placeholder='Language used in project' />
              </div>

              <div className='mb-2' >
                <input type="text " value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails, overview:e.target.value })} className='form-control' placeholder='Project Overview' />
              </div>

              <div className='mb-2' >
                <input type="text " value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails, github:e.target.value})} className='form-control' placeholder='Project Github link' />
              </div>

              <div className='mb-2' >
                <input type="text " value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails, website:e.target.value})} className='form-control' placeholder='Project Websitelink' />
              </div>
            </div>
            </div >
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default Add