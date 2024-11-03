'use client';

import { useState } from 'react';
import { FilterSection } from '@/components/shared/FilterSection';

interface MentorSearchProps {
  onFilter: (filters: any) => void;
}

const mentorFilters = [
  {
    id: 'expertise',
    label: 'Expertise',
    type: 'multiple' as const,
    options: [
      { value: 'react', label: 'React' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'aws', label: 'AWS' },
      { value: 'devops', label: 'DevOps' },
      { value: 'system-design', label: 'System Design' },
      { value: 'machine-learning', label: 'Machine Learning' },
      { value: 'cloud', label: 'Cloud Architecture' },
      { value: 'frontend', label: 'Frontend Development' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    type: 'multiple' as const,
    options: [
      { value: 'english', label: 'English' },
      { value: 'spanish', label: 'Spanish' },
      { value: 'mandarin', label: 'Mandarin' },
      { value: 'hindi', label: 'Hindi' },
      { value: 'french', label: 'French' },
      { value: 'german', label: 'German' },
    ],
  },
  {
    id: 'experience',
    label: 'Experience Level',
    type: 'single' as const,
    options: [
      { value: 'junior', label: '1-3 years' },
      { value: 'mid', label: '4-7 years' },
      { value: 'senior', label: '8+ years' },
    ],
  },
  {
    id: 'rate',
    label: 'Hourly Rate',
    type: 'range' as const,
    range: {
      min: 0,
      max: 500,
      step: 10,
      format: (value: number) => `$${value}`,
    },
  },
];

export function MentorSearch({ onFilter }: MentorSearchProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = {
      ...selectedFilters,
      [filterId]: value,
    };

    if (value === null) {
      delete newFilters[filterId];
    }

    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilter({});
  };

  return (
    <FilterSection
      title="Filter Mentors"
      filters={mentorFilters}
      selectedFilters={selectedFilters}
      onChange={handleFilterChange}
      onClear={clearFilters}
    />
  );
}