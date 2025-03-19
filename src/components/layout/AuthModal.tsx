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
  const { login, signup, isLoading, error, checkUsernameAvailability } = useAuth();
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupFullName, setSignupFullName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Form validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      resetForm();
      setFormErrors({});
      setUsernameAvailable(null);
    }
  }, [isOpen, initialView]);

  const resetForm = () => {
    setLoginUsername('');
    setLoginPassword('');
    setSignupFullName('');
    setSignupUsername('');
    setSignupEmail('');
    setSignupPassword('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    resetForm();
    setFormErrors({});
    onClose();
  };

  const validateLoginForm = () => {
    const errors: Record<string, string> = {};
    
    if (!loginUsername.trim()) {
      errors.loginUsername = 'Username is required';
    }
    
    if (!loginPassword) {
      errors.loginPassword = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignupForm = () => {
    const errors: Record<string, string> = {};
    
    if (!signupFullName.trim()) {
      errors.signupFullName = 'Full name is required';
    }
    
    if (!signupUsername.trim()) {
      errors.signupUsername = 'Username is required';
    } else if (usernameAvailable === false) {
      errors.signupUsername = 'Username is already taken';
    }
    
    if (!signupEmail.trim()) {
      errors.signupEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      errors.signupEmail = 'Please enter a valid email';
    }
    
    if (!signupPassword) {
      errors.signupPassword = 'Password is required';
    } else if (signupPassword.length < 6) {
      errors.signupPassword = 'Password must be at least 6 characters';
    }
    
    if (signupPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkUsername = async () => {
    if (!signupUsername.trim()) return;
    
    setIsCheckingUsername(true);
    try {
      const isAvailable = await checkUsernameAvailability(signupUsername);
      setUsernameAvailable(isAvailable);
      
      // Update form errors based on availability
      if (!isAvailable) {
        setFormErrors(prev => ({ ...prev, signupUsername: 'Username is already taken' }));
      } else {
        const { signupUsername: _, ...rest } = formErrors;
        setFormErrors(rest);
      }
    } catch (error) {
      console.error('Error checking username:', error);
      // Don't block signup if availability check fails
      setUsernameAvailable(true);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    try {
      await login(loginUsername, loginPassword);
      handleClose();
    } catch (error) {
      // Error is already handled in the context
      console.error("Login handling error:", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    try {
      await signup(signupUsername, signupFullName, signupEmail, signupPassword);
      handleClose();
    } catch (error) {
      // Error is already handled in the context
      console.error("Signup handling error:", error);
    }
  };

  // Input style helpers
  const getInputClassName = (fieldName: string) => {
    return `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors 
      ${formErrors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
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

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {view === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input 
                  type="text" 
                  value={loginUsername} 
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className={getInputClassName('loginUsername')}
                  required
                />
                {formErrors.loginUsername && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.loginUsername}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input 
                  type="password" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={getInputClassName('loginPassword')}
                  required
                />
                {formErrors.loginPassword && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.loginPassword}</p>
                )}
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center"
                style={{
                  background: 'rgba(var(--primary-color))',
                  color: "var(--button-text-color, #fff)",
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
              <div className="text-center mt-2">
                <button 
                  type="button" 
                  onClick={() => setView('signup')} 
                  className="text-sm" 
                  style={{ color: "rgb(var(--primary-color))" }}
                  disabled={isLoading}
                >
                  Need an account? Sign up
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={signupFullName} 
                  onChange={(e) => setSignupFullName(e.target.value)}
                  className={getInputClassName('signupFullName')}
                  required
                />
                {formErrors.signupFullName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.signupFullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={signupUsername} 
                    onChange={(e) => {
                      setSignupUsername(e.target.value);
                      setUsernameAvailable(null);
                    }}
                    onBlur={checkUsername}
                    className={getInputClassName('signupUsername')}
                    required
                  />
                  {isCheckingUsername && (
                    <span className="absolute right-3 top-2 text-sm text-gray-500">Checking...</span>
                  )}
                  {!isCheckingUsername && usernameAvailable === true && (
                    <span className="absolute right-3 top-2 text-sm text-green-500">Available</span>
                  )}
                </div>
                {formErrors.signupUsername && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.signupUsername}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  value={signupEmail} 
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className={getInputClassName('signupEmail')}
                  required
                />
                {formErrors.signupEmail && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.signupEmail}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input 
                  type="password" 
                  value={signupPassword} 
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className={getInputClassName('signupPassword')}
                  required
                />
                {formErrors.signupPassword && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.signupPassword}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={getInputClassName('confirmPassword')}
                  required
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                )}
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center"
                style={{
                  background: 'rgba(var(--primary-color))',
                  color: "var(--button-text-color, #fff)",
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
              <div className="text-center mt-2">
                <button 
                  type="button" 
                  onClick={() => setView('login')} 
                  className="text-sm" 
                  style={{ color: "rgb(var(--primary-color))" }}
                  disabled={isLoading}
                >
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