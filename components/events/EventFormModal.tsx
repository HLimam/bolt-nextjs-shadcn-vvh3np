'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Event } from '@/src/domain/model/Event';
import { BasicDetailsStep } from './steps/BasicDetailsStep';
import { ScheduleStep } from './steps/ScheduleStep';
import { AgendaStep } from './steps/AgendaStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { toast } from 'sonner';

interface EventFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event;
  onSubmit: (data: Partial<Event>) => Promise<void>;
}

const steps = [
  { id: 'basic', title: 'Basic Details' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'agenda', title: 'Agenda' },
  { id: 'requirements', title: 'Requirements' },
];

export function EventFormModal({ open, onOpenChange, event, onSubmit }: EventFormModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Event>>(event || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateFormData = (data: Partial<Event>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onOpenChange(false);
      setCurrentStep(0);
      setFormData({});
      toast.success(event ? 'Event updated successfully' : 'Event created successfully');
    } catch (error) {
      toast.error(event ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Content = () => (
    <div className="space-y-8 max-h-[80vh] overflow-y-auto">
      {/* Progress */}
      <div className="space-y-4">
        <Progress value={progress} className="h-2" />
        <nav aria-label="Progress" className="hidden sm:block">
          <ol className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <li key={step.id} className="relative">
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      index <= currentStep
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Steps */}
      <div className="mt-8">
        {currentStep === 0 && (
          <BasicDetailsStep 
            data={formData} 
            onUpdate={updateFormData} 
          />
        )}
        {currentStep === 1 && (
          <ScheduleStep 
            data={formData} 
            onUpdate={updateFormData} 
          />
        )}
        {currentStep === 2 && (
          <AgendaStep 
            data={formData} 
            onUpdate={updateFormData} 
          />
        )}
        {currentStep === 3 && (
          <RequirementsStep 
            data={formData} 
            onUpdate={updateFormData} 
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 mt-8 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
          </Button>
        )}
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] overflow-hidden">
        <Content />
      </SheetContent>
    </Sheet>
  );
}