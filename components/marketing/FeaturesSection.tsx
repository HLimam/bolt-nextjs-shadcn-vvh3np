import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Users, Calendar, BookOpen } from 'lucide-react';

const features = [
  {
    name: 'Expert Mentors',
    description: 'Connect with experienced professionals from top tech companies.',
    icon: Users,
  },
  {
    name: 'Personalized Learning',
    description: 'Get customized guidance based on your goals and skill level.',
    icon: BookOpen,
  },
  {
    name: 'Code Reviews',
    description: 'Receive detailed feedback on your projects and coding practices.',
    icon: Code2,
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule and learning pace.',
    icon: Calendar,
  },
];

export function FeaturesSection() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Why Choose MentHunt?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to accelerate your IT career growth
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.name}>
            <CardHeader>
              <feature.icon className="h-8 w-8 mb-4" />
              <CardTitle>{feature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}