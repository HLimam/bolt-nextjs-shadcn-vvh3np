export interface Mentor extends User {
  expertise: string[];
  yearsOfExperience: number;
  availability: Availability[];
  rating: number;
  reviews: Review[];
  languages: string[];
  currentRole: string;
  company: string;
  linkedIn?: string;
  location: string;
  timezone: string;
  programs: MentorProgram[];
}

export interface MentorProgram {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  sessionsPerMonth: number;
  features: string[];
  isPopular?: boolean;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
}

export interface Review {
  id: string;
  menteeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}