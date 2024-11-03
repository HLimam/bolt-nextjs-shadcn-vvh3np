import { NotificationRepositoryPort } from '@/src/application/ports/out/NotificationRepositoryPort';
import { Notification } from '@/src/domain/model/Notification';
import { db } from '@/src/lib/db';
import { randomUUID } from 'crypto';

export class InMemoryNotificationRepository implements NotificationRepositoryPort {
  async findByUserId(userId: string): Promise<Notification[]> {
    return Array.from(db.notifications.values())
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = db.notifications.get(id);
    if (!notification) {
      throw new Error('Notification not found');
    }

    const updatedNotification = {
      ...notification,
      read: true,
      updatedAt: new Date().toISOString(),
    };

    db.notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    for (const [id, notification] of db.notifications.entries()) {
      if (notification.userId === userId) {
        db.notifications.set(id, {
          ...notification,
          read: true,
          updatedAt: new Date().toISOString(),
        });
      }
    }
  }

  async save(notification: Omit<Notification, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Notification> {
    const id = randomUUID();
    const now = new Date().toISOString();

    const newNotification: Notification = {
      id,
      ...notification,
      read: false,
      createdAt: now,
      updatedAt: now,
    };

    db.notifications.set(id, newNotification);
    return newNotification;
  }
}