import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'MENTOR' | 'MENTEE' | 'ADMIN';
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: 'MENTOR' | 'MENTEE' | 'ADMIN';
    image?: string;
  }

  interface JWT {
    id: string;
    role: 'MENTOR' | 'MENTEE' | 'ADMIN';
  }
}