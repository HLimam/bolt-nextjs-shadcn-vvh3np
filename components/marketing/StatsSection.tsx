import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Star, Trophy } from 'lucide-react';

const stats = [
  {
    title: 'Active Mentors',
    value: '500+',
    description: 'Expert professionals',
    icon: Users,
  },
  {
    title: 'Sessions Completed',
    value: '10,000+',
    description: 'Mentoring sessions',
    icon: Calendar,
  },
  {
    title: 'Success Rate',
    value: '95%',
    description: 'Satisfaction rate',
    icon: Star,
  },
  {
    title: 'Career Growth',
    value: '80%',
    description: 'Promotion rate',
    icon: Trophy,
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}