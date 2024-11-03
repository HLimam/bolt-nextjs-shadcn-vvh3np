'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const mentees = [
  {
    id: '1',
    name: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop',
    title: 'Frontend Developer',
    program: 'React Mastery',
    nextSession: '2024-03-01T10:00:00Z',
    totalSessions: 8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop',
    title: 'Junior Developer',
    program: 'JavaScript Fundamentals',
    nextSession: '2024-03-02T15:00:00Z',
    totalSessions: 4,
    status: 'active',
  },
];

export default function MenteesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Mentees</h1>
        <Button>Export Report</Button>
      </div>

      <div className="grid gap-6">
        {mentees.map((mentee) => (
          <Card key={mentee.id}>
            <CardContent className="flex items-center gap-6 py-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mentee.image} alt={mentee.name} />
                <AvatarFallback>{mentee.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{mentee.name}</h2>
                  <Badge variant={mentee.status === 'active' ? 'default' : 'secondary'}>
                    {mentee.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{mentee.title}</p>
                <p className="text-sm">Program: {mentee.program}</p>
              </div>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Next: {new Date(mentee.nextSession).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{mentee.totalSessions} sessions</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/messages?mentee=${mentee.id}`}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/dashboard/mentees/${mentee.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}