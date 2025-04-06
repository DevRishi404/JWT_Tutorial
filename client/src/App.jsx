import { useEffect, useState } from 'react'
import Login from './components/AuthPages/Login'
import './app.css'
import Register from './components/AuthPages/Register';
import axios from 'axios';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/HomePage/Home';


axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = "application/json"

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    console.log("req config", config);
    return config;
  }, (error) => {
    console.error("request config error", error);
    Promise.reject(error);
  })

axios.interceptors.response.use(
  (response) => {
    console.log("res config", response);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response;
  }, (error) => {
    console.log("response config error", error);
    return Promise.reject(error);
  })

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      return navigate('/login', {replace: true});
    }
  }, [navigate, token])

  return children;
}


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
