// Decorative stars: the adjacent rating text supplies the accessible value.
export function RatingStars({ rating, compact = false }: { rating: number; compact?: boolean }) {
  const size = compact ? 18 : 26;
  const star = "m12 2.5 2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5Z";
  return <span aria-hidden="true" data-rating-stars={rating} className="inline-flex shrink-0 gap-0.5">
    {Array.from({ length: 5 }, (_, index) => {
      const fill = Math.round(Math.max(0, Math.min(1, rating - index)) * 100);
      return <span key={index} className="relative block" style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" width={size} height={size} focusable="false" fill="#cbd5e1"><path d={star} /></svg>
        <span data-star-fill={fill} className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill}%` }}>
          <svg viewBox="0 0 24 24" width={size} height={size} className="max-w-none" focusable="false" fill="#eab308"><path d={star} /></svg>
        </span>
      </span>;
    })}
  </span>;
}
