import React from 'react';
import Link from 'next/link';
import { PromptHistory } from '@/lib/data';

interface HistoryItemProps {
  historyItem: PromptHistory;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ historyItem }) => {
  // Format the date to a readable format
  const formattedDate = new Date(historyItem.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Truncate the prompt text for display
  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/?id=${historyItem.id}`} className="block">
      <div className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300">
          {historyItem.id[0].toUpperCase()}
        </div>
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
            {truncateText(historyItem.originalPrompt)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default HistoryItem;