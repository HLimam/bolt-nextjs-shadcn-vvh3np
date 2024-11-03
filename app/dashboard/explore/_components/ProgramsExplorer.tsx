'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProgram } from '@/src/providers/ProgramProvider';
import { Program } from '@/src/domain/model/Program';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

export function ProgramsExplorer() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const programService = useProgram();
  const router = useRouter();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const data = await programService.searchPrograms({});
      setPrograms(data);
    } catch (error) {
      console.error('Failed to load programs:', error);
      toast.error('Failed to load programs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (programId: string) => {
    router.push(`/programs/${programId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search programs..." className="pl-8" />
        </div>
      </div>

      <div className="space-y-4">
        {programs.map((program) => (
          <Card key={program.id} className="w-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    by {program.mentors[0]?.name}
                  </p>
                </div>
                <Badge>{program.level}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-4 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {program.topics.map((topic) => (
                      <Badge key={topic} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="ml-8 flex flex-col items-end gap-4">
                  <span className="font-semibold">${program.price}</span>
                  <Button onClick={() => handleApply(program.id)}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}