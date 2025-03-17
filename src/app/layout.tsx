import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
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
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}