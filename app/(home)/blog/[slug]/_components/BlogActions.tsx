'use client';

import { Button } from '@/components/ui/button';
import { Share2, Bookmark, MessageSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface BlogActionsProps {
  category: string;
  onShare: () => void;
}

export function BlogActions({ category, onShare }: BlogActionsProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="sticky bottom-8 flex items-center justify-between gap-4 py-4 px-6 bg-background/80 backdrop-blur-lg rounded-2xl border shadow-lg animate-slide-up">
      <div className="flex gap-2">
        <Button 
          variant={liked ? "default" : "outline"} 
          size="sm" 
          onClick={handleLike}
          className="gap-2"
        >
          <ThumbsUp className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          {likeCount}
        </Button>
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" size="sm">
          <Bookmark className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Discuss
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/blog">
          <Button variant="ghost" size="sm">
            Back to Blog
          </Button>
        </Link>
        <Link href={`/blog/category/${category.toLowerCase()}`}>
          <Button variant="ghost" size="sm">
            More in {category}
          </Button>
        </Link>
      </div>
    </div>
  );
}