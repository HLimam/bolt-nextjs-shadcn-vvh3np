'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

interface AgendaSectionProps {
  defaultAgenda: AgendaItem[];
  onChange: (agenda: AgendaItem[]) => void;
}

export function AgendaSection({ defaultAgenda, onChange }: AgendaSectionProps) {
  const [agenda, setAgenda] = useState<AgendaItem[]>(defaultAgenda);

  const addAgendaItem = () => {
    const newAgenda = [...agenda, { time: '', title: '', description: '' }];
    setAgenda(newAgenda);
    onChange(newAgenda);
  };

  const removeAgendaItem = (index: number) => {
    const newAgenda = agenda.filter((_, i) => i !== index);
    setAgenda(newAgenda);
    onChange(newAgenda);
  };

  const updateAgendaItem = (index: number, field: keyof AgendaItem, value: string) => {
    const newAgenda = agenda.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setAgenda(newAgenda);
    onChange(newAgenda);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Agenda</Label>
        <Button type="button" onClick={addAgendaItem} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {agenda.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Item {index + 1}</h4>
              <Button
                type="button"
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
      </div>
    </div>
  );
}