'use client';

import { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface CurriculumSectionProps {
  register: UseFormRegister<any>;
  errors: any;
  setValue: UseFormSetValue<any>;
}

export function CurriculumSection({ register, errors, setValue }: CurriculumSectionProps) {
  const [weeks, setWeeks] = useState<number[]>([1]);

  const addWeek = () => {
    setWeeks([...weeks, weeks.length + 1]);
  };

  const removeWeek = (weekNumber: number) => {
    setWeeks(weeks.filter(w => w !== weekNumber));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Curriculum</Label>
        <Button type="button" onClick={addWeek} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Week
        </Button>
      </div>

      <div className="space-y-4">
        {weeks.map((weekNumber) => (
          <Card key={weekNumber} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Week {weekNumber}</h4>
              {weeks.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWeek(weekNumber)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  {...register(`curriculum.weeks.${weekNumber - 1}.title`)}
                  placeholder="Week title"
                />
              </div>

              <div>
                <Label>Topics</Label>
                <Input
                  {...register(`curriculum.weeks.${weekNumber - 1}.topics`)}
                  placeholder="Comma-separated topics"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}