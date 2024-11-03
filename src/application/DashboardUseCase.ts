import { DashboardPort } from './ports/in/DashboardPort';
import { DashboardRepositoryPort } from './ports/out/DashboardRepositoryPort';
import { MentorDashboard, MenteeDashboard, AdminDashboard } from '@/src/domain/model/Dashboard';

export class DashboardUseCase implements DashboardPort {
  constructor(private readonly dashboardRepository: DashboardRepositoryPort) {}

  async getMentorStats(mentorId: string): Promise<MentorDashboard> {
    return await this.dashboardRepository.getMentorStats(mentorId);
  }

  async getMenteeStats(menteeId: string): Promise<MenteeDashboard> {
    return await this.dashboardRepository.getMenteeStats(menteeId);
  }

  async getAdminStats(adminId: string): Promise<AdminDashboard> {
    return await this.dashboardRepository.getAdminStats(adminId);
  }
}