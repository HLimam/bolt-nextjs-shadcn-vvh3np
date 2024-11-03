'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Event } from '@/src/domain/model/Event';

interface BasicDetailsStepProps {
  data: Partial<Event>;
  onUpdate: (data: Partial<Event>) => void;
}

export function BasicDetailsStep({ data, onUpdate }: BasicDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Enter event title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your event..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Event Type</Label>
          <Select
            value={data.type}
            onValueChange={(value: 'workshop' | 'webinar' | 'networking') => 
              onUpdate({ type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="webinar">Webinar</SelectItem>
              <SelectItem value="networking">Networking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Select
            value={data.format}
            onValueChange={(value: 'online' | 'in-person') => 
              onUpdate({ format: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-person">In Person</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {data.format === 'in-person' && (
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location || ''}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="Enter event location"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={data.capacity || ''}
            onChange={(e) => onUpdate({ capacity: parseInt(e.target.value) })}
            min={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={data.price || ''}
            onChange={(e) => onUpdate({ price: parseFloat(e.target.value) })}
            min={0}
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
}