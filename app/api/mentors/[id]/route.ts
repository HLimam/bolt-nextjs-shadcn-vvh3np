import { NextResponse } from 'next/server';
import { MentorUseCase } from '@/src/application/MentorUseCase';
import { InMemoryMentorRepository } from '@/src/infrastructure/adapters/InMemoryMentorRepository';

const mentorRepository = new InMemoryMentorRepository();
const mentorUseCase = new MentorUseCase(mentorRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mentor = await mentorUseCase.getMentorById(params.id);
    if (!mentor) {
      return NextResponse.json(
        { error: 'Mentor not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(mentor);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch mentor' },
      { status: 500 }
    );
  }
}