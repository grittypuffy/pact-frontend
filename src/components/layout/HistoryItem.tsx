import React from 'react';
import Link from 'next/link';

interface HistoryItemProps {
  historyItem: {
    historyId: string;
    title: string;
  };
}

const HistoryItem: React.FC<HistoryItemProps> = ({ historyItem }) => {
  return (
    <Link href={`/?id=${historyItem.historyId}`} className="block">
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
          {historyItem.title[0].toUpperCase()}
        </div>
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium truncate" style={{ color: "rgb(var(--foreground-rgb))" }}>
            {historyItem.title} {/* ✅ Fixed here */}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HistoryItem;
