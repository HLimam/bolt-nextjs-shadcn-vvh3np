import { MenteePort } from './ports/in/MenteePort';
import { MenteeRepositoryPort } from './ports/out/MenteeRepositoryPort';
import { Mentee } from '../domain/model/Mentee';

export class MenteeUseCase implements MenteePort {
  constructor(private readonly menteeRepository: MenteeRepositoryPort) {}

  async getMenteeById(id: string): Promise<Mentee> {
    const mentee = await this.menteeRepository.findById(id);
    if (!mentee) {
      throw new Error('Mentee not found');
    }
    return mentee;
  }

  async getAllMentees(): Promise<Mentee[]> {
    return await this.menteeRepository.findAll();
  }

  async updateMentee(id: string, data: Partial<Mentee>): Promise<Mentee> {
    const mentee = await this.menteeRepository.findById(id);
    if (!mentee) {
      throw new Error('Mentee not found');
    }
    const updatedMentee = { ...mentee, ...data };
    return await this.menteeRepository.save(updatedMentee);
  }

  async deleteMentee(id: string): Promise<void> {
    await this.menteeRepository.delete(id);
  }
}