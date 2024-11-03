import { Program } from '@/src/domain/model/Program';
import { ProgramCriteria } from '../in/ProgramPort';

export interface ProgramRepositoryPort {
  findAll(criteria: ProgramCriteria): Promise<Program[]>;
  findById(id: string): Promise<Program | null>;
  enrollUser(programId: string, userId: string): Promise<void>;
  withdrawUser(programId: string, userId: string): Promise<void>;
}