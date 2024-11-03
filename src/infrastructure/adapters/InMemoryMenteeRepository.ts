import { MenteeRepositoryPort } from '@/src/application/ports/out/MenteeRepositoryPort';
import { Mentee } from '@/src/domain/model/Mentee';
import { db } from '@/src/lib/db';

const mockMentees: Mentee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop',
    activePrograms: 2,
    completedSessions: 8,
    learningGoals: ['Master React', 'Learn TypeScript', 'Understand System Design'],
    nextSession: {
      date: '2024-02-25T14:00:00Z',
      topic: 'React Performance Optimization',
    },
    progress: [
      {
        programId: '1',
        completed: 65,
        total: 100,
      },
      {
        programId: '2',
        completed: 30,
        total: 100,
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Michael Brown',
    email: 'michael@example.com',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop',
    activePrograms: 1,
    completedSessions: 4,
    learningGoals: ['Learn Node.js', 'Master Database Design'],
    nextSession: {
      date: '2024-02-25T16:00:00Z',
      topic: 'System Design Interview',
    },
    progress: [
      {
        programId: '3',
        completed: 45,
        total: 100,
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export class InMemoryMenteeRepository implements MenteeRepositoryPort {
  private mentees: Map<string, Mentee> = new Map(mockMentees.map(m => [m.id, m]));

  async findById(id: string): Promise<Mentee | null> {
    return this.mentees.get(id) || null;
  }

  async findAll(): Promise<Mentee[]> {
    return Array.from(this.mentees.values());
  }

  async save(mentee: Mentee): Promise<Mentee> {
    this.mentees.set(mentee.id, {
      ...mentee,
      updatedAt: new Date().toISOString(),
    });
    return mentee;
  }

  async delete(id: string): Promise<void> {
    this.mentees.delete(id);
  }
}