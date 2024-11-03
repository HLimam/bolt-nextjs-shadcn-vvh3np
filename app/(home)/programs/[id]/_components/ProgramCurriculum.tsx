'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Video, Code, MessageSquare, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TopicDetail {
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'exercise' | 'project' | 'quiz';
  resources: string[];
  learningObjectives: string[];
}

interface Week {
  number: number;
  title: string;
  topics: string[];
  description: string;
  duration: string;
  topicDetails: TopicDetail[];
  projectDescription?: string;
}

interface CurriculumProps {
  curriculum: {
    weeks: Week[];
  };
}

export function ProgramCurriculum({ curriculum }: CurriculumProps) {
  const getTopicIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'exercise':
        return <Code className="h-4 w-4" />;
      case 'project':
        return <BookOpen className="h-4 w-4" />;
      case 'quiz':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {curriculum.weeks.map((week) => (
            <AccordionItem key={week.number} value={`week-${week.number}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{week.number}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{week.title}</h3>
                      <Badge variant="secondary">{week.topics.length} topics</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{week.description}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline-block mr-1" />
                    {week.duration}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-14 space-y-6">
                  {/* Week Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Video className="h-4 w-4 text-primary" />
                        Video Content
                      </div>
                      <p className="text-2xl font-bold">4 hours</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Code className="h-4 w-4 text-primary" />
                        Exercises
                      </div>
                      <p className="text-2xl font-bold">6 tasks</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        Live Sessions
                      </div>
                      <p className="text-2xl font-bold">2 calls</p>
                    </div>
                  </div>

                  {/* Detailed Topics */}
                  <div className="space-y-4">
                    {week.topicDetails.map((topic, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getTopicIcon(topic.type)}
                              <h4 className="font-medium">{topic.title}</h4>
                              <Badge variant="outline" className="ml-2">
                                {topic.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {topic.description}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {topic.duration}
                          </span>
                        </div>

                        {/* Learning Objectives */}
                        <div className="mt-4 space-y-2">
                          <h5 className="text-sm font-medium">Learning Objectives:</h5>
                          <ul className="grid grid-cols-2 gap-2">
                            {topic.learningObjectives.map((objective, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2">Resources:</h5>
                          <div className="flex flex-wrap gap-2">
                            {topic.resources.map((resource, i) => (
                              <Badge key={i} variant="secondary">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Week Project */}
                  {week.projectDescription && (
                    <div className="mt-6 p-4 rounded-lg bg-primary/5 border-l-4 border-primary">
                      <h4 className="font-medium mb-2">Week Project</h4>
                      <p className="text-sm text-muted-foreground">
                        {week.projectDescription}
                      </p>
                    </div>
                  )}

                  {/* Progress Tracker */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Week Progress</span>
                      <span className="font-medium">60% Complete</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}