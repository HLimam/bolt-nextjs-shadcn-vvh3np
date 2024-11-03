export interface CalendarEvent {
  id: string;
  title: string;
  type: 'session' | 'event';
  date: string;
  duration: number;
  format: 'video' | 'in-person';
  location?: string;
  participant: {
    id: string;
    name: string;
    image?: string;
  };
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}