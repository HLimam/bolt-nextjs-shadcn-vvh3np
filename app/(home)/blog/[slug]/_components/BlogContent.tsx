'use client';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="relative animate-fade-up">
      <div className="absolute inset-y-0 -left-8 w-1 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
      <div 
        className="prose prose-lg max-w-none dark:prose-invert
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-lg
          prose-blockquote:border-l-primary/30 prose-blockquote:bg-muted/50 prose-blockquote:py-1
          prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded-md
          mb-12"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}