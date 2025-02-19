import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allApi'


const Projects = () => {

  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])
  // console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects = async ()=>{
    const token =sessionStorage.getItem('token');
    if(token){
      const reqHeader = {
        'Authorization':  `Bearer ${token}`
      }
      try{
        const result = await allProjectAPI(searchKey,reqHeader)
        console.log(result)
        if(result.status == 200){
          setAllProjects(result.data)
        }
      }catch(err){
        console.log(err)
      }
    }
  }


  return (
  <>
    <Header></Header>
      <div style={{paddingTop:'100px'}}>
      <div>
        <h1>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} type="text " placeholder='Search Project by language' className='form-control w-25' />
        <Row className='mt-3'>

        {
          allProjects?.length>0?
          allProjects?.map(project=>(
            <Col className='mb-4' sm={12} md={6} lg={4} >
          <ProjectCard displayData={project}/>
          </Col>          
          ))
          :
          <div className='text-danger'> Projects not found</div>
        }
          
        </Row>
      </div>
      </div>
  </>
  )
}

export default Projects