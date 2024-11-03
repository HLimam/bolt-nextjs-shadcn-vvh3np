'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { mentorSchema } from '@/lib/validations/mentor';
import type { z } from 'zod';

type MentorFormData = z.infer<typeof mentorSchema>;

const steps = [
  { id: 'account', title: 'Account Details' },
  { id: 'profile', title: 'Professional Profile' },
  { id: 'expertise', title: 'Expertise & Rate' },
];

export function MentorRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<MentorFormData>({
    resolver: zodResolver(mentorSchema),
  });

  const onSubmit = async (data: MentorFormData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          role: 'MENTOR',
          name: `${data.firstName} ${data.lastName}`,
        }),
      });

      if (!response.ok) throw new Error();

      toast.success('Registration successful');
      router.push('/auth/signin');
    } catch {
      toast.error('Registration failed');
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-8">
      <Progress value={progress} className="h-2" />
      
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => (
            <li key={step.id} className="relative">
              <div className="flex items-center space-x-2">
                <div
                  className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    index <= currentStep
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        {currentStep === 1 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRole">Current Role</Label>
                  <Input
                    id="currentRole"
                    {...register('currentRole')}
                    placeholder="Senior Software Engineer"
                  />
                  {errors.currentRole && (
                    <p className="text-sm text-red-500">{errors.currentRole.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <p className="text-sm text-red-500">{errors.company.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  {...register('yearsOfExperience', { valueAsNumber: true })}
                />
                {errors.yearsOfExperience && (
                  <p className="text-sm text-red-500">{errors.yearsOfExperience.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input
                  id="linkedIn"
                  {...register('linkedIn')}
                  placeholder="https://linkedin.com/in/..."
                />
                {errors.linkedIn && (
                  <p className="text-sm text-red-500">{errors.linkedIn.message}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Areas of Expertise</Label>
                <Select onValueChange={(value) => {
                  if (selectedExpertise.length < 5) {
                    setSelectedExpertise([...selectedExpertise, value]);
                    setValue('expertise', [...selectedExpertise, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend Development</SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="cloud">Cloud Architecture</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedExpertise.map((expertise) => (
                    <Badge key={expertise} variant="secondary">
                      {expertise}
                      <button
                        type="button"
                        onClick={() => {
                          const newExpertise = selectedExpertise.filter(e => e !== expertise);
                          setSelectedExpertise(newExpertise);
                          setValue('expertise', newExpertise);
                        }}
                        className="ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {errors.expertise && (
                  <p className="text-sm text-red-500">{errors.expertise.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  {...register('bio')}
                  placeholder="Tell us about your experience..."
                  rows={5}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500">{errors.bio.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  {...register('hourlyRate', { valueAsNumber: true })}
                  placeholder="100"
                />
                {errors.hourlyRate && (
                  <p className="text-sm text-red-500">{errors.hourlyRate.message}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-between">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}