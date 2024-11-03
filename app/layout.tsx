import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/src/providers/AuthProvider';
import { NotificationProvider } from '@/src/providers/NotificationProvider';
import { ChatProvider } from '@/src/providers/ChatProvider';
import { MentorProvider } from '@/src/providers/MentorProvider';
import { ProgramProvider } from '@/src/providers/ProgramProvider';
import { EventProvider } from '@/src/providers/EventProvider';
import { ApplicationProvider } from '@/src/providers/ApplicationProvider';
import { CalendarProvider } from '@/src/providers/CalendarProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MenteeProvider } from '@/src/providers/MenteeProvider';

export const metadata: Metadata = {
  title: 'MentHunt - Find Your IT Mentor',
  description: 'Connect with experienced IT mentors to accelerate your career growth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NotificationProvider>
              <ChatProvider>
                <MentorProvider>
                  <MenteeProvider>
                    <ProgramProvider>
                      <EventProvider>
                        <ApplicationProvider>
                          <CalendarProvider>
                            {children}
                            <Toaster />
                          </CalendarProvider>
                        </ApplicationProvider>
                      </EventProvider>
                    </ProgramProvider>
                  </MenteeProvider>
                </MentorProvider>
              </ChatProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}