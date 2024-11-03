export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="/mentors" className="text-muted-foreground hover:text-primary">Find Mentors</a></li>
              <li><a href="/programs" className="text-muted-foreground hover:text-primary">Programs</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-primary">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              <li><a href="/guides" className="text-muted-foreground hover:text-primary">Guides</a></li>
              <li><a href="/events" className="text-muted-foreground hover:text-primary">Events</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
              <li><a href="/cookies" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} MentHunt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}