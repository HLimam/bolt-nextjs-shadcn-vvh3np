import { MentorPort, SearchMentorDto } from './ports/in/MentorPort';
import { MentorRepositoryPort } from './ports/out/MentorRepositoryPort';
import { Mentor } from '../domain/model/Mentor';

export class MentorUseCase implements MentorPort {
  constructor(private readonly mentorRepository: MentorRepositoryPort) {}

  async searchMentors(criteria: SearchMentorDto): Promise<Mentor[]> {
    return await this.mentorRepository.findAll(criteria);
  }

  async getMentorById(id: string): Promise<Mentor> {
    const mentor = await this.mentorRepository.findById(id);
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    return mentor;
  }

  async updateMentorProfile(id: string, data: Partial<Mentor>): Promise<Mentor> {
    const mentor = await this.mentorRepository.findById(id);
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    return await this.mentorRepository.update(id, data);
  }
}