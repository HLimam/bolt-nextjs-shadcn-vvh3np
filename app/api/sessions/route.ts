import { NextResponse } from 'next/server';
import { SessionUseCase } from '@/src/application/SessionUseCase';
import { PrismaSessionRepository } from '@/src/infrastructure/adapters/PrismaSessionRepository';

const sessionRepository = new PrismaSessionRepository();
const sessionUseCase = new SessionUseCase(sessionRepository);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const session = await sessionUseCase.createSession(data);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const menteeId = searchParams.get('menteeId');
    const mentorId = searchParams.get('mentorId');

    if (menteeId) {
      const sessions = await sessionUseCase.getMenteeUpcomingSessions(menteeId);
      return NextResponse.json(sessions);
    }

    if (mentorId) {
      const sessions = await sessionUseCase.getMentorUpcomingSessions(mentorId);
      return NextResponse.json(sessions);
    }

    return NextResponse.json(
      { error: 'Either menteeId or mentorId is required' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}