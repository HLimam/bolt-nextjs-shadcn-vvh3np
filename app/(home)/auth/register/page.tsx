import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose how you want to join MentHunt
          </p>
        </div>

        <div className="grid gap-6">
          <Link href="/auth/register/mentee">
            <Button variant="outline" className="w-full h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Join as Mentee</p>
                  <p className="text-sm text-muted-foreground">
                    Get guidance from experienced developers
                  </p>
                </div>
              </div>
            </Button>
          </Link>

          <Link href="/auth/register/mentor">
            <Button variant="outline" className="w-full h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Users className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Join as Mentor</p>
                  <p className="text-sm text-muted-foreground">
                    Share your expertise and help others grow
                  </p>
                </div>
              </div>
            </Button>
          </Link>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}