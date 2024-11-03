'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FileText, Video, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const resources = [
  {
    id: '1',
    title: 'React Performance Optimization Guide',
    type: 'PDF',
    category: 'Frontend',
    description: 'Learn advanced techniques for optimizing React applications...',
    downloadCount: 234,
    size: '2.4 MB',
    uploadDate: '2024-02-15',
  },
  {
    id: '2',
    title: 'System Design Interview Preparation',
    type: 'Video',
    category: 'Career',
    description: 'Comprehensive guide for system design interviews...',
    duration: '45 mins',
    uploadDate: '2024-02-20',
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search resources..."
            className="w-64"
            icon={<Search className="h-4 w-4" />}
          />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="code">Code Samples</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent className="flex items-center gap-6 py-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {resource.type === 'PDF' ? (
                    <FileText className="h-6 w-6 text-primary" />
                  ) : (
                    <Video className="h-6 w-6 text-primary" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{resource.category}</Badge>
                    <Badge variant="outline">{resource.type}</Badge>
                    {resource.type === 'PDF' ? (
                      <>
                        <span className="text-sm text-muted-foreground">
                          {resource.size}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {resource.downloadCount} downloads
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {resource.duration}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      Added {new Date(resource.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}