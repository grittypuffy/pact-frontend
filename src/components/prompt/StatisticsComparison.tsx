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
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Prompt Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.key} className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{metric.label}</h4>
            <div className="flex items-center space-x-2">
              <div className="w-1/2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Original</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${getMetricColor(metric.originalValue)}`} 
                    style={{ width: `${metric.originalValue}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right mt-1">{metric.originalValue}%</div>
              </div>
              <div className="w-1/2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Optimized</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${getMetricColor(metric.optimizedValue)}`} 
                    style={{ width: `${metric.optimizedValue}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right mt-1">{metric.optimizedValue}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsComparison;