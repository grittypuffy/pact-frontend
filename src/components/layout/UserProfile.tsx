'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const UserProfile = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setIsLoginFormOpen(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300">
          {user.name[0].toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="ml-2 p-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      {isLoginFormOpen ? (
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLoginFormOpen(false)}
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsLoginFormOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserProfile;