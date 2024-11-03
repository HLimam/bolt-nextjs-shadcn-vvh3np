import { NextResponse } from 'next/server';
import { MentorUseCase } from '@/src/application/MentorUseCase';
import { InMemoryMentorRepository } from '@/src/infrastructure/adapters/InMemoryMentorRepository';

const mentorRepository = new InMemoryMentorRepository();
const mentorUseCase = new MentorUseCase(mentorRepository);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const expertise = searchParams.getAll('expertise');
    const maxHourlyRate = searchParams.get('maxHourlyRate');
    const languages = searchParams.getAll('languages');
    const experienceLevel = searchParams.get('experienceLevel');
    const page = parseInt(searchParams.get('page') || '1');

    const criteria = {
      ...(expertise.length && { expertise }),
      ...(maxHourlyRate && { maxHourlyRate: parseInt(maxHourlyRate) }),
      ...(languages.length && { languages }),
      ...(experienceLevel && { experienceLevel }),
      page,
    };

    const mentors = await mentorUseCase.searchMentors(criteria);
    return NextResponse.json(mentors);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
}