'use client';

import { createContext, useContext, ReactNode } from 'react';
import { CalendarPort } from '@/src/application/ports/in/CalendarPort';
import { CalendarUseCase } from '@/src/application/CalendarUseCase';
import { InMemoryCalendarRepository } from '@/src/infrastructure/adapters/InMemoryCalendarRepository';

const calendarRepository = new InMemoryCalendarRepository();
const calendarUseCase = new CalendarUseCase(calendarRepository);

const CalendarContext = createContext<CalendarPort>(calendarUseCase);

export function CalendarProvider({ children }: { children: ReactNode }) {
  return (
    <CalendarContext.Provider value={calendarUseCase}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}