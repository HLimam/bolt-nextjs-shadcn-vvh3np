export default function BlogPostLoading() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-8 animate-pulse">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-muted rounded" />
            <div className="h-6 w-24 bg-muted rounded" />
          </div>
          <div className="h-12 w-3/4 bg-muted rounded" />
          <div className="h-8 w-2/3 bg-muted rounded" />
        </div>

        {/* Author and Meta */}
        <div className="flex items-center justify-between border-y py-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted rounded" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded w-full" />
          ))}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded w-3/4" />
          ))}
        </div>
      </div>
    </div>
  );
}