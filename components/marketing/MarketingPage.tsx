'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const features = [
  'Connect with experienced IT professionals',
  'Personalized mentoring sessions',
  'Flexible scheduling options',
  'Expert guidance in your field',
  'Career development support',
  'Real-world project advice',
];

export function MarketingPage() {
  const { session } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find Your Perfect IT Mentor
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Accelerate your tech career with personalized guidance from industry experts. Join MentHunt today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {session ? (
                <Link href="/dashboard">
                  <Button size="lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">For Mentees</h2>
              <p className="text-gray-500">
                Get guidance from experienced professionals who've walked your path
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">For Mentors</h2>
              <p className="text-gray-500">
                Share your expertise and help shape the next generation of tech leaders
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">For Teams</h2>
              <p className="text-gray-500">
                Empower your developers with personalized mentorship programs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Why Choose MentHunt?</h2>
              <ul className="grid gap-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Getting Started</h2>
              <ol className="grid gap-4 list-decimal list-inside">
                <li>Create your free account</li>
                <li>Browse and select your ideal mentor</li>
                <li>Schedule your first session</li>
                <li>Start your learning journey</li>
              </ol>
              {!session && (
                <div className="pt-4">
                  <Link href="/auth/register">
                    <Button size="lg">Join Now</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}