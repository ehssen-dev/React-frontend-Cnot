import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;

/*
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Add your authentication token here
  },
});

export default api;*/

/* import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; */
