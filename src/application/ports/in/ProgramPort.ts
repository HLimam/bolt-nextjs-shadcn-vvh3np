import { Program } from '@/src/domain/model/Program';

export interface ProgramCriteria {
  level?: 'beginner' | 'intermediate' | 'advanced' | 'all';
  minPrice?: number;
  maxPrice?: number;
  topics?: string[];
  duration?: '4-8' | '12-16' | '20+';
}

export interface ProgramPort {
  searchPrograms(criteria: ProgramCriteria): Promise<Program[]>;
  getProgramById(id: string): Promise<Program>;
  enrollInProgram(programId: string, userId: string): Promise<void>;
  withdrawFromProgram(programId: string, userId: string): Promise<void>;
}