import { ApplicationPort } from './ports/in/ApplicationPort';
import { ApplicationRepositoryPort } from './ports/out/ApplicationRepositoryPort';
import { Application } from '../domain/model/Application';

export class ApplicationUseCase implements ApplicationPort {
  constructor(private readonly applicationRepository: ApplicationRepositoryPort) {}

  async getMentorApplications(mentorId: string): Promise<Application[]> {
    return await this.applicationRepository.findByMentorId(mentorId);
  }

  async getMenteeApplications(menteeId: string): Promise<Application[]> {
    return await this.applicationRepository.findByMenteeId(menteeId);
  }

  async createApplication(
    application: Omit<Application, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<Application> {
    return await this.applicationRepository.save({
      ...application,
      status: 'pending',
    });
  }

  async updateApplicationStatus(id: string, status: 'approved' | 'rejected'): Promise<Application> {
    return await this.applicationRepository.updateStatus(id, status);
  }

  async getApplicationById(id: string): Promise<Application> {
    const application = await this.applicationRepository.findById(id);
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }
}