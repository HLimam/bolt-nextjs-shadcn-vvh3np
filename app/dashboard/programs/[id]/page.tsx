'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/src/providers/AuthProvider';
import { useProgram } from '@/src/providers/ProgramProvider';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProgramHeader } from './_components/ProgramHeader';
import { ProgramStats } from './_components/ProgramStats';
import { MentorInfo } from './_components/MentorInfo';
import { Curriculum } from './_components/Curriculum';
import { Program } from '@/src/domain/model/Program';

export default function ProgramDetailsPage({ params }: { params: { id: string } }) {
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const programService = useProgram();

  useEffect(() => {
    const loadProgram = async () => {
      try {
        const data = await programService.getProgramById(params.id);
        setProgram(data);
      } catch (error) {
        console.error('Failed to load program:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadProgram();
    }
  }, [params.id, programService]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return notFound();
  }

  const mentor = program.mentors?.[0];

  return (
    <div className="space-y-8">
      <ProgramHeader
        title={program.title}
        description={program.description}
        status="active"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ProgramStats
          enrolledMentees={program.mentorCount || 0}
          maxMentees={10}
          duration={program.duration}
          sessionsPerWeek={2}
          progress={65}
        />

        {mentor && <MentorInfo mentor={mentor} />}
      </div>

      {program.curriculum?.weeks && (
        <Curriculum weeks={program.curriculum.weeks} />
      )}

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/programs">Back to Programs</Link>
        </Button>
        {user?.role === 'MENTOR' && (
          <Button asChild>
            <Link href={`/dashboard/programs/${program.id}/edit`}>Edit Program</Link>
          </Button>
        )}
      </div>
    </div>
  );
}