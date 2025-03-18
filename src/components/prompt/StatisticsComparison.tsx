'use client';

import React from 'react';
import { PromptStatistics } from '@/lib/data';

interface StatisticsComparisonProps {
  originalStats: PromptStatistics;
  optimizedStats: PromptStatistics;
}

const StatisticsComparison: React.FC<StatisticsComparisonProps> = ({ originalStats, optimizedStats }) => {
  const metrics = [
    { key: 'grammar', label: 'Grammar', originalValue: originalStats.grammar, optimizedValue: optimizedStats.grammar },
    { key: 'spellCheck', label: 'Spell Check', originalValue: originalStats.spellCheck, optimizedValue: optimizedStats.spellCheck },
    { key: 'sensitiveInfo', label: 'Sensitive Info', originalValue: originalStats.sensitiveInfo, optimizedValue: optimizedStats.sensitiveInfo },
    { key: 'violence', label: 'Violence', originalValue: originalStats.violence, optimizedValue: optimizedStats.violence },
    { key: 'genderBias', label: 'Gender Bias', originalValue: originalStats.genderBias, optimizedValue: optimizedStats.genderBias },
    { key: 'racialBias', label: 'Racial Bias', originalValue: originalStats.racialBias, optimizedValue: optimizedStats.racialBias },
    { key: 'unclear', label: 'Unclear Input', originalValue: originalStats.unclear, optimizedValue: optimizedStats.unclear },
    { key: 'jailbreaking', label: 'Jailbreaking', originalValue: originalStats.jailbreaking, optimizedValue: optimizedStats.jailbreaking },
  ];

  // Helper function to determine color based on value
  const getMetricColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h3 
        className="text-lg font-medium mb-4" 
        style={{ color: "rgb(var(--text-color))" }}
      >
        Prompt Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div 
            key={metric.key} 
            className="border rounded-lg shadow-sm p-4 transition-colors"
            style={{
              backgroundColor: "rgb(var(--background-rgb))",
              borderColor: "rgba(var(--foreground-rgb), 0.2)",
              color: "rgb(var(--foreground-rgb))",
              boxShadow: "0 1px 3px rgba(var(--foreground-rgb), 0.1)",
            }}
          >        
            <h4 
              className="text-sm font-medium mb-2" 
              style={{ color: "rgb(var(--text-color))" }} 
            >
              {metric.label}
            </h4>
            <div className="flex items-center space-x-2">
              {/* Original Value */}
              <div className="w-1/2">
                <div 
                  className="text-xs mb-1" 
                  style={{ color: "rgba(var(--text-color), 0.7)" }}
                >
                  Original
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${getMetricColor(metric.originalValue)}`} 
                    style={{ width: `${metric.originalValue}%` }}
                  ></div>
                </div>
                <div 
                  className="text-xs text-right mt-1" 
                  style={{ color: "rgba(var(--text-color), 0.9)" }}
                >
                  {metric.originalValue}%
                </div>
              </div>
              
              {/* Optimized Value */}
              <div className="w-1/2">
                <div 
                  className="text-xs mb-1" 
                  style={{ color: "rgba(var(--text-color), 0.7)" }}
                >
                  Optimized
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${getMetricColor(metric.optimizedValue)}`} 
                    style={{ width: `${metric.optimizedValue}%` }}
                  ></div>
                </div>
                <div 
                  className="text-xs text-right mt-1" 
                  style={{ color: "rgba(var(--text-color), 0.9)" }}
                >
                  {metric.optimizedValue}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsComparison;
