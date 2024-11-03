'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Program } from '@/src/domain/model/Program';
import { ProgramCurriculum } from './ProgramCurriculum';
import { ProgramMentors } from './ProgramMentors';
import { ProgramFeatures } from './ProgramFeatures';

interface ProgramTabsProps {
  program: Program;
}

export function ProgramTabs({ program }: ProgramTabsProps) {
  return (
    <Tabs defaultValue="curriculum" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        <TabsTrigger value="mentors">Mentors</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
      </TabsList>

      <TabsContent value="curriculum" className="mt-6">
        <ProgramCurriculum curriculum={program.curriculum} />
      </TabsContent>

      <TabsContent value="mentors" className="mt-6">
        <ProgramMentors mentors={program.mentors} />
      </TabsContent>

      <TabsContent value="features" className="mt-6">
        <ProgramFeatures features={program.features} />
      </TabsContent>
    </Tabs>
  );
}