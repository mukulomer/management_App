import '../App.css';
import {Button,Pagination} from 'react-bootstrap';


const Header = ({isLoggedOut, setIsLoggedOut})=>{
    const handleLogout =()=>{
        localStorage.setItem('userToken','null')
        setIsLoggedOut(!isLoggedOut);
    }

    return ( <div className='app-header'>
    <h2 style={{margin:'2vw'}}> Manage Tasks </h2>
    <Button variant="secondary" className='add-task'>Add Task</Button>
    <Button variant="primary" className='add-task' onClick={handleLogout}>Sign Out</Button>

   </div>);
    
}

export default Header;