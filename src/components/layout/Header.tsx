'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">PACT</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/insights" className="text-muted-foreground hover:text-foreground transition-colors">
            Insights
          </Link>
          <Link href="/statistics" className="text-muted-foreground hover:text-foreground transition-colors">
            Statistics
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <Link 
              href="/profile" 
              className="hidden md:flex items-center space-x-2 text-sm"
            >
              {user.imageUrl && (
                <Image
                  src={user.imageUrl} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{user.name}</span>
            </Link>
          ) : (
            <Link 
              href="/login"
              className="hidden md:block text-sm font-medium"
            >
              Log in
            </Link>
          )}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/insights" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Insights
              </Link>
              <Link 
                href="/statistics" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Statistics
              </Link>
              {user ? (
                <Link 
                  href="/profile" 
                  className="py-2 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user.imageUrl && (
                    <Image
                      src={user.imageUrl} 
                      alt={user.name} 
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{user.name}</span>
                </Link>
              ) : (
                <Link 
                  href="/login"
                  className="py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};