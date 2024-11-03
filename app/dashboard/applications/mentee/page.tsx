'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/providers/AuthProvider';
import { Application } from '@/src/domain/model/Application';

export default function MenteeApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchApplications();
    }
  }, [user?.id]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`/api/applications/mentee/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Applications</h1>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'approved', 'rejected'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-6">
            {applications
              .filter((app) => tab === 'all' || app.status === tab)
              .map((application) => (
                <Card key={application.id}>
                  <CardContent className="flex items-center gap-6 py-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {application.program.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Duration: {application.program.duration}
                          </p>
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            application.status
                          )} text-white`}
                        >
                          {application.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={application.mentee.image}
                              alt={application.mentee.name}
                            />
                            <AvatarFallback>
                              {application.mentee.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              Applied to {application.program.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${application.program.price}
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm">{application.message}</p>
                        </div>

                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>
                            Applied on{' '}
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </span>
                          {application.updatedAt !== application.createdAt && (
                            <span>
                              Updated on{' '}
                              {new Date(
                                application.updatedAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}