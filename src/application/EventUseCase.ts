import { EventPort, EventCriteria } from './ports/in/EventPort';
import { EventRepositoryPort } from './ports/out/EventRepositoryPort';
import { Event } from '../domain/model/Event';

export class EventUseCase implements EventPort {
  constructor(private readonly eventRepository: EventRepositoryPort) {}

  async searchEvents(criteria: EventCriteria): Promise<Event[]> {
    return await this.eventRepository.findAll(criteria);
  }

  async getEventById(id: string): Promise<Event> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async registerForEvent(eventId: string, userId: string): Promise<void> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    if (event.spotsLeft <= 0) {
      throw new Error('Event is full');
    }
    await this.eventRepository.registerUser(eventId, userId);
  }

  async cancelRegistration(eventId: string, userId: string): Promise<void> {
    await this.eventRepository.cancelRegistration(eventId, userId);
  }
}