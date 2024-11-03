'use client';

import { createContext, useContext, ReactNode } from 'react';
import { MenteePort } from '@/src/application/ports/in/MenteePort';
import { MenteeUseCase } from '@/src/application/MenteeUseCase';
import { InMemoryMenteeRepository } from '@/src/infrastructure/adapters/InMemoryMenteeRepository';
import { Mentee } from '@/src/domain/model/Mentee';

const menteeRepository = new InMemoryMenteeRepository();
const menteeUseCase = new MenteeUseCase(menteeRepository);

const MenteeContext = createContext<MenteePort | undefined>(undefined);

export function MenteeProvider({ children }: { children: ReactNode }) {
  return (
    <MenteeContext.Provider value={menteeUseCase}>
      {children}
    </MenteeContext.Provider>
  );
}

export function useMentee() {
  const context = useContext(MenteeContext);
  if (!context) {
    throw new Error('useMentee must be used within a MenteeProvider');
  }
  return context;
}