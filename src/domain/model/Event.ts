export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'workshop' | 'webinar' | 'networking';
  format: 'online' | 'in-person';
  location?: string;
  capacity: number;
  spotsLeft: number;
  price: number;
  speaker: {
    name: string;
    role: string;
    image?: string;
  };
  topics: string[];
  createdBy: {
    id: string;
    role: 'MENTOR' | 'ADMIN';
  };
  registrations: string[];
  agenda: {
    time: string;
    title: string;
    description: string;
  }[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}