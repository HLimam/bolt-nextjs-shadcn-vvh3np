export interface MentoringSession {
  id: string;
  mentorId: string;
  menteeId: string;
  status: SessionStatus;
  scheduledAt: string;
  duration: number; // in minutes
  topic: string;
  description?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export enum SessionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}