import { BlogRepositoryPort } from '@/src/application/ports/out/BlogRepositoryPort';
import { Blog } from '@/src/domain/model/Blog';
import { db } from '@/src/lib/db';

// Mock blog data
const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React Performance Optimization',
    excerpt: 'Learn essential techniques for optimizing React applications for better performance and user experience.',
    content: `
      <h2>Understanding React Performance</h2>
      <p>Performance optimization in React applications is crucial for providing a smooth user experience. This guide covers key concepts and practical techniques.</p>
      
      <h2>Key Optimization Techniques</h2>
      <ul>
        <li>Using React.memo for component memoization</li>
        <li>Implementing useMemo and useCallback hooks</li>
        <li>Code splitting with React.lazy</li>
        <li>Virtual list optimization</li>
      </ul>
    `,
    slug: 'getting-started-with-react-performance',
    author: {
      id: '1',
      name: 'John Mentor',
      role: 'Senior Frontend Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    category: 'Frontend Development',
    tags: ['React', 'Performance', 'JavaScript', 'Web Development'],
    readTime: '5 min read',
    publishedAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
    status: 'published',
    featured: true,
  },
  {
    id: '2',
    title: 'System Design Interview Preparation Guide',
    excerpt: 'A comprehensive guide to preparing for system design interviews at top tech companies.',
    content: `
      <h2>System Design Basics</h2>
      <p>System design interviews test your ability to design scalable, reliable, and maintainable systems. This guide will help you prepare effectively.</p>
      
      <h2>Key Topics</h2>
      <ul>
        <li>Load Balancing</li>
        <li>Database Scaling</li>
        <li>Caching Strategies</li>
        <li>Microservices Architecture</li>
      </ul>
    `,
    slug: 'system-design-interview-guide',
    author: {
      id: '2',
      name: 'Sarah Chen',
      role: 'Senior System Architect',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    category: 'System Design',
    tags: ['System Design', 'Architecture', 'Interviews', 'Career'],
    readTime: '8 min read',
    publishedAt: '2024-02-18T15:00:00Z',
    updatedAt: '2024-02-18T15:00:00Z',
    status: 'published',
    featured: false,
  },
  {
    id: '3',
    title: 'Modern DevOps Practices for 2024',
    excerpt: 'Explore the latest DevOps practices and tools that are shaping the industry in 2024.',
    content: `
      <h2>Evolution of DevOps</h2>
      <p>DevOps practices continue to evolve with new tools and methodologies. Stay ahead of the curve with these modern approaches.</p>
      
      <h2>Key Practices</h2>
      <ul>
        <li>Infrastructure as Code</li>
        <li>GitOps Workflow</li>
        <li>Continuous Deployment</li>
        <li>Observability</li>
      </ul>
    `,
    slug: 'modern-devops-practices-2024',
    author: {
      id: '3',
      name: 'Alex Thompson',
      role: 'DevOps Engineer',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
    category: 'DevOps',
    tags: ['DevOps', 'Cloud', 'CI/CD', 'Infrastructure'],
    readTime: '6 min read',
    publishedAt: '2024-02-15T09:00:00Z',
    updatedAt: '2024-02-15T09:00:00Z',
    status: 'published',
    featured: true,
  },
];

// Initialize mock data in db
mockBlogs.forEach(blog => db.blogs.set(blog.id, blog));

export class InMemoryBlogRepository implements BlogRepositoryPort {
  async findAll(): Promise<Blog[]> {
    return Array.from(db.blogs.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async findBySlug(slug: string): Promise<Blog | null> {
    return Array.from(db.blogs.values()).find(blog => blog.slug === slug) || null;
  }

  async findByCategory(category: string): Promise<Blog[]> {
    return Array.from(db.blogs.values())
      .filter(blog => blog.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async findByTag(tag: string): Promise<Blog[]> {
    return Array.from(db.blogs.values())
      .filter(blog => blog.tags.includes(tag))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async findFeatured(): Promise<Blog[]> {
    return Array.from(db.blogs.values())
      .filter(blog => blog.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async save(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> {
    const id = (db.blogs.size + 1).toString();
    const now = new Date().toISOString();

    const newBlog: Blog = {
      id,
      ...blog,
      publishedAt: now,
      updatedAt: now,
    };

    db.blogs.set(id, newBlog);
    return newBlog;
  }

  async update(id: string, data: Partial<Blog>): Promise<Blog> {
    const blog = db.blogs.get(id);
    if (!blog) {
      throw new Error('Blog not found');
    }

    const updatedBlog = {
      ...blog,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    db.blogs.set(id, updatedBlog);
    return updatedBlog;
  }

  async delete(id: string): Promise<void> {
    db.blogs.delete(id);
  }
}