import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer className=" text-dark py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Intro */}
          <div className="col-md-3">
            <h5 style={{textDecoration:'none' }}><i class="fa-solid fa-music"></i><span className="p-2">Project Fair</span></h5>
            <p>
              Designed and built with all the love in the world by the luminar team with the help of our contributors</p>
           
             <p> Code licensed luminar,docs CC BY 3.0.</p>
             <p> Currently v5.3.2.</p>
           
          </div>

          {/* Links */}
          <div className="col-md-3 d-flex flex-column">
         
              <h5> Links</h5>
      
                <Link to={'/'}className="text-dark text-decoration-none">Landing Page</Link>
                <Link to={'/home'}className="text-dark text-decoration-none">Home Page</Link>

                <Link to={'/history'}className="text-dark text-decoration-none">History Page</Link>

         
              
           </div>
         
          {/* guides */}
          <div className="col-md-3">
            <h5>Guides</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://react-bootstrap.netlify.app/" target="_blank" className="text-dark text-decoration-none">
                  React
                </a>
              </li>
              <li>
                <a href="https://react-bootstrap.netlify.app/" className="text-dark text-decoration-none">
                  React Bootstrap
                </a>
              </li>
              <li>
                <a href="https://reactrouter.com/" target="_blank" className="text-dark text-decoration-none">
                  React Router
                </a>
              </li>
           
            </ul>
          </div>

          {/* contacts */}
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <div>
              <input style={{borderRadius:'5px',width:'200px',height:'35px',paddingLeft:'10px' }} type="text" placeholder="Enter your email here " /> 
              <button style={{borderRadius:'5px', width:'40px',height:'35px'  }} className="bg-info"><i class="fa-solid fa-arrow-right"></i></button>
            </div><br />
            <div>
              
          <a href="https://x.com/login?"><i style={{paddingRight:'30px',color:"white"}} class="fa-brands fa-twitter"></i></a>     
              <a href="https://www.instagram.com/"><i style={{paddingRight:'30px',color:"white"}} class="fa-brands fa-instagram"></i></a>  
          <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F"><i style={{paddingRight:'30px',color:"white"}} class="fa-brands fa-facebook"></i></a>  
          <a href="https://in.linkedin.com/"><i style={{paddingRight:'30px',color:"white"}} class="fa-brands fa-linkedin"></i></a>  
          <a href="https://github.com/"><i style={{paddingRight:'30px',color:"white"}} class="fa-brands fa-github"></i></a>  
          <a href=""><i style={{paddingRight:'30px',color:"white"}} class="fa-solid fa-phone"></i></a> </div>
          
          </div>
        </div>
       
        <p className="text-center mb-0">copyright  &copy September 2024 batch. Media Player.Built with React</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer