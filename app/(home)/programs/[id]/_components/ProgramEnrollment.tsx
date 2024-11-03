'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Program } from '@/src/domain/model/Program';
import { ArrowRight, Calendar, Clock, Users } from 'lucide-react';

interface ProgramEnrollmentProps {
  program: Program;
}

export function ProgramEnrollment({ program }: ProgramEnrollmentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'info' | 'form'>('info');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Application submitted successfully');
      setStep('info');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 backdrop-blur-sm bg-background/95">
      <CardContent className="p-6">
        {step === 'info' ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold">${program.price}</div>
              <p className="text-sm text-muted-foreground">Full Program Access</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </span>
                <span className="font-medium">
                  {new Date(program.startDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration
                </span>
                <span className="font-medium">{program.duration}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Mentors
                </span>
                <span className="font-medium">{program.mentorCount} experts</span>
              </div>
            </div>

            <Button 
              className="w-full group" 
              size="lg"
              onClick={() => setStep('form')}
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              30-day money-back guarantee if you're not satisfied
            </p>
          </div>
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

            <div className="space-y-2">
              <Label htmlFor="message">Why do you want to join?</Label>
              <Textarea
                id="message"
                required
                placeholder="Tell us about your goals..."
                rows={4}
              />
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
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}