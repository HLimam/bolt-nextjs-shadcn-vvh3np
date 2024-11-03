import { MentoringSession, SessionStatus } from '@/src/domain/model/Session';

export interface CreateSessionDto {
  mentorId: string;
  menteeId: string;
  scheduledAt: string;
  duration: number;
  topic: string;
  description?: string;
}

export interface SessionPort {
  createSession(data: CreateSessionDto): Promise<MentoringSession>;
  updateSessionStatus(id: string, status: SessionStatus): Promise<MentoringSession>;
  getMenteeUpcomingSessions(menteeId: string): Promise<MentoringSession[]>;
  getMentorUpcomingSessions(mentorId: string): Promise<MentoringSession[]>;
  getSessionById(id: string): Promise<MentoringSession>;
}