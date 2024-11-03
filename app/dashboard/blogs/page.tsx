'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateDialog } from '@/components/shared/CreateDialog';
import { BlogEditor } from './_components/BlogEditor';
import { BlogCard } from './_components/BlogCard';
import { Blog } from '@/src/domain/model/Blog';
import { toast } from 'sonner';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

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

  const handleEdit = (blog: Blog) => {
    // Implement edit functionality
    toast.info('Edit functionality coming soon');
  };

  const handleDelete = async (blog: Blog) => {
    // Implement delete functionality
    toast.info('Delete functionality coming soon');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">
            Share your knowledge and insights with the community
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
          <p className="text-muted-foreground mb-4">
            Start sharing your knowledge by creating your first blog post
          </p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Post
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        title="Create New Blog Post"
      >
        <BlogEditor onSuccess={() => {
          setShowCreateDialog(false);
          loadBlogs();
        }} />
      </CreateDialog>
    </div>
  );
}