'use client';

import React from 'react';

interface PromptResponseProps {
  originalResponse: string;
  optimizedResponse: string;
}

const PromptResponse: React.FC<PromptResponseProps> = ({ originalResponse, optimizedResponse }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">AI Responses</h3>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Original Response Box */}
        <div className="flex-1 border border-gray-200 rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Response to Original Prompt</h4>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {originalResponse}
            </p>
          </div>
        </div>

        {/* Optimized Response Box */}
        <div className="flex-1 border border-green-200 rounded-lg shadow-sm p-4 bg-green-50 dark:bg-gray-800 dark:border-green-900">
          <h4 className="text-md font-medium text-green-800 dark:text-green-400 mb-2">Response to Optimized Prompt</h4>
          <div className="border-t border-green-200 dark:border-green-900 pt-2">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {optimizedResponse}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptResponse;