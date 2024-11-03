'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { useMentor } from '@/src/providers/MentorProvider';
import { Mentor } from '@/src/domain/model/Mentor';
import Link from 'next/link';
import { toast } from 'sonner';

export function MentorList() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mentorService = useMentor();

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {
      const data = await mentorService.searchMentors({});
      setMentors(data);
    } catch (error) {
      console.error('Failed to load mentors:', error);
      toast.error('Failed to load mentors');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-8">
              <div className="flex gap-6">
                <div className="h-32 w-32 rounded-xl bg-muted" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 w-1/3 bg-muted rounded" />
                  <div className="h-4 w-1/4 bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (mentors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to find more mentors
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {mentors.map((mentor) => (
        <Card key={mentor.id} className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="h-32 w-32 rounded-xl ring-2 ring-primary/10">
                  <AvatarImage src={mentor.profileImage} alt={mentor.name} />
                  <AvatarFallback className="text-2xl">{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground text-sm px-2 py-1 rounded-lg">
                  ${mentor.programs[0]?.price}/mo
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {mentor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-muted-foreground">
                        ({mentor.reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{mentor.currentRole} at {mentor.company}</p>
                </div>

                <p className="text-muted-foreground line-clamp-2">{mentor.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{mentor.yearsOfExperience}+ years experience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{mentor.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{mentor.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      Schedule Call
                    </Button>
                  </div>
                  <Button asChild>
                    <Link href={`/mentors/${mentor.id}`}>
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}