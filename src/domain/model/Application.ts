export interface Application {
  id: string;
  menteeId: string;
  mentorId: string;
  programId: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
  mentee: {
    name: string;
    email: string;
    image?: string;
  };
  program: {
    title: string;
    duration: string;
    price: number;
  };
  createdAt: string;
  updatedAt: string;
}