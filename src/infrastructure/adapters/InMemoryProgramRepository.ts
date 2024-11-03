import { ProgramRepositoryPort } from '@/src/application/ports/out/ProgramRepositoryPort';
import { Program } from '@/src/domain/model/Program';
import { ProgramCriteria } from '@/src/application/ports/in/ProgramPort';
import { db } from '@/src/lib/db';

const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Frontend Development Mastery',
    description: 'Master modern frontend development with React, TypeScript, and Next.js',
    level: 'intermediate',
    topics: ['React', 'TypeScript', 'Next.js', 'Performance Optimization'],
    duration: '12 weeks',
    price: 999,
    mentorCount: 15,
    startDate: '2024-03-15',
    curriculum: {
      weeks: [
        {
          number: 1,
          title: 'React Fundamentals',
          topics: ['Components', 'Props', 'State', 'Lifecycle Methods'],
        },
        {
          number: 2,
          title: 'TypeScript Essentials',
          topics: ['Types', 'Interfaces', 'Generics', 'Type Guards'],
        },
        {
          number: 3,
          title: 'Next.js and SSR',
          topics: ['Routing', 'Data Fetching', 'API Routes', 'Deployment'],
        },
      ],
    },
    features: [
      'Live coding sessions',
      'Project reviews',
      'Career guidance',
      'Industry mentorship',
      'Certificate upon completion',
    ],
    mentors: [
      {
        id: '1',
        name: 'John Smith',
        role: 'Senior Frontend Developer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        expertise: ['React', 'TypeScript'],
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Learn machine learning from scratch with hands-on projects',
    level: 'beginner',
    topics: ['Python', 'Machine Learning', 'Data Science', 'Neural Networks'],
    duration: '16 weeks',
    price: 1299,
    mentorCount: 8,
    startDate: '2024-04-01',
    curriculum: {
      weeks: [
        {
          number: 1,
          title: 'Python for ML',
          topics: ['NumPy', 'Pandas', 'Data Preprocessing'],
        },
        {
          number: 2,
          title: 'Supervised Learning',
          topics: ['Classification', 'Regression', 'Model Evaluation'],
        },
        {
          number: 3,
          title: 'Deep Learning Basics',
          topics: ['Neural Networks', 'TensorFlow', 'Model Training'],
        },
      ],
    },
    features: [
      'Hands-on projects',
      'Dataset analysis',
      'Model deployment',
      'Industry applications',
      'Capstone project',
    ],
    mentors: [
      {
        id: '2',
        name: 'Sarah Chen',
        role: 'ML Engineer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        expertise: ['Python', 'Machine Learning'],
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Cloud Architecture & DevOps',
    description: 'Master cloud architecture and DevOps practices',
    level: 'advanced',
    topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    duration: '14 weeks',
    price: 1499,
    mentorCount: 10,
    startDate: '2024-03-30',
    curriculum: {
      weeks: [
        {
          number: 1,
          title: 'Cloud Fundamentals',
          topics: ['AWS Services', 'Cloud Architecture', 'Security'],
        },
        {
          number: 2,
          title: 'Containerization',
          topics: ['Docker', 'Kubernetes', 'Container Orchestration'],
        },
        {
          number: 3,
          title: 'DevOps Practices',
          topics: ['CI/CD', 'Infrastructure as Code', 'Monitoring'],
        },
      ],
    },
    features: [
      'Real-world projects',
      'Infrastructure design',
      'Best practices',
      'Performance optimization',
      'Security implementation',
    ],
    mentors: [
      {
        id: '3',
        name: 'Michael Johnson',
        role: 'DevOps Engineer',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
        expertise: ['AWS', 'DevOps'],
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Initialize mock data in db
mockPrograms.forEach(program => db.programs.set(program.id, program));

export class InMemoryProgramRepository implements ProgramRepositoryPort {
  async findAll(criteria: ProgramCriteria): Promise<Program[]> {
    let programs = Array.from(db.programs.values());

    if (criteria.level && criteria.level !== 'all') {
      programs = programs.filter(p => p.level === criteria.level);
    }

    if (criteria.minPrice !== undefined) {
      programs = programs.filter(p => p.price >= criteria.minPrice!);
    }

    if (criteria.maxPrice !== undefined) {
      programs = programs.filter(p => p.price <= criteria.maxPrice!);
    }

    if (criteria.topics?.length) {
      programs = programs.filter(p =>
        criteria.topics!.every(topic => p.topics.includes(topic))
      );
    }

    if (criteria.duration) {
      const [min, max] = criteria.duration.split('-').map(Number);
      programs = programs.filter(p => {
        const weeks = parseInt(p.duration);
        return weeks >= min && (!max || weeks <= max);
      });
    }

    return programs;
  }

  async findById(id: string): Promise<Program | null> {
    return db.programs.get(id) || null;
  }

  async enrollUser(programId: string, userId: string): Promise<void> {
    const program = db.programs.get(programId);
    if (!program) {
      throw new Error('Program not found');
    }
  }

  async withdrawUser(programId: string, userId: string): Promise<void> {
    const program = db.programs.get(programId);
    if (!program) {
      throw new Error('Program not found');
    }
  }
}