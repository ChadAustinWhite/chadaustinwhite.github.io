import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudyFashionForwardProps {
  onBack: () => void;
  onNavigateToProject: (projectTitle: string) => void;
}

export function CaseStudyFashionForward({ onBack, onNavigateToProject }: CaseStudyFashionForwardProps) {
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
              First American Title Galileo
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Organization</p>
                <p className="text-lg">First American Title</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Role</p>
                <p className="text-lg">Lead UX Designer</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Year</p>
                <p className="text-lg">2020</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Duration</p>
                <p className="text-lg">1 Year</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
              Streamlining the underwriting practice into a single, centralized experience.
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
              src="https://images.unsplash.com/photo-1553544260-f87e671974ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc2NjA3MzU2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="First American Title Galileo Hero"
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
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Underwriters at First American Title rely on disparate data sources, including public records, deeds, liens, surveys, property boundaries, and court documents, to assess property-related risks and determine insurability and required exceptions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Grid 1 */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] overflow-hidden rounded-[24px]"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5fGVufDF8fHx8MTc2NjA2NjAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fashion Runway"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[4/5] overflow-hidden rounded-[24px]"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1636529109797-0749811c4916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9zaG9vdHxlbnwxfHx8fDE3NjYwOTczODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fashion Photoshoot"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
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
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Because underwriters assess title risks non-linearly across separate sources, they face greater uncertainty, increased cognitive load, slower decision-making, and inconsistent judgments that can result in legal exposure or property-related harm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Historical Context</h3>
              <p className="text-gray-600 leading-relaxed">
                Property rights are built on past actions. Ownership, liens, errors, and legal claims all originate in the property's history.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Operational Bottleneck</h3>
              <p className="text-gray-600 leading-relaxed">
                Property type, whether residential or commercial, determines both the level of risk and the amount of data required for assessment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Last Defense</h3>
              <p className="text-gray-600 leading-relaxed">
                Underwriting acts as the final risk gate before organizations commit capital and assume financial or legal exposure.
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
              src="https://images.unsplash.com/photo-1630948688037-aa88dc433a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2FtcGFpZ258ZW58MXx8fHwxNzY2MTYzNTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Fashion Campaign"
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
              A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                title: 'Research Objections',
                description:
                  'Evaluating hypotheses before construction was new to the company, creating hesitation and the need to educate stakeholders on the value of user research.',
              },
              {
                number: '02',
                title: 'COVID-19',
                description:
                  'Ethnographic studies during COVID-19 were not possible, so we used other research methods and first principles to make sense of complexity.',
              },
              {
                number: '03',
                title: 'Data Sources',
                description:
                  'Released editorial content, influencer collaborations, and user-generated content campaigns across multiple platforms.',
              },
              {
                number: '04',
                title: 'Multi-Stakeholder Alignment',
                description:
                  'Maintained momentum with weekly content drops, styling tips, and community engagement initiatives.',
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
                src="https://images.unsplash.com/photo-1652754271476-0b6cf297b827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBncmFwaGljc3xlbnwxfHx8fDE3NjcxMzIzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gaming Design 8"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjcxOTc5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gaming Design 9"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom Row - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1683818051102-dd1199d163b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NjcxNzk1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gaming Design 10"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Bottom Row - 2 more images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNjcxODU1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gaming Design 11"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1707836916010-3c4ad261936c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzY3MTg0MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gaming Design 12"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Final Row - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748801583967-3038967d7279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwc2NyZWVufGVufDF8fHx8MTc2NzI0NTc5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gaming Design 13"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Row - 2 more images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzY4Mjg1Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Real Estate Property"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759884247142-028abd1e8ac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2ODI5ODAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team Collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto border-t border-gray-800"></div>
      </div>

      {/* Resolution Section */}
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
              Impact and outcomes
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              Significant improvements in underwriter efficiency and risk assessment accuracy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <p className="text-6xl md:text-7xl tracking-tight">42%</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Reduction in time to complete risk assessments
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4">
                <p className="text-6xl md:text-7xl tracking-tight">95%</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  User satisfaction with new automated risk scoring system
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <p className="text-6xl md:text-7xl tracking-tight">68%</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Increase in early identification of property risk factors
                </p>
              </div>
            </motion.div>
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
                  Cross-functional collaboration and iterative research methods enabled us to validate assumptions early and pivot when needed, resulting in a product that truly met underwriter needs.
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
                  Earlier stakeholder education on research value and more proactive data integration planning could have accelerated timelines and reduced friction during implementation.
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
                  Complex domain problems require deep user understanding and patience to navigate organizational change—technology alone cannot solve systemic workflow challenges.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}