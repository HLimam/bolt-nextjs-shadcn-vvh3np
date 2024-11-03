'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Editor } from '@/components/editor/Editor';
import { toast } from 'sonner';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogEditorProps {
  onSuccess?: () => void;
}

export function BlogEditor({ onSuccess }: BlogEditorProps) {
  const [content, setContent] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      // Here you would typically make an API call to save the blog
      // await blogService.create({ ...data, content });
      toast.success('Blog post created successfully');
      onSuccess?.();
      router.refresh();
    } catch (error) {
      toast.error('Failed to create blog post');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              {...register('excerpt')}
              placeholder="Brief description of your blog post"
            />
            {errors.excerpt && (
              <p className="text-sm text-destructive">{errors.excerpt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Editor
              content={content}
              onChange={(value) => {
                setContent(value);
              }}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}