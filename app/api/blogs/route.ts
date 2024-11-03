import { NextResponse } from 'next/server';
import { InMemoryBlogRepository } from '@/src/infrastructure/adapters/InMemoryBlogRepository';

const blogRepository = new InMemoryBlogRepository();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    
    let blogs;
    if (category) {
      blogs = await blogRepository.findByCategory(category);
    } else if (tag) {
      blogs = await blogRepository.findByTag(tag);
    } else {
      blogs = await blogRepository.findAll();
    }

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const blogData = await request.json();
    const blog = await blogRepository.save(blogData);
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}