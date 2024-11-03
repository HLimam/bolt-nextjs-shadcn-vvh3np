'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface RequirementsSectionProps {
  defaultRequirements: string[];
  onChange: (requirements: string[]) => void;
}

export function RequirementsSection({ defaultRequirements, onChange }: RequirementsSectionProps) {
  const [requirements, setRequirements] = useState<string[]>(defaultRequirements);
  const [newRequirement, setNewRequirement] = useState('');

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const updatedRequirements = [...requirements, newRequirement.trim()];
      setRequirements(updatedRequirements);
      onChange(updatedRequirements);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    onChange(updatedRequirements);
  };

  return (
    <div className="space-y-4">
      <Label>Requirements</Label>
      
      <div className="flex gap-2">
        <Input
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          placeholder="Add a requirement"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
        />
        <Button type="button" onClick={addRequirement} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {requirements.map((requirement, index) => (
          <Badge key={index} variant="secondary">
            {requirement}
            <button
              type="button"
              onClick={() => removeRequirement(index)}
              className="ml-2"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}