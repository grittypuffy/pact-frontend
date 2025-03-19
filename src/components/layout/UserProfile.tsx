'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/layout/AuthModal';

const UserProfile = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'login' | 'signup'>('login');

  const handleLogout = async () => {
    await logout();
  };

  const openLoginModal = () => {
    setModalView('login');
    setIsModalOpen(true);
  };

  const openSignupModal = () => {
    setModalView('signup');
    setIsModalOpen(true);
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center w-full overflow-hidden">
        {/* Profile Circle */}
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-lg"
          style={{
            backgroundColor: "rgba(var(--primary-color), 0.2)",
            color: "rgb(var(--primary-color))",
          }}
        >
          {user.name && user.name[0] ? user.name[0].toUpperCase() : user.username[0].toUpperCase()}
        </div>

        {/* Text Container */}
        <div className="overflow-hidden ml-3">
          <p 
            className="text-sm font-medium truncate max-w-xs" 
            style={{ color: "rgb(var(--foreground-rgb))" }}
            title={user.name} // Shows full name on hover
          >
            {user.name || user.username}
          </p>
          <p 
            className="text-xs truncate max-w-xs" 
            style={{ color: "rgba(var(--foreground-rgb), 0.7)" }}
            title={user.email} // Shows full email on hover
          >
            {user.email || `@${user.username}`}
          </p>
        </div>

        {/* Logout Button Positioned Properly */}
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="ml-auto p-1 text-xs transition-colors flex-shrink-0"
          style={{
            color: "rgba(var(--foreground-rgb), 0.7)",
          }}
        >
          {isLoading ? "..." : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <>
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

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialView={modalView}
      />
    </>
  );
};

export default UserProfile;