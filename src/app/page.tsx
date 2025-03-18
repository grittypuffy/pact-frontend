'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PromptInput from '@/components/prompt/PromptInput';
import PromptComparison from '@/components/prompt/PromptComparison';
import StatisticsComparison from '@/components/prompt/StatisticsComparison';
import PromptResponse from '@/components/prompt/PromptResponse';
import { sampleHistory, PromptHistory } from '@/lib/data';

// SearchParamsHandler component that uses useSearchParams
function SearchParamsHandler({ 
  setConversationHistory, 
  setShowResults 
}: { 
  setConversationHistory: React.Dispatch<React.SetStateAction<PromptHistory[]>>, 
  setShowResults: React.Dispatch<React.SetStateAction<boolean>> 
}) {
  const searchParams = useSearchParams();
  const historyId = searchParams ? searchParams.get('id') : null;
  
  useEffect(() => {
    if (historyId) {
      const foundPrompt = sampleHistory.find(item => item.id === historyId);
      if (foundPrompt) {
        // Initialize conversation history with the found prompt
        setConversationHistory([foundPrompt]);
        setShowResults(true);
      }
    } else {
      setConversationHistory([]);
      setShowResults(false);
    }
  }, [historyId, setConversationHistory, setShowResults]);
  
  return null; // This component doesn't render anything
}

// Main component
export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  // Changed from single promptData to an array of conversation history
  const [conversationHistory, setConversationHistory] = useState<PromptHistory[]>([]);
  const [showResults, setShowResults] = useState(false);

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
      
      // Add the new prompt and response to the conversation history
      setConversationHistory(prevHistory => [...prevHistory, mockResponse]);
      setShowResults(true);
    } catch (error) {
      console.error('Error processing prompt:', error);
      // Handle error state here
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header section */}
      <header 
        className="w-full p-4 shadow-sm transition-all duration-300 border-b"
        style={{
          background: 'rgba(var(--primary-color), 0.2)',
          color: 'rgb(var(--foreground-rgb))',
          borderColor: 'rgba(var(--foreground-rgb), 0.2)',
        }}
      >
        <h1 className="text-2xl font-bold text-center">
          PACT: Prompt Auto-Correction and Testing
        </h1>
        <p className="text-center mt-2">
          Optimize your prompts for better AI responses
        </p>
      </header>

      {/* Suspense boundary for the component using useSearchParams */}
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <SearchParamsHandler 
          setConversationHistory={setConversationHistory} 
          setShowResults={setShowResults} 
        />
      </Suspense>

      {/* Main content */}
      <div className="container mx-auto p-4">

        {/* Results section below input, ordered chronologically (oldest first) */}
        {showResults && conversationHistory.length > 0 && (
          <div className="mt-8">
            {conversationHistory.map((promptData, index) => (
              <div key={promptData.id} className="mb-12 animate-fadeIn border-b pb-8 last:border-b-0">
                <h2 className="text-xl font-semibold mb-4">
                  Prompt {index + 1} - {new Date(promptData.date).toLocaleString()}
                </h2>
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
            ))}
          </div>
        )}

        {/* Input section at the top */}
        <div className="mt-8 space-y-4 animate-fadeIn">
          <PromptInput onSubmit={handlePromptSubmit} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
}