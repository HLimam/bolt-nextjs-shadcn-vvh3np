import { NextResponse } from 'next/server';
import { ChatUseCase } from '@/src/application/ChatUseCase';
import { InMemoryChatRepository } from '@/src/infrastructure/adapters/InMemoryChatRepository';

const chatRepository = new InMemoryChatRepository();
const chatUseCase = new ChatUseCase(chatRepository);

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    await chatUseCase.markConversationAsRead(params.id, userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark conversation as read' },
      { status: 500 }
    );
  }
}