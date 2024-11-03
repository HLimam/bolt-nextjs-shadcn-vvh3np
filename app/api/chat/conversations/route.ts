import { NextResponse } from 'next/server';
import { ChatUseCase } from '@/src/application/ChatUseCase';
import { InMemoryChatRepository } from '@/src/infrastructure/adapters/InMemoryChatRepository';

const chatRepository = new InMemoryChatRepository();
const chatUseCase = new ChatUseCase(chatRepository);

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

    const conversations = await chatUseCase.getUserConversations(userId);
    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}