import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';
import expediaAcceleratorImage from '../../assets/db517be81379848d6a0f1ed778ec264c310085b8.png';
import expediaAdPortalImage from '../../assets/b49c7b7ab770e07828d62a9294af1b3f992959ec.png';
import payrixOnboardingImage from '../../assets/d37a1587dc67bf7c157730c623efab0af7f1c1e7.png';
import galileoImage from '../../assets/b191d448183cfac9582921f3ab94a468cb1b029a.png';

interface Project {
  title: string;
  category: string;
  image: string;
  year: string;
  comingSoon?: boolean;
}

const projects: Project[] = [
  {
    title: 'Expedia Group Accelerator',
    category: 'Campaign Launch & Tracking',
    image: expediaAcceleratorImage,
    year: '2025',
  },
  {
    title: 'Expedia Group Ad Portal',
    category: 'Campaign & Payment Management',
    image: expediaAdPortalImage,
    year: '2025',
  },
  {
    title: 'Payrix Merchant Onboarding',
    category: 'Access Control & Security Compliance',
    image: payrixOnboardingImage,
    year: '2024',
    comingSoon: true,
  },
  {
    title: 'First American Title Galileo',
    category: 'Property Risk Assessment & Mitigation',
    image: galileoImage,
    year: '2022',
    comingSoon: true,
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`relative group mb-24 md:mb-32 ${project.comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={project.comingSoon ? undefined : onClick}
    >
      <motion.div style={{ y }} className="relative aspect-[16/10] overflow-hidden rounded-[18px]">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${!project.comingSoon && 'group-hover:scale-105'}`}
        />
        {!project.comingSoon && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </motion.div>

      <div className="flex items-start justify-between mt-6">
        <div>
          <h3 className="text-3xl md:text-4xl tracking-tight mb-2">{project.title}</h3>
          <p className="text-gray-400">{project.category}</p>
        </div>
        <span className="text-gray-400 text-sm">{project.year}</span>
      </div>
      
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          if (!project.comingSoon) {
            onClick();
          }
        }}
        className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 transition-all duration-300 ${!project.comingSoon && 'hover:bg-white/10 group/btn'}`}
        whileHover={!project.comingSoon ? { scale: 1.05 } : undefined}
        whileTap={!project.comingSoon ? { scale: 0.95 } : undefined}
      >
        {project.comingSoon ? (
          <span className="text-xs font-medium tracking-wider uppercase">Coming Soon</span>
        ) : (
          <>
            <span className="text-xs font-medium tracking-wider uppercase">View Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

interface FeaturedWorkProps {
  onProjectClick?: (projectTitle: string) => void;
}

export function FeaturedWork({ onProjectClick }: FeaturedWorkProps) {
  return (
    <section id="work" className="px-6 md:px-12 py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-7xl tracking-tight mb-4">Recent Projects</h2>
          <p className="text-gray-400 text-lg">
            A showcase of the work I'm most proud of.
          </p>
        </motion.div>

        <div>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onClick={() => onProjectClick?.(project.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}