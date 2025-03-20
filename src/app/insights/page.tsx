'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LineChart from '@/components/charts/LineChart';
import { useRouter } from 'next/navigation';
import { useConversation } from "@/context/ConversationContext";

type PromptStatistics = {
  grammar: number;
  spellCheck: number;
  sensitiveInfo: number;
  violence: number;
  genderBias: number;
  Hate: number;
  jailbreaking: number;
};

export default function InsightsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { conversationHistory } = useConversation();
  const [totalPrompts, setTotalPrompts] = useState(0);
  
  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    setTotalPrompts(conversationHistory.length);
  }, [user, router, conversationHistory]);

  const categories = [
    { name: 'Grammar', key: 'grammar' },
    { name: 'Spell Check', key: 'spellCheck' },
    { name: 'Sensitive Information', key: 'sensitiveInfo' },
    { name: 'Violence / Harmful', key: 'violence' },
    { name: 'Gender Bias', key: 'genderBias' },
    { name: 'Hate / Unfairness', key: 'Hate' },
    { name: 'Jailbreak Prevention', key: 'jailbreaking' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="text-3xl font-bold mb-6"
        style={{ color: 'rgb(var(--foreground-rgb))' }}
      >
        Your Insights
      </h1>
      
      <div 
        className="rounded-lg shadow p-6 mb-8 transition-all duration-300"
        style={{
          background: 'rgb(var(--card-rgb), 0.1)',
          color: 'rgb(var(--foreground-rgb))',
          borderColor: 'rgb(var(--foreground-rgb), 0.1)',
        }}
      >
        <h2 className="text-xl font-semibold mb-2">Total Prompts</h2>
        <p 
          className="text-4xl font-bold"
          style={{ color: 'rgb(var(--primary-color))' }}
        >
          {totalPrompts}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const trendData = conversationHistory.map((history: { originalStats: PromptStatistics | object, optimizedStats: PromptStatistics | object }, index) => ({
            promptNumber: index + 1,
            userScore: (history.originalStats as PromptStatistics)[category.key as keyof PromptStatistics] || 0,
            optimizedScore: (history.optimizedStats as PromptStatistics)[category.key as keyof PromptStatistics] || 0,
          }));

          return (
            <div 
              key={category.key} 
              className="rounded-lg shadow p-6 transition-all duration-300"
              style={{
                background: 'rgb(var(--card-rgb), 0.1)',
                color: 'rgb(var(--foreground-rgb))',
                borderColor: 'rgb(var(--foreground-rgb), 0.1)',
              }}
            >
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              {trendData.length > 0 && (
                <LineChart
                  title={`${category.name} Trend`}
                  data={{
                    labels: trendData.map(d => `Prompt ${d.promptNumber}`),
                    datasets: [
                      {
                        label: 'User Prompts',
                        data: trendData.map(d => d.userScore),
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                      },
                      {
                        label: 'Optimized Prompts',
                        data: trendData.map(d => d.optimizedScore),
                        borderColor: '#10b981',
                        backgroundColor: 'rgb(16, 185, 129, 0.5)',
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
