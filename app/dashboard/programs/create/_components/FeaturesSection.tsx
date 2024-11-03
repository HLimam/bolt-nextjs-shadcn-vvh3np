'use client';

import { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface FeaturesSectionProps {
  register: UseFormRegister<any>;
  errors: any;
  setValue: UseFormSetValue<any>;
}

export function FeaturesSection({ register, errors, setValue }: FeaturesSectionProps) {
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim()) {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      setValue('features', updatedFeatures);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    setValue('features', updatedFeatures);
  };

  return (
    <div className="space-y-4">
      <Label>Program Features</Label>
      
      <div className="flex gap-2">
        <Input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Add a feature"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
        />
        <Button type="button" onClick={addFeature} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <Badge key={index} variant="secondary">
            {feature}
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="ml-2"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      {errors.features && (
        <p className="text-sm text-red-500">{errors.features.message}</p>
      )}
    </div>
  );
}