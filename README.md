# PACT Frontend

PACT (Prompt Auto-Correction and Testing) is a prompt pre-processing layer that enhances user prompts to improve AI response quality.

## Features

- User prompt input and optimization
- Side-by-side comparison of original and optimized prompts
- Detailed statistics on prompt improvements
- Comparison of AI responses
- User insights and platform statistics
- Dark and light mode support

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Docker
- Yarn

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pact-frontend.git
   cd pact-frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker

1. Build and run the Docker container:
   ```bash
   docker-compose up
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Integration

To integrate with your backend API:

1. Update the API URL in `docker-compose.yml` or set the environment variable `NEXT_PUBLIC_API_URL`.

2. Implement the API calls in your components. There are placeholder comments in the code where you should add your API calls, such as:

   ```typescript
   // Example API call:
   const fetchPromptResults = async (prompt: string) => {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process-prompt`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ prompt })
     });
     return await response.json();
   };
   ```

3. The main endpoints you'll need to implement on your backend are:
   - `/api/process-prompt` - Process a user prompt
   - `/api/insights` - Get user insights
   - `/api/platform-statistics` - Get platform statistics
   - `/api/auth` - Handle authentication

## Project Structure

```
- public/            # Static assets
- src/
  - app/             # Next.js app directory
  - components/      # React components
  - context/         # React contexts
  - lib/             # Utility functions and types
```

## Customization

- Modify the theme colors in `src/app/globals.css`
- Add or remove statistics categories in `src/lib/data.ts`
- Customize the UI components in `src/components/`