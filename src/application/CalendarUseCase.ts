import { CalendarPort, CalendarCriteria } from './ports/in/CalendarPort';
import { CalendarRepositoryPort } from './ports/out/CalendarRepositoryPort';
import { CalendarEvent } from '../domain/model/CalendarEvent';

export class CalendarUseCase implements CalendarPort {
  constructor(private readonly calendarRepository: CalendarRepositoryPort) {}

  async getEvents(criteria: CalendarCriteria): Promise<CalendarEvent[]> {
    return await this.calendarRepository.findAll(criteria);
  }

  async getEventById(id: string): Promise<CalendarEvent> {
    const event = await this.calendarRepository.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async createEvent(
    event: Omit<CalendarEvent, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<CalendarEvent> {
    return await this.calendarRepository.save({
      ...event,
      status: 'scheduled',
    });
  }

  async updateEventStatus(id: string, status: 'completed' | 'cancelled'): Promise<CalendarEvent> {
    return await this.calendarRepository.updateStatus(id, status);
  }
}