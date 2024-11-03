import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the mentorship program work?',
    answer: 'Our mentorship program connects you with experienced IT professionals. You can browse mentor profiles, schedule sessions based on your availability, and engage in one-on-one discussions, code reviews, and career guidance.',
  },
  {
    question: 'What kind of mentors are available?',
    answer: 'We have mentors from various IT fields including software development, DevOps, cloud architecture, data science, and more. All our mentors are vetted professionals with years of industry experience.',
  },
  {
    question: 'How much does it cost?',
    answer: 'We offer different pricing plans starting from $49/month. Each plan includes a set number of mentoring sessions and additional features. Custom enterprise plans are also available for teams.',
  },
  {
    question: 'Can I change my mentor?',
    answer: "Yes, you can change your mentor at any time if you feel the current match isn't working for you. We want to ensure you get the most out of your mentorship experience.",
  },
  {
    question: 'What if I need to cancel a session?',
    answer: 'Sessions can be cancelled or rescheduled up to 24 hours before the scheduled time without any penalty. Late cancellations may count against your monthly session quota.',
  },
];

export function FAQSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our mentorship program
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}