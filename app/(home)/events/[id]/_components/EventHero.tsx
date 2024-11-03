'use client';

import { Badge } from '@/components/ui/badge';

interface EventHeroProps {
  title: string;
  description: string;
  topics: string[];
}

export function EventHero({ title, description, topics = [] }: EventHeroProps) {
  return (
    <div className="relative py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {description}
            </p>
          </div>
          {topics.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}