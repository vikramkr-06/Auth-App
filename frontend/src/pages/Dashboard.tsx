import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchAllUsers } from '../features/users/usersSlice';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome, <span className="font-semibold">{currentUser?.name}</span>!
            Here are all registered users.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <h3 className="text-sm font-medium opacity-90 mb-1">
              Total Users
            </h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          <div className="card bg-gradient-to-br from-green-500 to-green-700 text-white">
            <h3 className="text-sm font-medium opacity-90 mb-1">
              Your Account
            </h3>
            <p className="text-lg font-semibold">@{currentUser?.username}</p>
          </div>
          <div className="card bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <h3 className="text-sm font-medium opacity-90 mb-1">
              Status
            </h3>
            <p className="text-lg font-semibold">✓ Active</p>
          </div>
        </div>

        {/* Users List */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Users ({users.length})
          </h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : users.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;