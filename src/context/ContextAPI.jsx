import React, { createContext, useState } from 'react'
export const addprojectResponseContext = createContext()
export const editProjectResponseContext = createContext()

const ContextAPI = ({children}) => {
    const[addProjectResponse,setAddProjectResponse] = useState("")
    const[editProjectResponse,setEditProjectResponse] = useState("")
  return (
    <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
      <addprojectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
          {children}
      </addprojectResponseContext.Provider> 
    </editProjectResponseContext.Provider>   
  )
}

export default ContextAPI