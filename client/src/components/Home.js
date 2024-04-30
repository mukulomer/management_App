import '../App.css';
import { useState,useEffect } from 'react';
import Task from './Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Pagination} from 'react-bootstrap';
import TaskForm from './TaskForm';
import createAxiosInstance from '../axiosInstance';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


function Home() {

  const [counter,setCounter] = useState(0);
  const [page,setPage] = useState(1);
  const [tasks,setTasks] = useState([]);
  const [isChanged,setIsChanged] = useState(false);
  const [isLoggedOut,setIsLoggedOut] = useState(false);
  const [taskFormData,setTaskFormData] = useState({
    id:'',
    title :'',
    description:'',
    status:'Choose One',
    deadline :''
  });
  const axiosInstance = createAxiosInstance();
  const navigate = useNavigate()

 useEffect(()=>{
  if(localStorage.getItem('userToken') === 'null')
  {
    navigate('/signUp')
  }
 },[isLoggedOut])
  useEffect(()=>{
  getData()
  },[isChanged])

  const getData = async ()=>{
    let data = await axiosInstance.get(`tasks/`);
    if(data && data?.data)
    setTasks(data?.data?.data);
   
  }

 
  const totalPage = Math.round(tasks.length/3) || 1;

  const handleEdit =(data)=>{
    let {id,title,desc,status,deadline} = data;
    setTaskFormData({
      id: id,
      title : title,
      description : desc,
      status: status,
      deadline : new Date(deadline)
    })
  }
  
  const handleDelete=async (id)=>{
    let data = await axiosInstance.delete(`tasks/${id}`);
    alert('task deleted sucessfully!')
    setIsChanged(!isChanged)
    return;
  }

  return (
    <div className='app'>
      <Header isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut}/>
     <div style={{display: 'flex' , justifyContent : 'space-between'}}>
    <div className='app-container' >
    {tasks.slice(page * 3 - 3, page * 3).map((el,key)=>{
      return <Task id={el._id} title ={el.title} desc ={el.description} deadline ={el.deadline} status ={el.status} handleEdit={handleEdit} handleDelete={handleDelete} />
    })}
    </div>
    <TaskForm taskData={taskFormData} setTaskFormData={setTaskFormData} setIsChanged={setIsChanged} isChanged={isChanged} />
    </div> 
    <div className='page-container'>
        <Pagination>
        <Pagination.Prev onClick={() => setPage(page === 1 ? 1 : page - 1)} />
     {new Array(totalPage).fill(0).map((el,key)=>{
        
        return <Pagination.Item   onClick={() => setPage(key + 1)} active={page === key+1 ? true : false}  >{key+1}</Pagination.Item>
     })}
      <Pagination.Next   onClick={() => setPage(page === totalPage ? 1 : page + 1)} />
      </Pagination>
    </div>
    </div>
  );
}

export default Home;
