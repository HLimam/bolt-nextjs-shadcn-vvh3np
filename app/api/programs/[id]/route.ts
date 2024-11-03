import { NextResponse } from 'next/server';
import { ProgramUseCase } from '@/src/application/ProgramUseCase';
import { PrismaProgramRepository } from '@/src/infrastructure/adapters/PrismaProgramRepository';

const programRepository = new PrismaProgramRepository();
const programUseCase = new ProgramUseCase(programRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const program = await programUseCase.getProgramById(params.id);
    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(program);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch program' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    await programUseCase.enrollInProgram(params.id, userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to enroll in program' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    await programUseCase.withdrawFromProgram(params.id, userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to withdraw from program' },
      { status: 500 }
    );
  }
}