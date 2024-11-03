export function TrustedBySection() {
  const companies = [
    'Google',
    'Microsoft',
    'Amazon',
    'Meta',
    'Apple',
    'Netflix',
  ];

  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Our mentors work at leading tech companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {companies.map((company) => (
            <div
              key={company}
              className="text-2xl font-bold text-muted-foreground/50"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}