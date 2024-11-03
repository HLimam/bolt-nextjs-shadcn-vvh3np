import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                IT Mentor
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Connect with experienced professionals who can guide you through your IT career journey.
              Get personalized mentorship, project feedback, and career guidance.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/auth/register">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/mentors">
              <Button variant="outline" size="lg">
                Browse Mentors
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            Join over 10,000+ developers growing their careers
          </div>
        </div>
      </div>
    </section>
  );
}