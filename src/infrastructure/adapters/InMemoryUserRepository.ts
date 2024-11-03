import { UserRepositoryPort } from '@/src/application/ports/out/UserRepositoryPort';
import { User } from '@/src/domain/model/User';
import { CreateUserDto } from '@/src/application/ports/in/UserManagementPort';
import { db } from '@/src/lib/db';
import { randomUUID } from 'crypto';

export class InMemoryUserRepository implements UserRepositoryPort {
  async save(userData: CreateUserDto): Promise<User> {
    const id = randomUUID();
    const now = new Date().toISOString();
    
    const user: User = {
      id,
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    db.users.set(id, user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return Array.from(db.users.values());
  }

  async findById(id: string): Promise<User | null> {
    return db.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return Array.from(db.users.values()).find(user => user.email === email) || null;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const existingUser = db.users.get(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...existingUser,
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    db.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    db.users.delete(id);
  }
}