'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, Calendar, MapPin, Linkedin, Users } from 'lucide-react';
import { Mentor } from '@/src/domain/model/Mentor';
import Link from 'next/link';

interface MentorProfileProps {
  mentor: Mentor;
}

export function MentorProfile({ mentor }: MentorProfileProps) {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm -z-10" />

      {/* Floating Elements */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative">
              <Avatar className="h-48 w-48 rounded-2xl ring-2 ring-primary/10">
                <AvatarImage src={mentor.profileImage} alt={mentor.name} />
                <AvatarFallback className="text-4xl">{mentor.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold">{mentor.name}</h1>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{mentor.rating}</span>
                  <span className="text-muted-foreground">
                    ({mentor.reviews.length} reviews)
                  </span>
                </div>
              </div>
              <p className="text-xl text-muted-foreground">
                {mentor.currentRole} at {mentor.company}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{mentor.yearsOfExperience}+ years experience</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{mentor.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{mentor.timezone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{mentor.languages.join(', ')}</span>
              </div>
              {mentor.linkedIn && (
                <Link 
                  href={mentor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn Profile</span>
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill) => (
                <Badge key={skill} variant="secondary" className="animate-fade-up">
                  {skill}
                </Badge>
              ))}
            </div>

            <p className="text-lg leading-relaxed">{mentor.bio}</p>

            <div className="flex gap-4 pt-4">
              <Button size="lg" className="animate-fade-up">
                Book a Session
              </Button>
              <Button size="lg" variant="outline" className="animate-fade-up animation-delay-200">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}