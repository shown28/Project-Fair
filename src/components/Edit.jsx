
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import addPhoto from '../assets/addPhoto.jpg'
import SERVER_URL from '../services/serverURL';
import { updateProjectAPI } from '../services/allApi';



const Edit = ({ project }) => {
  const [preview, setPreview] = useState('')
  const [imageFileStatus, setImageFileStatus] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImg: ''
  })
  console.log(projectDetails)

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (projectDetails.projectImg.type == 'image/png' || projectDetails.projectImg.type == 'image/jpeg' || projectDetails.projectImg.type == 'image/jpg') {
      // valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
    else {
      // invalid image
      setImageFileStatus(false)
      setProjectDetails({ ...projectDetails, projectImg: '' })
    }

  }, [projectDetails.projectImg])

  const handleClose = () => {

    setShow(false)
    setProjectDetails({
      id: project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: ''
    })
  };
  const handleShow = () => {

    setShow(true)
    setProjectDetails({
      id: project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: ''
    })
  };

  const handleUpdateProject = async () => {
    const { id, title, languages, overview, github, website, projectImg } = projectDetails
    if (title && languages && overview && github && website) {
      const reqBody = new FormData()
      reqBody.append('title', title),
        reqBody.append('languages', languages),
        reqBody.append('overview', overview),
        reqBody.append('github', github),
        reqBody.append('website', website),
        preview ? reqBody.append('projectImg', projectImg) : reqBody.append('projectImg', project.projectImg)

      const token = sessionStorage.getItem('token')
      if (token) {
          // api call for updating project details
          const reqHeaders = {
            "Content-type":"multipart/form-data",
            "Authorization":`Bearer ${token }`
          }
          try{
            const result = await updateProjectAPI(id,reqBody,reqHeaders)
            if(result.status == 200){
              alert('Project updated successfully')
              handleClose()
            }
          }catch(err){
            console.log(err);
          }
      }
    }else{
      alert('Please fill all the fields')
    }
  }
  return (
    <>
      <button className='btn btn-primary' onClick={handleShow}>+ Edit Project</button>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex'>
            <div>

              <label>
                <input type="file" onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} style={{ display: 'none' }} />

                <img style={{ width: '200px' }} src={preview ? preview : `${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
              </label>
              {
                !imageFileStatus &&
                <div className='text-primary'>Please upload image in correct format</div>


              }

            </div>

            <div className='w-100'>
              <div className='mb-2' >
                <input type="text " value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} className='form-control' placeholder='Project Title' />
              </div>

              <div className='mb-2' >
                <input type="text " value={projectDetails.languages} onChange={e => setProjectDetails({ ...projectDetails, languages: e.target.value })} className='form-control' placeholder='Language used in project' />
              </div>

              <div className='mb-2' >
                <input type="text " value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} className='form-control' placeholder='Project Overview' />
              </div>

              <div className='mb-2' >
                <input type="text " value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} className='form-control' placeholder='Project Github link' />
              </div>

              <div className='mb-2' >
                <input type="text " value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} className='form-control' placeholder='Project Websitelink' />
              </div>
            </div>
          </div >
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Done</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit