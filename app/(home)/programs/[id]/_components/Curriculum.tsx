'use client';

import { BookOpen, Clock, Target, Trophy, Users, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface CurriculumProps {
  curriculum: {
    weeks: {
      number: number;
      title: string;
      topics: string[];
    }[];
  };
}

export function Curriculum({ curriculum }: CurriculumProps) {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {curriculum.weeks.map((week, index) => (
          <AccordionItem key={week.number} value={`week-${week.number}`}>
            <AccordionTrigger className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4 w-full">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1 text-left space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      Week {week.number}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {week.topics.length} topics
                    </Badge>
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    {week.title}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-[4.5rem] pr-6 pb-6">
                <div className="grid gap-4 pl-4 border-l-2 border-muted">
                  {week.topics.map((topic, topicIndex) => (
                    <div 
                      key={topicIndex}
                      className="relative group/topic"
                    >
                      <div className="absolute -left-[1.65rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-primary bg-background group-hover/topic:bg-primary transition-colors"></div>
                      <div className="p-4 rounded-lg bg-muted/50 group-hover/topic:bg-muted transition-colors">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium group-hover/topic:text-primary transition-colors">
                            {topic}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            Topic {topicIndex + 1}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Master the fundamentals and advanced concepts of {topic.toLowerCase()}.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="secondary" className="text-xs">
                            Live Sessions
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Hands-on Practice
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Q&A Support
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{week.topics.length} Learning Modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>~5 hours of content</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 p-6 rounded-xl border bg-muted/50">
        <h3 className="text-lg font-semibold mb-4">Program Highlights</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Structured Learning Path</h4>
              <p className="text-sm text-muted-foreground">
                Carefully designed curriculum to ensure steady progress
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Expert-led Sessions</h4>
              <p className="text-sm text-muted-foreground">
                Learn directly from industry professionals
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Comprehensive Resources</h4>
              <p className="text-sm text-muted-foreground">
                Access to learning materials and documentation
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Hands-on Projects</h4>
              <p className="text-sm text-muted-foreground">
                Apply your knowledge through practical exercises
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}