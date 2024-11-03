import { Mentee } from '@/src/domain/model/Mentee';

export interface MenteeRepositoryPort {
  findById(id: string): Promise<Mentee | null>;
  findAll(): Promise<Mentee[]>;
  save(mentee: Mentee): Promise<Mentee>;
  delete(id: string): Promise<void>;
}