'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LineChart from '@/components/charts/LineChart';
import { userInsightsData } from '@/lib/data';
import { useRouter } from 'next/navigation';

type InsightsData = {
  totalPrompts: number;
  grammarTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
  spellCheckTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
  sensitiveInfoTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
  violenceTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
  genderBiasTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
  racialBiasTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
  unclearTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
  jailbreakingTrend: { promptNumber: number; userScore: number; optimizedScore: number; }[];
};

export default function InsightsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [insightsData, setInsightsData] = useState<InsightsData>(userInsightsData);
  const [totalPrompts, setTotalPrompts] = useState(0);

  useEffect(() => {
    console.log(setInsightsData);
    // If not logged in, redirect to home
    if (!user) {
      router.push('/');
      return;
    }

    // Here you would fetch the user's insights data from the backend
    // Example API call:
    // const fetchInsights = async () => {
    //   const response = await fetch(`/api/insights?userId=${user.id}`);
    //   const data = await response.json();
    //   setInsightsData(data.insights);
    //   setTotalPrompts(data.totalPrompts);
    // };
    // fetchInsights();

    // For now, use static data
    setTotalPrompts(userInsightsData.totalPrompts);
  }, [user, router]);

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const categories = [
    { name: 'Grammar', id: 'grammarTrend' },
    { name: 'Spell Check', id: 'spellCheckTrend' },
    { name: 'Sensitive Information', id: 'sensitiveInfoTrend' },
    { name: 'Violence / Harmful', id: 'violenceTrend' },
    { name: 'Gender Bias', id: 'genderBiasTrend' },
    { name: 'Racial Bias', id: 'racialBiasTrend' },
    { name: 'Unclear', id: 'unclearTrend' },
    { name: 'Jailbreak Prevention', id: 'jailbreakingTrend' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Insights</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Total Prompts</h2>
        <p className="text-4xl font-bold text-blue-600">{totalPrompts}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const data = insightsData[category.id as keyof InsightsData];
          return (
            <div key={category.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              {data && (
                <LineChart
                  title={`${category.name} Trend`}
                  data={{
                    labels: Array.isArray(data) ? data.map(d => `Prompt ${d.promptNumber}`) : [],
                    datasets: [
                      {
                        label: 'User Prompts',
                        data: Array.isArray(data) ? data.map(d => d.userScore) : [],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      },
                      {
                        label: 'Optimized Prompts',
                        data: Array.isArray(data) ? data.map(d => d.optimizedScore) : [],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.5)',
                      }
                    ]
                  }}
                  yAxisMax={100}
                  height={250}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}