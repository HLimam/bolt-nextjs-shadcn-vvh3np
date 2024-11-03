import { CalendarEvent } from '@/src/domain/model/CalendarEvent';
import { CalendarCriteria } from '../in/CalendarPort';

export interface CalendarRepositoryPort {
  findAll(criteria: CalendarCriteria): Promise<CalendarEvent[]>;
  findById(id: string): Promise<CalendarEvent | null>;
  save(event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent>;
  updateStatus(id: string, status: 'completed' | 'cancelled'): Promise<CalendarEvent>;
}