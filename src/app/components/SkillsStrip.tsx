const SKILLS = [
  'Design Direction',
  'Information Architecture',
  'User Experience',
  'Visual Design',
  'Content Strategy',
];

export function SkillsStrip() {
  return (
    <section
      aria-label="Core skills"
      className="px-5 pb-4 pt-2 md:px-[100px] md:pb-5 md:pt-3"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[var(--ink-muted)] md:text-[14px]">
        {SKILLS.map((skill, index) => (
          <span key={`${skill}-${index}`} className="flex items-center gap-4 whitespace-nowrap">
            <span>{skill}</span>
            {index < SKILLS.length - 1 && (
              <span aria-hidden="true" className="text-[var(--ink-muted)]">
                ✶
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

