import { NextResponse } from 'next/server';
import { UserManagementUseCase } from '@/src/application/UserManagementUseCase';
import { JsonFileUserRepository } from '@/src/infrastructure/adapters/JsonFileUserRepository';

const userRepository = new JsonFileUserRepository();
const userManagementUseCase = new UserManagementUseCase(userRepository);

export async function GET() {
  try {
    const users = await userManagementUseCase.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const user = await userManagementUseCase.createUser(userData);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create user' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await userManagementUseCase.deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}