export interface User {
  id: string;
  email: string;
  name: string;
  role: 'MENTOR' | 'MENTEE' | 'ADMIN';
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}