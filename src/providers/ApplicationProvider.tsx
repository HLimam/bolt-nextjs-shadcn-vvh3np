'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ApplicationPort } from '@/src/application/ports/in/ApplicationPort';
import { ApplicationUseCase } from '@/src/application/ApplicationUseCase';
import { InMemoryApplicationRepository } from '@/src/infrastructure/adapters/InMemoryApplicationRepository';

const applicationRepository = new InMemoryApplicationRepository();
const applicationUseCase = new ApplicationUseCase(applicationRepository);

const ApplicationContext = createContext<ApplicationPort>(applicationUseCase);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  return (
    <ApplicationContext.Provider value={applicationUseCase}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
}