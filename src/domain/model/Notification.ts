export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'application_response' | 'session_reminder' | 'message';
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}