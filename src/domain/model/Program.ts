export interface Program {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  duration: string;
  price: number;
  mentorCount: number;
  startDate: string;
  curriculum: {
    weeks: {
      number: number;
      title: string;
      topics: string[];
    }[];
  };
  features: string[];
  mentors: {
    id: string;
    name: string;
    role: string;
    image: string;
    expertise: string[];
  }[];
  createdAt: string;
  updatedAt: string;
}