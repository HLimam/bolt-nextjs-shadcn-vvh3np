'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Award, Users } from 'lucide-react';

interface Speaker {
  name: string;
  role: string;
  image?: string;
}

interface EventSpeakerProps {
  speaker: Speaker;
}

export function EventSpeaker({ speaker }: EventSpeakerProps) {
  if (!speaker) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Speaker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={speaker.image} alt={speaker.name} />
            <AvatarFallback>{speaker.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{speaker.name}</h3>
            <p className="text-muted-foreground">{speaker.role}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Experience</p>
              <p className="text-sm text-muted-foreground">10+ years</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Expertise</p>
              <p className="text-sm text-muted-foreground">Industry Expert</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Events</p>
              <p className="text-sm text-muted-foreground">20+ sessions</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Areas of Expertise</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Web Development</Badge>
            <Badge variant="secondary">System Design</Badge>
            <Badge variant="secondary">Cloud Architecture</Badge>
            <Badge variant="secondary">DevOps</Badge>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A passionate technology leader with extensive experience in delivering high-impact presentations 
            and workshops. Known for making complex topics accessible and engaging for audiences of all levels.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}