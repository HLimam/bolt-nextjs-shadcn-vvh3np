'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Calendar } from 'lucide-react';
import { FilterSheet } from '@/components/shared/FilterSheet';
import { EventsList } from './_components/EventsList';
import { EventsFilter } from './_components/EventsFilter';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4" />
              <span>Upcoming Events</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Learn from the Best
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join workshops, webinars, and networking events led by industry experts
          </p>
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/50 backdrop-blur-sm"
              />
            </div>
            <FilterSheet title="Filter Events">
              <EventsFilter onFilter={() => {}} />
            </FilterSheet>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <EventsFilter onFilter={() => {}} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <EventsList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}