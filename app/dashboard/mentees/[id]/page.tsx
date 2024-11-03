'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, BookOpen, Target } from 'lucide-react';
import { useMentee } from '@/src/providers/MenteeProvider';
import { Mentee } from '@/src/domain/model/Mentee';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function MenteeDetailsPage({ params }: { params: { id: string } }) {
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const menteeService = useMentee();

  useEffect(() => {
    const loadMentee = async () => {
      try {
        const data = await menteeService.getMenteeById(params.id);
        setMentee(data);
      } catch (error) {
        console.error('Failed to load mentee:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMentee();
  }, [params.id, menteeService]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!mentee) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Mentee not found</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="flex items-center gap-6 py-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={mentee.image} alt={mentee.name} />
            <AvatarFallback>{mentee.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold">{mentee.name}</h2>
                <p className="text-muted-foreground">{mentee.email}</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(mentee.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{mentee.completedSessions} sessions completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentee.learningGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{goal}</span>
                      <span className="text-sm text-muted-foreground">
                        In Progress
                      </span>
                    </div>
                    <Progress value={30} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {mentee.nextSession && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{mentee.nextSession.topic}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(mentee.nextSession.date).toLocaleString()}
                      </p>
                    </div>
                    <Badge>Upcoming</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentee.progress.map((program) => (
                  <div
                    key={program.programId}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Program {program.programId}</h3>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{(program.completed / program.total * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(program.completed / program.total) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/messages">Send Message</Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sessions/schedule?menteeId=${mentee.id}`}>
            Schedule Session
          </Link>
        </Button>
      </div>
    </div>
  );
}