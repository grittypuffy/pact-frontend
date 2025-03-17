'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PromptInput from '@/components/prompt/PromptInput';
import PromptComparison from '@/components/prompt/PromptComparison';
import StatisticsComparison from '@/components/prompt/StatisticsComparison';
import PromptResponse from '@/components/prompt/PromptResponse';
import { sampleHistory, PromptHistory } from '@/lib/data';

export default function Home() {
  const searchParams = useSearchParams();
  const historyId = searchParams ? searchParams.get('id') : null;
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [promptData, setPromptData] = useState<PromptHistory | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Load historical prompt if ID is provided
  useEffect(() => {
    if (historyId) {
      const foundPrompt = sampleHistory.find(item => item.id === historyId);
      if (foundPrompt) {
        setPromptData(foundPrompt);
        setShowResults(true);
      }
    } else {
      setPromptData(null);
      setShowResults(false);
    }
  }, [historyId]);

  const handlePromptSubmit = async (prompt: string) => {
    setIsProcessing(true);
    
    // In a real app, you would send this to your backend API
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, create a mock response
      const mockResponse: PromptHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        originalPrompt: prompt,
        optimizedPrompt: `Could you provide information about ${prompt.includes('hack') ? 'cybersecurity best practices' : prompt}?`,
        originalResponse: `Here's a response to your original query: "${prompt}"`,
        optimizedResponse: `Here's a more comprehensive response to the optimized query, which focuses on helpful and ethical information.`,
        originalStats: {
          grammar: Math.floor(Math.random() * 40) + 40,
          spellCheck: Math.floor(Math.random() * 40) + 40,
          sensitiveInfo: Math.floor(Math.random() * 40) + 40,
          violence: Math.floor(Math.random() * 40) + 40,
          genderBias: Math.floor(Math.random() * 40) + 40,
          racialBias: Math.floor(Math.random() * 40) + 40,
          unclear: Math.floor(Math.random() * 40) + 40,
          jailbreaking: Math.floor(Math.random() * 40) + 40,
        },
        optimizedStats: {
          grammar: Math.floor(Math.random() * 20) + 80,
          spellCheck: Math.floor(Math.random() * 20) + 80,
          sensitiveInfo: Math.floor(Math.random() * 20) + 80,
          violence: Math.floor(Math.random() * 20) + 80,
          genderBias: Math.floor(Math.random() * 20) + 80,
          racialBias: Math.floor(Math.random() * 20) + 80,
          unclear: Math.floor(Math.random() * 20) + 80,
          jailbreaking: Math.floor(Math.random() * 20) + 80,
        }
      };
      
      setPromptData(mockResponse);
      setShowResults(true);
    } catch (error) {
      console.error('Error processing prompt:', error);
      // Handle error state here
    } finally {
      setIsProcessing(false);
    }
    
    /* 
    // Real implementation would look something like:
    try {
      const response = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) throw new Error('Failed to process prompt');
      
      const data = await response.json();
      setPromptData(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
    */
  };

  return (
    <div className="min-h-screen">
      {/* Header section */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          PACT: Prompt Auto-Correction and Testing
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
          Optimize your prompts for better AI responses
        </p>
      </header>

      {/* Main content */}
      <div className="container mx-auto p-4">
        {/* Input section always visible */}
        <PromptInput onSubmit={handlePromptSubmit} isProcessing={isProcessing} />
        
        {/* Results section only visible after processing */}
        {showResults && promptData && (
          <div className="mt-8 space-y-8 animate-fadeIn">
            <PromptComparison 
              originalPrompt={promptData.originalPrompt} 
              optimizedPrompt={promptData.optimizedPrompt} 
            />
            
            <StatisticsComparison 
              originalStats={promptData.originalStats} 
              optimizedStats={promptData.optimizedStats} 
            />
            
            <PromptResponse 
              originalResponse={promptData.originalResponse} 
              optimizedResponse={promptData.optimizedResponse} 
            />
          </div>
        )}
      </div>
    </div>
  );
}