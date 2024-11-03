import { User } from '@/src/domain/model/User';

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface ManageUserPort {
  createUser(user: CreateUserDto): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
}