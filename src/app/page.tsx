"use client";

import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PromptInput from "@/components/prompt/PromptInput";
import PromptComparison from "@/components/prompt/PromptComparison";
import StatisticsComparison from "@/components/prompt/StatisticsComparison";
import PromptResponse from "@/components/prompt/PromptResponse";
import { sampleHistory, PromptHistory } from "@/lib/data";

// SearchParamsHandler component that uses useSearchParams
function SearchParamsHandler({
    setConversationHistory,
    setShowResults,
}: {
    setConversationHistory: React.Dispatch<
        React.SetStateAction<PromptHistory[]>
    >;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const searchParams = useSearchParams();
    const historyId = searchParams ? searchParams.get("id") : null;

    useEffect(() => {
        if (historyId) {
            const foundPrompt = sampleHistory.find(
                (item) => item.id === historyId
            );
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
    const [conversationHistory, setConversationHistory] = useState<
        PromptHistory[]
    >([]);
    const [showResults, setShowResults] = useState(false);
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
            const responseData = response.data?.data;
            const newResponse: PromptHistory = {
                id: "",
                date: new Date().toISOString(),
                originalPrompt: prompt,
                optimizedPrompt: responseData.opt_prompt.response,
                originalResponse: markdownToPlainText(
                    responseData.bot_response.response
                ), // Convert Markdown to plain text
                optimizedResponse: markdownToPlainText(
                    responseData.opt_bot_response.response
                ), // Convert Markdown to plain text
                originalStats: {},
                optimizedStats: {},
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
            newResponse.originalStats = { ...stats.data.data.metrics };
            newResponse.optimizedStats = { ...stats.data.data.opt_metrics };
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
            setConversationHistory((prevHistory) => [
                ...prevHistory,
                newResponse,
            ]);
            setShowResults(true);
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
                            <div
                                key={promptData.id}
                                className="mb-12 animate-fadeIn border-b pb-8 last:border-b-0"
                            >
                                {/* Center-align the content */}
                                <div className="flex flex-col items-center">
                                    <h2 className="text-xl font-semibold mb-4 text-center">
                                        Prompt {index + 1} -{" "}
                                        {new Date(
                                            promptData.date
                                        ).toLocaleString()}
                                    </h2>
                                    <PromptComparison
                                        originalPrompt={
                                            promptData.originalPrompt
                                        }
                                        optimizedPrompt={
                                            promptData.optimizedPrompt
                                        }
                                    />
                                    <StatisticsComparison
                                        originalStats={
                                            promptData.originalStats as any
                                        }
                                        optimizedStats={
                                            promptData.optimizedStats as any
                                        }
                                    />
                                    <PromptResponse
                                        originalResponse={
                                            promptData.originalResponse
                                        }
                                        optimizedResponse={
                                            promptData.optimizedResponse
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
                        onSubmit={handlePromptSubmit}
                        isProcessing={isProcessing}
                    />
                </div>
            </div>
        </div>
    );
}
