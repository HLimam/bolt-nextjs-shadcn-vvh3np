// In-memory database
export const db = {
  users: new Map(),
  sessions: new Map(),
  accounts: new Map(),
  mentors: new Map(),
  mentees: new Map(),
  programs: new Map(),
  applications: new Map(),
  messages: new Map(),
  notifications: new Map(),
  events: new Map(),
  reviews: new Map(),
  blogs: new Map(),
  conversations: new Map(),
  // Dashboard stats
  mentorStats: new Map([
    ['1', {
      activeMentees: 12,
      upcomingSessions: 8,
      unreadMessages: 5,
      monthlyEarnings: 2400,
      nextSession: 'Today 2PM',
      monthlyGrowth: '+12% from last month',
      recentSessions: [
        {
          id: '1',
          mentee: {
            name: 'Sarah Chen',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
          },
          date: '2024-02-25T14:00:00Z',
          topic: 'React Performance Optimization',
          status: 'confirmed',
        },
        {
          id: '2',
          mentee: {
            name: 'Michael Brown',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
          },
          date: '2024-02-25T16:00:00Z',
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
          type: 'review_received',
          message: 'New 5-star review from Michael Brown',
          timestamp: '2024-02-24T12:00:00Z',
        },
      ],
    }]
  ]),
  // ... rest of the db object remains the same
};