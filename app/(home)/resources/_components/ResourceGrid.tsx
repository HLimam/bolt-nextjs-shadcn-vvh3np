'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Download } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'System Design Interview Guide',
    type: 'PDF',
    category: 'Interview Prep',
    description: 'Comprehensive guide for system design interviews...',
    downloadCount: 1234,
    icon: FileText,
  },
  {
    id: 2,
    title: 'React Performance Optimization',
    type: 'Video',
    category: 'Frontend',
    description: 'Learn advanced techniques for optimizing React applications...',
    duration: '45 mins',
    icon: Video,
  },
  {
    id: 3,
    title: 'Cloud Architecture Patterns',
    type: 'eBook',
    category: 'Cloud',
    description: 'Essential patterns for building scalable cloud applications...',
    pages: 150,
    icon: BookOpen,
  },
];

export function ResourceGrid() {
  const [downloads, setDownloads] = useState<Record<number, boolean>>({});

  const handleDownload = (id: number) => {
    setDownloads((prev) => ({ ...prev, [id]: true }));
    // Implement actual download logic here
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge>{resource.category}</Badge>
              <Badge variant="outline">{resource.type}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <resource.icon className="h-5 w-5 text-primary" />
              <CardTitle>{resource.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {resource.type === 'Video' && (
                <span>Duration: {resource.duration}</span>
              )}
              {resource.type === 'eBook' && (
                <span>Pages: {resource.pages}</span>
              )}
              {resource.downloadCount && (
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{resource.downloadCount} downloads</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleDownload(resource.id)}
              disabled={downloads[resource.id]}
            >
              {downloads[resource.id] ? 'Downloaded' : 'Download'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}