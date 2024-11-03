'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/src/domain/model/Blog';
import { toast } from 'sonner';

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to load blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
        <p className="text-muted-foreground">Start sharing your knowledge by creating your first blog</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{blog.title}</h2>
                <p className="text-muted-foreground">{blog.excerpt}</p>
              </div>
              <Badge>{blog.status}</Badge>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
              <span>•</span>
              <span>{blog.category}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline">Preview</Button>
              <Button variant="outline">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}