'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Program } from '@/src/domain/model/Program';
import { Calendar, Users, Clock } from 'lucide-react';
import Link from 'next/link';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{program.title}</h2>
                  <Badge>{program.level}</Badge>
                </div>
                <p className="text-muted-foreground">{program.description}</p>
              </div>
              <div className="text-2xl font-bold">${program.price}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {program.topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Starts {new Date(program.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{program.mentorCount} mentors</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {program.mentors.slice(0, 1).map((mentor) => (
                <div key={mentor.id} className="flex items-center gap-2">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{mentor.name}</p>
                    <p className="text-sm text-muted-foreground">{mentor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 md:w-48">
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link href={`/programs/${program.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" className="w-full">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}