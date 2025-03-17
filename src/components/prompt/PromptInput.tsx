'use client';

import React, { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isProcessing: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isProcessing }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-y dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            disabled={isProcessing}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isProcessing || !prompt.trim()}
            className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              isProcessing || !prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;