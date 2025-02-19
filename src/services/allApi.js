import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// registerAPI called by auth component
export const registerAPI = async (reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/register`,reqBody)
}

//loginAPI called by auth component || this is a get request but POST is used because to get request body
export const loginAPI = async (reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/login`,reqBody)
}

//addProjectAPI callled by Add component when user clicked on add button
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//addProjectAPI called by home component when user page loaded
export const getHomeProjectAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

//get all projects needed authorization 
export const allProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

//userProjectAPI called by view comoponent when page loaded 
export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

//updateProjectAPI called by edit comoponent when when user click on update 
export const updateProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

//userProjectDeleteAPI called by view comoponent when when user click on delete 
export const userProjectDeleteAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,reqHeader)
}

//updateUserAPI called by profile comoponent when when user click on update 
export const updateUserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}