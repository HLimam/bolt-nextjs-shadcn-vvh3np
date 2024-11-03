import { HeroSection } from '@/components/marketing/HeroSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { FAQSection } from '@/components/marketing/FAQSection';
import { CTASection } from '@/components/marketing/CTASection';
import { StatsSection } from '@/components/marketing/StatsSection';
import { TrustedBySection } from '@/components/marketing/TrustedBySection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}