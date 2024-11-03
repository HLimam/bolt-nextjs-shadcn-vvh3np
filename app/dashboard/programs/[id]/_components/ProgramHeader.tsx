'use client';

import { Badge } from '@/components/ui/badge';

interface ProgramHeaderProps {
  title: string;
  description: string;
  status: string;
}

export function ProgramHeader({ title, description, status }: ProgramHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      </div>
      <Badge variant={status === 'active' ? 'default' : 'secondary'}>
        {status}
      </Badge>
    </div>
  );
}