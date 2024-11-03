'use client';

import { createContext, useContext, ReactNode } from 'react';
import { EventPort } from '@/src/application/ports/in/EventPort';
import { EventUseCase } from '@/src/application/EventUseCase';
import { InMemoryEventRepository } from '@/src/infrastructure/adapters/InMemoryEventRepository';

const eventRepository = new InMemoryEventRepository();
const eventUseCase = new EventUseCase(eventRepository);

const EventContext = createContext<EventPort>(eventUseCase);

export function EventProvider({ children }: { children: ReactNode }) {
  return (
    <EventContext.Provider value={eventUseCase}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}