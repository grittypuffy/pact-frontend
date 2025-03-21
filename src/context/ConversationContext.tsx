"use client";

import React, { createContext, useContext, useState } from "react";
import { ConversationResponse, Chat } from "@/lib/data"; 

interface ConversationContextType {
    conversationHistory: ConversationResponse;
    setConversationHistory: React.Dispatch<React.SetStateAction<ConversationResponse>>;
    showResults: boolean;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    message: Chat[];
    setMessage: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
    const [conversationHistory, setConversationHistory] = useState<ConversationResponse>({} as ConversationResponse);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [message, setMessage] = useState<Chat[]>([]);

    return (
        <ConversationContext.Provider
            value={{ conversationHistory, setConversationHistory, showResults, setShowResults, message, setMessage }}
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
