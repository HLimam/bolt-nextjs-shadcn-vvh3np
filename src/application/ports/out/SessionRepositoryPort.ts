import { MentoringSession, SessionStatus } from '@/src/domain/model/Session';
import { CreateSessionDto } from '../in/SessionPort';

export interface SessionRepositoryPort {
  save(data: CreateSessionDto): Promise<MentoringSession>;
  updateStatus(id: string, status: SessionStatus): Promise<MentoringSession>;
  findUpcomingByMenteeId(menteeId: string): Promise<MentoringSession[]>;
  findUpcomingByMentorId(mentorId: string): Promise<MentoringSession[]>;
  findById(id: string): Promise<MentoringSession | null>;
}