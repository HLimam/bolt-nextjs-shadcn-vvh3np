import { NextResponse } from 'next/server';
import { NotificationUseCase } from '@/src/application/NotificationUseCase';
import { InMemoryNotificationRepository } from '@/src/infrastructure/adapters/InMemoryNotificationRepository';

const notificationRepository = new InMemoryNotificationRepository();
const notificationUseCase = new NotificationUseCase(notificationRepository);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const notifications = await notificationUseCase.getUserNotifications(userId);
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}