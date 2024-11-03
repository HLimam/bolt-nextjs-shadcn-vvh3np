'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ManageUserUseCase } from '../application/ManageUserUseCase';
import { InMemoryUserRepository } from '../infrastructure/adapters/InMemoryUserRepository';
import { ManageUserPort } from '../application/ports/in/ManageUserPort';

const userRepository = new InMemoryUserRepository();
const userUseCase = new ManageUserUseCase(userRepository);

const UserContext = createContext<ManageUserPort>(userUseCase);

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={userUseCase}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserManagement must be used within a UserProvider');
  }
  return context;
}