import { SONOS_IMAGE_FRAME_CLASS } from './constants';
import type { CaseStudySonosScreenStack as ScreenStackData } from './types';

const GUTTER = 'px-[var(--cs-page-gutter)]';

interface CaseStudySonosScreenStackProps {
  stack: ScreenStackData;
}

export function CaseStudySonosScreenStack({ stack }: CaseStudySonosScreenStackProps) {
  if (!stack.items.length) return null;

  return (
    <div className={`case-study-sonos-screen-stack ${GUTTER}`} aria-label="Interface screens">
      <div className="case-study-sonos-screen-stack__list mx-auto w-full max-w-[72rem]">
        {stack.items.map((item, index) => (
          <figure
            key={`${item.src}-${index}`}
            className="case-study-sonos-screen-stack__item"
          >
            <div className={`bg-[var(--card-bg)] ${SONOS_IMAGE_FRAME_CLASS}`}>
              <img
                src={item.src}
                alt={item.alt ?? ''}
                className={`block h-auto w-full ${item.objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                loading="lazy"
                decoding="async"
              />
            </div>
            {(item.title || item.caption) && (
              <figcaption className="mt-4 md:mt-5">
                {item.title ? (
                  <p className="text-[15px] font-medium text-[var(--ink)] md:text-base">
                    {item.title}
                  </p>
                ) : null}
                {item.caption ? (
                  <p className="cs-text-body mt-1 text-[var(--ink-muted)]">{item.caption}</p>
                ) : null}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
