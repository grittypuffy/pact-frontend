'use client';

import React from 'react';
import Link from 'next/link';
import { useConversation } from "@/context/ConversationContext";

const NewChatButton = () => {
  const { setMessage} = useConversation();


  return (
    <Link href="/" className="block w-full">
      <div
        className="w-fit mx-auto flex items-center justify-center px-4 py-2 my-2 text-sm font-medium 
             rounded-md transition-colors"
        style={{
          background: 'rgba(var(--primary-color))',
          color: "var(--button-text-color, #fff)",
        }}
        onClick={() => {setMessage([]) 
          
        }}
      >
        <span className="mr-2">+</span>
        New Chat
      </div>
    </Link>
  );
};

export default NewChatButton;