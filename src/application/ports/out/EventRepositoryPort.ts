import { Event } from '@/src/domain/model/Event';
import { EventCriteria } from '../in/EventPort';

export interface EventRepositoryPort {
  findAll(criteria: EventCriteria): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  registerUser(eventId: string, userId: string): Promise<void>;
  cancelRegistration(eventId: string, userId: string): Promise<void>;
}