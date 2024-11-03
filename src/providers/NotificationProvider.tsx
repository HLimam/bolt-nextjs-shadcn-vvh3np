'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { NotificationPort } from '@/src/application/ports/in/NotificationPort';
import { NotificationUseCase } from '@/src/application/NotificationUseCase';
import { InMemoryNotificationRepository } from '@/src/infrastructure/adapters/InMemoryNotificationRepository';
import { Notification } from '@/src/domain/model/Notification';
import { useAuth } from './AuthProvider';
import { toast } from 'sonner';

const notificationRepository = new InMemoryNotificationRepository();
const notificationUseCase = new NotificationUseCase(notificationRepository);

interface NotificationContextType extends NotificationPort {
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      loadNotifications();
    }
  }, [user?.id]);

  const loadNotifications = async () => {
    if (!user?.id) return;
    const userNotifications = await notificationUseCase.getUserNotifications(user.id);
    setNotifications(userNotifications);
  };

  const markAsRead = async (id: string) => {
    const updatedNotification = await notificationUseCase.markAsRead(id);
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? updatedNotification : notification
      )
    );
  };

  const markAllAsRead = async (userId: string) => {
    await notificationUseCase.markAllAsRead(userId);
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const createNotification = async (notification: Omit<Notification, 'id' | 'read' | 'createdAt' | 'updatedAt'>) => {
    const newNotification = await notificationUseCase.createNotification(notification);
    setNotifications(prev => [newNotification, ...prev]);
    
    toast(newNotification.title, {
      description: newNotification.message,
      action: {
        label: 'View',
        onClick: () => markAsRead(newNotification.id),
      },
    });

    return newNotification;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getUserNotifications: notificationUseCase.getUserNotifications,
        markAsRead,
        markAllAsRead,
        createNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}