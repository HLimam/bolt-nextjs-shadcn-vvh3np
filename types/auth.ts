export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'mentee' | 'mentor' | 'admin';
}