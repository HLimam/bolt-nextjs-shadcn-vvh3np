'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface TopicsSectionProps {
  defaultTopics: string[];
  onChange: (topics: string[]) => void;
}

export function TopicsSection({ defaultTopics, onChange }: TopicsSectionProps) {
  const [topics, setTopics] = useState<string[]>(defaultTopics);
  const [newTopic, setNewTopic] = useState('');

  const addTopic = () => {
    if (newTopic.trim()) {
      const updatedTopics = [...topics, newTopic.trim()];
      setTopics(updatedTopics);
      onChange(updatedTopics);
      setNewTopic('');
    }
  };

  const removeTopic = (index: number) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    setTopics(updatedTopics);
    onChange(updatedTopics);
  };

  return (
    <div className="space-y-4">
      <Label>Topics</Label>
      
      <div className="flex gap-2">
        <Input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Add a topic"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
        />
        <Button type="button" onClick={addTopic} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <Badge key={index} variant="secondary">
            {topic}
            <button
              type="button"
              onClick={() => removeTopic(index)}
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