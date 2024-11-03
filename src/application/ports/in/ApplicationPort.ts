import { Application } from '@/src/domain/model/Application';

export interface ApplicationPort {
  getMentorApplications(mentorId: string): Promise<Application[]>;
  getMenteeApplications(menteeId: string): Promise<Application[]>;
  createApplication(application: Omit<Application, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Application>;
  updateApplicationStatus(id: string, status: 'approved' | 'rejected'): Promise<Application>;
  getApplicationById(id: string): Promise<Application>;
}