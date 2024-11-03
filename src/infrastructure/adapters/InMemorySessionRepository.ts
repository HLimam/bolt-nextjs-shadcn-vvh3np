import { SessionRepositoryPort } from '@/src/application/ports/out/SessionRepositoryPort';
import { MentoringSession, SessionStatus } from '@/src/domain/model/Session';
import { CreateSessionDto } from '@/src/application/ports/in/SessionPort';
import { db } from '@/src/lib/db';
import { randomUUID } from 'crypto';

// Initialize with mock data
const mockSessions: MentoringSession[] = [
  {
    id: '1',
    mentorId: '1',
    menteeId: '2',
    status: SessionStatus.COMPLETED,
    scheduledAt: '2024-02-20T14:00:00Z',
    duration: 60,
    topic: 'React Performance Optimization',
    description: 'Deep dive into React performance optimization techniques',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    mentor: {
      id: '1',
      name: 'John Mentor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    mentee: {
      id: '2',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    createdAt: '2024-02-19T10:00:00Z',
    updatedAt: '2024-02-20T15:00:00Z',
  },
  {
    id: '2',
    mentorId: '1',
    menteeId: '2',
    status: SessionStatus.CANCELLED,
    scheduledAt: '2024-02-22T15:00:00Z',
    duration: 45,
    topic: 'TypeScript Best Practices',
    description: 'Discussion about TypeScript patterns and best practices',
    meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
    mentor: {
      id: '1',
      name: 'John Mentor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    mentee: {
      id: '2',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    createdAt: '2024-02-21T09:00:00Z',
    updatedAt: '2024-02-21T12:00:00Z',
  },
  {
    id: '3',
    mentorId: '1',
    menteeId: '2',
    status: SessionStatus.CONFIRMED,
    scheduledAt: '2024-03-01T16:00:00Z',
    duration: 60,
    topic: 'System Design Interview Prep',
    description: 'Preparation for system design interviews with practice problems',
    meetingLink: 'https://meet.google.com/123-456-789',
    mentor: {
      id: '1',
      name: 'John Mentor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    mentee: {
      id: '2',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    createdAt: '2024-02-25T11:00:00Z',
    updatedAt: '2024-02-25T11:00:00Z',
  },
  {
    id: '4',
    mentorId: '1',
    menteeId: '2',
    status: SessionStatus.PENDING,
    scheduledAt: '2024-03-05T14:00:00Z',
    duration: 45,
    topic: 'Career Growth Discussion',
    description: 'Discussion about career progression and next steps',
    mentor: {
      id: '1',
      name: 'John Mentor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    mentee: {
      id: '2',
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    createdAt: '2024-02-26T09:00:00Z',
    updatedAt: '2024-02-26T09:00:00Z',
  },
];

// Initialize mock data in db
mockSessions.forEach(session => db.sessions.set(session.id, session));

export class InMemorySessionRepository implements SessionRepositoryPort {
  async save(data: CreateSessionDto): Promise<MentoringSession> {
    const id = randomUUID();
    const now = new Date().toISOString();

    const session: MentoringSession = {
      id,
      ...data,
      status: SessionStatus.PENDING,
      mentor: {
        id: data.mentorId,
        name: db.users.get(data.mentorId)?.name || 'Unknown Mentor',
        image: db.users.get(data.mentorId)?.image,
      },
      mentee: {
        id: data.menteeId,
        name: db.users.get(data.menteeId)?.name || 'Unknown Mentee',
        image: db.users.get(data.menteeId)?.image,
      },
      createdAt: now,
      updatedAt: now,
    };

    db.sessions.set(id, session);
    return session;
  }

  async updateStatus(id: string, status: SessionStatus): Promise<MentoringSession> {
    const session = db.sessions.get(id);
    if (!session) {
      throw new Error('Session not found');
    }

    const updatedSession = {
      ...session,
      status,
      updatedAt: new Date().toISOString(),
    };

    db.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async findUpcomingByMenteeId(menteeId: string): Promise<MentoringSession[]> {
    const now = new Date();
    return Array.from(db.sessions.values())
      .filter(session => 
        session.menteeId === menteeId &&
        new Date(session.scheduledAt) > now &&
        session.status === SessionStatus.CONFIRMED
      )
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }

  async findUpcomingByMentorId(mentorId: string): Promise<MentoringSession[]> {
    const now = new Date();
    return Array.from(db.sessions.values())
      .filter(session => 
        session.mentorId === mentorId &&
        new Date(session.scheduledAt) > now &&
        session.status === SessionStatus.CONFIRMED
      )
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }

  async findById(id: string): Promise<MentoringSession | null> {
    return db.sessions.get(id) || null;
  }

  async findAllByMenteeId(menteeId: string): Promise<MentoringSession[]> {
    return Array.from(db.sessions.values())
      .filter(session => session.menteeId === menteeId)
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  }

  async findAllByMentorId(mentorId: string): Promise<MentoringSession[]> {
    return Array.from(db.sessions.values())
      .filter(session => session.mentorId === mentorId)
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  }

  async findCompletedByMenteeId(menteeId: string): Promise<MentoringSession[]> {
    return Array.from(db.sessions.values())
      .filter(session => 
        session.menteeId === menteeId &&
        session.status === SessionStatus.COMPLETED
      )
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  }

  async findCancelledByMenteeId(menteeId: string): Promise<MentoringSession[]> {
    return Array.from(db.sessions.values())
      .filter(session => 
        session.menteeId === menteeId &&
        session.status === SessionStatus.CANCELLED
      )
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  }

  async findCompletedByMentorId(mentorId: string): Promise<MentoringSession[]> {
    return Array.from(db.sessions.values())
      .filter(session => 
        session.mentorId === mentorId &&
        session.status === SessionStatus.COMPLETED
      )
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  }

  async findCancelledByMentorId(mentorId: string): Promise<MentoringSession[]> {
    return Array.from(db.sessions.values())
      .filter(session => 
        session.mentorId === mentorId &&
        session.status === SessionStatus.CANCELLED
      )
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  }

  async findSessionsByStatus(userId: string, status: SessionStatus, role: 'mentor' | 'mentee'): Promise<MentoringSession[]> {
    return Array.from(db.sessions.values())
      .filter(session => 
        (role === 'mentor' ? session.mentorId === userId : session.menteeId === userId) &&
        session.status === status
      )
      .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  }
}