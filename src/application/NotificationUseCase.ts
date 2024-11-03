import { NotificationPort } from './ports/in/NotificationPort';
import { NotificationRepositoryPort } from './ports/out/NotificationRepositoryPort';
import { Notification } from '../domain/model/Notification';

export class NotificationUseCase implements NotificationPort {
  constructor(private readonly notificationRepository: NotificationRepositoryPort) {}

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await this.notificationRepository.findByUserId(userId);
  }

  async markAsRead(id: string): Promise<Notification> {
    return await this.notificationRepository.markAsRead(id);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }

  async createNotification(
    notification: Omit<Notification, 'id' | 'read' | 'createdAt' | 'updatedAt'>
  ): Promise<Notification> {
    return await this.notificationRepository.save(notification);
  }
}