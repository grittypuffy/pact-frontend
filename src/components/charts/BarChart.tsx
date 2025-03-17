'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  category: string;
  count: number;
}

interface BarChartProps {
  title?: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ title, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Number of Prompts',
        data: data.datasets[0].data,
        backgroundColor: data.datasets[0].backgroundColor,
        borderColor: data.datasets[0].borderColor,
        borderWidth: data.datasets[0].borderWidth,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
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
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Score Range'
        }
      }
    }
  };

  return <Bar options={options} data={chartData} />;
};

export default BarChart;