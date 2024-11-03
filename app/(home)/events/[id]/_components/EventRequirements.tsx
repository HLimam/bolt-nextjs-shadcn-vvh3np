'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface EventRequirementsProps {
  requirements: string[];
}

export function EventRequirements({ requirements }: EventRequirementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-muted-foreground">
            To get the most out of this event, please ensure you have the following:
          </p>

          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{requirement}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getRequirementDescription(requirement)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> If you have any questions about the requirements or need assistance setting up, please contact our support team before the event.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getRequirementDescription(requirement: string): string {
  // Add helpful descriptions for common requirements
  if (requirement.toLowerCase().includes('laptop')) {
    return 'Make sure your device is fully charged and has a stable internet connection.';
  }
  if (requirement.toLowerCase().includes('node')) {
    return 'Latest LTS version recommended. Installation guide will be provided.';
  }
  if (requirement.toLowerCase().includes('code editor')) {
    return 'VS Code is recommended, but you can use any editor you\'re comfortable with.';
  }
  return 'This requirement will help you participate fully in the event activities.';
}