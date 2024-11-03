import { ApplicationRepositoryPort } from '@/src/application/ports/out/ApplicationRepositoryPort';
import { Application } from '@/src/domain/model/Application';
import { db } from '@/src/lib/db';
import { randomUUID } from 'crypto';

export class InMemoryApplicationRepository implements ApplicationRepositoryPort {
  async findByMentorId(mentorId: string): Promise<Application[]> {
    return Array.from(db.applications.values())
      .filter(app => app.mentorId === mentorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async findByMenteeId(menteeId: string): Promise<Application[]> {
    return Array.from(db.applications.values())
      .filter(app => app.menteeId === menteeId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async findById(id: string): Promise<Application | null> {
    return db.applications.get(id) || null;
  }

  async save(application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application> {
    const id = randomUUID();
    const now = new Date().toISOString();

    const newApplication: Application = {
      id,
      ...application,
      createdAt: now,
      updatedAt: now,
    };

    db.applications.set(id, newApplication);
    return newApplication;
  }

  async updateStatus(id: string, status: 'approved' | 'rejected'): Promise<Application> {
    const application = db.applications.get(id);
    if (!application) {
      throw new Error('Application not found');
    }

    const updatedApplication = {
      ...application,
      status,
      updatedAt: new Date().toISOString(),
    };

    db.applications.set(id, updatedApplication);
    return updatedApplication;
  }
}