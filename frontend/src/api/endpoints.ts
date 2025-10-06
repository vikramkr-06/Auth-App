import axiosInstance from './axios';
import { LoginCredentials, RegisterCredentials, User } from '../utils/types';

export const authAPI = {
  register: async (credentials: RegisterCredentials) => {
    const response = await axiosInstance.post('/auth/register', credentials);
    return response.data;
  },

  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};

export const usersAPI = {
  getAllUsers: async (): Promise<{ success: boolean; users: User[]; count: number }> => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },
};