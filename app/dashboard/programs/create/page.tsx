'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgramForm } from './_components/ProgramForm';
import { toast } from 'sonner';

export default function CreateProgramPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would typically make an API call to create the program
      // await programService.createProgram(data);
      toast.success('Program created successfully');
      router.push('/dashboard/programs');
    } catch (error) {
      toast.error('Failed to create program');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Program</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgramForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}