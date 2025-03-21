'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import UserProfile from './UserProfile';
import HistoryItem from './HistoryItem';
import { sampleHistory } from '@/lib/data';
import NewChatButton from './NewChatButton';
import { useConversation } from "@/context/ConversationContext";
import axios from 'axios';

// const HomeIcon = () => <div className="w-5 h-5">🏠</div>;
const AboutIcon = () => <div className="w-5 h-5">ℹ️</div>;
const InsightsIcon = () => <div className="w-5 h-5">📊</div>;
const StatisticsIcon = () => <div className="w-5 h-5">📈</div>;

interface HistoryDisplay {
  historyId: string;
  title: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState<HistoryDisplay[]>([]);
  const { conversationHistory, setConversationHistory, showResults, setShowResults } = useConversation();

useEffect(() => {
  const fetchData = async () => {
    if (!isAuthenticated) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/get`,
        {
          withCredentials: true,
        }
      );
      setConversationHistory(res.data);
      setShowResults(true);
    }
    if (isAuthenticated && conversationHistory && conversationHistory.data) {
      const mappedHistory: HistoryDisplay[] = conversationHistory.data.map((item) => ({
        historyId: item.history._id,
        title: item.history.title,
      }));
      
      setHistory(mappedHistory);
    }
  };

  fetchData();
}, [conversationHistory, isAuthenticated]);

  const tabLinks = [
    // { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'About', path: '/about', icon: <AboutIcon /> },
    { name: 'Insights', path: '/insights', icon: <InsightsIcon />, requiresAuth: true },
    { name: 'Statistics', path: '/statistics', icon: <StatisticsIcon /> },
  ];

  return (
    <div className="h-screen flex flex-col w-64 border-r shrink-0"
      style={{
        backgroundColor: "rgb(var(--background-rgb))",
        color: "rgb(var(--foreground-rgb))",
        borderColor: "rgba(var(--foreground-rgb), 0.2)"
      }}
    >
      <div className="px-4 py-5 flex items-center border-b"
        style={{ borderColor: "rgba(var(--foreground-rgb), 0.2)" }}>
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Cairo');
          
          .animated-text {
            background-image: url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWFqaDdmbmk3dmZrbHNzdjBtdjduMXp5M3ZhZ2JobjM4NjVzcjdkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufmyrjQ4BmKN7xe/giphy.gif);
            background-size: cover;
            color: transparent;
            -moz-background-clip: text;
            -webkit-background-clip: text;
            font-weight: bold;
            font-size: 32px;
            font-family: 'Cairo', sans-serif;
          }
        `}</style>
        <span className="animated-text">PACT</span>
        <span className="ml-2 text-sm" style={{ color: "rgba(var(--foreground-rgb), 0.6)" }}>v1.0</span>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      <nav className="px-2 py-4 space-y-1">
        {tabLinks.map((tab) => {
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
                  ? 'tab-active bg-opacity-20' 
                  : 'hover:bg-opacity-10'
              }`}
              style={{
                backgroundColor: isActive ? "rgba(var(--primary-color), 0.1)" : "transparent",
                color: isActive ? "rgb(var(--primary-color))" : "rgb(var(--foreground-rgb))"
              }}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto px-3 py-4 border-t" style={{ borderColor: "rgba(var(--foreground-rgb), 0.2)" }}>
        <div className="flex justify-between items-center px-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "rgba(var(--foreground-rgb), 0.6)" }}>
            Recent Conversations
          </h3>
        </div>
        
        {/* New Chat Button */}
        <NewChatButton />

        {/* History Items */}
        { isAuthenticated &&(
          <div className="mt-2 space-y-1">
            {history.map((item) => (
              <HistoryItem key={item.historyId} historyItem={item} />
            ))}
          </div>
          
        )}
        
        </div>

      <div className="border-t p-4" style={{ borderColor: "rgba(var(--foreground-rgb), 0.2)" }}>
        <UserProfile />
      </div>
    </div>
  );
};

export default Sidebar;