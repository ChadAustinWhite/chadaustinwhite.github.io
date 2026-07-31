import stateDeerImage from '../../../assets/visual-work-state-deer.png';
import levisRivetedImage from '../../../assets/visual-work-levis-riveted.png';
import levisDenimSupplyImage from '../../../assets/visual-work-levis-denim-supply.png';
import cafeRacerImage from '../../../assets/visual-work-cafe-racer.png';
import twoHorseDenimImage from '../../../assets/visual-work-two-horse-denim.png';
import birdStudiesImage from '../../../assets/visual-work-bird-studies.png';

const gallery = [
  {
    src: cafeRacerImage,
    alt: 'Line illustration of a rider leaning into a cafe racer motorcycle',
  },
  {
    src: stateDeerImage,
    alt: 'Blue typographic deer illustration on a mustard field',
  },
  {
    src: levisRivetedImage,
    alt: 'Levi’s Original Riveted heritage badge illustration',
  },
  {
    src: levisDenimSupplyImage,
    alt: 'Levi Strauss and Co Denim Supply Co diamond badge on a mustard field',
  },
  {
    src: twoHorseDenimImage,
    alt: 'Two Horse Brand Crafted with the Finest Denim eagle graphic',
  },
] as const;

interface SelectedVisualWorkPageProps {
  onBack: () => void;
}

export function SelectedVisualWorkPage({ onBack }: SelectedVisualWorkPageProps) {
  return (
    <article className="px-[var(--cs-page-gutter)] pb-20 pt-[7.5rem] md:pb-28">
      <header className="mx-auto w-full max-w-[72rem] pb-10 md:pb-14">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
        >
          <span aria-hidden>←</span>
          All work
        </button>
        <p className="mt-12 text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-muted)]">
          2022–Present
        </p>
        <h1 className="serif-headline mt-4 max-w-[52rem] text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.95] tracking-[-0.04em]">
          Selected visual work
        </h1>
        <p className="mt-8 max-w-[42rem] text-lg leading-relaxed text-[var(--ink-muted)] md:text-xl">
          Visual work for brands and companies, spanning apparel graphics, campaign artwork,
          and custom illustration.
        </p>
      </header>

      <section
        className="mx-auto grid w-full max-w-[72rem] grid-cols-1 gap-5 md:gap-6"
        aria-label="Selected visual work gallery"
      >
        {gallery.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-2xl">
            <img
              src={image.src}
              alt={image.alt}
              className="block h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
        <figure className="overflow-hidden rounded-2xl">
          <img
            src={birdStudiesImage}
            alt="Eight black bird icon studies exploring geometric forms"
            className="block h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>
    </article>
  );
}
