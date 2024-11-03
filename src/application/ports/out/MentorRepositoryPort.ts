import { Mentor } from '@/src/domain/model/Mentor';
import { SearchMentorDto } from '../in/MentorPort';

export interface MentorRepositoryPort {
  findAll(criteria: SearchMentorDto): Promise<Mentor[]>;
  findById(id: string): Promise<Mentor | null>;
  save(mentor: Mentor): Promise<Mentor>;
  update(id: string, data: Partial<Mentor>): Promise<Mentor>;
}