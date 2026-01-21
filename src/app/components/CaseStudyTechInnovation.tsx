import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudyTechInnovationProps {
  onBack: () => void;
  onNavigateToProject: (projectTitle: string) => void;
}

export function CaseStudyTechInnovation({ onBack, onNavigateToProject }: CaseStudyTechInnovationProps) {
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
              First American Title Design Playbook
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Organization</p>
                <p className="text-lg">NexGen AI</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Role</p>
                <p className="text-lg">Product & UX</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Year</p>
                <p className="text-lg">2024</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Duration</p>
                <p className="text-lg">6 Months</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
              Designing the future of AI-powered productivity tools with an intuitive product 
              experience that makes complex machine learning capabilities accessible to everyday 
              business users.
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
              src="https://images.unsplash.com/photo-1716436329475-4c55d05383bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjYwMzU2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="First American Title Design Playbook Hero"
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
              NexGen AI had developed groundbreaking machine learning technology but struggled 
              to translate its technical capabilities into a product that non-technical users 
              could understand and adopt.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              The challenge was to design a product experience that abstracted complex AI 
              functionality behind an intuitive interface, making powerful automation accessible 
              to business teams without technical expertise.
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
                src="https://images.unsplash.com/photo-1760443728259-7e87a6326599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMHNjcmVlbnxlbnwxfHx8fDE3NjgzNDE0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Technology Innovation Screen"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW50ZXJmYWNlJTIwZGVzaWdufGVufDF8fHx8MTc2ODMxMzQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Digital Interface Design"
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
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Our Approach</h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We created a user-centered product design that prioritized simplicity and 
              progressive disclosure, revealing complexity only when users needed it while 
              maintaining powerful functionality under the hood.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">User Research</h3>
              <p className="text-gray-600 leading-relaxed">
                Conducted extensive research with target users to understand mental models, 
                pain points, and expectations for AI-powered tools.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Interface Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Designed an intuitive visual language with clear information hierarchy, 
                conversational UI patterns, and smart defaults.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Onboarding Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Created a guided onboarding flow that educated users about capabilities 
                while delivering immediate value.
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
              src="https://images.unsplash.com/photo-1759884247173-3db27f7fafef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbiUyMHN0YXJ0dXB8ZW58MXx8fHwxNzY2MTM5MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Tech Innovation Startup"
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
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Complications</h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              Our iterative design process balanced user needs with technical constraints, 
              constantly testing and refining the experience.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                title: 'Discovery & Research',
                description:
                  'Interviewed target users, analyzed competitor products, and mapped user journeys to identify opportunities and challenges.',
              },
              {
                number: '02',
                title: 'Concept Exploration',
                description:
                  'Created multiple design concepts exploring different interaction models and interface paradigms for AI-powered workflows.',
              },
              {
                number: '03',
                title: 'Prototyping & Testing',
                description:
                  'Built interactive prototypes and conducted usability testing sessions to validate design decisions and gather feedback.',
              },
              {
                number: '04',
                title: 'Design System & Launch',
                description:
                  'Developed a comprehensive design system and worked closely with engineering to ensure high-quality implementation.',
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

      {/* Divider */}
      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto border-t border-gray-800"></div>
      </div>

      {/* Retrospective Section */}
      <section className="px-6 md:px-12 py-32 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">
              Reflecting on the journey and key lessons learned.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-3">
                <p className="text-xs tracking-wider uppercase text-gray-600">What Worked Well</p>
                <p className="text-xs tracking-wider uppercase text-gray-600">What We'd Do Differently</p>
                <p className="text-xs tracking-wider uppercase text-gray-600">Key Takeaway</p>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xs tracking-wider uppercase text-gray-500 mb-4">What Worked Well</h3>
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                  Creating a comprehensive design playbook ensured consistency across all teams and dramatically accelerated the design-to-development handoff process.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xs tracking-wider uppercase text-gray-500 mb-4">What We'd Do Differently</h3>
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                  Establishing governance and maintenance protocols earlier would have prevented design system drift as teams scaled adoption across the organization.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xs tracking-wider uppercase text-gray-500 mb-4">Key Takeaway</h3>
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                  Design systems are living products that require continuous iteration, user feedback, and organizational buy-in to deliver lasting value at scale.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Work CTA */}
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
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
              Expedia Group Accelerator
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Helping hotel partners build deeper connections with travelers. · 2025
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