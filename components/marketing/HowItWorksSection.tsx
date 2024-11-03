import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, MessageSquare, Rocket } from 'lucide-react';

const steps = [
  {
    title: 'Find Your Mentor',
    description: 'Browse through our curated list of expert mentors and find the perfect match for your goals.',
    icon: Search,
  },
  {
    title: 'Schedule Sessions',
    description: 'Book one-on-one mentoring sessions at times that work best for you.',
    icon: Calendar,
  },
  {
    title: 'Connect & Learn',
    description: 'Engage in meaningful discussions, get code reviews, and receive personalized guidance.',
    icon: MessageSquare,
  },
  {
    title: 'Grow Your Career',
    description: 'Apply your learnings, build your portfolio, and accelerate your career growth.',
    icon: Rocket,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with MentHunt in four simple steps
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative">
              <div className="absolute -top-4 left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <CardHeader>
                <step.icon className="h-6 w-6 text-primary mb-2" />
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}