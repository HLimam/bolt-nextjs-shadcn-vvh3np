'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MentorInfoProps {
  mentor?: {
    name: string;
    image?: string;
    role: string;
    expertise: string[];
  };
}

export function MentorInfo({ mentor }: MentorInfoProps) {
  if (!mentor) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentor Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.image} alt={mentor.name} />
            <AvatarFallback>{mentor.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{mentor.name}</h3>
            <p className="text-sm text-muted-foreground">{mentor.role}</p>
            <p className="text-sm text-muted-foreground">{mentor.expertise.join(', ')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}