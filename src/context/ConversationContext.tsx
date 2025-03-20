"use client";

import React, { createContext, useContext, useState } from "react";
import { PromptHistory } from "@/lib/data"; 

interface ConversationContextType {
    conversationHistory: PromptHistory[];
    setConversationHistory: React.Dispatch<React.SetStateAction<PromptHistory[]>>;
    showResults: boolean;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
    const [conversationHistory, setConversationHistory] = useState<PromptHistory[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    return (
        <ConversationContext.Provider
            value={{ conversationHistory, setConversationHistory, showResults, setShowResults }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

// Custom hook to use the conversation context
export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error("useConversation must be used within a ConversationProvider");
    }
    return context;
};
