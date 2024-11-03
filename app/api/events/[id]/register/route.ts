import { NextResponse } from 'next/server';
import { EventUseCase } from '@/src/application/EventUseCase';
import { InMemoryEventRepository } from '@/src/infrastructure/adapters/InMemoryEventRepository';

const eventRepository = new InMemoryEventRepository();
const eventUseCase = new EventUseCase(eventRepository);

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    await eventUseCase.registerForEvent(params.id, userId);
    
    // Get updated event data
    const updatedEvent = await eventUseCase.getEventById(params.id);
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to register for event' },
      { status: 400 }
    );
  }
}