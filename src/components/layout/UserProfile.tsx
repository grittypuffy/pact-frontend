'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Input from '@mui/joy/Input';
// import { useAuth } from '@/context/AuthContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-opacity-10 transition-opacity"
        onClick={onClose} // Backdrop click closes modal
      />
      
      {/* Modal Content */}
      <div 
        className="relative p-6 max-w-md w-full rounded-lg shadow-xl transform transition-all border-amber-50"
        style={{
          backgroundColor: "rgb(var(--background-rgb))",
          color: "rgb(var(--foreground-rgb))",
          borderColor: "rgba(var(--primary-color), 0.3)",
          borderWidth: "1px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
        }}
        onClick={(e) => e.stopPropagation()} // Prevents backdrop click from closing modal
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium" style={{ color: "rgb(var(--foreground-rgb))" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-opacity-10 transition-colors"
            style={{ 
              color: "rgba(var(--foreground-rgb), 0.7)",
              backgroundColor: "rgba(var(--foreground-rgb), 0.05)" 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};


const UserProfile = () => {
  // const { user, isAuthenticated, login, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({name: 'John Doe', email: ''});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error] = useState(null);
  

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await login(email, password);
      setIsAuthenticated(true);
      setUser({email, name});
      setIsLoginModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // In your handleSignup function, there's a potential issue
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // This API call is being made when the form is submitted, not on each input change
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/${username}`);
      console.log(res.data);

      setIsAuthenticated(true);
      setUser({ name, email });
      setIsSignupModalOpen(false);
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
    // logout();
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    resetForm();
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
    resetForm();
  };

  // Login Form Component
  const LoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
       <div>
          <Input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            sx={{
              backgroundColor: "rgb(var(--background-rgb))",
              borderColor: "rgba(var(--foreground-rgb), 0.2)",
              color: "rgb(var(--foreground-rgb))",
            }}
            required
          />
        </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          sx={{
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
          className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-opacity-90"
          style={{
            background: 'rgba(var(--primary-color))',
            color: "var(--button-text-color, #fff)",
          }}
        >
          Login
        </button>
      </div>
      <div className="text-center mt-2 flex flex-row items-center justify-center">
        <div className='text-xs'>
          Need a new account? 
        </div>
        <button
          type="button"
          onClick={openSignupModal}
          className="text-xs ml-1 hover:cursor-pointer"
          style={{
            color: "rgb(var(--primary-color))",
          }}
        >
          Sign up
        </button>
      </div>
    </form>
  );

  // Signup Form Component
  const SignupForm = () => (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          sx={{
            backgroundColor: "rgb(var(--background-rgb))",
            borderColor: "rgba(var(--foreground-rgb), 0.2)",
            color: "rgb(var(--foreground-rgb))",
          }}
          required
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full"
          sx={{
            backgroundColor: "rgb(var(--background-rgb))",
            borderColor: "rgba(var(--foreground-rgb), 0.2)",
            color: "rgb(var(--foreground-rgb))",
          }}
          required
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          sx={{
            backgroundColor: "rgb(var(--background-rgb))",
            borderColor: "rgba(var(--foreground-rgb), 0.2)",
            color: "rgb(var(--foreground-rgb))",
          }}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          sx={{
            backgroundColor: "rgb(var(--background-rgb))",
            borderColor: "rgba(var(--foreground-rgb), 0.2)",
            color: "rgb(var(--foreground-rgb))",
          }}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full"
          sx={{
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
      </div>
      <div className="text-center mt-2 flex flex-row items-center justify-center">
        <div className='text-xs'>
          Already have an account?
        </div>
        <button
          type="button"
          onClick={openLoginModal}
          className="text-xs ml-1 hover:cursor-pointer"
          style={{
            color: "rgb(var(--primary-color))",
          }}
        >
          Log in
        </button>
      </div>
    </form>
  );

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
      <div className="flex space-x-2">
        <button
          onClick={openLoginModal}
          className="flex-1 items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
          style={{
            background: 'rgba(var(--primary-color))',
            color: "var(--button-text-color, #fff)",
          }}
        >
          Login
        </button>
        <button
          onClick={openSignupModal}
          className="flex-1 items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
          style={{
            background: 'rgba(var(--primary-color))',
            color: "var(--button-text-color, #fff)",
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Login Modal */}
      <Modal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        title="Login to your account"
      >
        <LoginForm />
      </Modal>

      {/* Signup Modal */}
      <Modal 
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        title="Create an account"
      >
        <SignupForm />
      </Modal>
    </div>
  );
};

export default UserProfile;