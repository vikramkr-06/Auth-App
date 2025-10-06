import React from 'react';
import { User } from '../utils/types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
        </div>
        {user.createdAt && (
          <div className="text-xs text-gray-400">
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;