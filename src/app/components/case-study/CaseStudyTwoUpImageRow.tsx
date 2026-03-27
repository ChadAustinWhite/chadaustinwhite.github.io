/** Side-by-side images on md+ (stack on small screens); matches overview `imagesAboveHeader` framing. */
export function CaseStudyTwoUpImageRow({ urls }: { urls: string[] }) {
  const images = urls.filter(Boolean).slice(0, 2);
  if (images.length === 0) return null;

  if (images.length >= 2) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
          >
            <img
              src={src}
              alt=""
              className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] md:aspect-square md:max-h-[min(52vh,560px)]"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
      <img src={images[0]} alt="" className="max-h-[min(70vh,640px)] w-full object-cover" />
    </div>
  );
}
