'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Program } from '@/src/domain/model/Program';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

interface ProgramHeroProps {
  program: Program;
}

export function ProgramHero({ program }: ProgramHeroProps) {
  const router = useRouter();

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm -z-10" />

      {/* Floating Elements */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{program.level}</Badge>
              {program.topics.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-4xl md:text-5xl font-bold">{program.title}</h1>
              <div className="text-3xl font-bold">${program.price}</div>
            </div>
            
            <p className="text-xl text-muted-foreground">{program.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-muted-foreground">
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

          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {program.mentors.slice(0, 3).map((mentor) => (
                  <Avatar key={mentor.id} className="ring-2 ring-background">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                {program.mentors.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                    +{program.mentors.length - 3}
                  </div>
                )}
              </div>
              <div className="text-sm">
                <p className="font-medium">Expert-led program</p>
                <p className="text-muted-foreground">Learn from industry professionals</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="group"
              onClick={() => router.push(`/programs/${program.id}/apply`)}
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}