'use client';

import { MentorSearch } from './_components/MentorSearch';
import { MentorList } from './_components/MentorList';
import { FilterSheet } from '@/components/shared/FilterSheet';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Find Your Perfect Mentor
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with experienced IT professionals who can guide you through your career journey
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by skill, technology, or role..." 
              className="pl-12 h-12 bg-background/50 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <FilterSheet title="Filter Mentors">
            <MentorSearch onFilter={() => {}} />
          </FilterSheet>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <MentorSearch onFilter={() => {}} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <MentorList />
          </div>
        </div>
      </div>
    </div>
  );
}