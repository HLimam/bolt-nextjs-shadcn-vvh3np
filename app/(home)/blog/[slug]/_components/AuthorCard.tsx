'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, UserPlus } from 'lucide-react';

interface AuthorCardProps {
  author: {
    name: string;
    role: string;
    image?: string;
  };
  publishedAt: string;
  readTime: string;
}

export function AuthorCard({ author, publishedAt, readTime }: AuthorCardProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 px-8 bg-muted/50 rounded-2xl backdrop-blur-sm animate-fade-up">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 ring-2 ring-primary/10">
          <AvatarImage src={author.image} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-lg">{author.name}</p>
          <p className="text-muted-foreground">{author.role}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Follow
        </Button>
      </div>
    </div>
  );
}