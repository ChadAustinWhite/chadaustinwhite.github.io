import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onNavigate: (page: 'home') => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (page: 'home', hash?: string) => {
    setIsOpen(false);
    onNavigate(page);
    
    // Scroll to top or specific section after a brief delay
    setTimeout(() => {
      if (hash) {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const menuItems = [
    { label: 'Work', action: () => handleNavigation('home', '#work') },
    { label: 'Contact', action: () => handleNavigation('home', '#contact') },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12"
      >
        <div className="flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('home');
            }}
            className="text-xl tracking-tight"
          >
            Chad White / Product Design
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 p-2 hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <span className="text-xl tracking-tight">menu</span>}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
          >
            <div className="flex items-center justify-center min-h-screen px-6">
              <nav className="space-y-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <button
                      onClick={item.action}
                      className="block text-6xl md:text-8xl hover:opacity-50 transition-opacity tracking-tight text-left"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}