import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../context/AuthContextAPI';


const Header = ({insideDashboard}) => {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }

  return (
   
      <Navbar style={{zIndex:1}} className="border rounded position-fixed w-100">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand href="#home"  >
              <i className='fa-brands fa-docker' > </i> 
               Projcets 
            </Navbar.Brand>
            </Link>
            {
              insideDashboard &&
              <div className='ms-auto'>
                <button onClick={logout} className='btn btn-link'>Logout</button>
              </div>
            }
          </Container>
          
      </Navbar>
    
  )
}

export default Header