import { Notification } from '@/src/domain/model/Notification';

export interface NotificationPort {
  getUserNotifications(userId: string): Promise<Notification[]>;
  markAsRead(id: string): Promise<Notification>;
  markAllAsRead(userId: string): Promise<void>;
  createNotification(notification: Omit<Notification, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Notification>;
}