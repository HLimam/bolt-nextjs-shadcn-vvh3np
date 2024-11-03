'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface EventRegistrationProps {
  eventId: string;
  price: number;
  spotsLeft: number;
}

export function EventRegistration({ eventId, price, spotsLeft }: EventRegistrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to register for the event
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Failed to register for the event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register for Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegistration} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="john@example.com" />
          </div>

          {price > 0 && (
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm mb-1">
                <span>Registration Fee</span>
                <span className="font-medium">${price}</span>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || spotsLeft === 0}
          >
            {isSubmitting 
              ? 'Processing...' 
              : spotsLeft === 0 
                ? 'Event Full' 
                : `Register${price > 0 ? ` • $${price}` : ' Now'}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}