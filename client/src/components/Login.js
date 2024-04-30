import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import createAxiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState(null);
const navigate = useNavigate();

const axiosInstance = createAxiosInstance();
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
      const response = await axiosInstance.post('auth/login', formData);
      setAlert({ variant: 'success', message: 'Login successful!' });
      if(response?.data && response?.data?.status)
      {
        let token = response.data?.token; 
        localStorage.setItem('userToken',token);
        navigate('/'); 
      }
    } catch (error) {
      console.error('Login error:', error.response.data);
      setAlert({ variant: 'danger', message: error.response.data.message });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{marginTop: '2vw'}}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit"  style={{marginTop: '2vw'}}>
              Login
            </Button>
            
            <p style={{margin : 'auto' , height: '5vw'}}>Don't Have Account <span style={{color: 'blue' , fontWeight : 'bold',cursor:'pointer'}}  onClick={()=> navigate('/signUp')}>SignUp</span></p>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};
  
  export default Login;