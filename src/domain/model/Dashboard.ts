export interface Session {
  id: string;
  mentee: {
    name: string;
    image: string;
  };
  date: string;
  time: string;
  topic: string;
  status: 'confirmed' | 'pending';
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export interface Program {
  id: string;
  name: string;
  mentor: {
    name: string;
    image: string;
  };
  progress: number;
  nextSession: string;
}

export interface MentorDashboard {
  activeMentees: number;
  upcomingSessions: number;
  unreadMessages: number;
  monthlyEarnings: number;
  recentSessions: Session[];
  recentActivity: Activity[];
}

export interface MenteeDashboard {
  activePrograms: number;
  completedSessions: number;
  learningGoals: {
    completed: number;
    total: number;
  };
  nextSession: {
    date: string;
    time: string;
  };
  currentPrograms: Program[];
}

export interface AdminDashboard {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  platformGrowth: number;
  recentActivity: Activity[];
}