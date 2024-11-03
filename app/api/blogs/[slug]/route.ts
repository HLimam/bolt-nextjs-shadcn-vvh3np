import { NextResponse } from 'next/server';
import { InMemoryBlogRepository } from '@/src/infrastructure/adapters/InMemoryBlogRepository';

const blogRepository = new InMemoryBlogRepository();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await blogRepository.findBySlug(params.slug);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}