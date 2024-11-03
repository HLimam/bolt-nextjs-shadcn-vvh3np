'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Users, Calendar, MessageSquare, Trophy, Target, Star, Shield, Zap } from 'lucide-react';

interface ProgramFeaturesProps {
  features: string[];
}

const featureIcons: Record<string, any> = {
  'Live coding sessions': Code,
  'Project reviews': BookOpen,
  'Career guidance': Target,
  'Industry mentorship': Users,
  'Certificate upon completion': Trophy,
  'Live sessions': Calendar,
  'Community access': MessageSquare,
  'Expert feedback': Star,
  'Lifetime access': Shield,
  'Fast support': Zap,
};

export function ProgramFeatures({ features }: ProgramFeaturesProps) {
  return (
    <div className="space-y-8">
      {/* Hero Feature */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative">
          <h2 className="text-2xl font-bold mb-4">Program Highlights</h2>
          <p className="text-muted-foreground max-w-2xl">
            Our comprehensive program is designed to provide you with all the tools, resources, and support needed to succeed in your learning journey.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = featureIcons[feature] || BookOpen;
          return (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-primary/10"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {feature}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getFeatureDescription(feature)}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {getFeatureBadges(feature).map((badge, i) => (
                        <Badge key={i} variant="secondary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">100+</div>
              <p className="text-sm text-muted-foreground">Hours of Content</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">15+</div>
              <p className="text-sm text-muted-foreground">Real Projects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <p className="text-sm text-muted-foreground">Support Access</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">1:1</div>
              <p className="text-sm text-muted-foreground">Mentoring</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getFeatureDescription(feature: string): string {
  const descriptions: Record<string, string> = {
    'Live coding sessions': 'Interactive coding sessions with experienced mentors to learn best practices and solve real problems.',
    'Project reviews': 'Get detailed feedback on your projects from industry experts to improve your code quality.',
    'Career guidance': 'Personalized career advice and roadmap to help you achieve your professional goals.',
    'Industry mentorship': 'Learn directly from experienced professionals working at top tech companies.',
    'Certificate upon completion': 'Receive a verified certificate showcasing your newly acquired skills.',
    'Live sessions': 'Regular live sessions for real-time learning and interaction with mentors.',
    'Community access': 'Join our vibrant community of developers to network and share knowledge.',
    'Expert feedback': 'Regular code reviews and personalized feedback on your progress.',
    'Lifetime access': 'Unlimited access to course materials and future updates.',
    'Fast support': 'Quick responses to your questions and concerns through multiple channels.',
  };
  return descriptions[feature] || 'Enhance your learning experience with this valuable feature.';
}

function getFeatureBadges(feature: string): string[] {
  const badges: Record<string, string[]> = {
    'Live coding sessions': ['Interactive', 'Real-time', 'Hands-on'],
    'Project reviews': ['Code Quality', 'Best Practices', 'Feedback'],
    'Career guidance': ['Personalized', 'Industry Insights', 'Growth'],
    'Industry mentorship': ['Expert Guidance', 'Networking', 'Experience'],
    'Certificate upon completion': ['Verified', 'Achievement', 'Portfolio'],
    'Live sessions': ['Interactive', 'Q&A', 'Real-time'],
    'Community access': ['Networking', 'Collaboration', 'Support'],
    'Expert feedback': ['Personalized', 'Professional', 'Growth'],
    'Lifetime access': ['Unlimited', 'Updates', 'Resources'],
    'Fast support': ['24/7', 'Multi-channel', 'Quick Response'],
  };
  return badges[feature] || ['Premium', 'Essential', 'Value'];
}