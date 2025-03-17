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
        <div className="flex-1 border border-gray-200 rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Original Prompt</h3>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {originalPrompt}
            </p>
          </div>
        </div>

        {/* Arrow or divider for visual separation */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-8 h-8 text-gray-400 dark:text-gray-600">➡️</div>
        </div>

        {/* Optimized Prompt Box */}
        <div className="flex-1 border border-green-200 rounded-lg shadow-sm p-4 bg-green-50 dark:bg-gray-800 dark:border-green-900">
          <h3 className="text-lg font-medium text-green-800 dark:text-green-400 mb-2">Optimized Prompt</h3>
          <div className="border-t border-green-200 dark:border-green-900 pt-2">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {optimizedPrompt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptComparison;