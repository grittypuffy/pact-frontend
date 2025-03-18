import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialView = 'login' 
}) => {
  const { login } = useAuth();
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 🔥 Sync view with initialView whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      handleClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      handleClose();
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40 flex items-center justify-center" onClick={handleClose}>
        <div className="w-full max-w-md p-6 rounded-lg shadow-xl z-50"
          style={{
            backgroundColor: "rgb(var(--background-rgb))",
            color: "rgb(var(--foreground-rgb))",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{view === 'login' ? 'Log In' : 'Sign Up'}</h2>
            <button onClick={handleClose} className="text-2xl" style={{ color: "rgba(var(--foreground-rgb), 0.7)" }}>
              &times;
            </button>
          </div>

          {view === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
                  required
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 text-sm font-medium rounded-md transition-colors"
                style={{
                  background: 'rgba(var(--primary-color))',
                  color: "var(--button-text-color, #fff)",
                }}>
                Log In
              </button>
              <div className="text-center mt-2">
                <button type="button" onClick={() => setView('signup')} className="text-sm" style={{ color: "rgb(var(--primary-color))" }}>
                  Need an account? Sign up
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors"
                  required
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 text-sm font-medium rounded-md transition-colors"
                style={{
                  background: 'rgba(var(--primary-color))',
                  color: "var(--button-text-color, #fff)",
                }}>
                Sign Up
              </button>
              <div className="text-center mt-2">
                <button type="button" onClick={() => setView('login')} className="text-sm" style={{ color: "rgb(var(--primary-color))" }}>
                  Already have an account? Log in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
