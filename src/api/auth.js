import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Your Node.js server address
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// Automatically add Auth token to every request

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

export const signupUser = (formData) => apiClient.post('/user/signup', formData);
export const logUser =(formData)=>apiClient.post('/user/login',formData);


export const submitComplaint=(formData)=>apiClient.post('user/raisedComplaint',formData);

export const complaintStatistics = () => {
  return apiClient.get("user/stats");
};

export const allComplaints=()=>{
  return apiClient.get("user/complaints");
};