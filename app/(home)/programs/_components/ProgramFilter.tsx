'use client';

import { useState } from 'react';
import { FilterSection } from '@/components/shared/FilterSection';

interface ProgramFilterProps {
  onFilter: (filters: any) => void;
}

const programFilters = [
  {
    id: 'level',
    label: 'Program Level',
    type: 'single' as const,
    options: [
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
      { value: 'frontend', label: 'Frontend Development' },
      { value: 'backend', label: 'Backend Development' },
      { value: 'fullstack', label: 'Full Stack Development' },
      { value: 'mobile', label: 'Mobile Development' },
      { value: 'devops', label: 'DevOps' },
      { value: 'cloud', label: 'Cloud Computing' },
      { value: 'ai', label: 'AI & Machine Learning' },
      { value: 'security', label: 'Security' },
    ],
  },
  {
    id: 'duration',
    label: 'Duration',
    type: 'single' as const,
    options: [
      { value: '4-8', label: '4-8 weeks' },
      { value: '12-16', label: '12-16 weeks' },
      { value: '20+', label: '20+ weeks' },
    ],
  },
  {
    id: 'price',
    label: 'Monthly Price',
    type: 'range' as const,
    range: {
      min: 0,
      max: 2000,
      step: 100,
      format: (value: number) => `$${value}`,
    },
  },
];

export function ProgramFilter({ onFilter }: ProgramFilterProps) {
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
      title="Filter Programs"
      filters={programFilters}
      selectedFilters={selectedFilters}
      onChange={handleFilterChange}
      onClear={clearFilters}
    />
  );
}