import { Blog } from '@/src/domain/model/Blog';

export interface BlogRepositoryPort {
  findAll(): Promise<Blog[]>;
  findBySlug(slug: string): Promise<Blog | null>;
  findByCategory(category: string): Promise<Blog[]>;
  findByTag(tag: string): Promise<Blog[]>;
  findFeatured(): Promise<Blog[]>;
  save(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog>;
  update(id: string, data: Partial<Blog>): Promise<Blog>;
  delete(id: string): Promise<void>;
}