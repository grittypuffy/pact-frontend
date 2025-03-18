'use client';

import React from 'react';
import Link from 'next/link';

const NewChatButton = () => {
  return (
    <Link href="/" className="block w-full">
      <div
        className="w-fit mx-auto flex items-center justify-center px-4 py-2 my-2 text-sm font-medium 
             rounded-md transition-colors"
        style={{
          background: 'rgba(var(--primary-color))',
          color: "var(--button-text-color, #fff)",
        }}
      >
        <span className="mr-2">+</span>
        New Chat
      </div>
    </Link>
  );
};

export default NewChatButton;