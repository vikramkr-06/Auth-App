import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

console.log('API URL:', API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
      console.log('Unauthorized access - redirecting to login');
      // Don't redirect here, let the components handle it
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;