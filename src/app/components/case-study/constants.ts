/** Placeholder image URL for case study hero/section/subsection when no asset provided. */
export const PLACEHOLDER_IMAGE_HERO = 'https://placehold.co/1440x900/1c1c1a/2a2a28?text=Case+Study';
/** Placeholder for section-level image. */
export const PLACEHOLDER_IMAGE_SECTION = 'https://placehold.co/1200x600/1c1c1a/2a2a28?text=Image';
/** Two section placeholders for side-by-side rows (e.g. between discovery and results). */
export const PLACEHOLDER_IMAGE_SECTION_DUO: [string, string] = [
  'https://placehold.co/1200x600/1c1c1a/2a2a28?text=Image+1',
  'https://placehold.co/1200x600/1c1c1a/2a2a28?text=Image+2',
];
/** Wide placeholder below the duo row (Impact / results hero image). */
export const PLACEHOLDER_IMAGE_SECTION_WIDE = 'https://placehold.co/1600x720/1c1c1a/2a2a28?text=Image+3';
/** Second wide placeholder stacked under Image 3 when needed. */
export const PLACEHOLDER_IMAGE_SECTION_WIDE_2 = 'https://placehold.co/1600x720/1c1c1a/2a2a28?text=Image+4';
/** Placeholder for subsection gallery. */
export const PLACEHOLDER_IMAGE_SUB = 'https://placehold.co/800x500/1c1c1a/2a2a28?text=Image';

/**
 * Instrument Sonos case study ratios (native assets on instrument.com/work/sonos-brand-refresh).
 * @see https://www.instrument.com/work/sonos-brand-refresh
 */
export const PLACEHOLDER_SONOS_PORTRAIT =
  'https://placehold.co/2880x3840/1c1c1a/2a2a28?text=2880×3840';
export const PLACEHOLDER_SONOS_WIDE =
  'https://placehold.co/3840x2400/1c1c1a/2a2a28?text=3840×2400';
export const PLACEHOLDER_SONOS_WIDE_SHORT =
  'https://placehold.co/3840x2000/1c1c1a/2a2a28?text=3840×2000';
export const PLACEHOLDER_SONOS_WIDE_TALL =
  'https://placehold.co/3840x2548/1c1c1a/2a2a28?text=3840×2548';

/** Rounded clip frame for Sonos case study images (carousel, grid, section breaks). */
export const SONOS_IMAGE_FRAME_CLASS = 'overflow-hidden rounded-2xl md:rounded-3xl';

/**
 * Expedia / Partner Central UI captures are ~1024px wide. Capping display width avoids
 * upscaling past native resolution (blurry type on large viewports).
 */
export const SONOS_SCREENSHOT_MAX_WIDTH_PX = 1024;

export function getSonosRasterStyle(intrinsicWidthPx = SONOS_SCREENSHOT_MAX_WIDTH_PX) {
  return {
    maxWidth: `min(100%, ${intrinsicWidthPx}px)`,
    width: '100%',
    height: 'auto',
  } as const;
}

export const SONOS_RASTER_IMG_CLASS =
  'case-study-sonos-raster block h-auto w-full object-contain [image-rendering:auto]';

/** Placeholders for Sonos hero carousel (square, 16:10, 3:2, 9:16). */
export const PLACEHOLDER_SONOS_CAROUSEL_SQUARE =
  'https://placehold.co/800x800/1c1c1a/2a2a28?text=Screen';
export const PLACEHOLDER_SONOS_CAROUSEL_LANDSCAPE =
  'https://placehold.co/760x475/1c1c1a/2a2a28?text=Screen';
export const PLACEHOLDER_SONOS_CAROUSEL_LANDSCAPE_WIDE =
  'https://placehold.co/960x640/1c1c1a/2a2a28?text=Screen';
export const PLACEHOLDER_SONOS_CAROUSEL_TALL =
  'https://placehold.co/495x880/1c1c1a/2a2a28?text=Screen';
