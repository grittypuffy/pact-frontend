'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import UserProfile from './UserProfile';
import HistoryItem from './HistoryItem';
import { sampleHistory } from '@/lib/data';

// Import icons from a library like heroicons (you'll need to install this)
// For now, let's use simple representations
const HomeIcon = () => <div className="w-5 h-5">🏠</div>;
const AboutIcon = () => <div className="w-5 h-5">ℹ️</div>;
const InsightsIcon = () => <div className="w-5 h-5">📊</div>;
const StatisticsIcon = () => <div className="w-5 h-5">📈</div>;

const Sidebar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState(sampleHistory);

  // Dummy useEffect for overriding linting errors
  useEffect(() => {
    console.log(setHistory);
  }, [])

  const tabLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'About', path: '/about', icon: <AboutIcon /> },
    { name: 'Insights', path: '/insights', icon: <InsightsIcon />, requiresAuth: true },
    { name: 'Statistics', path: '/statistics', icon: <StatisticsIcon /> },
  ];

  return (
    <div className="h-screen flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
      {/* Header with logo */}
      <div className="px-4 py-5 flex items-center border-b border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">PACT</span>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">v1.0</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation tabs - doesn't scroll */}
      <nav className="px-2 py-4 space-y-1">
        {tabLinks.map((tab) => {
          // Skip insights tab if not authenticated and it requires auth
          if (tab.requiresAuth && !isAuthenticated && tab.path === '/insights') {
            return null;
          }
          
          const isActive = pathname === tab.path;
          return (
            <Link 
              href={tab.path} 
              key={tab.name}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400 border-l-4 border-blue-500' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
            </Link>
          );
        })}
      </nav>

      {/* History section with its own scroll */}
      <div className="flex-1 overflow-y-auto px-3 py-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
          Recent Conversations
        </h3>
        <div className="mt-2 space-y-1">
          {history.map((item) => (
            <HistoryItem key={item.id} historyItem={item} />
          ))}
        </div>
      </div>

      {/* User profile at bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default Sidebar;