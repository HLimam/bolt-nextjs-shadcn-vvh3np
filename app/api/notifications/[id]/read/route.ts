import { NextResponse } from 'next/server';
import { NotificationUseCase } from '@/src/application/NotificationUseCase';
import { InMemoryNotificationRepository } from '@/src/infrastructure/adapters/InMemoryNotificationRepository';

const notificationRepository = new InMemoryNotificationRepository();
const notificationUseCase = new NotificationUseCase(notificationRepository);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const notification = await notificationUseCase.markAsRead(params.id);
    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark notification as read' },
      { status: 500 }
    );
  }
}