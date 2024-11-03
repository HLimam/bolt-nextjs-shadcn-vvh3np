import { AuthPort, LoginUserDto, RegisterUserDto } from './ports/in/AuthPort';
import { AuthRepositoryPort } from './ports/out/AuthRepositoryPort';
import { Session } from '../domain/model/Auth';

export class AuthUseCase implements AuthPort {
  constructor(private readonly authRepository: AuthRepositoryPort) {}

  async login(credentials: LoginUserDto): Promise<Session> {
    const user = await this.authRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    // In a real app, we would validate the password here
    return await this.authRepository.createSession(user);
  }

  async register(userData: RegisterUserDto) {
    const existingUser = await this.authRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    return await this.authRepository.save(userData);
  }

  async logout(): Promise<void> {
    // In a real app, we would get the token from cookies/storage
    const token = 'current-session-token';
    await this.authRepository.removeSession(token);
  }

  async validateSession(): Promise<Session | null> {
    // In a real app, we would get the token from cookies/storage
    const token = 'current-session-token';
    return await this.authRepository.validateSession(token);
  }
}