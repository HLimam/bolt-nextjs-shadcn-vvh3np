'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/src/providers/AuthProvider';
import { toast } from 'sonner';
import { useProgram } from '@/src/providers/ProgramProvider';

interface EnrollmentCardProps {
  program: {
    id: string;
    price: number;
    duration: string;
    level: string;
    mentorCount: number;
  };
}

export function EnrollmentCard({ program }: EnrollmentCardProps) {
  const { user } = useAuth();
  const programService = useProgram();

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please sign in to enroll in this program');
      return;
    }

    try {
      await programService.enrollInProgram(program.id, user.id);
      toast.success('Successfully enrolled in program');
    } catch (error) {
      toast.error('Failed to enroll in program');
    }
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Enroll in Program</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="text-3xl font-bold">${program.price}</div>
          <p className="text-muted-foreground">{program.duration} program duration</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge>{program.level}</Badge>
            <Badge variant="outline">{program.mentorCount} mentors</Badge>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleEnroll}
          >
            Enroll Now
          </Button>

          {!user && (
            <p className="text-sm text-muted-foreground text-center">
              Please sign in to enroll in this program
            </p>
          )}
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">What's included:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Access to all program materials</li>
            <li>• Live mentoring sessions</li>
            <li>• Project reviews and feedback</li>
            <li>• Certificate upon completion</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}