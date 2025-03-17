import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen">
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          About PACT
        </h1>
      </header>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              What is PACT?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              PACT (Prompt Auto-Correction and Testing) is a powerful tool designed to optimize and enhance your prompts before they are processed by AI language models. Our platform automatically identifies and addresses common issues in prompts to ensure you get the best possible AI responses.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By analyzing and improving your prompts, PACT helps you avoid problematic content, refine unclear instructions, and eliminate biases that might affect the quality of AI responses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Grammar and Spell Checking:</strong> Automatically corrects grammar and spelling errors in your prompts.</li>
              <li><strong>Sensitive Information Detection:</strong> Identifies and suggests removal of personal or sensitive information.</li>
              <li><strong>Bias Mitigation:</strong> Detects and addresses gender and racial biases in your prompts.</li>
              <li><strong>Clarity Enhancement:</strong> Improves unclear or incomplete prompts for better results.</li>
              <li><strong>Safety Measures:</strong> Prevents jailbreaking attempts and filters harmful content.</li>
              <li><strong>Comprehensive Statistics:</strong> Provides detailed analytics on prompt quality.</li>
              <li><strong>Response Comparison:</strong> Shows side-by-side responses from original and optimized prompts.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Enter your prompt in the input field on the home page.</li>
              <li>PACT analyzes your prompt across multiple dimensions.</li>
              <li>Our system generates an optimized version of your prompt.</li>
              <li>Both prompts are sent to the AI, and responses are compared.</li>
              <li>Detailed statistics show how your prompt was improved.</li>
              <li>Review the differences to learn how to craft better prompts.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Why Use PACT?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">For Everyday Users</h3>
                <p className="text-gray-700 dark:text-gray-300">Get better, more accurate responses from AI systems. Avoid common pitfalls and learn how to craft effective prompts through practical examples.</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">For Developers</h3>
                <p className="text-gray-700 dark:text-gray-300">Improve your application's AI interactions by ensuring the prompts your systems generate are optimized for the best possible outcomes.</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">For Businesses</h3>
                <p className="text-gray-700 dark:text-gray-300">Ensure your team consistently produces high-quality prompts that adhere to your guidelines and policies, improving efficiency and results.</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">For Researchers</h3>
                <p className="text-gray-700 dark:text-gray-300">Study patterns in prompt optimization and use the insights to develop better techniques for human-AI interaction.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}