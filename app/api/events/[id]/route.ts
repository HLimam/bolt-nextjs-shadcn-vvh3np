import { NextResponse } from 'next/server';
import { EventUseCase } from '@/src/application/EventUseCase';
import { InMemoryEventRepository } from '@/src/infrastructure/adapters/InMemoryEventRepository';

const eventRepository = new InMemoryEventRepository();
const eventUseCase = new EventUseCase(eventRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await eventUseCase.getEventById(params.id);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}