import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="relative rounded-3xl bg-primary px-6 py-16 md:px-12">
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Accelerate Your IT Career?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Join thousands of developers who are already growing their careers with expert mentorship.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/mentors">
                <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10">
                  Browse Mentors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}