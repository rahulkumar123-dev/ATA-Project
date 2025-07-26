// src/api/axios.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000'; // Adjust if backend runs elsewhere

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;