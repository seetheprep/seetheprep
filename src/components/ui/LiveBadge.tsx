import { uiCopy } from "@/data/site";

export function LiveBadge({ href }: { href?: string }) {
  const content = (
    <>
      <i className="live-dot" />
      {uiCopy.LiveBadge__1}
    </>
  );
  return href ? (
    <a className="live-badge" href={href}>
      {content}
    </a>
  ) : (
    <span className="live-badge">{content}</span>
  );
}
