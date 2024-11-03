import { Event } from '@/src/domain/model/Event';

export interface EventCriteria {
  type?: 'workshop' | 'webinar' | 'networking' | 'all';
  format?: 'online' | 'in-person' | 'all';
  topics?: string[];
  fromDate?: Date;
  toDate?: Date;
}

export interface EventPort {
  searchEvents(criteria: EventCriteria): Promise<Event[]>;
  getEventById(id: string): Promise<Event>;
  registerForEvent(eventId: string, userId: string): Promise<void>;
  cancelRegistration(eventId: string, userId: string): Promise<void>;
}