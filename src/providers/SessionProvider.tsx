'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SessionPort } from '@/src/application/ports/in/SessionPort';
import { SessionUseCase } from '@/src/application/SessionUseCase';
import { InMemorySessionRepository } from '@/src/infrastructure/adapters/InMemorySessionRepository';

const sessionRepository = new InMemorySessionRepository();
const sessionUseCase = new SessionUseCase(sessionRepository);

const SessionContext = createContext<SessionPort>(sessionUseCase);

export function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <SessionContext.Provider value={sessionUseCase}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}