import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { checkAuth } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated && !user) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, user]);

  return { user, isAuthenticated, isLoading };
};