import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import createAxiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username :'',
    password: '',
  });
  const [alert, setAlert] = useState(null);
const axiosInstance = createAxiosInstance();
const navigate = useNavigate();
 
useEffect(()=>{
  if(localStorage.getItem('userToken') !== 'null')
  {
    navigate('/')
  }
 },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if(!formData.username)
      {
      setAlert({ variant: 'danger', message: 'username is required!' });
      return;
      }

      const response = await axiosInstance.post('auth/signup', formData);
      if(response?.data && response?.data?.status)
      {
        let token = response.data?.token; 
        localStorage.setItem('userToken',token);
        navigate('/');
        
      }
      setAlert({ variant: 'success', message: 'Signup successful!' });
    } catch (error) {
      console.error('Signup error:', error);
      setAlert({ variant: 'danger', message: error.response?.data?.message });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2>Sign Up</h2>
          {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" style={{marginTop: '2vw'}}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" style={{marginTop: '2vw'}}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{marginTop: '2vw'}} >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{marginTop: '2vw'}}>
              Sign Up
            </Button>
            <p style={{margin : 'auto' , height: '5vw'}}>Already Have Account <span style={{color: 'blue' , fontWeight : 'bold', cursor:'pointer' }}  onClick={()=> navigate('/login')}>Login</span></p>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};



export default Signup;
