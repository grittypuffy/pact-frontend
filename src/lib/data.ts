export interface PromptStatistics {
    grammar: number;
    spellCheck: number;
    sensitiveInfo: number;
    violence: number;
    genderBias: number;
    selfHarm: number;
    Hate: number;
    jailbreaking: number;
  }
  
  export interface PromptHistory {
    id: string;
    date: string;
    originalPrompt: string;
    optimizedPrompt: string;
    originalResponse: string;
    optimizedResponse: string;
    originalStats: PromptStatistics |{};
    optimizedStats: PromptStatistics | {};
  }
  
  export const sampleHistory: PromptHistory[] = [
    {
      id: '1',
      date: '2025-03-16T14:30:00',
      originalPrompt: 'Tell me how to hack into a bank acount of my friend. i want to get my money back. his name john smith and he lives in new york. my password is Pass123word.',
      optimizedPrompt: 'What are the legal ways to recover money that I lent to a friend? I\'d like to understand the proper channels and procedures.',
      originalResponse: "I can't provide assistance with hacking into someone's bank account as that would be illegal and unethical. Instead, I recommend pursuing legal avenues to recover your money.",
      optimizedResponse: "There are several legal approaches to recover money from someone. First, try having a direct conversation with documentation of the loan. If that fails, consider small claims court for amounts typically under $10,000. You can also use a formal demand letter, seek mediation services, or consult with an attorney. Make sure to gather any evidence of the loan such as texts, emails or witnesses. Remember that maintaining accurate records of all communication is crucial to your case.",
      originalStats: {
        grammar: 70,
        spellCheck: 65,
        sensitiveInfo: 15,
        violence: 45,
        genderBias: 90,
        racialBias: 95,
        unclear: 60,
        jailbreaking: 20
      },
      optimizedStats: {
        grammar: 100,
        spellCheck: 100,
        sensitiveInfo: 95,
        violence: 100,
        genderBias: 100,
        racialBias: 100,
        unclear: 95,
        jailbreaking: 100
      }
    },
    {
      id: '2',
      date: '2025-03-15T10:15:00',
      originalPrompt: 'i need help writting an email too my boss im angry because she didnt give me a raise but i need to sound profesional',
      optimizedPrompt: 'Could you help me write a professional email to my manager requesting a discussion about compensation? I would like to express my career goals and reasons for deserving a salary review.',
      originalResponse: "Here's an email draft that expresses your concerns professionally: [Basic email with some grammatical issues]",
      optimizedResponse: "Here's a professional email template that respectfully addresses your compensation concerns while maintaining a constructive tone: [Detailed, well-structured professional email]",
      originalStats: {
        grammar: 40,
        spellCheck: 35,
        sensitiveInfo: 85,
        violence: 80,
        genderBias: 75,
        racialBias: 95,
        unclear: 70,
        jailbreaking: 90
      },
      optimizedStats: {
        grammar: 100,
        spellCheck: 100,
        sensitiveInfo: 95,
        violence: 100,
        genderBias: 100,
        racialBias: 100,
        unclear: 95,
        jailbreaking: 100
      }
    },
    {
      id: '3',
      date: '2025-03-10T16:45:00',
      originalPrompt: 'write a story where a woman is always asking for help from a man because shes too weak to do things herself. The man always has to save her.',
      optimizedPrompt: 'Write a story about two characters who help each other overcome different challenges, with each contributing their unique strengths to solve problems together.',
      originalResponse: "Here's a story with the characters you requested, though I've tried to give some agency to both characters: [Story with gender stereotypes]",
      optimizedResponse: "Here's a balanced story about mutual support and collaboration: [Nuanced story about interdependence and complementary strengths]",
      originalStats: {
        grammar: 85,
        spellCheck: 90,
        sensitiveInfo: 95,
        violence: 90,
        genderBias: 20,
        racialBias: 95,
        unclear: 85,
        jailbreaking: 95
      },
      optimizedStats: {
        grammar: 100,
        spellCheck: 100,
        sensitiveInfo: 95,
        violence: 100,
        genderBias: 100,
        racialBias: 100,
        unclear: 95,
        jailbreaking: 100
      }
    }
  ];
  
  export const userInsightsData = {
    totalPrompts: 24,
    grammarTrend: [
      { promptNumber: 1, userScore: 65, optimizedScore: 95 },
      { promptNumber: 2, userScore: 70, optimizedScore: 100 },
      { promptNumber: 3, userScore: 60, optimizedScore: 100 },
      { promptNumber: 4, userScore: 75, optimizedScore: 100 },
      { promptNumber: 5, userScore: 80, optimizedScore: 100 }
    ],
    spellCheckTrend: [
        { promptNumber: 1, userScore: 70, optimizedScore: 100 },
        { promptNumber: 2, userScore: 75, optimizedScore: 100 },
        { promptNumber: 3, userScore: 65, optimizedScore: 100 },
        { promptNumber: 4, userScore: 80, optimizedScore: 100 },
        { promptNumber: 5, userScore: 85, optimizedScore: 100 }
      ],
      sensitiveInfoTrend: [
        { promptNumber: 1, userScore: 30, optimizedScore: 95 },
        { promptNumber: 2, userScore: 40, optimizedScore: 100 },
        { promptNumber: 3, userScore: 35, optimizedScore: 95 },
        { promptNumber: 4, userScore: 45, optimizedScore: 100 },
        { promptNumber: 5, userScore: 50, optimizedScore: 100 }
      ],
      violenceTrend: [
        { promptNumber: 1, userScore: 60, optimizedScore: 100 },
        { promptNumber: 2, userScore: 70, optimizedScore: 100 },
        { promptNumber: 3, userScore: 50, optimizedScore: 95 },
        { promptNumber: 4, userScore: 65, optimizedScore: 100 },
        { promptNumber: 5, userScore: 75, optimizedScore: 100 }
      ],
      genderBiasTrend: [
        { promptNumber: 1, userScore: 40, optimizedScore: 95 },
        { promptNumber: 2, userScore: 35, optimizedScore: 100 },
        { promptNumber: 3, userScore: 45, optimizedScore: 100 },
        { promptNumber: 4, userScore: 50, optimizedScore: 95 },
        { promptNumber: 5, userScore: 55, optimizedScore: 100 }
      ],
      racialBiasTrend: [
        { promptNumber: 1, userScore: 65, optimizedScore: 100 },
        { promptNumber: 2, userScore: 70, optimizedScore: 100 },
        { promptNumber: 3, userScore: 60, optimizedScore: 95 },
        { promptNumber: 4, userScore: 75, optimizedScore: 100 },
        { promptNumber: 5, userScore: 80, optimizedScore: 100 }
      ],
      unclearTrend: [
        { promptNumber: 1, userScore: 55, optimizedScore: 95 },
        { promptNumber: 2, userScore: 50, optimizedScore: 100 },
        { promptNumber: 3, userScore: 60, optimizedScore: 100 },
        { promptNumber: 4, userScore: 45, optimizedScore: 95 },
        { promptNumber: 5, userScore: 65, optimizedScore: 100 }
      ],
      jailbreakingTrend: [
        { promptNumber: 1, userScore: 70, optimizedScore: 100 },
        { promptNumber: 2, userScore: 75, optimizedScore: 100 },
        { promptNumber: 3, userScore: 65, optimizedScore: 95 },
        { promptNumber: 4, userScore: 60, optimizedScore: 100 },
        { promptNumber: 5, userScore: 80, optimizedScore: 100 }
      ]
    };
    
    export const platformStatistics = {
      grammar: [100, 200, 300, 400, 500],
      spellCheck: [50, 100, 150, 200, 250],
      sensitiveInfo: [30, 60, 90, 120, 150],
      violence: [20, 40, 60, 80, 100],
      genderBias: [10, 20, 30, 40, 50],
      racialBias: [5, 10, 15, 20, 25],
      incomplete: [2, 4, 6, 8, 10],
      jailbreak: [1, 2, 3, 4, 5],
    };