import { EventRepositoryPort } from '@/src/application/ports/out/EventRepositoryPort';
import { Event } from '@/src/domain/model/Event';
import { EventCriteria } from '@/src/application/ports/in/EventPort';
import { db } from '@/src/lib/db';

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Performance Workshop',
    description: 'Learn advanced React performance optimization techniques from industry experts. We\'ll cover code splitting, memo, useMemo, useCallback, and more.',
    date: '2024-03-15T10:00:00Z',
    time: '10:00 AM',
    type: 'workshop',
    format: 'online',
    location: 'Zoom',
    capacity: 30,
    spotsLeft: 15,
    price: 49.99,
    speaker: {
      name: 'John Doe',
      role: 'Senior Frontend Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    topics: ['React', 'Performance', 'Optimization'],
    createdBy: {
      id: '1',
      role: 'MENTOR',
    },
    registrations: [],
    agenda: [
      {
        time: '10:00 AM',
        title: 'Introduction to Performance',
        description: 'Overview of React performance concepts',
      },
      {
        time: '11:00 AM',
        title: 'Practical Optimization',
        description: 'Hands-on performance optimization techniques',
      },
      {
        time: '12:00 PM',
        title: 'Q&A Session',
        description: 'Interactive discussion and problem solving',
      },
    ],
    requirements: [
      'Basic React knowledge',
      'Laptop with Node.js installed',
      'Code editor of your choice',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Cloud Architecture Fundamentals',
    description: 'Essential cloud architecture patterns and best practices for scalable applications.',
    date: '2024-03-20T14:00:00Z',
    time: '2:00 PM',
    type: 'webinar',
    format: 'online',
    location: 'Google Meet',
    capacity: 50,
    spotsLeft: 32,
    price: 0,
    speaker: {
      name: 'Sarah Chen',
      role: 'Cloud Architect',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    topics: ['AWS', 'Cloud', 'Architecture'],
    createdBy: {
      id: '2',
      role: 'MENTOR',
    },
    registrations: [],
    agenda: [
      {
        time: '2:00 PM',
        title: 'Cloud Basics',
        description: 'Introduction to cloud concepts',
      },
      {
        time: '3:00 PM',
        title: 'Architecture Patterns',
        description: 'Common cloud architecture patterns',
      },
      {
        time: '4:00 PM',
        title: 'Best Practices',
        description: 'Implementation best practices and tips',
      },
    ],
    requirements: [
      'Basic understanding of web applications',
      'Interest in cloud computing',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Tech Career Networking Event',
    description: 'Connect with industry professionals and explore career opportunities in tech.',
    date: '2024-03-25T18:00:00Z',
    time: '6:00 PM',
    type: 'networking',
    format: 'in-person',
    location: 'Tech Hub, San Francisco',
    capacity: 100,
    spotsLeft: 45,
    price: 0,
    speaker: {
      name: 'Alex Thompson',
      role: 'Tech Community Manager',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
    topics: ['Career', 'Networking', 'Professional Development'],
    createdBy: {
      id: 'admin1',
      role: 'ADMIN',
    },
    registrations: [],
    agenda: [
      {
        time: '6:00 PM',
        title: 'Welcome & Introduction',
        description: 'Event kickoff and overview',
      },
      {
        time: '6:30 PM',
        title: 'Networking Session',
        description: 'Open networking with professionals',
      },
      {
        time: '8:00 PM',
        title: 'Closing Remarks',
        description: 'Event wrap-up and next steps',
      },
    ],
    requirements: [
      'Professional attire recommended',
      'Business cards if available',
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Initialize mock data
mockEvents.forEach(event => {
  db.events.set(event.id, event);
});

export class InMemoryEventRepository implements EventRepositoryPort {
  async findAll(criteria: EventCriteria): Promise<Event[]> {
    let events = Array.from(db.events.values());

    if (criteria.type && criteria.type !== 'all') {
      events = events.filter(e => e.type === criteria.type);
    }

    if (criteria.format && criteria.format !== 'all') {
      events = events.filter(e => e.format === criteria.format);
    }

    if (criteria.topics?.length) {
      events = events.filter(e =>
        criteria.topics!.every(topic => e.topics.includes(topic))
      );
    }

    if (criteria.fromDate) {
      events = events.filter(e => new Date(e.date) >= criteria.fromDate!);
    }

    if (criteria.toDate) {
      events = events.filter(e => new Date(e.date) <= criteria.toDate!);
    }

    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async findById(id: string): Promise<Event | null> {
    return db.events.get(id) || null;
  }

  async registerUser(eventId: string, userId: string): Promise<void> {
    const event = db.events.get(eventId);
    if (!event) throw new Error('Event not found');
    if (event.spotsLeft <= 0) throw new Error('Event is full');
    if (event.registrations.includes(userId)) throw new Error('Already registered');

    event.registrations.push(userId);
    event.spotsLeft--;
    event.updatedAt = new Date().toISOString();
    db.events.set(eventId, event);
  }

  async cancelRegistration(eventId: string, userId: string): Promise<void> {
    const event = db.events.get(eventId);
    if (!event) throw new Error('Event not found');
    
    const index = event.registrations.indexOf(userId);
    if (index === -1) throw new Error('Not registered for this event');

    event.registrations.splice(index, 1);
    event.spotsLeft++;
    event.updatedAt = new Date().toISOString();
    db.events.set(eventId, event);
  }

  async create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'registrations'>): Promise<Event> {
    const id = (db.events.size + 1).toString();
    const now = new Date().toISOString();

    const newEvent: Event = {
      id,
      ...event,
      registrations: [],
      createdAt: now,
      updatedAt: now,
    };

    db.events.set(id, newEvent);
    return newEvent;
  }
}