'use client';

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/src/providers/AuthProvider";
import { NotificationProvider } from "@/src/providers/NotificationProvider";
import { ChatProvider } from "@/src/providers/ChatProvider";
import { MentorProvider } from "@/src/providers/MentorProvider";
import { ProgramProvider } from "@/src/providers/ProgramProvider";
import { EventProvider } from "@/src/providers/EventProvider";
import { ApplicationProvider } from "@/src/providers/ApplicationProvider";
import { CalendarProvider } from "@/src/providers/CalendarProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
            </MentorProvider>
          </ChatProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}