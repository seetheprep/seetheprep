export function SkeletonCards({ count = 2 }: { count?: number }) {
  return (
    <div className="skeleton-group" role="status" aria-label="Loading kitchens">
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-card" key={i}>
          <div />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
