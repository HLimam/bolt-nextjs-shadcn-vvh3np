import { MentorDashboard, MenteeDashboard, AdminDashboard } from '@/src/domain/model/Dashboard';

export interface DashboardPort {
  getMentorStats(mentorId: string): Promise<MentorDashboard>;
  getMenteeStats(menteeId: string): Promise<MenteeDashboard>;
  getAdminStats(adminId: string): Promise<AdminDashboard>;
}