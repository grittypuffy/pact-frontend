import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date 
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

// Format relative time (e.g., "2 days ago")
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffInSeconds < minute) {
    return 'just now';
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffInSeconds / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

// Get color based on score (lower is better)
export function getScoreColor(score: number): string {
  if (score <= 1) return 'bg-green-500';
  if (score <= 2) return 'bg-green-400';
  if (score <= 3) return 'bg-yellow-400';
  if (score <= 4) return 'bg-orange-500';
  return 'bg-red-500';
}

// Get text color based on background color
export function getTextColor(score: number): string {
  return score > 2 ? 'text-white' : 'text-gray-900';
}

// Calculate percentage reduction between original and optimized scores
export function calculateReduction(original: number, optimized: number): number {
  if (original === 0) return 0;
  return Math.round(((original - optimized) / original) * 100);
}