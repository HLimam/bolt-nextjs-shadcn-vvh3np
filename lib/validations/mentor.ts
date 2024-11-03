import { z } from 'zod';

export const mentorSchema = z.object({
  // Account Details
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  // Professional Profile
  currentRole: z.string()
    .min(2, 'Current role is required')
    .max(100, 'Current role must be less than 100 characters'),
  company: z.string()
    .min(2, 'Company name is required')
    .max(100, 'Company name must be less than 100 characters'),
  yearsOfExperience: z.number()
    .min(1, 'Must have at least 1 year of experience')
    .max(50, 'Years of experience cannot exceed 50'),
  linkedIn: z.string()
    .url('Invalid LinkedIn URL')
    .regex(/^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/, 'Must be a valid LinkedIn URL')
    .optional(),
  location: z.string()
    .min(2, 'Location is required')
    .max(100, 'Location must be less than 100 characters'),
  timezone: z.string()
    .min(1, 'Timezone is required'),
  languages: z.array(z.string())
    .min(1, 'Select at least one language'),

  // Expertise & Rate
  expertise: z.array(z.string())
    .min(1, 'Select at least one area of expertise')
    .max(5, 'Cannot select more than 5 areas of expertise'),
  bio: z.string()
    .min(100, 'Bio must be at least 100 characters')
    .max(1000, 'Bio must be less than 1000 characters'),
  hourlyRate: z.number()
    .min(0, 'Hourly rate must be positive')
    .max(1000, 'Hourly rate cannot exceed 1000'),
  availability: z.array(z.object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string(),
    endTime: z.string(),
  }))
    .min(1, 'Select at least one availability slot'),
  specializations: z.array(z.string())
    .min(1, 'Select at least one specialization')
    .max(3, 'Cannot select more than 3 specializations'),
});