'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-pressed={theme === 'dark'}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`
          ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}
          inline-block w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
        `}
      >
        <span
          className={`
            ${theme === 'dark' ? 'translate-x-5 bg-gray-800' : 'translate-x-0 bg-white'}
            inline-block w-5 h-5 transform rounded-full shadow ring-0 transition-transform duration-200 ease-in-out items-center justify-center
          `}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;