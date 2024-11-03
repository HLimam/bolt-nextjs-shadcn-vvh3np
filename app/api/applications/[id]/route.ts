import { NextResponse } from 'next/server';
import { ApplicationUseCase } from '@/src/application/ApplicationUseCase';
import { InMemoryApplicationRepository } from '@/src/infrastructure/adapters/InMemoryApplicationRepository';

const applicationRepository = new InMemoryApplicationRepository();
const applicationUseCase = new ApplicationUseCase(applicationRepository);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const application = await applicationUseCase.updateApplicationStatus(params.id, status);
    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}