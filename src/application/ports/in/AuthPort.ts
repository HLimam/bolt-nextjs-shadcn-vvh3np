import { User, Session } from '@/src/domain/model/Auth';

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto extends LoginUserDto {
  name: string;
  role: 'MENTOR' | 'MENTEE' | 'ADMIN';
}

export interface AuthPort {
  login(credentials: LoginUserDto): Promise<Session>;
  register(userData: RegisterUserDto): Promise<User>;
  logout(): Promise<void>;
  validateSession(): Promise<Session | null>;
}