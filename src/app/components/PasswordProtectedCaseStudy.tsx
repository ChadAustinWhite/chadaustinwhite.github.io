import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock } from 'lucide-react';
import type { CaseStudyRoute } from '../data/portfolioData';
import {
  CASE_STUDY_PASSWORD,
  isCaseStudyUnlocked,
  setCaseStudyUnlocked,
} from '../lib/caseStudyAccess';

interface PasswordProtectedCaseStudyProps {
  children: ReactNode;
  title: string;
  route: CaseStudyRoute;
  onBack?: () => void;
}

/** Split a multi-word title for a two-line lock screen heading (last word on line 2). */
function splitTitleLines(title: string): [string, string] | null {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return null;
  const lastWord = words.pop()!;
  return [words.join(' '), lastWord];
}

function PasswordGateTitle({ title }: { title: string }) {
  const lines = splitTitleLines(title);

  if (!lines) {
    return (
      <h1 className="mb-4 text-4xl tracking-tight md:text-5xl">{title}</h1>
    );
  }

  return (
    <h1 className="mb-4 text-4xl tracking-tight md:text-5xl">
      <span className="flex flex-col gap-3 md:gap-4">
        <span>{lines[0]}</span>
        <span>{lines[1]}</span>
      </span>
    </h1>
  );
}

export function PasswordProtectedCaseStudy({
  children,
  title,
  route,
  onBack,
}: PasswordProtectedCaseStudyProps) {
  const [inputPassword, setInputPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => isCaseStudyUnlocked(route));
  const [error, setError] = useState('');

  useEffect(() => {
    setIsUnlocked(isCaseStudyUnlocked(route));
    setInputPassword('');
    setError('');
  }, [route]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputPassword === CASE_STUDY_PASSWORD) {
      setCaseStudyUnlocked(route);
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
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5"
          >
            <Lock className="h-10 w-10 text-white" />
          </motion.div>

          <PasswordGateTitle title={title} />

          <p className="text-lg text-gray-400">This case study is password protected</p>
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
              className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-lg text-white placeholder-gray-500 transition-colors focus:border-white/30 focus:outline-none"
              autoFocus
            />

            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-400"
              >
                {error}
              </motion.p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-4 text-lg font-medium text-black transition-colors hover:bg-gray-200"
          >
            Unlock case study
          </button>
        </form>

        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="mt-8 flex w-full items-center justify-center gap-2 text-lg font-medium text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            Back to home
          </button>
        ) : null}
      </motion.div>
    </div>
  );
}
