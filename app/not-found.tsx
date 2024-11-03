"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-muted p-4">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been
          removed, renamed, or doesn&apos;t exist.
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-8">
        Need help? <Link href="/contact" className="text-primary hover:underline">Contact support</Link>
      </p>
    </div>
  );
}