import { Mentee } from '@/src/domain/model/Mentee';

export interface MenteePort {
  getMenteeById(id: string): Promise<Mentee>;
  getAllMentees(): Promise<Mentee[]>;
  updateMentee(id: string, data: Partial<Mentee>): Promise<Mentee>;
  deleteMentee(id: string): Promise<void>;
}