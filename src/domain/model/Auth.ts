export interface User {
  id: string;
  email: string;
  name: string;
  role: 'MENTOR' | 'MENTEE' | 'ADMIN';
  profileImage?: string;
  createdAt: string;
}

export interface Session {
  user: User;
  token: string;
}