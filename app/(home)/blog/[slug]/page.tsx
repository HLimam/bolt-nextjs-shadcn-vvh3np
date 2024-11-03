import { notFound } from 'next/navigation';
import { BlogPostContent } from './_components/BlogPostContent';
import { InMemoryBlogRepository } from '@/src/infrastructure/adapters/InMemoryBlogRepository';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogRepository = new InMemoryBlogRepository();
  const post = await blogRepository.findBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}