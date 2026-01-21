import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from '../../assets/8c2dd16b97b867c5b53c4f0bb71c3edb0f360315.png';
// import howWeGotThereImage from '../../assets/571f78a14476da1e0368299e85927ce1728e0169.png';
// import placeholderImage from '../../assets/9ffb8ecf4316afd9ca40ae29d43fff92d67d4db0.png';
// import gridImage from '../../assets/cbb97885d32ecc4644218259e0659115bf375928.png';
// import additionalImage from '../../assets/13faf2e796780adbee7f79ccc774eb2aff65eaa2.png';
// import architecturePlaceholder from '../../assets/8469e703920b46245595ddab02b86478f2e4c866.png';
import performanceImage from '../../assets/3ed824419920f6ae113b49f9fc8fb972ca0f52e8.png';
import workflowImage from '../../assets/7826a02abf154ead122568ca40a20f34ddc4e9e3.png';
import createAcceleratorImage from '../../assets/c51c94a4c2620c49d15708f4d96e0de2e6790e64.png';
// import advancedVisibilityImage from '../../assets/bb29c2b2a6edbe7bfee90c9d0c0e3f99d36c0fde.png';
import ratePlansImage from '../../assets/c503128cb5cd81bdd073cbdca0c1080a99a32b40.png';
import metricsImage from '../../assets/ad898bd73be58716f8d21376d152499a95dbc4c7.png';
import affinityMapImage from '../../assets/7efccbbc95cc20853e147c4906f310487a874cdc.png';
// import visibilityOptionsImage from '../../assets/80479613b6a44473be86aead33bed11b.png';
import teamCollaborationImage from '../../assets/8586690ef980ddeaa56377717d63b86e5f2c528a.png';
import createAcceleratorSidebarImage from '../../assets/b6177482bb3d4bd8195a52afe305e94f028def7a.png';

interface CaseStudyProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'services' | 'about') => void;
  onNavigateToProject: (projectTitle: string) => void;
}

export function CaseStudy({ onBack, onNavigate, onNavigateToProject }: CaseStudyProps) {
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
              Expedia Group Accelerator
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Organization</p>
                <p className="text-lg">Expedia Group</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Role</p>
                <p className="text-lg">Lead UX Designer</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Year</p>
                <p className="text-lg">2025</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Duration</p>
                <p className="text-lg">8 Months</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
              Empowering hotel partners across all Expedia entities to unlock stronger connections with travelers by helping them appear higher in search results.
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
              src={heroImage}
              alt="Modern Architecture Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Challenge Section */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Situation</h2>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
              Hotel partners face challenges in optimizing their advertising strategies and improving search rankings due to a lack of an intuitive, modern experience and actionable insights.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Without a comprehensive, user-friendly product, partners struggle to make data-driven decisions, limiting their ability to engage guests effectively and maximize performance.
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
                src="https://images.unsplash.com/photo-1553601581-8a1f1010efbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NjYxMzM2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Building Facade"
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
                src="https://images.unsplash.com/photo-1696401680571-f6e9986026d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGV0YWlsfGVufDF8fHx8MTc2NjEzMDUxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Architectural Detail"
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
              Search visibility directly impacts bookings and revenue. When hotel partners can't clearly understand or optimize their performance, they miss opportunities to reach travelers at the exact moment of intent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Customer Expectations</h3>
              <p className="text-gray-600 leading-relaxed">
                Customers expect seamless, on-demand booking for last-minute rooms and have access to similar tools through competitor products.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Brand Reputation</h3>
              <p className="text-gray-600 leading-relaxed">
                Maintaining Expedia's brand reputation through modern, intuitive tools ensures hotel partner trust, loyalty, and long-term business growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl tracking-tight mb-4">Revenue Generator</h3>
              <p className="text-gray-600 leading-relaxed">
                Expedia earns revenue through Accelerator when partners leverage it and a guest books, driving value through premium service charges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="px-6 md:px-12 py-32 bg-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="aspect-[21/9] overflow-hidden rounded-[24px]">
            <ImageWithFallback
              src={workflowImage}
              alt="Workflow Diagram"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Design Process */}
      <section className="px-6 md:px-12 py-32 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8">Project Complications</h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with perseverance and flexibility.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                title: 'Product Comprehension',
                description:
                  'Hotel partners were uncertain about whether Accelerator directly contributed to booking last-minute rooms or if it was the primary factor behind their success.',
              },
              {
                number: '02',
                title: 'Interdependencies',
                description:
                  'Collaborating cross-functionally to identify offerings in other partner tools, their timing, and how Accelerator adds value at key moments of the partner journey.',
              },
              {
                number: '03',
                title: 'Multi-Stakeholder Alignment',
                description:
                  'Balancing the needs of hotel partners, product, customer success, and design, while maintaining design system consistency and platform scalability.',
              },
              {
                number: '04',
                title: 'Legacy Design System',
                description:
                  'When I joined, the project used an outdated design system, and with feature parity, some approaches needed rethinking.',
              },
              {
                number: '05',
                title: 'Technical Limitations',
                description:
                  'Multi-property selection, date selection, forecast prediction, and performance data updates were key pain points for partners that required attention.',
              },
              {
                number: '06',
                title: 'Time Zone',
                description:
                  'Time zone differences between colleagues in Southern California, Chicago, New York, Seattle, and India encouraged early and late syncs, improving collaboration and delivering value to hotel partners at velocity.',
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

      {/* Placeholder Image */}
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
                src={affinityMapImage}
                alt="Affinity Mapping Research"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={teamCollaborationImage}
                alt="Team Collaboration Session"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Middle Row - 1 large image */}
            {/* <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={visibilityOptionsImage}
                alt="Advanced Visibility Options Modal"
                className="w-full h-full object-cover"
              />
            </div> */}
            
            {/* Advanced Visibility Options Duplicate */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={createAcceleratorSidebarImage}
                alt="Create an Accelerator with Sidebar Options"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom Row - 2 images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={metricsImage}
                alt="Performance Metrics"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Row - 1 image */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={ratePlansImage}
                alt="Rate Plans Selection"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Create Accelerator - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={createAcceleratorImage}
                alt="Create an Accelerator Form"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Duplicate - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={performanceImage}
                alt="Performance Dashboard"
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
              Accelerator empowers hotel partners to optimize their advertising strategies, improve search rankings, and drive better results with a modern, intuitive experience and comprehensive insights.
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
                <p className="text-6xl md:text-7xl tracking-tight">$300M</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Gross Revenue
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
                <p className="text-6xl md:text-7xl tracking-tight">5.4%</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Average Margin Spend
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
                <p className="text-6xl md:text-7xl tracking-tight">72.4K</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Active Hotel Partners
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
                  Cross-functional collaboration between research, design, product, and engineering teams enabled rapid iteration and deployment of features that directly addressed hotel partner pain points.
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
                  Conducting more structured evaluative testing with diverse partner types would have uncovered edge cases earlier and informed prioritization of feature rollouts.
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
                  Successful hotel partner products blend automation, human input, and transparency. Partners seek tools that streamline processes and provide real-time results to guide their decisions.
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
              Worldpay
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Empowering partners and merchants to become payment facilitation experts
            </p>
            <motion.button
              onClick={() => onNavigateToProject('Worldpay')}
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