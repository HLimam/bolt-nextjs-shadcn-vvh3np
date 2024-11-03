import { Application } from '@/src/domain/model/Application';

export interface ApplicationRepositoryPort {
  findByMentorId(mentorId: string): Promise<Application[]>;
  findByMenteeId(menteeId: string): Promise<Application[]>;
  findById(id: string): Promise<Application | null>;
  save(application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application>;
  updateStatus(id: string, status: 'approved' | 'rejected'): Promise<Application>;
}