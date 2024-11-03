'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Blog } from '@/src/domain/model/Blog';
import { Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function BlogSidebar() {
  const [featuredPosts, setFeaturedPosts] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    loadFeaturedPosts();
  }, []);

  const loadFeaturedPosts = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const blogs = await response.json();
        setFeaturedPosts(blogs.filter((blog: Blog) => blog.featured).slice(0, 3));
        
        const uniqueCategories = new Set(blogs.map((blog: Blog) => blog.category));
        const uniqueTags = new Set(blogs.flatMap((blog: Blog) => blog.tags));
        
        setCategories(Array.from(uniqueCategories));
        setTags(Array.from(uniqueTags));
      }
    } catch (error) {
      console.error('Failed to load featured posts:', error);
    }
  };

  return (
    <div className="space-y-6 sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Featured Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {featuredPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex gap-4 items-start">
                  <Avatar>
                    <AvatarImage src={post.author.image} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link 
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium">{category}</span>
                <Badge variant="secondary">
                  {featuredPosts.filter(post => post.category === category).length}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link 
                key={tag} 
                href={`/blog?tag=${encodeURIComponent(tag)}`}
              >
                <Badge 
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}