'use client';

import { useState } from 'react';
import { FilterSection } from '@/components/shared/FilterSection';
import { ProgramList } from './_components/ProgramList';
import { useProgram } from '@/src/providers/ProgramProvider';

const programFilters = [
  {
    id: 'level',
    label: 'Experience Level',
    type: 'single' as const,
    options: [
      { value: 'all', label: 'All Levels' },
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
    ],
  },
  {
    id: 'topics',
    label: 'Topics',
    type: 'multiple' as const,
    options: [
      { value: 'react', label: 'React' },
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'aws', label: 'AWS' },
      { value: 'devops', label: 'DevOps' },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'range' as const,
    range: {
      min: 0,
      max: 1000,
      step: 50,
      format: (value: number) => `$${value}`,
    },
  },
];

export default function ProgramsPage() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const programService = useProgram();

  const handleFilterChange = (filterId: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Mentorship Programs</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect mentorship program to accelerate your growth
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <FilterSection
            title="Filter Programs"
            filters={programFilters}
            selectedFilters={selectedFilters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </div>

        <div className="w-full lg:w-3/4">
          <ProgramList filters={selectedFilters} />
        </div>
      </div>
    </div>
  );
}