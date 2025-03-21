"use client";

import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PromptInput from "@/components/prompt/PromptInput";
import PromptComparison from "@/components/prompt/PromptComparison";
import StatisticsComparison from "@/components/prompt/StatisticsComparison";
import PromptResponse from "@/components/prompt/PromptResponse";
import {
  sampleHistory,
  PromptHistory,
  ConversationHistory,
  Chat,
} from "@/lib/data";
import { useConversation } from "@/context/ConversationContext";
import { useAuth } from "@/context/AuthContext";

// SearchParamsHandler component that uses useSearchParams
function SearchParamsHandler({
  message,
  setMessage,
  setHistoryId,
}: {
  message: Chat[] | undefined;
  setMessage: React.Dispatch<React.SetStateAction<Chat[] | undefined>>;
  setHistoryId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { conversationHistory, setConversationHistory, setShowResults } =
    useConversation();
  const searchParams = useSearchParams();
  const historyId = searchParams ? searchParams.get("id") : null;

  useEffect(() => {
    if (!historyId || !conversationHistory?.data) {
      // Reset state when historyId is not available
      setMessage(undefined);
      setShowResults(false);
      return;
    }

    // Find the conversation matching the historyId
    const foundConversation = conversationHistory.data.find(
      (item) => item.history._id === historyId
    );

    if (foundConversation) {
      setMessage(foundConversation.chats);
      setShowResults(true);
    } else {
      setMessage(undefined);
      setShowResults(false);
    }
  }, [historyId, conversationHistory]);

  return null;
}

// Main component
export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    conversationHistory,
    setConversationHistory,
    showResults,
    setShowResults,
  } = useConversation();
  const [message, setMessage] = useState<Chat[]>();
  const [prompt, setPrompt] = useState("");
  const [historyid, setHistoryId] = useState<string>();
  const { isAuthenticated } = useAuth();

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handlePromptSubmit = async (prompt: string) => {
    setIsProcessing(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/llm/prompt`,
        {
          prompt: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const markdownToPlainText = (markdown: string) => {
        return markdown
          .replace(/###\s*/g, "")
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/-\s*/g, "")
          .replace(/\n{2,}/g, "\n\n");
      };
      let title = "New Conversation";
      let historyId = historyid;
      const responseData = response.data?.data;
      let redirect = false;
      console.log("what the hell", historyId, isAuthenticated);
      if (!historyId && isAuthenticated) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/add`,
            {
              user_msg: prompt,
            },
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
        response: markdownToPlainText(responseData.bot_response.response),
        opt_response: markdownToPlainText(
          responseData.opt_bot_response.response
        ),
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
        flagged: false
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
          flagged: response.data?.data.flagged,
          metrics: response.data?.data.metrics || null,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
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
      setMessage((prevMessage) => [...(prevMessage || []), newResponse]);

      setPrompt("");
      setShowResults(true);
      console.log(isAuthenticated);
      if (isAuthenticated) {
        const addChat = async () => {
          try {
            const chatResponse = await axios.post(
              `${API_BASE_URL}/chat/add`,
              {
                history_id: historyId,
                prompt: newResponse.prompt,
                response: newResponse.response,
                opt_prompt: newResponse.opt_prompt,
                opt_response: newResponse.opt_response,
                prompt_metrics: newResponse.prompt_metrics,
                opt_prompt_metrics: newResponse.opt_prompt_metrics,
                flagged: response.data?.data.flagged,
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
        };
        await addChat();
      }
      try {
        const statsResponse = await axios.post(
          `${API_BASE_URL}/statistics/add`,
          {
            metrics: newResponse.prompt_metrics,
            opt_metrics: newResponse.opt_prompt_metrics,
            flagged: response.data?.data.flagged,
          }
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error posting statistics:",
            error.response ? error.response.data : error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
      if (isAuthenticated) {
        setConversationHistory((prevHistory) => {
          if (!prevHistory) return prevHistory;
          const existingConversation = prevHistory.data.find(
            (conversation) => conversation.history._id === historyid
          );

          if (existingConversation) {
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
            const newConversation: ConversationHistory = {
              history: {
                _id: historyId || "",
                user_id: "",
                title: title,
              },
              chats: [newResponse], // Add newResponse as the first chat entry
            };

            return {
              ...prevHistory,
              data: [...prevHistory.data, newConversation], // Append the new conversation
            };
          }
        });
      }
      // if (redirect) {
      //   window.location.href = `/?id=${historyId}`;
      // }
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
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
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
                    originalPrompt={promptData.prompt}
                    optimizedPrompt={promptData.opt_prompt}
                  />
                  <StatisticsComparison
                    originalStats={promptData.prompt_metrics as any}
                    optimizedStats={promptData.opt_prompt_metrics as any}
                  />
                  <PromptResponse
                    originalResponse={promptData.response}
                    optimizedResponse={promptData.opt_response}
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
