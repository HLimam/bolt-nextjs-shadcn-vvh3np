import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MentHunt - Find Your IT Mentor',
  description: 'Connect with experienced IT mentors to accelerate your career growth',
  keywords: ['mentorship', 'IT mentors', 'tech mentoring', 'career growth', 'software development'],
  authors: [{ name: 'MentHunt Team' }],
  openGraph: {
    title: 'MentHunt - Find Your IT Mentor',
    description: 'Connect with experienced IT mentors to accelerate your career growth',
    type: 'website',
    locale: 'en_US',
    siteName: 'MentHunt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MentHunt - Find Your IT Mentor',
    description: 'Connect with experienced IT mentors to accelerate your career growth',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};