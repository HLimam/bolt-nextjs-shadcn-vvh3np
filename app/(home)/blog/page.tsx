import { BlogList } from './_components/BlogList';
import { BlogSidebar } from './_components/BlogSidebar';
import { BlogFilters } from './_components/BlogFilters';

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">MentHunt Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights, tutorials, and success stories from our community of mentors and developers
        </p>
      </div>

      <BlogFilters />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-3">
          <BlogList />
        </div>
        <div className="order-first lg:order-last">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
}