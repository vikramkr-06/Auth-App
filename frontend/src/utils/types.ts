export interface User {
  id: string;
  name: string;
  username: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  username: string;
  password: string;
}

export interface ApiError {
  message: string;
  success: boolean;
}

export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}