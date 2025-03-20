"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import LineChart from "@/components/charts/LineChart";
import { useRouter } from "next/navigation";
import { useConversation } from "@/context/ConversationContext";

type PromptStatistics = {
  grammar: number;
  spell_check: number;
  sensitive_info: number;
  violence: number;
  bias_gender: number;
  hate_unfairness: number;
  jailbreak: boolean; // Fixed: Changed to boolean to match data type
};

export default function InsightsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { conversationHistory } = useConversation();
  const [totalPrompts, setTotalPrompts] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    if (conversationHistory?.data) {
      setTotalPrompts(conversationHistory.data.reduce((sum, convo) => sum + convo.chats.length, 0));
    }
  }, [user, router, conversationHistory]);

  const categories = [
    { name: "Grammar", key: "grammar" },
    { name: "Spell Check", key: "spell_check" },
    { name: "Sensitive Information", key: "sensitive_info" },
    { name: "Violence / Harmful", key: "violence" },
    { name: "Gender Bias", key: "bias_gender" },
    { name: "Hate / Unfairness", key: "hate_unfairness" },
    { name: "Jailbreak Prevention", key: "jailbreak" },
  ];

  // Memoize trend data for optimization
  const trendDataMap = useMemo(() => {
    if (!conversationHistory?.data) return {};
    
    return categories.reduce((acc, category) => {
      acc[category.key] = conversationHistory.data.flatMap((history, index) =>
        history.chats.map((chat, chatIndex) => ({
          promptNumber: index * history.chats.length + chatIndex + 1,
          userScore:
            category.key === "jailbreak"
              ? Number((chat.prompt_metrics as PromptStatistics)?.jailbreak) // Convert boolean to number
              : Number((chat.prompt_metrics as PromptStatistics)?.[category.key as keyof PromptStatistics] || 0),
          optimizedScore:
            category.key === "jailbreak"
              ? Number((chat.opt_prompt_metrics as PromptStatistics)?.jailbreak) // Convert boolean to number
              : Number((chat.opt_prompt_metrics as PromptStatistics)?.[category.key as keyof PromptStatistics] || 0),
        }))
      );
      return acc;
    }, {} as Record<string, { promptNumber: number; userScore: number; optimizedScore: number }[]>);
  }, [conversationHistory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "rgb(var(--foreground-rgb))" }}
      >
        Your Insights
      </h1>

      {/* Total Prompts */}
      <div
        className="rounded-lg shadow p-6 mb-8 transition-all duration-300"
        style={{
          background: "rgb(var(--card-rgb), 0.1)",
          color: "rgb(var(--foreground-rgb))",
          borderColor: "rgb(var(--foreground-rgb), 0.1)",
        }}
      >
        <h2 className="text-xl font-semibold mb-2">Total Prompts</h2>
        <p
          className="text-4xl font-bold"
          style={{ color: "rgb(var(--primary-color))" }}
        >
          {totalPrompts}
        </p>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const trendData = trendDataMap[category.key] || [];

          return (
            <div
              key={category.key}
              className="rounded-lg shadow p-6 transition-all duration-300"
              style={{
                background: "rgb(var(--card-rgb), 0.1)",
                color: "rgb(var(--foreground-rgb))",
                borderColor: "rgb(var(--foreground-rgb), 0.1)",
              }}
            >
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              {trendData.length > 0 ? (
                <LineChart
                  title={`${category.name} Trend`}
                  data={{
                    labels: trendData.map((d) => `Prompt ${d.promptNumber}`),
                    datasets: [
                      {
                        label: "User Prompts",
                        data: trendData.map((d) => d.userScore),
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.5)",
                      },
                      {
                        label: "Optimized Prompts",
                        data: trendData.map((d) => d.optimizedScore),
                        borderColor: "#10b981",
                        backgroundColor: "rgba(16, 185, 129, 0.5)",
                      },
                    ],
                  }}
                  yAxisMax={100}
                  height={250}
                />
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
