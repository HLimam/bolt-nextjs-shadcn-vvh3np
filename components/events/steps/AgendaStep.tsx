'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Event } from '@/src/domain/model/Event';

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

interface AgendaStepProps {
  data: Partial<Event>;
  onUpdate: (data: Partial<Event>) => void;
}

export function AgendaStep({ data, onUpdate }: AgendaStepProps) {
  const [agenda, setAgenda] = useState<AgendaItem[]>(data.agenda || []);

  const addAgendaItem = () => {
    const newAgenda = [...agenda, { time: '', title: '', description: '' }];
    setAgenda(newAgenda);
    onUpdate({ agenda: newAgenda });
  };

  const removeAgendaItem = (index: number) => {
    const newAgenda = agenda.filter((_, i) => i !== index);
    setAgenda(newAgenda);
    onUpdate({ agenda: newAgenda });
  };

  const updateAgendaItem = (index: number, field: keyof AgendaItem, value: string) => {
    const newAgenda = agenda.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setAgenda(newAgenda);
    onUpdate({ agenda: newAgenda });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Label>Event Agenda</Label>
        <Button onClick={addAgendaItem} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {agenda.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Session {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAgendaItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Time</Label>
                <Input
                  value={item.time}
                  onChange={(e) => updateAgendaItem(index, 'time', e.target.value)}
                  placeholder="e.g., 10:00 AM"
                />
              </div>

              <div>
                <Label>Title</Label>
                <Input
                  value={item.title}
                  onChange={(e) => updateAgendaItem(index, 'title', e.target.value)}
                  placeholder="Session title"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => updateAgendaItem(index, 'description', e.target.value)}
                  placeholder="Brief description"
                />
              </div>
            </div>
          </Card>
        ))}

        {agenda.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No agenda items yet. Click "Add Item" to create your event schedule.
          </div>
        )}
      </div>
    </div>
  );
}