'use client';

import { Badge } from '@/components/ui/badge';

interface BlogHeaderProps {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
}

export function BlogHeader({ title, excerpt, category, tags }: BlogHeaderProps) {
  return (
    <header className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl -z-10" />
      <div className="px-8 py-12 md:py-20">
        {/* Category and Tags */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
            {category}
          </Badge>
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="hover:bg-muted transition-colors animate-slide-in"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title and Excerpt */}
        <div className="space-y-6 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            {excerpt}
          </p>
        </div>
      </div>
    </header>
  );
}