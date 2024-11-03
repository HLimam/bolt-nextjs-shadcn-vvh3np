import { NextResponse } from 'next/server';
import { AuthUseCase } from '@/src/application/AuthUseCase';
import { PrismaAuthRepository } from '@/src/infrastructure/adapters/PrismaAuthRepository';
import { PrismaMapper } from '@/src/infrastructure/mappers/PrismaMapper';

const mapper = new PrismaMapper();
const authRepository = new PrismaAuthRepository(mapper);
const authUseCase = new AuthUseCase(authRepository);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await authUseCase.register({
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    });
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 400 }
    );
  }
}