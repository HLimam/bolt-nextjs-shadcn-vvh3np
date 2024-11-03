import { AuthRepositoryPort } from '@/src/application/ports/out/AuthRepositoryPort';
import { User, Session } from '@/src/domain/model/Auth';
import { RegisterUserDto } from '@/src/application/ports/in/AuthPort';

// Mock users with plain password for testing (password123)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'mentor@example.com',
    name: 'John Mentor',
    role: 'MENTOR',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'mentee@example.com',
    name: 'Sarah Mentee',
    role: 'MENTEE',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Alex Admin',
    role: 'ADMIN',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

const mockSessions = new Map<string, Session>();

export class InMemoryAuthRepository implements AuthRepositoryPort {
  async findByEmail(email: string): Promise<User | null> {
    const user = mockUsers.find(u => u.email === email);
    return user || null;
  }

  async save(userData: RegisterUserDto): Promise<User> {
    const id = (mockUsers.length + 1).toString();
    
    const newUser: User = {
      id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    return newUser;
  }

  async createSession(user: User): Promise<Session> {
    const session: Session = { user };
    mockSessions.set(user.id, session);
    return session;
  }

  async validateSession(userId: string): Promise<Session | null> {
    return mockSessions.get(userId) || null;
  }

  async removeSession(userId: string): Promise<void> {
    mockSessions.delete(userId);
  }
}