'use client';

import { createContext, useContext, ReactNode } from 'react';
import { MentorPort } from '@/src/application/ports/in/MentorPort';
import { MentorUseCase } from '@/src/application/MentorUseCase';
import { InMemoryMentorRepository } from '@/src/infrastructure/adapters/InMemoryMentorRepository';

const mentorRepository = new InMemoryMentorRepository();
const mentorUseCase = new MentorUseCase(mentorRepository);

const MentorContext = createContext<MentorPort>(mentorUseCase);

export function MentorProvider({ children }: { children: ReactNode }) {
  return (
    <MentorContext.Provider value={mentorUseCase}>
      {children}
    </MentorContext.Provider>
  );
}

export function useMentor() {
  const context = useContext(MentorContext);
  if (!context) {
    throw new Error('useMentor must be used within a MentorProvider');
  }
  return context;
}