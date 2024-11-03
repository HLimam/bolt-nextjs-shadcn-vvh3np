export interface Mentee {
  id: string;
  name: string;
  email: string;
  image?: string;
  activePrograms: number;
  completedSessions: number;
  learningGoals: string[];
  nextSession?: {
    date: string;
    topic: string;
  };
  progress: {
    programId: string;
    completed: number;
    total: number;
  }[];
  createdAt: string;
  updatedAt: string;
}