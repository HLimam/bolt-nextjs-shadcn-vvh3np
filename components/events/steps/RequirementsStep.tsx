'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Event } from '@/src/domain/model/Event';

interface RequirementsStepProps {
  data: Partial<Event>;
  onUpdate: (data: Partial<Event>) => void;
}

export function RequirementsStep({ data, onUpdate }: RequirementsStepProps) {
  const [requirements, setRequirements] = useState<string[]>(data.requirements || []);
  const [newRequirement, setNewRequirement] = useState('');

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const updatedRequirements = [...requirements, newRequirement.trim()];
      setRequirements(updatedRequirements);
      onUpdate({ requirements: updatedRequirements });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    onUpdate({ requirements: updatedRequirements });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Event Requirements</Label>
        <p className="text-sm text-muted-foreground mt-1">
          List any prerequisites or items attendees need to participate in the event.
        </p>
      </div>
      
      <div className="flex gap-2">
        <Input
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          placeholder="Add a requirement"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
        />
        <Button onClick={addRequirement} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {requirements.map((requirement, index) => (
          <Badge key={index} variant="secondary" className="text-sm py-1.5">
            {requirement}
            <button
              type="button"
              onClick={() => removeRequirement(index)}
              className="ml-2 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      {requirements.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No requirements added yet. Add requirements to help attendees prepare for the event.
        </div>
      )}

      <div className="bg-muted rounded-lg p-4 mt-8">
        <h4 className="font-medium mb-2">Common Requirements Examples:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Laptop with specific software installed</li>
          <li>Basic knowledge of programming concepts</li>
          <li>Stable internet connection</li>
          <li>Development environment setup</li>
          <li>GitHub account</li>
        </ul>
      </div>
    </div>
  );
}