import { NextResponse } from 'next/server';
import { SessionUseCase } from '@/src/application/SessionUseCase';
import { PrismaSessionRepository } from '@/src/infrastructure/adapters/PrismaSessionRepository';

const sessionRepository = new PrismaSessionRepository();
const sessionUseCase = new SessionUseCase(sessionRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await sessionUseCase.getSessionById(params.id);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const session = await sessionUseCase.updateSessionStatus(params.id, status);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update session status' },
      { status: 500 }
    );
  }
}