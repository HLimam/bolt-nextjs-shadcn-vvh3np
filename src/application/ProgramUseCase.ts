import { ProgramPort, ProgramCriteria } from './ports/in/ProgramPort';
import { ProgramRepositoryPort } from './ports/out/ProgramRepositoryPort';
import { Program } from '../domain/model/Program';

export class ProgramUseCase implements ProgramPort {
  constructor(private readonly programRepository: ProgramRepositoryPort) {}

  async searchPrograms(criteria: ProgramCriteria): Promise<Program[]> {
    return await this.programRepository.findAll(criteria);
  }

  async getProgramById(id: string): Promise<Program> {
    const program = await this.programRepository.findById(id);
    if (!program) {
      throw new Error('Program not found');
    }
    return program;
  }

  async enrollInProgram(programId: string, userId: string): Promise<void> {
    await this.programRepository.enrollUser(programId, userId);
  }

  async withdrawFromProgram(programId: string, userId: string): Promise<void> {
    await this.programRepository.withdrawUser(programId, userId);
  }
}