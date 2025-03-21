'use client';

import React, { useState, useRef } from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (prompt: string) => void;
  isProcessing: boolean;
  selectedLanguage?: string;
  onLanguageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleVoiceSubmit :(voice: Blob) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  setPrompt, 
  onSubmit, 
  isProcessing,
  selectedLanguage = 'English',
  onLanguageChange,
  handleVoiceSubmit
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const languages = [
    'English',
    'Portuguese',
    'Spanish',
    'French'
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        
        // Send audio as response automatically when recording stops
        sendAudioResponse(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing your microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // New function to handle sending audio as a response
  const sendAudioResponse = async (audioBlob: Blob) => {
    //call the api here
    handleVoiceSubmit(audioBlob);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onLanguageChange) {
      onLanguageChange(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 min-h-[120px] resize-y transition-colors"
            style={{
              backgroundColor: "rgb(var(--background-rgb))",
              borderColor: "rgba(var(--foreground-rgb), 0.2)",
              color: "rgb(var(--foreground-rgb))",
              boxShadow: "0 1px 3px rgba(var(--foreground-rgb), 0.1)",
            }}
            disabled={isProcessing}
          />
        </div>
        
        <div className="flex justify-end items-center space-x-2">
          {/* Language selector */}
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "rgb(var(--background-rgb))",
              borderColor: "rgba(var(--foreground-rgb), 0.2)",
              color: "rgb(var(--foreground-rgb))",
            }}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          
          {/* Mic button */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className="p-2 rounded-full focus:outline-none focus:ring-2 transition-all flex items-center justify-center"
            style={{
              backgroundColor: isRecording 
                ? "rgb(220, 38, 38)" // Red when recording
                : "rgb(var(--primary-color))",
              color: "var(--button-text-color, #fff)",
              width: "40px",
              height: "40px",
            }}
          >
            {/* Microphone Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            
            {/* Recording indicator */}
            {isRecording && (
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-ping"></span>
            )}
          </button>
          
          {/* Submit button - kept in the same position */}
          <button
            type="submit"
            disabled={isProcessing || !prompt.trim()}
            className="px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: isProcessing || !prompt.trim()
                ? "rgba(var(--primary-color), 0.5)"
                : "rgb(var(--primary-color))",
              color: "var(--button-text-color, #fff)",
              cursor: isProcessing || !prompt.trim() ? "not-allowed" : "pointer",
              opacity: isProcessing || !prompt.trim() ? 0.6 : 1,
              transition: "background-color 0.2s ease, transform 0.1s ease",
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isProcessing || !prompt.trim()
                ? "rgba(var(--primary-color), 0.5)"
                : "rgb(var(--primary-color))";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isProcessing ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;