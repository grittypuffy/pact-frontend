export type PromptStatistics = {
    grammar: number;
    spellCheck: number;
    sensitiveInfo: number;
    violence: number;
    genderBias: number;
    racialBias: number;
    incomplete: number;
    jailbreak: number;
  };
  
  export type UserHistoryItem = {
    id: string;
    originalPrompt: string;
    optimizedPrompt: string;
    timestamp: Date;
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
  };
  
  export type PromptData = {
    originalPrompt: string;
    optimizedPrompt: string;
    originalStatistics: PromptStatistics;
    optimizedStatistics: PromptStatistics;
    originalResponse: string;
    optimizedResponse: string;
  };
  
  export type CategoryInsight = {
    id: string;
    userPrompts: number[];
    optimizedPrompts: number[];
  };