import { NextResponse } from 'next/server';
import { NotificationUseCase } from '@/src/application/NotificationUseCase';
import { InMemoryNotificationRepository } from '@/src/infrastructure/adapters/InMemoryNotificationRepository';

const notificationRepository = new InMemoryNotificationRepository();
const notificationUseCase = new NotificationUseCase(notificationRepository);

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    await notificationUseCase.markAllAsRead(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark all notifications as read' },
      { status: 500 }
    );
  }
}