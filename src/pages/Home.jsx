import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import ProjectCard from '../components/ProjectCard'
import Card from 'react-bootstrap/Card';
import avatar from '../assets/avatar.jpg'
import { getHomeProjectAPI } from '../services/allApi';

const Home = () => {

    const [allHomeProjects, setAllHomeProject] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getAllHomeProjects()
    }, [])

    const getAllHomeProjects = async () => {
        try {
            const result = await getHomeProjectAPI();
            console.log(result.data)
            if (result.status == 200) {
                setAllHomeProject(result.data)
            }

        } catch (err) {
            console.log(err)
        }


    }

    const handleProjects = () => {

        if (sessionStorage.getItem('token')) {
            navigate('/projects');
        }
        else {
            alert("To access this you need to login first");
        }
    }
    

    return (
        <>
            <div style={{ minHeight: '100vh' }} className='d-flex align-items-center justify-content-center rounded shadow w-100'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-lg-6' >
                            <h1 style={{ fontSize: '80px' }} > <i className='fa-brands fa-docker'></i> Project Fair</h1>
                            <p style={{ textAlign: 'justify' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium quasi alias iusto qui labore officia provident vitae molestiae molestias ut, necessitatibus ducimus quis itaque assumenda, magni tempore. Quis, temporibus alias!</p>
                            {
                                sessionStorage.getItem('token') ?
                                    <Link to={'/dashboard'} className='btn btn-dark'>Manage your projects</Link>
                                    :
                                    <Link to={'/login'} className='btn btn-dark'>Starts to explore</Link>
                            }

                        </div>
                        <div className='col-lg-6'>
                            <img src={logo} alt="" />
                        </div>
                    </div>


                </div>

            </div>

            {/* project card section */}
            <div className='mt-5 text-center '>
                <h1>Explore Our Projects</h1>
                <marquee behavior="" direction=''>
                    <div className='d-flex '>
                        

                         {
                            allHomeProjects?.map(projects => ( 
                                <div className='me-5 d-flex flex'>
                                <ProjectCard displayData = {projects} />
                                </div>
                            ))

                        }





                    </div>
                </marquee>
                <button onClick={handleProjects} className='btn btn-link mt-5'>Click here to view more project</button>
            </div>

            {/* testmonial */}
            <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
                <h1> Our Testmonials</h1>
                <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>

                    {/* card */}
                    <Card style={{ width: '18rem' }} className='flex align-items-center p-3'>
                        <Card.Img style={{ width: '100px', borderRadius: '50px' }} variant="top" src={avatar} />
                        <Card.Body className='d-flex flex-column w-100 align-items-center' >
                            <div >   <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                            </div>

                            <Card.Title>Marco</Card.Title>
                            <Card.Text style={{ textAlign: 'justify' }}>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>

                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }} className='flex align-items-center p-3'>
                        <Card.Img style={{ width: '100px', borderRadius: '50px' }} variant="top" src={avatar} />
                        <Card.Body className='d-flex flex-column w-100 align-items-center' >
                            <div >   <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                                <i className='fa-solid fa-star text-warning'></i>
                            </div>

                            <Card.Title>Rocky</Card.Title>
                            <Card.Text style={{ textAlign: 'justify' }}>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>

                        </Card.Body>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default Home