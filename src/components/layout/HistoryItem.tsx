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
      <div
        className="flex items-center px-2 py-2 text-sm rounded-md transition-colors"
        style={{
          backgroundColor: "rgb(var(--background-rgb))",
          color: "rgb(var(--foreground-rgb))",
        }}
      >
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "rgba(var(--primary-color), 0.2)",
            color: "rgb(var(--primary-color))",
          }}
        >
          {historyItem.id[0].toUpperCase()}
        </div>
        <div className="ml-3 overflow-hidden">
          <p
            className="text-sm font-medium truncate"
            style={{ color: "rgb(var(--foreground-rgb))" }}
          >
            {truncateText(historyItem.originalPrompt)}
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(var(--foreground-rgb), 0.7)" }}
          >
            {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HistoryItem;
