import React from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import SERVER_URL from '../services/serverURL';


const ProjectCard = ({displayData}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div className=''>
       <Card onClick={handleShow} style={{ width: '18rem' }} className='flex align-items-center p-3'>
                        <Card.Img style={{ width: '100%' }} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} />
                        <Card.Body className='d-flex flex-column w-100 align-items-center' >
                            <div >   <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                            </div>

                            <Card.Title>{displayData?.title}</Card.Title>
                            <Card.Text style={{ textAlign: 'justify' }}>
                               {displayData?.overview} 
                            </Card.Text>

                        </Card.Body>
        </Card>  
        {/* <Card style={{ width: '18rem' }} className='flex align-items-center p-3'>
                        <Card.Img style={{ width: '100%' }} variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrfGQOsf93jsUdzG-0TedUzVjYkoLB4trnjQ&s' />
                        <Card.Body className='d-flex flex-column w-100 align-items-center' >
                            <div >   <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                            </div>

                            <Card.Title>Rocky</Card.Title>
                            <Card.Text style={{ textAlign: 'justify' }}>
                                Some quick 
                            </Card.Text>

                        </Card.Body>
        </Card>  */}

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project 1 </Modal.Title>
        </Modal.Header>
        <Modal.Body >
           <div className='row align-items-center'>
                <div className='col-lg-6' >
                <img className='img-fluig' style={{width:"100%"}} src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} alt="image of calculator" />
                </div>
    
                <div className='col-lg-6'>
                 <h3>{displayData?.title}</h3>
                 <h6>Language used: <span>{displayData?.languages}</span></h6>
                    <p>
                        Project Overview: {displayData?.overview}
                    </p>
                </div>
           </div>
           <div>
            <a href="#">git</a>
           </div>
        </Modal.Body>
        
      </Modal>


    </div>
  )
}

export default ProjectCard