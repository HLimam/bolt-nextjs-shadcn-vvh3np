'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MentorProgram } from '@/src/domain/model/Mentor';
import { Check, ArrowRight } from 'lucide-react';

interface MentorProgramsProps {
  programs: MentorProgram[];
}

export function MentorPrograms({ programs }: MentorProgramsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {programs.map((program) => (
        <Card key={program.id} className="relative overflow-hidden group">
          {program.isPopular && (
            <Badge className="absolute top-4 right-4">Popular</Badge>
          )}
          <CardHeader>
            <CardTitle>{program.name}</CardTitle>
            <p className="text-muted-foreground">{program.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold">${program.price}</span>
                <span className="text-muted-foreground">
                  {program.duration} min • {program.sessionsPerMonth} sessions/month
                </span>
              </div>
            </div>

            <ul className="space-y-2">
              {program.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full group">
              Enroll Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}