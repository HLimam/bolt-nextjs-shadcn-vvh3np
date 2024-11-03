'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ProgramPort } from '@/src/application/ports/in/ProgramPort';
import { ProgramUseCase } from '@/src/application/ProgramUseCase';
import { InMemoryProgramRepository } from '@/src/infrastructure/adapters/InMemoryProgramRepository';

const programRepository = new InMemoryProgramRepository();
const programUseCase = new ProgramUseCase(programRepository);

const ProgramContext = createContext<ProgramPort>(programUseCase);

export function ProgramProvider({ children }: { children: ReactNode }) {
  return (
    <ProgramContext.Provider value={programUseCase}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('useProgram must be used within a ProgramProvider');
  }
  return context;
}