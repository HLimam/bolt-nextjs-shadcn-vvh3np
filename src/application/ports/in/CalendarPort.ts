import { CalendarEvent } from '@/src/domain/model/CalendarEvent';

export interface CalendarCriteria {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  type?: 'session' | 'event';
  status?: 'scheduled' | 'completed' | 'cancelled';
}

export interface CalendarPort {
  getEvents(criteria: CalendarCriteria): Promise<CalendarEvent[]>;
  getEventById(id: string): Promise<CalendarEvent>;
  createEvent(event: Omit<CalendarEvent, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent>;
  updateEventStatus(id: string, status: 'completed' | 'cancelled'): Promise<CalendarEvent>;
}