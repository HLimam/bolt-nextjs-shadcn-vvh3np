import { User } from '@/src/domain/model/User';
import { CreateUserDto } from '../in/UserManagementPort';

export interface UserRepositoryPort {
  save(userData: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(id: string, userData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}