import { motion } from 'motion/react';

const clients = [
  'Worldpay',
  'Expedia Group',
  'First American Title',
  'Car Finance',
];

export function Clients() {
  return (
    <section className="px-6 md:px-12 py-24 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-gray-400 text-sm tracking-wider uppercase mb-8">
            Recent Experience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="flex items-center justify-center py-8 opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-2xl md:text-3xl tracking-tight">{client}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}