"use client";

import React, { useState, useEffect } from "react";
import { PromptStatistics } from "@/lib/data";

interface StatisticsComparisonProps {
    originalStats: PromptStatistics;
    optimizedStats: PromptStatistics;
}

const StatisticsComparison: React.FC<StatisticsComparisonProps> = ({
    originalStats,
    optimizedStats,
}) => {
    const [original, setOriginal] = useState<PromptStatistics>(originalStats);
    const [optimized, setOptimized] =
        useState<PromptStatistics>(optimizedStats);

    useEffect(() => {
        setOriginal(originalStats);
        setOptimized(optimizedStats);
        console.log(originalStats, optimizedStats);
    }, [originalStats, optimizedStats]);

    const metrics = [
        { key: "grammar", label: "Grammar" },
        { key: "spell_check", label: "Spell Check" },
        { key: "sensitive_info", label: "Sensitive Info" },
        { key: "violence", label: "Violence" },
        { key: "bias_gender", label: "Gender Bias" },
        { key: "hate_unfairness", label: "Unfairness / Hate" },
        { key: "self_harm", label: "Self Harm" },
        { key: "jailbreak", label: "Jailbreaking" },
    ];

    const getMetricColor = (key: string, value: any) => {
        if (
            key == "sensitive_info" ||
            key == "violence" ||
            key == "hate_unfairness"
        ) {
            if (value >= 80) return "bg-red-500";
            if (value >= 60) return "bg-yellow-500";
            return "bg-green-500";
        } else if (key == "jailbreak") {
            // if (value == true) return "bg-red-500";
            return "bg-red-500";
        } else if (value >= 80) return "bg-green-500";
        else if (value >= 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <h3
                className="text-lg font-medium mb-4"
                style={{ color: "rgb(var(--text-color))" }}
            >
                Prompt Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                    const originalValue =
                    metric.key === "jailbreak"
                        ? (original as any)[metric.key] > 0
                            ? 100
                            : 0
                        : ((original as any)[metric.key] || 0) * 10;
                
                const optimizedValue =
                    metric.key === "jailbreak"
                        ? (optimized as any)[metric.key] > 0
                            ? 100
                            : 0
                        : ((optimized as any)[metric.key] || 0) * 10;                

                    return (
                        <div
                            key={metric.key}
                            className="border rounded-lg shadow-sm p-4 transition-colors"
                            style={{
                                backgroundColor: "rgb(var(--background-rgb))",
                                borderColor: "rgba(var(--foreground-rgb), 0.2)",
                                color: "rgb(var(--foreground-rgb))",
                                boxShadow:
                                    "0 1px 3px rgba(var(--foreground-rgb), 0.1)",
                            }}
                        >
                            <h4
                                className="text-sm font-medium mb-2"
                                style={{ color: "rgb(var(--text-color))" }}
                            >
                                {metric.label}
                            </h4>
                            <div className="flex items-center space-x-2">
                                {/* Original Value */}
                                <div className="w-1/2">
                                    <div
                                        className="text-xs mb-1"
                                        style={{
                                            color: "rgba(var(--text-color), 0.7)",
                                        }}
                                    >
                                        Original
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div
                                            className={`h-2.5 rounded-full ${getMetricColor(
                                                metric.key,
                                                originalValue
                                            )}`}
                                            style={{
                                                width: `${originalValue}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div
                                        className="text-xs text-right mt-1"
                                        style={{
                                            color: "rgba(var(--text-color), 0.9)",
                                        }}
                                    >
                                        {originalValue}%
                                    </div>
                                </div>

                                {/* Optimized Value */}
                                <div className="w-1/2">
                                    <div
                                        className="text-xs mb-1"
                                        style={{
                                            color: "rgba(var(--text-color), 0.7)",
                                        }}
                                    >
                                        Optimized
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div
                                            className={`h-2.5 rounded-full ${getMetricColor(
                                                metric.key,
                                                optimizedValue
                                            )}`}
                                            style={{
                                                width: `${optimizedValue}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div
                                        className="text-xs text-right mt-1"
                                        style={{
                                            color: "rgba(var(--text-color), 0.9)",
                                        }}
                                    >
                                        {optimizedValue}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatisticsComparison;
