export function ProgressLine({ stage }: { stage: number }) {
  return (
    <div
      className="glowing-progress"
      role="progressbar"
      aria-label="Order progress"
      aria-valuemin={0}
      aria-valuemax={3}
      aria-valuenow={stage}
    >
      <i style={{ transform: `scaleX(${0.08 + stage * 0.27})` }} />
      <b style={{ transform: `translateX(${8 + stage * 27}%)` }} />
    </div>
  );
}
