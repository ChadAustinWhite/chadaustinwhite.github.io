interface CaseStudyTestimonialProps {
  quote: string;
  name: string;
  role: string;
}

export function CaseStudyTestimonial({ quote, name, role }: CaseStudyTestimonialProps) {
  return (
    <section
      id="cs-testimonial"
      className="border-t border-[var(--border)] px-[var(--cs-page-gutter)] py-16 md:py-24"
      aria-label="Testimonial"
    >
      <div className="mx-auto max-w-[72rem]">
        <blockquote className="border-l-4 border-[var(--ink-muted)] pl-6 md:pl-8">
          <p className="max-w-[720px] text-[15px] leading-[1.65] text-[var(--ink)] md:text-[17px] md:leading-[1.6]">
            {quote}
          </p>
          <footer className="mt-6">
            <cite className="not-italic">
              <span className="font-semibold text-[var(--ink)]">{name}</span>
              <span className="text-[var(--ink-muted)]"> — {role}</span>
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
