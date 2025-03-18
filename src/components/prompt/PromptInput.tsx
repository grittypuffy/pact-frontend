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
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 min-h-[120px] resize-y transition-colors"
            style={{
              backgroundColor: "rgb(var(--background-rgb))",
              borderColor: "rgba(var(--foreground-rgb), 0.2)",
              color: "rgb(var(--foreground-rgb))",
              boxShadow: "0 1px 3px rgba(var(--foreground-rgb), 0.1)",
            }}
            disabled={isProcessing}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isProcessing || !prompt.trim()}
            className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: isProcessing || !prompt.trim()
                ? "rgba(var(--primary-color), 0.5)"
                : "rgb(var(--primary-color))",
              color: "var(--button-text-color, #fff)",
              cursor: isProcessing || !prompt.trim() ? "not-allowed" : "pointer",
              opacity: isProcessing || !prompt.trim() ? 0.6 : 1,
              transition: "background-color 0.2s ease, transform 0.1s ease",
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isProcessing || !prompt.trim()
                ? "rgba(var(--primary-color), 0.5)"
                : "rgb(var(--primary-color))";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isProcessing ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
