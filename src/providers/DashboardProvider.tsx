'use client';

import { createContext, useContext, ReactNode } from 'react';
import { DashboardPort } from '@/src/application/ports/in/DashboardPort';
import { DashboardUseCase } from '@/src/application/DashboardUseCase';
import { InMemoryDashboardRepository } from '@/src/infrastructure/adapters/InMemoryDashboardRepository';

const dashboardRepository = new InMemoryDashboardRepository();
const dashboardUseCase = new DashboardUseCase(dashboardRepository);

const DashboardContext = createContext<DashboardPort>(dashboardUseCase);

export function DashboardProvider({ children }: { children: ReactNode }) {
  return (
    <DashboardContext.Provider value={dashboardUseCase}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}