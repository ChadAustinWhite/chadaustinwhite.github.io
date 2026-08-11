import type { CaseStudyInstrumentContent } from '../../components/case-study/types';
import levisTwoHorseImage from '../../../assets/levis-two-horse-brand.png';
import levisTwoHorseQualityImage from '../../../assets/levis-two-horse-quality-indigo.png';
import levisEagleBoltImage from '../../../assets/levis-eagle-bolt.png';
import levisRivetedImage from '../../../assets/levis-original-riveted.png';
import levisDenimSupplyImage from '../../../assets/levis-denim-supply-co.png';
import levisRiderImage from '../../../assets/levis-rider-graphic.png';
import levisClassicCarImage from '../../../assets/levis-classic-car.png';

/** Instrument-style narrative for Levi’s visual work (same shell as Quiksilver). */
export const levisInstrument: CaseStudyInstrumentContent = {
  projectName: "Levi’s",
  breadcrumb: "Levi’s",
  tags: ['Brand', 'Campaign', 'Illustration'],
  roundedMedia: true,
  compactLeadImages: true,
  overviewCategories: [
    {
      label: 'Role',
      values: ['Brand Graphics'],
    },
    {
      label: 'Company',
      values: ["Levi’s"],
    },
    {
      label: 'Stakeholder',
      values: ['Brand marketing'],
    },
  ],
  lead:
    'Brand graphics for Levi’s merchandise: marks, badges, and print-ready illustrations built for apparel and product.',
  leadImages: [
    {
      src: levisTwoHorseImage,
      alt: 'Two Horse Brand Crafted with the Finest Denim eagle graphic on a dark navy field',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: levisTwoHorseQualityImage,
      alt: 'Levi Strauss and Co Quality Indigo white two-horse brand mark with For Those Who Toil on black',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: levisDenimSupplyImage,
      alt: 'Levi Strauss and Co Denim Supply Co quality goods stamp on a tan field',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: levisRiderImage,
      alt: 'Distressed graphic of a rider leaning into a cafe racer motorcycle',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: levisRivetedImage,
      alt: "Levi’s Original Riveted heritage badge on a mustard field",
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: levisClassicCarImage,
      alt: 'Low-contrast illustration of a vintage fastback muscle car on a dark field',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
    {
      src: levisEagleBoltImage,
      alt: 'Levi’s eagle illustration over a jagged bolt line with red batwing logo on a light field',
      padded: true,
      background: 'page',
      objectFit: 'contain',
      parallaxSpeed: '0',
    },
  ],
  chapters: [],
};
