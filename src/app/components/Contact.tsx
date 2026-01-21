import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-32 md:py-48">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-12">
            Let's work
            <br />
            together
          </h2>

          <motion.a
            href="mailto:chadaustnwhite@gmail.com"
            className="group inline-flex items-center gap-4 text-2xl md:text-4xl hover:opacity-70 transition-opacity"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            chadaustnwhite@gmail.com
            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>

          <div className="mt-24 pt-12 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="mb-4 text-gray-400 text-sm tracking-wider uppercase">
                  Location
                </h3>
                <p>
                  Designing From
                  <br />
                  California
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-gray-400 text-sm tracking-wider uppercase">
                  Social
                </h3>
                <div className="space-y-2">
                  <a href="#" className="block hover:opacity-70 transition-opacity">
                    LinkedIn
                  </a>
                  <a href="#" className="block hover:opacity-70 transition-opacity">
                    Instagram
                  </a>
                  <a href="#" className="block hover:opacity-70 transition-opacity">
                    Threads
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-gray-400 text-sm tracking-wider uppercase">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <a href="#work" className="block hover:opacity-70 transition-opacity">
                    Work
                  </a>
                  <a href="#about" className="block hover:opacity-70 transition-opacity">
                    About
                  </a>
                  <a href="#services" className="block hover:opacity-70 transition-opacity">
                    Services
                  </a>
                  <a href="#contact" className="block hover:opacity-70 transition-opacity">
                    Contact
                  </a>
                </div>
              </div>

              {/* Remove Legal section */}
            </div>

            <div className="mt-24 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2026 Chad Austin White. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Designing from Southern California
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}