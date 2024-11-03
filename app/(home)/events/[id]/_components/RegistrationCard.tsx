'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Event } from '@/src/domain/model/Event';
import { useAuth } from '@/src/providers/AuthProvider';
import { toast } from 'sonner';

interface RegistrationCardProps {
  event: Event;
}

export function RegistrationCard({ event }: RegistrationCardProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState<'info' | 'form'>('info');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRegistering(true);

    try {
      // Here you would typically make an API call to register for the event
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully registered for the event');
      setStep('info');
    } catch (error) {
      toast.error('Failed to register for the event');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Register for Event</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 'info' ? (
          <>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {event.price === 0 ? 'Free' : `$${event.price}`}
              </div>
              <Badge variant={event.spotsLeft < 5 ? 'destructive' : 'secondary'}>
                {event.spotsLeft} spots left
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{event.capacity - event.spotsLeft} attendees registered</span>
              </div>

              {event.format === 'in-person' && event.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setStep('form')}
              disabled={event.spotsLeft === 0}
            >
              {event.spotsLeft === 0 ? 'Event Full' : 'Register Now'}
            </Button>

            {!user && (
              <p className="text-sm text-muted-foreground text-center">
                Please sign in to register for this event
              </p>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="john@example.com" />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setStep('info')}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isRegistering}>
                {isRegistering ? 'Registering...' : 'Complete Registration'}
              </Button>
            </div>
          </form>
        )}

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">What's included:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Live {event.format} session</li>
            <li>• Q&A with the speaker</li>
            <li>• Event materials and resources</li>
            <li>• Networking opportunities</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}