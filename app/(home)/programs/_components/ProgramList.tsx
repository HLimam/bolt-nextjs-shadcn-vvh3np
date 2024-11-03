'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Program } from '@/src/domain/model/Program';
import { useProgram } from '@/src/providers/ProgramProvider';
import { Calendar, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ProgramListProps {
  filters: Record<string, any>;
}

export function ProgramList({ filters }: ProgramListProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const programService = useProgram();
  const router = useRouter();

  useEffect(() => {
    loadPrograms();
  }, [filters]);

  const loadPrograms = async () => {
    try {
      const data = await programService.searchPrograms(filters);
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
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 w-1/3 bg-muted rounded mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-2/3 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">No programs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later for new programs
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {programs.map((program) => (
        <Card key={program.id} className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{program.level}</Badge>
                  {program.topics.map((topic) => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-muted-foreground mb-4">{program.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{program.mentorCount} mentors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Starts {new Date(program.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end gap-4">
                <div className="text-2xl font-bold">${program.price}</div>
                <Button onClick={() => handleApply(program.id)}>Apply Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}