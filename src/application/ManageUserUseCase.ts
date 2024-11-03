import { User } from '../domain/model/User';
import { CreateUserDto, ManageUserPort } from './ports/in/ManageUserPort';
import { UserRepositoryPort } from './ports/out/UserRepositoryPort';

export class ManageUserUseCase implements ManageUserPort {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return await this.userRepository.save(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}