import { LiveBadge } from "@/components/ui/LiveBadge";
import { LiveVideo } from "@/components/ui/LiveVideo";
import { uiCopy } from "@/data/site";
import { liveImage, liveVideo } from "@/lib/content";
export function LivePanel({
  video,
  name,
  elapsed,
}: {
  video: number;
  name: string;
  elapsed: number;
}) {
  return (
    <>
      <LiveVideo
        src={liveVideo(video)}
        poster={liveImage(video)}
        label={`${name} cooking live`}
        controls
      />
      <LiveBadge />
      <span className="tracking-viewers">
        {128 + (Math.floor(elapsed / 4) % 5)} {uiCopy.LivePanel__1}
      </span>
      <div className="live-flash" />
    </>
  );
}
