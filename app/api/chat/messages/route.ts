import { NextResponse } from 'next/server';
import { ChatUseCase } from '@/src/application/ChatUseCase';
import { InMemoryChatRepository } from '@/src/infrastructure/adapters/InMemoryChatRepository';

const chatRepository = new InMemoryChatRepository();
const chatUseCase = new ChatUseCase(chatRepository);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    const messages = await chatUseCase.getConversationMessages(conversationId);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const messageData = await request.json();
    const message = await chatUseCase.sendMessage(messageData);
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}