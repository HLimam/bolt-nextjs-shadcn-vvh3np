'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="container flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Something went wrong!</h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              An unexpected error occurred. Our team has been notified and is working to fix the issue.
            </p>
          </div>

          <Button onClick={() => reset()}>Try again</Button>

          <div className="text-sm text-muted-foreground mt-8">
            Error ID: {error.digest}
          </div>
        </div>
      </body>
    </html>
  );
}