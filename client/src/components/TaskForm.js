import axios from 'axios';
import React, { useState } from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import createAxiosInstance from '../axiosInstance';


const TaskForm = ({ taskData, setTaskFormData,setIsChanged,isChanged }) => {
  const { title, description, deadline, status } = taskData; 
  // const API_URL = 'http://localhost:3001';
const axiosInstance = createAxiosInstance();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(taskData)) return;
    let response;
    if(taskData.id)
    {
     response = await axiosInstance.put(`tasks/${taskData.id}`, { title, description, deadline, status });
     alert('data updated successfully!')
    }
    else{
    response = await axios.post(`tasks/`, { title, description, deadline, status });
    alert('data added successfully!')
      
  }

    setTaskFormData({
      title: '',
      description: '',
      deadline: '',
      status: 'Choose One'
    });
    setIsChanged(!isChanged);
  };

  const validate = (taskData) => { 
    if (taskData.title === '') {
      alert('title can not be empty');
      return false;
    } else if (taskData.description === '') {
      alert('description can not be empty');
      return false;
    } else if (taskData.deadline === '') {
      alert('deadline can not be empty');
      return false;
    } else if (taskData.status === 'Choose One') {
      alert('please choose the status');
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label >Title</Form.Label>
          <Form.Control onChange={(e) => setTaskFormData({ ...taskData, title: e.target.value })} value={title} type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={(e) => setTaskFormData({ ...taskData, description: e.target.value })} value={description} as="textarea" rows={3} />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" onChange={(e) => setTaskFormData({ ...taskData, deadline: new Date(e.target.value) })} value={deadline} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Status</Form.Label>
          <Form.Select onChange={(e) => setTaskFormData({ ...taskData, status: e.target.value })} value={status}>
            <option>Choose...</option>
            {['To Do', 'In Progress', 'Done'].map((el, key) => {
              return <option key={key}>{el}</option>
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default TaskForm;

