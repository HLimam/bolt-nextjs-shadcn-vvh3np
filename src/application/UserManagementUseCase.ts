import { UserManagementPort, CreateUserDto } from './ports/in/UserManagementPort';
import { UserRepositoryPort } from './ports/out/UserRepositoryPort';
import { User } from '../domain/model/User';

export class UserManagementUseCase implements UserManagementPort {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findById(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return await this.userRepository.save(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}