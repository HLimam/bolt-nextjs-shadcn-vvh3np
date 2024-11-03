'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgram } from '@/src/providers/ProgramProvider';
import { Program } from '@/src/domain/model/Program';
import { ProgramForm } from './_components/ProgramForm';
import { toast } from 'sonner';
import { notFound } from 'next/navigation';

export default function EditProgramPage({ params }: { params: { id: string } }) {
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
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
          <p className="mt-2 text-sm text-muted-foreground">Loading program...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return notFound();
  }

  const handleSubmit = async (data: Partial<Program>) => {
    try {
      // Update program logic would go here
      toast.success('Program updated successfully');
      router.push(`/dashboard/programs/${params.id}`);
    } catch (error) {
      toast.error('Failed to update program');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Edit Program</h1>
      <ProgramForm program={program} onSubmit={handleSubmit} />
    </div>
  );
}