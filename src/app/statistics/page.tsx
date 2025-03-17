'use client';

import { useState, useEffect } from 'react';
import BarChart from "@/components/charts/BarChart";

type PlatformStatistics = {
  [key: string]: number[];
};
import { platformStatistics } from '@/lib/data';

export default function StatisticsPage() {
  const [statisticsData, setStatisticsData] = useState<PlatformStatistics>(platformStatistics);
  const [totalPlatformPrompts, setTotalPlatformPrompts] = useState(0);

  useEffect(() => {
    console.log(setStatisticsData);
    // Here you would fetch platform statistics from the backend
    // Example API call:
    // const fetchStatistics = async () => {
    //   const response = await fetch('/api/platform-statistics');
    //   const data = await response.json();
    //   setStatisticsData(data.statistics);
    //   setTotalPlatformPrompts(data.totalPrompts);
    // };
    // fetchStatistics();

    // For now, use static data
    setTotalPlatformPrompts(
      Object.values(platformStatistics).reduce(
        (sum, category) => sum + category.reduce((total, val) => total + val, 0),
        0
      )
    );
  }, []);

  const categories = [
    { name: 'Grammar', id: 'grammar' },
    { name: 'Spell Check', id: 'spellCheck' },
    { name: 'Sensitive Information', id: 'sensitiveInfo' },
    { name: 'Violence / Harmful', id: 'violence' },
    { name: 'Gender Bias', id: 'genderBias' },
    { name: 'Racial Bias', id: 'racialBias' },
    { name: 'Incomplete / Unclear', id: 'incomplete' },
    { name: 'Jailbreak Prevention', id: 'jailbreak' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Platform Statistics</h1>
      
      <div className="bg-card rounded-lg p-6 mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Total Platform Prompts</h2>
        <p className="text-4xl font-bold">{totalPlatformPrompts.toLocaleString()}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const data = statisticsData[category.id];
          return (
            <div key={category.id} className="bg-card rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
              {data && (
                <BarChart 
                  data={{
                    labels: ['1%', '2%', '3%', '4%', '5%'],
                    datasets: [
                      {
                        label: 'Number of Prompts',
                        data,
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                      }
                    ]
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}