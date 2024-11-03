import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "The mentorship I received completely transformed my career. My mentor helped me land a senior role at a top tech company.",
    author: {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop",
    },
    rating: 5
  },
  {
    content: "The personalized guidance and code reviews have significantly improved my development skills. Worth every penny!",
    author: {
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop",
    },
    rating: 5
  },
  {
    content: "Found an amazing mentor who helped me transition into cloud architecture. The structured approach made all the difference.",
    author: {
      name: "Alex Thompson",
      role: "Cloud Architect",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop",
    },
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Members Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Success stories from developers who transformed their careers through mentorship
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.author.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.author.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}