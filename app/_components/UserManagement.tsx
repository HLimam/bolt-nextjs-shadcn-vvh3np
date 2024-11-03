'use client';

import { useEffect, useState } from 'react';
import { UserForm } from './UserForm';
import { UserList } from './UserList';
import { User } from '@/src/domain/model/User';
import { useUserManagement } from '@/src/providers/UserProvider';
import { useAuth } from '@/src/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const userManagement = useUserManagement();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }
    loadUsers();
  }, [user, router]);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await userManagement.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleCreateUser = async (data: Omit<User, 'id' | 'createdAt'>) => {
    const newUser = await userManagement.createUser(data);
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDeleteUser = async (id: string) => {
    await userManagement.deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Create User</h2>
        <UserForm onSubmit={handleCreateUser} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <UserList users={users} onDelete={handleDeleteUser} />
      </div>
    </div>
  );
}