import { Button } from 'react-bootstrap';
import '../App.css'
import React, { useState } from 'react';

const Task = (props) => {
  let {title,desc,deadline,status,handleEdit,handleDelete} = props;

  const getColor =(status)=>{
    if(status === 'done')
    return 'green';
    else if(status === 'in progress')
    return 'yellow';
    else
    return 'red';

  }
 
  return (
    <div className='task-container' >
      <h2 className='title'>{title}</h2>
      <p className='desc'> {desc}</p>
      <div className='inside-container'>
        <span>{deadline}</span>
        <span style={{color:`${getColor(status.toLowerCase())}`,fontWeight : 'bold' } } >{status}</span>
      </div>
      <div className='button-container'>
      <Button variant="primary" onClick={() => handleEdit(props)}>Edit </Button>
      <Button variant="secondary" onClick={()=> handleDelete(props && props.id)}>Delete </Button>
      </div>
    </div>
  );
};

export default Task;
