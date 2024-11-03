import { MentorRepositoryPort } from '@/src/application/ports/out/MentorRepositoryPort';
import { Mentor } from '@/src/domain/model/Mentor';
import { SearchMentorDto } from '@/src/application/ports/in/MentorPort';
import { db } from '@/src/lib/db';

// Mock data for mentors
const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'MENTOR',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    expertise: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL'],
    yearsOfExperience: 8,
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' }
    ],
    rating: 4.8,
    reviews: [
      {
        id: '1',
        menteeId: '2',
        rating: 5,
        comment: 'Excellent mentor, very knowledgeable and patient. Helped me understand complex React concepts.',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        menteeId: '3',
        rating: 5,
        comment: 'John is an amazing teacher. His expertise in TypeScript and React is outstanding.',
        createdAt: '2024-01-20T15:00:00Z'
      },
      {
        id: '3',
        menteeId: '4',
        rating: 4,
        comment: 'Great mentor with practical industry experience. Very helpful with career guidance.',
        createdAt: '2024-01-25T09:00:00Z'
      }
    ],
    languages: ['English', 'Spanish'],
    currentRole: 'Senior Software Engineer',
    company: 'Tech Corp',
    linkedIn: 'https://linkedin.com/in/johndoe',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    bio: 'Senior Software Engineer with 8+ years of experience specializing in React and TypeScript. I\'m passionate about helping developers level up their frontend skills and build scalable applications. My mentoring approach focuses on practical, real-world scenarios and best practices.',
    programs: [
      {
        id: '1',
        name: 'React Mastery Program',
        description: 'Comprehensive React mentorship program covering advanced concepts, performance optimization, and best practices',
        price: 199,
        duration: 60,
        sessionsPerMonth: 4,
        features: [
          'Weekly 1-on-1 mentoring sessions',
          'Code reviews and feedback',
          'Custom learning roadmap',
          'Real-world project guidance',
          'Career development advice',
          'Resume and interview prep'
        ],
        isPopular: true
      },
      {
        id: '2',
        name: 'TypeScript Deep Dive',
        description: 'Master TypeScript and advanced type system concepts with hands-on projects',
        price: 249,
        duration: 90,
        sessionsPerMonth: 4,
        features: [
          'Advanced TypeScript concepts',
          'Project architecture reviews',
          'Best practices implementation',
          'Performance optimization',
          'Testing strategies',
          'Documentation guidance'
        ],
        isPopular: false
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'MENTOR',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    expertise: ['Cloud Architecture', 'AWS', 'DevOps', 'Kubernetes', 'Docker'],
    yearsOfExperience: 10,
    availability: [
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00' }
    ],
    rating: 4.9,
    reviews: [
      {
        id: '4',
        menteeId: '5',
        rating: 5,
        comment: 'Sarah is an exceptional cloud architecture mentor. Her knowledge of AWS is incredible.',
        createdAt: '2024-01-18T14:00:00Z'
      },
      {
        id: '5',
        menteeId: '6',
        rating: 5,
        comment: 'Excellent DevOps guidance and practical advice for real-world scenarios.',
        createdAt: '2024-01-22T16:00:00Z'
      }
    ],
    languages: ['English', 'Mandarin'],
    currentRole: 'Cloud Solutions Architect',
    company: 'Cloud Solutions Inc',
    linkedIn: 'https://linkedin.com/in/sarahchen',
    location: 'Seattle, WA',
    timezone: 'America/Los_Angeles',
    bio: 'Cloud Solutions Architect with extensive experience in AWS and DevOps. I specialize in helping developers understand cloud architecture, containerization, and DevOps practices. My goal is to help you build scalable, reliable cloud solutions.',
    programs: [
      {
        id: '3',
        name: 'Cloud Architecture Mastery',
        description: 'Comprehensive cloud architecture program focusing on AWS services and best practices',
        price: 299,
        duration: 90,
        sessionsPerMonth: 4,
        features: [
          'Cloud architecture reviews',
          'AWS best practices',
          'Cost optimization',
          'Security implementation',
          'Scalability patterns',
          'Disaster recovery planning'
        ],
        isPopular: true
      },
      {
        id: '4',
        name: 'DevOps Engineering',
        description: 'Learn DevOps practices, tools, and methodologies for modern software delivery',
        price: 249,
        duration: 60,
        sessionsPerMonth: 4,
        features: [
          'CI/CD pipeline setup',
          'Container orchestration',
          'Infrastructure as Code',
          'Monitoring and logging',
          'Automation strategies',
          'Team collaboration'
        ],
        isPopular: false
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Initialize the database with mock data
mockMentors.forEach(mentor => {
  db.mentors.set(mentor.id, mentor);
});

export class InMemoryMentorRepository implements MentorRepositoryPort {
  async findAll(criteria: SearchMentorDto): Promise<Mentor[]> {
    let mentors = Array.from(db.mentors.values());

    if (criteria.expertise?.length) {
      mentors = mentors.filter(mentor =>
        criteria.expertise!.every(exp => mentor.expertise.includes(exp))
      );
    }

    if (criteria.maxHourlyRate) {
      mentors = mentors.filter(mentor =>
        mentor.hourlyRate ? mentor.hourlyRate <= criteria.maxHourlyRate! : true
      );
    }

    if (criteria.languages?.length) {
      mentors = mentors.filter(mentor =>
        criteria.languages!.every(lang => mentor.languages.includes(lang))
      );
    }

    if (criteria.experienceLevel && criteria.experienceLevel !== 'all') {
      const experienceLevels = {
        junior: { min: 1, max: 3 },
        mid: { min: 4, max: 7 },
        senior: { min: 8, max: Infinity },
      };
      const level = experienceLevels[criteria.experienceLevel];
      mentors = mentors.filter(mentor =>
        mentor.yearsOfExperience >= level.min && mentor.yearsOfExperience <= level.max
      );
    }

    return mentors;
  }

  async findById(id: string): Promise<Mentor | null> {
    return db.mentors.get(id) || null;
  }

  async save(mentor: Mentor): Promise<Mentor> {
    db.mentors.set(mentor.id, mentor);
    return mentor;
  }

  async update(id: string, data: Partial<Mentor>): Promise<Mentor> {
    const mentor = db.mentors.get(id);
    if (!mentor) {
      throw new Error('Mentor not found');
    }

    const updatedMentor = {
      ...mentor,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    db.mentors.set(id, updatedMentor);
    return updatedMentor;
  }
}