import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add'
import Edit from './Edit'
import { addprojectResponseContext } from '../context/ContextAPI'
import { userProjectAPI, userProjectDeleteAPI } from '../services/allApi'


const View = () => {
    const { addProjectResponse, setAddProjectResponse } = useContext(addprojectResponseContext)
    const [userProjects, setUserProjects] = useState([])
    
    useEffect(() => {
        getUserProjects()

    }, [addProjectResponse])

    const deleteProject = async (id) => {
        const token = sessionStorage.getItem('token')
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                await userProjectDeleteAPI(id, reqHeader)
                getUserProjects()
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const getUserProjects = async () => {
        const token = sessionStorage.getItem('token')
        console.log("getUserProjects function")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await userProjectAPI(reqHeader)
                // console.log(result);
                
                if (result.status == 200) {
                    setUserProjects(result.data)
                }
                console.log(userProjects)
            } catch (err) {
                console.log(err);
            }

        }
    }

    return (
        <>


            <div className='d-flex justify-content-between '>
                <h2 className='text-warning'>All Project</h2>
                <div><Add></Add></div>
            </div>
            <div className='mt-2 allProject border'>
                
                {
                    userProjects?.length > 0 ?
        
                        userProjects?.map(project => (


                            <div className='d-flex align-items-center justify-content-between'>
                                <h3>{project?.title}</h3>
                                <div className='d-flex align-items-center'>
                                    <div><Edit project={project}/></div>
                                    <div><a target='_blank' href={project?.github}><i className='fa-brands fa-github'></i></a></div>
                                    <button onClick={()=>deleteProject(project?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
                                </div>
                            </div>

                        ))
                        :
                        <h4 className='text-danger'>No Project Found</h4>
                }

            </div>

        </>

    )
}

export default View