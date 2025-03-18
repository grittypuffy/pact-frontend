'use client';

import React from 'react';

interface PromptComparisonProps {
  originalPrompt: string;
  optimizedPrompt: string;
}

const PromptComparison: React.FC<PromptComparisonProps> = ({ originalPrompt, optimizedPrompt }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Original Prompt Box */}
        <div
          className="flex-1 border rounded-lg shadow-sm p-4"
          style={{
            backgroundColor: "rgba(var(--background-rgb), 1)",
            borderColor: "rgba(var(--foreground-rgb), 0.2)",
          }}
        >
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: "rgb(var(--foreground-rgb))" }}
          >
            Original Prompt
          </h3>
          <div
            className="border-t pt-2"
            style={{ borderColor: "rgba(var(--foreground-rgb), 0.2)" }}
          >
            <p
              className="whitespace-pre-wrap"
              style={{ color: "rgba(var(--foreground-rgb), 0.8)" }}
            >
              {originalPrompt}
            </p>
          </div>
        </div>

        {/* Optimized Prompt Box */}
        <div
          className="flex-1 border rounded-lg shadow-sm p-4"
          style={{
            backgroundColor: "rgba(var(--primary-color), 0.1)",
            borderColor: "rgba(var(--primary-color), 0.5)",
          }}
        >
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: "rgb(var(--primary-color))" }}
          >
            Optimized Prompt
          </h3>
          <div
            className="border-t pt-2"
            style={{ borderColor: "rgba(var(--primary-color), 0.5)" }}
          >
            <p
              className="whitespace-pre-wrap"
              style={{ color: "rgba(var(--foreground-rgb), 0.8)" }}
            >
              {optimizedPrompt}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromptComparison;
