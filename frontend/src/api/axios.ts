import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

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
    if (import.meta.env.DEV) {
      console.log('Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error('Response Error:', error.response?.status, error.config?.url);
    }
    
    // Silently handle 401 errors (don't log in production)
    if (error.response?.status === 401) {
      // Do nothing - components will handle this
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;