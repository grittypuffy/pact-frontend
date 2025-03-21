"use client";

import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PromptInput from "@/components/prompt/PromptInput";
import PromptComparison from "@/components/prompt/PromptComparison";
import StatisticsComparison from "@/components/prompt/StatisticsComparison";
import PromptResponse from "@/components/prompt/PromptResponse";
import { sampleHistory, PromptHistory,ConversationHistory,Chat } from "@/lib/data";
import { useConversation } from "@/context/ConversationContext";

// SearchParamsHandler component that uses useSearchParams
function SearchParamsHandler({
    message, 
    setMessage,
    setHistoryId,
  }: { message: Chat[] | undefined, setMessage: React.Dispatch<React.SetStateAction<Chat[] | undefined>>, setHistoryId: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    
    const { conversationHistory, setConversationHistory, setShowResults } = useConversation();
    const searchParams = useSearchParams();
    const historyId = searchParams ? searchParams.get("id") : null;
    
  
    useEffect(() => {
        if (historyId) {
            setHistoryId(historyId);
          // Find the conversation matching the historyId
           
          const foundConversation = conversationHistory?.data?.find(
            (item) => item.history._id === historyId
          );
      
          if (foundConversation) {
            // Set the selected message
            setMessage(foundConversation.chats);
            // Show results
            setShowResults(true);
          }
        } else {
          // Reset when no historyId is found
          setMessage(undefined);
          setShowResults(false);
        }
      }, [historyId, conversationHistory, setMessage, setConversationHistory, setShowResults]);

    return null; 
}


// Main component
export default function Home() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { conversationHistory, setConversationHistory, showResults, setShowResults } = useConversation();
    const [message, setMessage] = useState<Chat[]>();
    const [prompt, setPrompt] = useState('');
    const [historyid, setHistoryId] = useState<string>();

    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    
  
    const handlePromptSubmit = async (prompt: string) => {
        setIsProcessing(true);

        try {
            const response = await axios.get(
                `${API_BASE_URL}/llm/${encodeURIComponent(prompt)}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const markdownToPlainText = (markdown: string) => {
                return markdown
                    .replace(/###\s*/g, "")
                    .replace(/\*\*(.*?)\*\*/g, "$1")
                    .replace(/-\s*/g, "")
                    .replace(/\n{2,}/g, "\n\n");
            };
            let title="New Conversation";
            let historyId = "";
            const responseData = response.data?.data;
            let redirect=false;
            console.log("Not working till here")
            if (!message) {
                console.log("Works fine till here");
            
                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/add?user_msg=${encodeURIComponent(prompt)}`,
                        {}, 
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        }
                    );
            
                    setHistoryId(res.data.data);
                    historyId = res.data.data;
                    title = res.data.title;
                    redirect = true;
                    
                } catch (error) {
                    console.error("Error adding history:", error);
            
                    // If the error is from Axios, log additional details
                    if (axios.isAxiosError(error)) {
                        console.error("Response data:", error.response?.data);
                        console.error("Status:", error.response?.status);
                        console.error("Headers:", error.response?.headers);
                    }
                }
            }
            
            const newResponse: Chat = {
                _id: "",
                history_id: "",
                prompt: prompt,
                opt_prompt: responseData.opt_prompt.response,
                response:  markdownToPlainText(responseData.bot_response.response),
                opt_response:  markdownToPlainText(responseData.opt_bot_response.response),
                prompt_metrics: {
                    grammar: 0,
                    spell_check: 0,
                    sensitive_info: 0,
                    violence: 0,
                    bias_gender: 0,
                    self_harm: 0,
                    hate_unfairness: 0,
                    jailbreak: false,
                },
                opt_prompt_metrics: {
                    grammar: 0,
                    spell_check: 0,
                    sensitive_info: 0,
                    violence: 0,
                    bias_gender: 0,
                    self_harm: 0,
                    hate_unfairness: 0,
                    jailbreak: false,
                },
            };

            const stats = await axios.post(
                `${API_BASE_URL}/llm/metrics`,
                JSON.stringify({
                    query: prompt,
                    answer: markdownToPlainText(
                        response.data?.data.bot_response.response
                    ),
                    opt_query: markdownToPlainText(
                        response.data?.data.opt_prompt.response
                    ),
                    opt_answer: markdownToPlainText(
                        response.data?.data.opt_bot_response.response
                    ),
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            newResponse.prompt_metrics = { ...stats.data.data.metrics };
            newResponse.opt_prompt_metrics = { ...stats.data.data.opt_metrics };
          
            // const newResponse: PromptHistory = {
            //     id: "1",
            //     date: new Date().toISOString(),
            //     originalPrompt: "dummy",
            //     optimizedPrompt: "dummy",
            //     originalResponse: "dummy",
            //     optimizedResponse: "dummy",
            //     originalStats: {
            //         grammar: 6,
            //         spell_check: 7,
            //         sensitive_info: 9,
            //         violence: 0,
            //         bias_gender: 0,
            //         self_harm: 0,
            //         hate_unfairness: 1,
            //         jailbreak: true,
            //     },
            //     optimizedStats: {
            //         grammar: 10,
            //         spell_check: 10,
            //         sensitive_info: 8,
            //         violence: 0,
            //         bias_gender: 0,
            //         self_harm: 0,
            //         hate_unfairness: 1,
            //         jailbreak: false,
            //     },
            // };  
            setMessage((prevMessage) => [
                ...(prevMessage || []),
                newResponse,
            ]);
            setPrompt("");
            setShowResults(true);
            const addChat = async () => {
                try {
                    const response = await axios.post(
                        `${API_BASE_URL}/chat/add`,
                        {
                            history_id: historyid,
                            prompt: newResponse.prompt,
                            response: newResponse.response,
                            opt_prompt: newResponse.opt_prompt,
                            opt_response: newResponse.opt_response,
                            prompt_metrics: newResponse.prompt_metrics,
                            opt_prompt_metrics: newResponse.opt_prompt_metrics,
                            },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        }
                    );
                    
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response) {
                            console.error("API Error:", error.response.data); // Log server response
                            console.error("Status Code:", error.response.status);
                        } else {
                            console.error("Request Error:", error.message);
                        }
                    } else {
                        console.error("Unexpected Error:", error);
                    }
                }
                
            }
            addChat();
            setConversationHistory((prevHistory) => {
                if (!prevHistory) return prevHistory;
            
                // Check if historyId exists in the current conversation history
                const existingConversation = prevHistory.data.find(
                    (conversation) => conversation.history._id === historyid
                );
            
                if (existingConversation) {
                    // If the history exists, append new chat to its chats array
                    return {
                        ...prevHistory,
                        data: prevHistory.data.map((conversation) =>
                            conversation.history._id === historyid
                                ? {
                                      ...conversation,
                                      chats: [...conversation.chats, newResponse],
                                  }
                                : conversation
                        ),
                    };
                } else {
                    // If the history doesn't exist, create a new conversation entry
                    const newConversation: ConversationHistory = {
                        history: {
                            _id: historyId || "", // Set historyId or empty string
                            user_id: "", 
                            title: title, // Default title (you can modify this)
                        },
                        chats: [newResponse], // Add newResponse as the first chat entry
                    };
            
                    return {
                        ...prevHistory,
                        data: [...prevHistory.data, newConversation], // Append the new conversation
                    };
                }
            });
            if(redirect){
                window.location.href = `/?id=${historyid}`;
            }
            
           
            
        } catch (error) {
            console.error("Error processing prompt:", error);
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
                    background: "rgba(var(--primary-color), 0.2)",
                    color: "rgb(var(--foreground-rgb))",
                    borderColor: "rgba(var(--foreground-rgb), 0.2)",
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
            <Suspense
                fallback={<div className="text-center p-4">Loading...</div>}
            >
                <SearchParamsHandler
                    message={message}
                    setMessage={setMessage}
                    setHistoryId={setHistoryId}
                />
            </Suspense>

            {/* Main content */}
            <div className="container mx-auto p-4">
                {/* Results section below input, ordered chronologically (oldest first) */}
                {showResults && message && message.length > 0 && (
                    <div className="mt-8">
                        {message.map((promptData, index) => (
                            <div
                                key={promptData._id}
                                className="mb-12 animate-fadeIn border-b pb-8 last:border-b-0"
                            >
                                {/* Center-align the content */}
                                <div className="flex flex-col items-center">
                                    <h2 className="text-xl font-semibold mb-4 text-center">
                                        Prompt {index + 1} -{" "}
                                        {/* {new Date(
                                            promptData.date
                                        ).toLocaleString()} */}
                                    </h2>
                                    <PromptComparison
                                        originalPrompt={
                                            promptData.prompt
                                        }
                                        optimizedPrompt={
                                            promptData.opt_prompt
                                        }
                                    />
                                    <StatisticsComparison
                                        originalStats={
                                            promptData.prompt_metrics as any
                                        }
                                        optimizedStats={
                                            promptData.opt_prompt_metrics as any
                                        }
                                    />
                                    <PromptResponse
                                        originalResponse={
                                            promptData.response
                                        }
                                        optimizedResponse={
                                            promptData.opt_response
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Input section at the top */}
                <div className="mt-8 space-y-4 animate-fadeIn">
                    <PromptInput
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onSubmit={handlePromptSubmit}
                        isProcessing={isProcessing}
                    />
                </div>
            </div>
        </div>
    );
}
