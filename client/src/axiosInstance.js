// createAxiosInstanceWithToken.js

import axios from 'axios';

const createAxiosInstance = () => {
  const token = localStorage.getItem('userToken');

  const instance = axios.create({
    baseURL: 'http://localhost:3001/api/', 
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    }
  });

  return instance;
};

export default createAxiosInstance;
