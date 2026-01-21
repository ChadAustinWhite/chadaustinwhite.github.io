import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudyCreativeSpaceProps {
  onBack: () => void;
  onNavigateToProject: (projectTitle: string) => void;
}

export function CaseStudyCreativeSpace({ onBack, onNavigateToProject }: CaseStudyCreativeSpaceProps) {
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
              Worldpay API Key Management
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Organization</p>
                <p className="text-lg">Worldpay</p>
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
                <p className="text-lg">Ongoing</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
              Empowering partners and merchants to become payment facilitation experts through streamlined onboarding, intuitive tools, and actionable insights to help achieve their business goals.
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
              src="https://images.unsplash.com/photo-1683313107043-283d0319a11e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjY5OTA3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Payment Technology Hero"
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
              Legacy API key management systems hinder growth, create security risks, and erode trust. Issues like compliance gaps, weak security, and lack of merchant SSO prevent progress and limit scalability.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Upgrading these systems is essential to remove barriers. Modern solutions enhance security, drive growth, and help businesses stay competitive.
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
                src="https://images.unsplash.com/photo-1657812159075-7f0abd98f7b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY29tbWVyY2V8ZW58MXx8fHwxNzY3MDQyOTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Digital Commerce"
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
                src="https://images.unsplash.com/photo-1733503747506-773e56e4078f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NzA0MTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Financial Technology"
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
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              For partners and merchants, a modern, flexible API key management system is crucial for security, scalability, and growth. Outdated systems pose risks like data breaches and compliance issues, while modern solutions improve security, streamline operations, and scale to maintain a competitive edge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Table Stakes</h3>
              <p className="text-gray-600 leading-relaxed">
                API key management must ensure security, scalability, easy key rotation, access control, audit logs, and compliance, all while being user-friendly and integrable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">User Expectations</h3>
              <p className="text-gray-600 leading-relaxed">
                Developers, admins, and security teams expect secure key storage, easy rotation, access control, scalability, and clear audit logs, all while meeting security and compliance standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Interdependencies</h3>
              <p className="text-gray-600 leading-relaxed">
                Partners generate sustainable revenue through payment processing while enhancing merchant stickiness and platform value.
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
              src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjY5ODExNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Business Dashboard"
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
              Key challenges and strategic approaches in building a platform that simplifies payment facilitation complexity while maintaining enterprise-grade security and compliance.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                title: 'Business Requirements',
                description:
                  'Multi-property selection, date selection, forecast prediction, and performance data updates were key pain points for partners that required attention.',
              },
              {
                number: '02',
                title: 'User Permissions',
                description:
                  'Hotel partners were uncertain about whether Accelerator directly contributed to booking last-minute rooms or if it was the primary factor behind their success.',
              },
              {
                number: '03',
                title: 'Scope Creep',
                description:
                  'Project requirements frequently changed throughout the lifecycle. To avoid delays or missed deadlines, I met daily with my product partner to stay updated on the evolving project scope.',
              },
              {
                number: '04',
                title: 'Multi-Stakeholder Alignment',
                description:
                  'Balancing the needs of hotel partners, product, customer success, and design, while maintaining design system consistency and platform scalability.',
              },
              {
                number: '05',
                title: 'Research Insights',
                description:
                  'Because Worldpay is leveraged by partners as a branded or out-of-the-box service, the majority of partners restrict us from engaging with their merchants directly.',
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
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwc2VjdXJpdHl8ZW58MXx8fHwxNzM1NTcyMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Payment Security Design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBUEklMjBrZXklMjBtYW5hZ2VtZW50fGVufDF8fHx8MTczNTU3MjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="API Management Design"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Middle Row - 1 large image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzM1NTcyMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Financial Dashboard Design"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom Row - 2 images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTczNTU3MjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Data Analytics Design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhdGF8ZW58MXx8fHwxNzM1NTcyMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business Data Design"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Row - 2 more images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1765226410758-9ae3d34cd791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwc2VjdXJpdHklMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY4MzQxMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Payment Security Interface"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1635397990741-81cb230b154b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd29ya3NwYWNlJTIwZGVzaWdufGVufDF8fHx8MTc2ODM0MTI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Digital Workspace Design"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Final Row - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1667453466805-75bbf36e8707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzY3MjM3MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Digital Security Design"
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
              Quantifiable improvements in security, efficiency, and user experience.
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
                <p className="text-6xl md:text-7xl tracking-tight">78%</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Reduction in support tickets related to access issues
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
                <p className="text-6xl md:text-7xl tracking-tight">100%</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Compliance with security standards and audit requirements
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
                <p className="text-6xl md:text-7xl tracking-tight">45min</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Average time saved per week on key management tasks
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
                  Building a comprehensive design system specifically for API management interfaces created consistency and significantly reduced development time for future features.
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
                  Involving security teams earlier in the process would have streamlined key management workflows and reduced back-and-forth on compliance requirements.
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
                  Developer tools must prioritize clarity and error prevention—technical users need confidence that their actions won't break production systems.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
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
              Expedia Group<br />Ad Portal
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Empowering hotel partners to optimize advertising campaigns and maximize visibility
            </p>
            <motion.button
              onClick={() => onNavigateToProject('Expedia Group Ad Portal')}
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