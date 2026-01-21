import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import paymentProfileImage from '../../assets/1146c521eed37f7dabc3eca446691c75899cb7d3.png';
import useCaseDiagramImage from '../../assets/db03d8d36a5b553d1c0e5bf3459efd2092dd745c.png';
import paymentProfilesCompareImage from '../../assets/b737df00b068b5596eab9d2f6b31dedfda5b09e8.png';
import userManagementImage from '../../assets/7e9c93a290bb037a537deabb98528738689098bb.png';
import paymentProfilesListImage from '../../assets/2253bb01a933a84dc9346715c0d794191dc9ac31.png';
import taxProfileImage from '../../assets/8e5198f2a9f2545c1806781be360bccebfa712bc.png';
import accessListImage from '../../assets/7e1c9c63605a1706134fdf1d0f1828f14ca5c40f.png';
import addUsersImage from '../../assets/563b35955e8fb39c3564b8c9da88042237f9e1f5.png';
import paymentProfileFormImage from '../../assets/e594e4b4fb26a2ac7179715278290fc11b64cf4d.png';
import accessListUsersImage from '../../assets/aee8e4333aaeeb136fe252074ea28f209cb61bd4.png';
import campaignsListImage from '../../assets/eb3c1b86c63059de87705089969c9c7cf61822c6.png';
import partnerAccountImage from '../../assets/322611509e8cd7917b455fbd303c279c3eb82408.png';
import createAcceleratorImage from '../../assets/b6177482bb3d4bd8195a52afe305e94f028def7a.png';

interface CaseStudyLuxuryGoodsProps {
  onBack: () => void;
  onNavigateToProject: (projectTitle: string) => void;
}

export function CaseStudyLuxuryGoods({ onBack, onNavigateToProject }: CaseStudyLuxuryGoodsProps) {
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
              Expedia Group Ad Portal
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              <div>
                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">Organization</p>
                <p className="text-lg">Expedia Group</p>
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
                <p className="text-lg">3 Months</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed">
              Helping hotel partners across Expedia brands to unlock stronger traveler connections through increased search prominence.
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
              src={paymentProfileImage}
              alt="Payment Profile Interface"
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
              Hotel partners are seeking greater flexibility in ad payment options to better align with their financial operations. They also value clearer and more proactive communication regarding payment-related issues that could impact campaign performance.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              In addition, partners are requesting stronger controls over access to payment information, ensuring that the appropriate stakeholders can view and manage financial data while maintaining security and operational transparency.
            </p>
          </motion.div>
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
              src={useCaseDiagramImage}
              alt="Payment Profile Use Case Diagrams"
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
              A quick look at the main challenges and roadblocks the team faced during the initiative, and how we tackled them with creative solutions and flexibility.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                title: 'User Permissions',
                description:
                  'There are three user types, each with varying permission levels, grating role-based access to specific data and editing capabilities aligned to responsibilities.',
              },
              {
                number: '02',
                title: 'Scope Refinement',
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
                title: 'Technical Limitations',
                description:
                  'Notable technical limitations included the inability to identify which specific payment profiles a user had been removed from.',
              },
              {
                number: '05',
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

      {/* Placeholder Image - Grid Layout */}
      <section className="p-6 md:p-12 bg-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-6 md:gap-12">
            {/* Middle Row - 1 large image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={userManagementImage}
                alt="User Management Interface"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Bottom Row - 2 images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={paymentProfilesListImage}
                alt="Payment Profiles List"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={taxProfileImage}
                alt="Tax Profile Interface"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Row - 2 more images */}
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={accessListImage}
                alt="Access List Interface"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={addUsersImage}
                alt="Add Users Interface"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Final Row - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={paymentProfileFormImage}
                alt="Payment Profile Form"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Duplicate 1 - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={campaignsListImage}
                alt="Campaigns List Interface"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Duplicate 2 - 1 full-width image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={accessListUsersImage}
                alt="Access List - User Management"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Duplicate 4 - Create Accelerator image */}
            <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={createAcceleratorImage}
                alt="Create an Accelerator Interface"
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
              Key metrics demonstrating platform adoption and improved campaign performance.
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
                <p className="text-6xl md:text-7xl tracking-tight">1</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Enhanced flexibility in ad payment options for hotel partner campaign funding
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
                <p className="text-6xl md:text-7xl tracking-tight">2</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Increased security through layered access controls for payment information
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
                <p className="text-6xl md:text-7xl tracking-tight">3</p>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Improved user satisfaction through a unified payment management experience
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
                  Conducting formative research early helped us understand user mental models and design a role-based system that aligned with actual workflows, resulting in high adoption rates.
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
                  Earlier alignment on scope refinement and payment profile identification would have streamlined development and reduced iteration cycles during implementation.
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
                  Permission management systems must balance security with usability—overly restrictive access creates friction, while too much flexibility introduces risk.
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
              First American Title Galileo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Digital Campaign · 2024
            </p>
            <motion.button
              onClick={() => onNavigateToProject('First American Title Galileo')}
              className="inline-flex items-center gap-3 text-xl md:text-2xl group hover:opacity-70 transition-opacity"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              disabled
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