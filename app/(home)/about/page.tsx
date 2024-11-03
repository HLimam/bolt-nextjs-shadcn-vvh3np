import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Shield, Heart } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'Building a supportive community of mentors and mentees who help each other grow.',
  },
  {
    icon: Target,
    title: 'Quality Focus',
    description: 'Ensuring high-quality mentorship through careful vetting and continuous feedback.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Creating a secure environment where learning and growth can flourish.',
  },
  {
    icon: Heart,
    title: 'Passion for Growth',
    description: 'Dedicated to helping every member reach their full potential in tech.',
  },
];

const team = [
  {
    name: 'David Chen',
    role: 'Founder & CEO',
    bio: '15+ years in tech leadership, previously at Google and Microsoft.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Mentorship',
    bio: 'Former engineering manager, passionate about developer education.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop',
  },
  {
    name: 'James Wilson',
    role: 'Technical Director',
    bio: '12+ years in software architecture and team leadership.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Empowering Tech Careers Through Mentorship
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Our mission is to connect aspiring developers with experienced mentors who can guide them to success.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground">The principles that guide everything we do</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground">The people behind MentHunt</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-32 w-32 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Whether you're looking to grow your career or share your expertise, we'd love to have you in our community.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register/mentee">
              <Button size="lg" variant="secondary">
                Join as Mentee
              </Button>
            </Link>
            <Link href="/auth/register/mentor">
              <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10">
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}