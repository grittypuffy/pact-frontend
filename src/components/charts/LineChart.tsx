'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  promptNumber: number;
  userScore: number;
  optimizedScore: number;
}

interface LineChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  yAxisMax?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ title, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      tension: 0.3,
    })),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Prompts'
        }
      }
    }
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;