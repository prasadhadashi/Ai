import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { NotesProvider } from '@/lib/notes-context';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'A simple note-taking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NotesProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <div className="flex-1">
                  {children}
                </div>
              </div>
              <Toaster position="bottom-right" />
            </NotesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}