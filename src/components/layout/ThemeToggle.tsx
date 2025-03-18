'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
      aria-pressed={theme === 'dark'}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`relative flex items-center w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
          theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute left-1 w-5 h-5 flex items-center justify-center rounded-full transition-transform duration-200 ease-in-out ${
            theme === 'dark' ? 'translate-x-5 bg-gray-800' : 'translate-x-0 bg-white'
          }`}
        >
          <span className="text-xs">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
