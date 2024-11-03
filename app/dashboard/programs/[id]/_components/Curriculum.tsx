'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CurriculumWeek {
  number: number;
  title: string;
  topics: string[];
}

interface CurriculumProps {
  weeks: CurriculumWeek[];
}

export function Curriculum({ weeks }: CurriculumProps) {
  if (!weeks?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {weeks.map((week) => (
            <div key={week.number} className="space-y-2">
              <h3 className="font-semibold">Week {week.number}: {week.title}</h3>
              <div className="flex flex-wrap gap-2">
                {week.topics.map((topic) => (
                  <Badge key={topic} variant="outline">{topic}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}