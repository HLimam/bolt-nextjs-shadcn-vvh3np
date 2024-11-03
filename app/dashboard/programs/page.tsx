'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/src/providers/AuthProvider';
import { CreateDialog } from '@/components/shared/CreateDialog';
import { Plus } from 'lucide-react';
import { CreateProgramForm } from './_components/CreateProgramForm';

const programs = [
  {
    id: '1',
    title: 'React Mastery',
    description: 'Advanced React patterns and performance optimization',
    enrolledMentees: 8,
    maxMentees: 10,
    duration: '12 weeks',
    sessionsPerWeek: 2,
    price: 999,
    status: 'active',
  },
  {
    id: '2',
    title: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts and modern features',
    enrolledMentees: 5,
    maxMentees: 8,
    duration: '8 weeks',
    sessionsPerWeek: 1,
    price: 599,
    status: 'draft',
  },
];

export default function DashboardPrograms() {
  const { user } = useAuth();
  const isMentor = user?.role === 'MENTOR';
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {isMentor ? 'My Programs' : 'Enrolled Programs'}
        </h1>
        {isMentor && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Program
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <p className="text-muted-foreground mt-1">{program.description}</p>
              </div>
              <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                {program.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {program.enrolledMentees}/{program.maxMentees} mentees
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{program.sessionsPerWeek} sessions/week</span>
                </div>
                <div className="ml-auto font-bold">${program.price}</div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/programs/${program.id}`}>
                    View Details
                  </Link>
                </Button>
                {isMentor && (
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/programs/${program.id}/edit`}>
                      Edit Program
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      >
        <Card>
          <CardHeader>
            <CardTitle>Create New Program</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateProgramForm onSuccess={() => setShowCreateDialog(false)} />
          </CardContent>
        </Card>
      </CreateDialog>
    </div>
  );
}