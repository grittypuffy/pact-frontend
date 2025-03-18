'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const UserProfile = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setIsLoginFormOpen(false);
      resetForm();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, you would implement signup logic here
      // For demo purposes, we'll just call login after signup
      await login(email, password);
      setIsSignupFormOpen(false);
      resetForm();
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    logout();
  };

  const toggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
    setIsSignupFormOpen(false);
  };

  const toggleSignupForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen);
    setIsLoginFormOpen(false);
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3 w-full overflow-hidden">
        {/* Profile Circle - Prevents shrinkage */}
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-lg"
          style={{
            backgroundColor: "rgba(var(--primary-color), 0.2)",
            color: "rgb(var(--primary-color))",
          }}
        >
          {user.name[0].toUpperCase()}
        </div>

        {/* Text Container - Ensures truncation */}
        <div className="overflow-hidden">
          <p 
            className="text-sm font-medium truncate max-w-xs" 
            style={{ color: "rgb(var(--foreground-rgb))" }}
            title={user.name} // Shows full name on hover
          >
            {user.name}
          </p>
          <p 
            className="text-xs truncate max-w-xs" 
            style={{ color: "rgba(var(--foreground-rgb), 0.7)" }}
            title={user.email} // Shows full email on hover
          >
            {user.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="ml-2 p-1 text-xs transition-colors flex-shrink-0"
          style={{
            color: "rgba(var(--foreground-rgb), 0.7)",
          }}
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
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "rgb(var(--background-rgb))",
                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "rgb(var(--background-rgb))",
                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
              style={{
                background: 'rgba(var(--primary-color))',
                color: "var(--button-text-color, #fff)",
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={toggleLoginForm}
              className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
              style={{
                backgroundColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
            >
              Cancel
            </button>
          </div>
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={toggleSignupForm}
              className="text-xs"
              style={{
                color: "rgb(var(--primary-color))",
              }}
            >
              Need an account? Sign up
            </button>
          </div>
        </form>
      ) : isSignupFormOpen ? (
        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "rgb(var(--background-rgb))",
                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "rgb(var(--background-rgb))",
                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "rgb(var(--background-rgb))",
                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "rgb(var(--background-rgb))",
                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
              style={{
                background: 'rgba(var(--primary-color))',
                color: "var(--button-text-color, #fff)",
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={toggleSignupForm}
              className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
              style={{
                backgroundColor: "rgba(var(--foreground-rgb), 0.2)",
                color: "rgb(var(--foreground-rgb))",
              }}
            >
              Cancel
            </button>
          </div>
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={toggleLoginForm}
              className="text-xs"
              style={{
                color: "rgb(var(--primary-color))",
              }}
            >
              Already have an account? Log in
            </button>
          </div>
        </form>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={toggleLoginForm}
            className="flex-1 items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
            style={{
              background: 'rgba(var(--primary-color))',
              color: "var(--button-text-color, #fff)",
            }}
          >
            Login
          </button>
          <button
            onClick={toggleSignupForm}
            className="flex-1 items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
            style={{
              background: 'rgba(var(--primary-color))',
              color: "var(--button-text-color, #fff)",
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;