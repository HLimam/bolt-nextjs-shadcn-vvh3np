import { User, Session } from '@/src/domain/model/Auth';
import { LoginUserDto, RegisterUserDto } from '../in/AuthPort';

export interface AuthRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  save(userData: RegisterUserDto): Promise<User>;
  createSession(user: User): Promise<Session>;
  validateSession(token: string): Promise<Session | null>;
  removeSession(token: string): Promise<void>;
}