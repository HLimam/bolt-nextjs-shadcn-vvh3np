'use client';

import { Blog } from '@/src/domain/model/Blog';
import { BlogHeader } from './BlogHeader';
import { AuthorCard } from './AuthorCard';
import { BlogContent } from './BlogContent';
import { BlogActions } from './BlogActions';

interface BlogPostContentProps {
  post: Blog;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <article className="container max-w-4xl py-12 space-y-8">
      <BlogHeader
        title={post.title}
        excerpt={post.excerpt}
        category={post.category}
        tags={post.tags}
      />

      <AuthorCard
        author={post.author}
        publishedAt={post.publishedAt}
        readTime={post.readTime}
      />

      <BlogContent content={post.content} />

      <BlogActions 
        category={post.category}
        onShare={handleShare}
      />
    </article>
  );
}