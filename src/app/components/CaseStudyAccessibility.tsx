import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudyAccessibilityProps {
  onBack: () => void;
  onNavigateToProject: (projectTitle: string) => void;
}

export function CaseStudyAccessibility({ onBack, onNavigateToProject }: CaseStudyAccessibilityProps) {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 pb-12">
        <div className="max-w-7xl w-full">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-gray-400 text-sm tracking-wider uppercase mb-6">Case Study</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-12 max-w-5xl">
              Web Accessibility Compliance
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Organization</p>
                <p className="text-lg">Enterprise Client</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Role</p>
                <p className="text-lg">Product Designer</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Year</p>
                <p className="text-lg">2025</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Duration</p>
                <p className="text-lg">9 Months</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
              Ensuring digital products meet WCAG 2.1 AA standards while creating inclusive experiences for users of all abilities through comprehensive design system updates and cross-functional collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-12 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="aspect-[16/9] overflow-hidden rounded-[24px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjcwNDMwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Accessibility Technology"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Challenge Section */}
      <section className="px-6 md:px-12 py-32 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Situation</h2>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
              The organization's digital products were not meeting WCAG 2.1 AA standards, creating barriers for users with disabilities and exposing the company to legal and reputational risks.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Without a comprehensive accessibility strategy, the product team lacked clear guidelines, consistent patterns, and validation processes to ensure inclusive experiences across all digital touchpoints.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="p-6 md:p-12 bg-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-6 md:gap-12">
            {/* Top Row - 2 images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1611926653670-e18689373857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwaW5jbHVzaXZlJTIwZGVzaWdufGVufDF8fHx8MTc2ODM0MDgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Inclusive Design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNpdHklMjB0ZWFtJTIwd29ya3xlbnwxfHx8fDE3NjgzNDEzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diversity Team Work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Approach Section */}
      <section className="px-6 md:px-12 py-32 bg-white text-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Why It Matters</h2>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Web accessibility ensures equal access to information and functionality for all users, regardless of ability. It's both a moral imperative and a business necessity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Legal Compliance</h3>
              <p className="text-gray-600 leading-relaxed">
                ADA, Section 508, and global accessibility laws require digital products to be accessible to people with disabilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Market Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Over 1 billion people worldwide have disabilities. Accessible design expands market reach and improves experience for all users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Brand Reputation</h3>
              <p className="text-gray-600 leading-relaxed">
                Demonstrating commitment to inclusion strengthens brand reputation and builds customer trust across all demographics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="px-6 md:px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="aspect-[21/9] overflow-hidden rounded-[24px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NzA0MzA4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Workspace Collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Design Process */}
      <section className="px-6 md:px-12 py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Project Complications</h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              Key challenges encountered while transforming legacy systems and processes to meet modern accessibility standards across the entire organization.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                title: 'WCAG Standards Interpretation',
                description:
                  'Understanding and implementing WCAG 2.1 AA success criteria across diverse use cases while navigating ambiguous guidelines that required careful interpretation and validation with accessibility experts.',
              },
              {
                number: '02',
                title: 'Stakeholder Education',
                description:
                  'Building accessibility awareness and buy-in across product, engineering, and executive teams who initially viewed compliance as a checklist rather than a fundamental design principle.',
              },
              {
                number: '03',
                title: 'Legacy System Remediation',
                description:
                  'Retrofitting accessibility into years of existing code, components, and patterns while maintaining backward compatibility and avoiding disruption to active user workflows.',
              },
              {
                number: '04',
                title: 'Comprehensive Testing',
                description:
                  'Establishing validation processes across screen readers, keyboard navigation, color contrast, cognitive load, and motor impairments while working within limited access to diverse user groups for testing.',
              },
              {
                number: '05',
                title: 'Resource Constraints',
                description:
                  'Balancing accessibility remediation timelines with feature development roadmaps and budget limitations while demonstrating ROI to leadership for continued investment in inclusive design.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-t border-gray-800 pt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-2">
                    <span className="text-5xl md:text-7xl text-gray-700">{step.number}</span>
                  </div>
                  <div className="md:col-span-10">
                    <h3 className="text-3xl md:text-4xl tracking-tight mb-4">{step.title}</h3>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Resolution</h2>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Through systematic audits, design system updates, and cross-functional training, the team achieved WCAG 2.1 AA compliance across all digital products. The initiative established accessibility as a core design principle, created reusable patterns and documentation, and built internal expertise to sustain inclusive design practices long-term.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-t border-gray-800 pt-6"
            >
              <div className="text-5xl md:text-6xl tracking-tight mb-4">100%</div>
              <p className="text-gray-400">WCAG 2.1 AA compliance achieved</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-t border-gray-800 pt-6"
            >
              <div className="text-5xl md:text-6xl tracking-tight mb-4">85%</div>
              <p className="text-gray-400">Reduction in accessibility issues</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-gray-800 pt-6"
            >
              <div className="text-5xl md:text-6xl tracking-tight mb-4">50+</div>
              <p className="text-gray-400">Team members trained in inclusive design</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Image */}
      <section className="px-6 md:px-12 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="aspect-[16/9] overflow-hidden rounded-[24px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NjcwNDMxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team Success"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Next Project Section */}
      <section className="px-6 md:px-12 py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-gray-600 text-sm tracking-wider uppercase mb-6">Next Project</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8">
              Expedia Group Accelerator
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Helping hotel partners maximize revenue through intelligent booking optimization
            </p>
            <motion.button
              onClick={() => onNavigateToProject('Expedia Group Accelerator')}
              className="inline-flex items-center gap-3 text-xl md:text-2xl group hover:opacity-70 transition-opacity"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              View Project
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}