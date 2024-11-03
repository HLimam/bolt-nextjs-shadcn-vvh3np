'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star, MessageSquare, Calendar, Users, ExternalLink } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  role: string;
  image: string;
  expertise: string[];
  company?: string;
  experience?: number;
  rating?: number;
  reviews?: number;
  mentees?: number;
  availability?: string;
  bio?: string;
  languages?: string[];
}

interface ProgramMentorsProps {
  mentors: Mentor[];
}

export function ProgramMentors({ mentors }: ProgramMentorsProps) {
  return (
    <div className="space-y-8">
      {/* Mentors Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mentors.length}</div>
                <p className="text-sm text-muted-foreground">Expert Mentors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">4.9/5</div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentor Cards */}
      <div className="grid gap-6">
        {mentors.map((mentor) => (
          <Card 
            key={mentor.id}
            className="group hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Mentor Profile */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 ring-2 ring-primary/10">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-muted-foreground">{mentor.role}</p>
                    {mentor.company && (
                      <p className="text-sm text-muted-foreground">
                        {mentor.company}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {mentor.rating && (
                        <Badge variant="secondary" className="gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          {mentor.rating}
                        </Badge>
                      )}
                      {mentor.reviews && (
                        <Badge variant="outline" className="gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {mentor.reviews} reviews
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mentor Stats & Actions */}
                <div className="flex-1 space-y-4">
                  {/* Experience & Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/50">
                    <div>
                      <div className="text-sm font-medium">Experience</div>
                      <div className="text-2xl font-bold text-primary">
                        {mentor.experience}+ yrs
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Languages</div>
                      <div className="text-2xl font-bold text-primary">
                        {mentor.languages?.length || 2}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Mentees</div>
                      <div className="text-2xl font-bold text-primary">
                        {mentor.mentees || 50}+
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Availability</div>
                      <div className="text-2xl font-bold text-primary">
                        {mentor.availability || '90%'}
                      </div>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Bio */}
                  {mentor.bio && (
                    <p className="text-sm text-muted-foreground">
                      {mentor.bio}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}