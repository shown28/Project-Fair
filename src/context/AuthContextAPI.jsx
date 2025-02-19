import React, { useEffect,createContext,useState } from 'react'
export const tokenAuthContext = createContext()

const AuthContextAPI = ({children}) => {

    const [isAuthorized, setIsAuthorized] = useState(false) 

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[isAuthorized])

  return (
    <tokenAuthContext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
    </tokenAuthContext.Provider>
  )
}

export default AuthContextAPI