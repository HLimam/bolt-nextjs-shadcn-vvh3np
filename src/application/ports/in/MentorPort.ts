import { Mentor } from '@/src/domain/model/Mentor';

export interface SearchMentorDto {
  expertise?: string[];
  maxHourlyRate?: number;
  languages?: string[];
  experienceLevel?: 'all' | 'junior' | 'mid' | 'senior';
}

export interface MentorPort {
  searchMentors(criteria: SearchMentorDto): Promise<Mentor[]>;
  getMentorById(id: string): Promise<Mentor>;
  updateMentorProfile(id: string, data: Partial<Mentor>): Promise<Mentor>;
}