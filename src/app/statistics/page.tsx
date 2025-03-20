'use client';

import { useState, useEffect } from 'react';
import BarChart from "@/components/charts/BarChart";
import axios from 'axios';
import { platformStatistics } from '@/lib/data';

type ScoreVal = {
  "0": number,
  "1": number,
  "2": number,
  "3": number,
  "4": number,
  "5": number
}

type MetricsType = {
  [key: string]: ScoreVal | {"True": number, "False": number}
}

export default function StatisticsPage() {
  // const [statisticsData, setStatisticsData] = useState<MetricsType>();
  // const [totalPlatformPrompts, setTotalPlatformPrompts] = useState(0);
  const [promptData,setPromptData] = useState<MetricsType>();
  const [optData,setOptData] = useState<MetricsType>();
  const [promptCount, setPromptCount] = useState<number>(0);
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/statistics/get`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = response.data?.data;
        const promptMetrics = {...data?.prompt_metrics};
        setPromptCount(promptMetrics?.count);
        delete promptMetrics?.count;
        delete promptMetrics?.metrics_type;
        setPromptData(promptMetrics);
        const optMetrics = {...data?.opt_prompt_metrics};
        delete optMetrics?.count;
        delete optMetrics?.metrics_type;
        setOptData(optMetrics);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { name: 'Grammar', id: 'grammar' },
    { name: 'Spell Check', id: 'spell_check' },
    { name: 'Sensitive Information', id: 'sensitive_info' },
    { name: 'Violence / Harmful', id: 'violence' },
    { name: 'Gender Bias', id: 'bias_gender' },
    { name: 'Racial Bias', id: 'self_harm' },
    { name: 'Incomplete / Unclear', id: 'hate_unfairness' },
    { name: 'Jailbreak Prevention', id: 'jailbreak' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-8"
        style={{ color: "rgb(var(--foreground-rgb))" }}
      >
        Platform Statistics
      </h1>

      <div
        className="rounded-lg p-6 mb-8 text-center shadow-md transition-all duration-300"
        style={{
          background: "rgb(var(--card-rgb), 0.1)",
          color: "rgb(var(--foreground-rgb))",
          borderColor: "rgb(var(--foreground-rgb), 0.1)",
        }}
      >
        <h2 className="text-2xl font-semibold mb-2">Total Platform Prompts</h2>
        <p
          className="text-4xl font-bold"
          style={{ color: "rgb(var(--primary-color))" }}
        >
          {promptCount}
        </p>
      </div>

      {promptData && <h2 className="text-2xl font-semibold mb-2 text-center">User Prompt Statistics</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promptData &&
          categories.map((category) => {
            const data = promptData![category?.id];
            return (
              <div
                key={category.id}
                className="rounded-lg p-4 shadow-md transition-all duration-300"
                style={{
                  background: "rgb(var(--card-rgb), 0.1)",
                  color: "rgb(var(--foreground-rgb))",
                  borderColor: "rgb(var(--foreground-rgb), 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                {data && (
                  <BarChart
                    data={{
                      labels: Object.keys(data),
                      datasets: [
                        {
                          label: "Number of Prompts",
                          data: Object.values(data),
                          backgroundColor: "blue",
                          borderColor: "blue",
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                )}
              </div>
            );
          })}
      </div>
      {optData && <h2 className="text-2xl font-semibold mb-2 text-center">
        Optimized Prompt Statistics
      </h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {optData &&
          categories.map((category) => {
            const data = optData![category?.id];
            return (
              <div
                key={category.id}
                className="rounded-lg p-4 shadow-md transition-all duration-300"
                style={{
                  background: "rgb(var(--card-rgb), 0.1)",
                  color: "rgb(var(--foreground-rgb))",
                  borderColor: "rgb(var(--foreground-rgb), 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                {data && (
                  <BarChart
                    data={{
                      labels: Object.keys(data),
                      datasets: [
                        {
                          label: "Number of Prompts",
                          data: Object.values(data),
                          backgroundColor: "blue",
                          borderColor: "blue",
                          borderWidth: 1,
                        },
                      ],
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