import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createToken } from '@/lib/auth';
import { InMemoryAuthRepository } from '@/src/infrastructure/adapters/InMemoryAuthRepository';

const authRepository = new InMemoryAuthRepository();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = await authRepository.findByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Validate password (using mock data for demo)
    const isValid = password === 'password123';
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create session token
    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Create response
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.profileImage
      }
    });

    // Set session cookie
    response.cookies.set({
      name: 'session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}