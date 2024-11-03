import { NextResponse } from 'next/server';
import { UserManagementUseCase } from '@/src/application/UserManagementUseCase';
import { JsonFileUserRepository } from '@/src/infrastructure/adapters/JsonFileUserRepository';

const userRepository = new JsonFileUserRepository();
const userManagementUseCase = new UserManagementUseCase(userRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userManagementUseCase.getUserById(params.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userData = await request.json();
    const user = await userManagementUseCase.updateUser(params.id, userData);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update user' },
      { status: 400 }
    );
  }
}