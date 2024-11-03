'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MentorRegistrationForm } from './_components/MentorRegistrationForm';

export default function MentorRegistrationPage() {
  return (
    <div className="container flex h-full w-full flex-col items-center justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Become a Mentor</CardTitle>
          <p className="text-muted-foreground">
            Share your expertise and help shape the next generation of developers
          </p>
        </CardHeader>
        <CardContent>
          <MentorRegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
}