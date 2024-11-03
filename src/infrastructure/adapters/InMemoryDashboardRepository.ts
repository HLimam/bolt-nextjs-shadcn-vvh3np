import { DashboardRepositoryPort } from '@/src/application/ports/out/DashboardRepositoryPort';
import { MentorDashboard, MenteeDashboard, AdminDashboard } from '@/src/domain/model/Dashboard';

export class InMemoryDashboardRepository implements DashboardRepositoryPort {
  async getMentorStats(mentorId: string): Promise<MentorDashboard> {
    return {
      activeMentees: 12,
      upcomingSessions: 8,
      unreadMessages: 5,
      monthlyEarnings: 2400,
      recentSessions: [
        {
          id: '1',
          mentee: {
            name: 'Sarah Chen',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop',
          },
          date: '2024-02-25',
          time: '14:00',
          topic: 'React Performance Optimization',
          status: 'confirmed',
        },
        {
          id: '2',
          mentee: {
            name: 'Michael Brown',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop',
          },
          date: '2024-02-25',
          time: '16:00',
          topic: 'System Design Interview',
          status: 'pending',
        },
      ],
      recentActivity: [
        {
          id: '1',
          type: 'session_completed',
          message: 'Completed session with Sarah Chen',
          timestamp: '2024-02-24T15:00:00Z',
        },
        {
          id: '2',
          type: 'new_mentee',
          message: 'New mentee joined: Michael Brown',
          timestamp: '2024-02-24T10:00:00Z',
        },
      ],
    };
  }

  async getMenteeStats(menteeId: string): Promise<MenteeDashboard> {
    return {
      activePrograms: 2,
      completedSessions: 8,
      learningGoals: {
        completed: 3,
        total: 5,
      },
      nextSession: {
        date: '2024-02-25',
        time: '14:00',
      },
      currentPrograms: [
        {
          id: '1',
          name: 'Frontend Development Mastery',
          mentor: {
            name: 'John Doe',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop',
          },
          progress: 65,
          nextSession: '2024-02-25T14:00:00Z',
        },
        {
          id: '2',
          name: 'System Design Fundamentals',
          mentor: {
            name: 'Sarah Chen',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop',
          },
          progress: 30,
          nextSession: '2024-02-26T15:00:00Z',
        },
      ],
    };
  }

  async getAdminStats(adminId: string): Promise<AdminDashboard> {
    return {
      totalUsers: 2834,
      activeSessions: 486,
      revenue: 48294,
      platformGrowth: 18,
      recentActivity: [
        {
          id: '1',
          type: 'new_mentor',
          message: 'New mentor joined the platform',
          timestamp: '2024-02-25T10:00:00Z',
        },
        {
          id: '2',
          type: 'session_milestone',
          message: '15 mentoring sessions completed today',
          timestamp: '2024-02-25T09:30:00Z',
        },
      ],
    };
  }
}