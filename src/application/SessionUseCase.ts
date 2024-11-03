import { SessionPort, CreateSessionDto } from './ports/in/SessionPort';
import { SessionRepositoryPort } from './ports/out/SessionRepositoryPort';
import { MentoringSession, SessionStatus } from '../domain/model/Session';

export class SessionUseCase implements SessionPort {
  constructor(private readonly sessionRepository: SessionRepositoryPort) {}

  async createSession(data: CreateSessionDto): Promise<MentoringSession> {
    return await this.sessionRepository.save(data);
  }

  async updateSessionStatus(id: string, status: SessionStatus): Promise<MentoringSession> {
    return await this.sessionRepository.updateStatus(id, status);
  }

  async getMenteeUpcomingSessions(menteeId: string): Promise<MentoringSession[]> {
    return await this.sessionRepository.findUpcomingByMenteeId(menteeId);
  }

  async getMentorUpcomingSessions(mentorId: string): Promise<MentoringSession[]> {
    return await this.sessionRepository.findUpcomingByMentorId(mentorId);
  }

  async getSessionById(id: string): Promise<MentoringSession> {
    const session = await this.sessionRepository.findById(id);
    if (!session) {
      throw new Error('Session not found');
    }
    return session;
  }
}