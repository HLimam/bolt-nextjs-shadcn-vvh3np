'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MenteeRegistrationForm } from './_components/MenteeRegistrationForm';

export default function MenteeRegistrationPage() {
  return (
    <div className="container flex h-full w-full flex-col items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Mentee Account</CardTitle>
          <p className="text-muted-foreground">
            Start your journey with expert guidance
          </p>
        </CardHeader>
        <CardContent>
          <MenteeRegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
}