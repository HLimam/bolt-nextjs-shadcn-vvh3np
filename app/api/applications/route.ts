import { NextResponse } from 'next/server';
import { ApplicationUseCase } from '@/src/application/ApplicationUseCase';
import { InMemoryApplicationRepository } from '@/src/infrastructure/adapters/InMemoryApplicationRepository';

const applicationRepository = new InMemoryApplicationRepository();
const applicationUseCase = new ApplicationUseCase(applicationRepository);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mentorId = searchParams.get('mentorId');

    if (!mentorId) {
      return NextResponse.json(
        { error: 'Mentor ID is required' },
        { status: 400 }
      );
    }

    const applications = await applicationUseCase.getMentorApplications(mentorId);
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}