import { ResourceGrid } from './_components/ResourceGrid';
import { ResourceSearch } from './_components/ResourceSearch';

export default function ResourcesPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
        <p className="text-muted-foreground">
          Curated resources to support your learning journey
        </p>
      </div>
      <ResourceSearch />
      <ResourceGrid />
    </div>
  );
}