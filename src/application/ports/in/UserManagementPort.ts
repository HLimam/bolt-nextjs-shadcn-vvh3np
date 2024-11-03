import { User } from '@/src/domain/model/User';

export interface CreateUserDto {
  name: string;
  email: string;
  role: string;
}

export interface UserManagementPort {
  createUser(userData: CreateUserDto): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}