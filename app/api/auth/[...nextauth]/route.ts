import { NextApiRequest, NextApiResponse } from "next";
import { InMemoryAuthRepository } from "@/src/infrastructure/adapters/InMemoryAuthRepository";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

const authRepository = new InMemoryAuthRepository();

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new NextResponse('Method not allowed', { status: 405 });
  }

  try {
    const { email, password } = await req.json();

    const isValid = await authRepository.validateCredentials(email, password);
    if (!isValid) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    const user = await authRepository.findByEmail(email);
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const token = await createToken({ 
      id: user.id,
      email: user.email,
      role: user.role 
    });

    cookies().set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Authentication error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}