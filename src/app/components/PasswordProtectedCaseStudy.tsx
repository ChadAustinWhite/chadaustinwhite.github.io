import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

interface PasswordProtectedCaseStudyProps {
  children: React.ReactNode;
  password: string;
  title: string;
}

export function PasswordProtectedCaseStudy({ 
  children, 
  password, 
  title 
}: PasswordProtectedCaseStudyProps) {
  const [inputPassword, setInputPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setInputPassword('');
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6"
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl tracking-tight mb-4">
            {title}
          </h1>
          
          <p className="text-gray-400 text-lg">
            This case study is password protected
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => {
                setInputPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors text-lg"
              autoFocus
            />
            
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-white text-black rounded-lg font-medium text-lg hover:bg-gray-200 transition-colors"
          >
            Unlock Case Study
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-8">
          Contact Chad White for access
        </p>
      </motion.div>
    </div>
  );
}
