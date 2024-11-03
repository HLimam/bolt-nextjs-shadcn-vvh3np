'use client';

import { useState } from 'react';
import { FilterSection } from '@/components/shared/FilterSection';

interface EventsFilterProps {
  onFilter: (filters: any) => void;
}

const eventFilters = [
  {
    id: 'type',
    label: 'Event Type',
    type: 'multiple' as const,
    options: [
      { value: 'workshop', label: 'Workshop' },
      { value: 'webinar', label: 'Webinar' },
      { value: 'networking', label: 'Networking' },
      { value: 'hackathon', label: 'Hackathon' },
      { value: 'conference', label: 'Conference' },
    ],
  },
  {
    id: 'format',
    label: 'Format',
    type: 'single' as const,
    options: [
      { value: 'online', label: 'Online' },
      { value: 'in-person', label: 'In Person' },
      { value: 'hybrid', label: 'Hybrid' },
    ],
  },
  {
    id: 'topics',
    label: 'Topics',
    type: 'multiple' as const,
    options: [
      { value: 'frontend', label: 'Frontend Development' },
      { value: 'backend', label: 'Backend Development' },
      { value: 'cloud', label: 'Cloud Computing' },
      { value: 'devops', label: 'DevOps' },
      { value: 'security', label: 'Security' },
      { value: 'career', label: 'Career Growth' },
      { value: 'soft-skills', label: 'Soft Skills' },
    ],
  },
  {
    id: 'price',
    label: 'Price',
    type: 'range' as const,
    range: {
      min: 0,
      max: 1000,
      step: 50,
      format: (value: number) => `$${value}`,
    },
  },
];

export function EventsFilter({ onFilter }: EventsFilterProps) {
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
      title="Filter Events"
      filters={eventFilters}
      selectedFilters={selectedFilters}
      onChange={handleFilterChange}
      onClear={clearFilters}
    />
  );
}