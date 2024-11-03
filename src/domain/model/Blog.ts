export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: {
    id: string;
    name: string;
    role: string;
    image?: string;
  };
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
}