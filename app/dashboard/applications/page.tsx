'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/providers/AuthProvider';
import { useApplication } from '@/src/providers/ApplicationProvider';
import { Application } from '@/src/domain/model/Application';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const applicationService = useApplication();

  useEffect(() => {
    if (user?.id) {
      fetchApplications();
    }
  }, [user?.id]);

  const fetchApplications = async () => {
    try {
      const data = await applicationService.getMentorApplications(user!.id);
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await applicationService.updateApplicationStatus(id, status);
      toast.success(`Application ${status} successfully`);
      fetchApplications();
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No applications found</h3>
        <p className="text-muted-foreground">
          You haven't received any mentorship applications yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Applications</h1>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-6">
            {applications
              .filter((app) => app.status === status)
              .map((application) => (
                <Card key={application.id}>
                  <CardContent className="flex items-center gap-6 py-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={application.mentee.image}
                        alt={application.mentee.name}
                      />
                      <AvatarFallback>
                        {application.mentee.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {application.mentee.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {application.mentee.email}
                          </p>
                        </div>
                        <Badge
                          variant={
                            status === 'approved'
                              ? 'default'
                              : status === 'rejected'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {status}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Program Details</p>
                          <p className="text-sm text-muted-foreground">
                            {application.program.title} - ${application.program.price}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {application.program.duration}
                          </p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm">{application.message}</p>
                        </div>

                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>
                            Applied on{' '}
                            {new Date(application.createdAt).toLocaleDateString()}
                          </span>
                          {application.updatedAt !== application.createdAt && (
                            <span>
                              Updated on{' '}
                              {new Date(application.updatedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {status === 'pending' && (
                          <div className="flex gap-4">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() =>
                                handleUpdateStatus(application.id, 'rejected')
                              }
                            >
                              Reject
                            </Button>
                            <Button
                              className="flex-1"
                              onClick={() =>
                                handleUpdateStatus(application.id, 'approved')
                              }
                            >
                              Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {applications.filter((app) => app.status === status).length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No {status} applications found
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}