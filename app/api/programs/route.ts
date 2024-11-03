import { NextResponse } from 'next/server';
import { ProgramUseCase } from '@/src/application/ProgramUseCase';
import { PrismaProgramRepository } from '@/src/infrastructure/adapters/PrismaProgramRepository';

const programRepository = new PrismaProgramRepository();
const programUseCase = new ProgramUseCase(programRepository);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const topics = searchParams.getAll('topics');
    const duration = searchParams.get('duration');
    const page = parseInt(searchParams.get('page') || '1');

    const criteria = {
      ...(level && { level }),
      ...(minPrice && { minPrice: parseInt(minPrice) }),
      ...(maxPrice && { maxPrice: parseInt(maxPrice) }),
      ...(topics.length && { topics }),
      ...(duration && { duration }),
      page,
    };

    const programs = await programUseCase.searchPrograms(criteria);
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}