import { CalendarRepositoryPort } from '@/src/application/ports/out/CalendarRepositoryPort';
import { CalendarEvent } from '@/src/domain/model/CalendarEvent';
import { CalendarCriteria } from '@/src/application/ports/in/CalendarPort';

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Mentoring Session',
    type: 'session',
    date: '2024-03-01T10:00:00Z',
    duration: 60,
    format: 'video',
    participant: {
      id: '1',
      name: 'John Doe',
      image: 'https://example.com/avatar.jpg',
    },
    status: 'scheduled',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export class InMemoryCalendarRepository implements CalendarRepositoryPort {
  private events: CalendarEvent[] = mockEvents;

  async findAll(criteria: CalendarCriteria): Promise<CalendarEvent[]> {
    let filteredEvents = [...this.events];

    if (criteria.userId) {
      filteredEvents = filteredEvents.filter(e => 
        e.participant.id === criteria.userId
      );
    }

    if (criteria.startDate) {
      filteredEvents = filteredEvents.filter(e => 
        new Date(e.date) >= criteria.startDate
      );
    }

    if (criteria.endDate) {
      filteredEvents = filteredEvents.filter(e => 
        new Date(e.date) <= criteria.endDate
      );
    }

    if (criteria.type) {
      filteredEvents = filteredEvents.filter(e => e.type === criteria.type);
    }

    if (criteria.status) {
      filteredEvents = filteredEvents.filter(e => e.status === criteria.status);
    }

    return filteredEvents;
  }

  async findById(id: string): Promise<CalendarEvent | null> {
    const event = this.events.find(e => e.id === id);
    return event || null;
  }

  async save(event: Omit<CalendarEvent, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> {
    const newEvent: CalendarEvent = {
      id: (this.events.length + 1).toString(),
      ...event,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  async updateStatus(id: string, status: 'completed' | 'cancelled'): Promise<CalendarEvent> {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Event not found');

    const updatedEvent = {
      ...this.events[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    this.events[index] = updatedEvent;
    return updatedEvent;
  }
}