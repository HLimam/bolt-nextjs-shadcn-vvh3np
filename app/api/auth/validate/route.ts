import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuth } from '@/lib/auth';
import { InMemoryAuthRepository } from '@/src/infrastructure/adapters/InMemoryAuthRepository';

const authRepository = new InMemoryAuthRepository();

export async function GET() {
  try {
    const sessionCookie = cookies().get('session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { error: 'No session found' },
        { status: 401 }
      );
    }

    const payload = await verifyAuth(sessionCookie.value);
    const user = await authRepository.findByEmail(payload.email);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.profileImage
      }
    });
  } catch (error) {
    console.error('Session validation failed:', error);
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    );
  }
}