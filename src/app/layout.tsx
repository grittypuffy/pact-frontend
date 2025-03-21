import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ConversationProvider } from '@/context/ConversationContext';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PACT - Prompt Auto-Correction and Testing',
  description: 'Improve your prompts with PACT - a prompt pre-processing layer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <ConversationProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex-1 overflow-y-auto">
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </div>
            </ConversationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}