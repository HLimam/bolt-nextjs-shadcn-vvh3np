'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Blog } from '@/src/domain/model/Blog';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blog: Blog) => void;
}

export function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="text-muted-foreground">{blog.excerpt}</p>
          </div>
          <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
            {blog.status}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={blog.author.image} alt={blog.author.name} />
            <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{blog.author.name}</p>
            <p className="text-sm text-muted-foreground">{blog.author.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
          <span>•</span>
          <span>{blog.category}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href={`/blog/${blog.slug}`}>Preview</Link>
          </Button>
          <Button variant="outline" onClick={() => onEdit?.(blog)}>
            Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => onDelete?.(blog)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}