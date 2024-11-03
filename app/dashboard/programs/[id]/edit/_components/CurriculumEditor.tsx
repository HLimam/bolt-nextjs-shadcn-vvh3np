'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Week {
  number: number;
  title: string;
  topics: string[];
}

interface CurriculumEditorProps {
  weeks: Week[];
  onChange: (weeks: Week[]) => void;
}

export function CurriculumEditor({ weeks, onChange }: CurriculumEditorProps) {
  const [newTopic, setNewTopic] = useState('');

  const addWeek = () => {
    const newWeek: Week = {
      number: weeks.length + 1,
      title: '',
      topics: [],
    };
    onChange([...weeks, newWeek]);
  };

  const removeWeek = (index: number) => {
    const updatedWeeks = weeks.filter((_, i) => i !== index);
    onChange(updatedWeeks);
  };

  const updateWeek = (index: number, field: keyof Week, value: string | string[]) => {
    const updatedWeeks = weeks.map((week, i) => {
      if (i === index) {
        return { ...week, [field]: value };
      }
      return week;
    });
    onChange(updatedWeeks);
  };

  const addTopic = (weekIndex: number) => {
    if (!newTopic.trim()) return;
    const updatedWeeks = weeks.map((week, i) => {
      if (i === weekIndex) {
        return {
          ...week,
          topics: [...week.topics, newTopic.trim()],
        };
      }
      return week;
    });
    onChange(updatedWeeks);
    setNewTopic('');
  };

  const removeTopic = (weekIndex: number, topicIndex: number) => {
    const updatedWeeks = weeks.map((week, i) => {
      if (i === weekIndex) {
        return {
          ...week,
          topics: week.topics.filter((_, j) => j !== topicIndex),
        };
      }
      return week;
    });
    onChange(updatedWeeks);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Curriculum</CardTitle>
        <Button onClick={addWeek} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Week
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Week {week.number}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeWeek(weekIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Week Title</Label>
                <Input
                  value={week.title}
                  onChange={(e) => updateWeek(weekIndex, 'title', e.target.value)}
                  placeholder="Enter week title"
                />
              </div>

              <div>
                <Label>Topics</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Add new topic"
                  />
                  <Button
                    type="button"
                    onClick={() => addTopic(weekIndex)}
                    disabled={!newTopic.trim()}
                  >
                    Add
                  </Button>
                </div>

                <div className="mt-2 space-y-2">
                  {week.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="flex items-center justify-between p-2 bg-muted rounded-lg"
                    >
                      <span>{topic}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTopic(weekIndex, topicIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}