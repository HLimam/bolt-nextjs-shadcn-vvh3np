'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogPostNotFound() {
  const router = useRouter();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-muted p-4">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Blog Post Not Found</h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          Sorry, we couldn&apos;t find the blog post you&apos;re looking for. It might have been removed or the URL is incorrect.
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
        <Button asChild>
          <Link href="/blog">Browse All Posts</Link>
        </Button>
      </div>
    </div>
  );
}