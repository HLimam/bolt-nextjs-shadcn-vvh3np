'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface RangeConfig {
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}

interface Filter {
  id: string;
  label: string;
  type: 'single' | 'multiple' | 'range';
  options?: FilterOption[];
  range?: RangeConfig;
}

interface FilterSectionProps {
  title: string;
  filters: Filter[];
  selectedFilters: Record<string, any>;
  onChange: (filterId: string, value: any) => void;
  onClear: () => void;
}

export function FilterSection({
  title,
  filters,
  selectedFilters,
  onChange,
  onClear,
}: FilterSectionProps) {
  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  const renderFilter = (filter: Filter) => {
    switch (filter.type) {
      case 'single':
        return (
          <RadioGroup
            value={selectedFilters[filter.id] || 'all'}
            onValueChange={(value) => onChange(filter.id, value)}
          >
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${filter.id}-${option.value}`} />
                <label
                  htmlFor={`${filter.id}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'multiple':
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.id}-${option.value}`}
                  checked={(selectedFilters[filter.id] || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = selectedFilters[filter.id] || [];
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    onChange(filter.id, newValues);
                  }}
                />
                <label
                  htmlFor={`${filter.id}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'range':
        if (!filter.range) return null;
        const value = selectedFilters[filter.id] || [filter.range.min];
        return (
          <div className="space-y-4">
            <Slider
              min={filter.range.min}
              max={filter.range.max}
              step={filter.range.step}
              value={value}
              onValueChange={(newValue) => onChange(filter.id, newValue)}
            />
            <div className="text-sm text-muted-foreground">
              Up to {filter.range.format(value[0])}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear all
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {filters.map((filter) => (
          <div key={filter.id} className="space-y-4">
            <h3 className="font-medium">{filter.label}</h3>
            {renderFilter(filter)}
          </div>
        ))}

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            {Object.entries(selectedFilters).map(([filterId, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;

              const filter = filters.find((f) => f.id === filterId);
              if (!filter) return null;

              if (filter.type === 'range') {
                return (
                  <Badge key={filterId} variant="secondary">
                    Up to {filter.range?.format(value[0])}
                    <button
                      onClick={() => onChange(filterId, undefined)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              }

              const values = Array.isArray(value) ? value : [value];
              return values.map((v) => {
                const option = filter.options?.find((opt) => opt.value === v);
                if (!option) return null;
                return (
                  <Badge key={`${filterId}-${v}`} variant="secondary">
                    {option.label}
                    <button
                      onClick={() => {
                        const newValue = Array.isArray(value)
                          ? value.filter((val) => val !== v)
                          : undefined;
                        onChange(filterId, newValue);
                      }}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              });
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}