'use client';

import React from 'react';

interface PromptResponseProps {
  originalResponse: string;
  optimizedResponse: string;
}

const PromptResponse: React.FC<PromptResponseProps> = ({ originalResponse, optimizedResponse }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h3 
        className="text-lg font-medium mb-4"
        style={{ color: "rgb(var(--foreground-rgb))" }}
      >
        AI Responses
      </h3>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Original Response Box */}
        <div 
          className="flex-1 border rounded-lg shadow-sm p-4 transition-colors"
          style={{
            backgroundColor: "rgb(var(--background-rgb))",
            borderColor: "rgba(var(--foreground-rgb), 0.2)",
            color: "rgb(var(--foreground-rgb))",
            boxShadow: "0 1px 3px rgba(var(--foreground-rgb), 0.1)",
          }}
        >
          <h4 className="text-md font-medium mb-2">
            Response to Original Prompt
          </h4>
          <div 
            className="border-t pt-2"
            style={{ borderColor: "rgba(var(--foreground-rgb), 0.2)" }}
          >
            <p className="whitespace-pre-wrap">
              {originalResponse}
            </p>
          </div>
        </div>

        {/* Optimized Response Box */}
        <div 
          className="flex-1 border rounded-lg shadow-sm p-4 transition-colors"
          style={{
            backgroundColor: "rgba(var(--primary-color), 0.1)",
            borderColor: "rgb(var(--primary-color))",
            color: "rgb(var(--foreground-rgb))",
            boxShadow: "0 1px 3px rgba(var(--primary-color), 0.2)",
          }}
        >
          <h4 
            className="text-md font-medium mb-2"
            style={{ color: "rgb(var(--primary-color))" }}
          >
            Response to Optimized Prompt
          </h4>
          <div 
            className="border-t pt-2"
            style={{ borderColor: "rgba(var(--primary-color), 0.5)" }}
          >
            <p className="whitespace-pre-wrap">
              {optimizedResponse}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptResponse;
