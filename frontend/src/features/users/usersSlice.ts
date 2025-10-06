import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api/endpoints';
import { UsersState, AxiosErrorResponse } from '../../utils/types';

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as AxiosErrorResponse;
    return axiosError.response?.data?.message || axiosError.message || 'Request failed';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return typeof error === 'string' ? error : 'An unexpected error occurred';
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getAllUsers();
      return response;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to fetch users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;