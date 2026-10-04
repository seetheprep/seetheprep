"use client";
import { uiCopy } from "@/data/site";

export function ChesterMap({ elapsed }: { elapsed: number }) {
  const eta = Math.max(1, 12 - Math.floor(elapsed / 60));
  return (
    <div className="chester-map final-map">
      <svg viewBox="0 0 358 330" role="img" aria-label="Chester streets and the rider route">
        <rect width="358" height="330" fill="var(--tone-123)" />
        <g fill="var(--tone-130)">
          <rect x="18" y="22" width="48" height="37" rx="7" />
          <rect x="119" y="100" width="75" height="65" rx="7" />
          <rect x="252" y="79" width="47" height="77" rx="7" />
          <rect x="242" y="217" width="83" height="65" rx="7" />
        </g>
        <rect x="115" y="218" width="79" height="52" rx="8" fill="var(--tone-131)" />
        <path
          d="M-15 289Q95 253 192 290T380 270"
          fill="none"
          stroke="var(--tone-132)"
          strokeWidth="22"
        />
        <g stroke="var(--white)" strokeWidth="17" fill="none">
          <path d="M63-10L92 344M213-10L227 344M316-10L322 344M-10 72L367 57M-10 200L375 182" />
        </g>
        <g fill="var(--tone-133)" fontSize="8" fontFamily="var(--font-jakarta), sans-serif">
          <text x="113" y="31">
            {uiCopy.RiderMap__1}
          </text>
          <text x="11" y="183">
            {uiCopy.RiderMap__2}
          </text>
          <text x="236" y="41">
            {uiCopy.RiderMap__3}
          </text>
          <text x="244" y="317">
            {uiCopy.RiderMap__4}
          </text>
        </g>
        <path
          d="M79 74L90 197L218 190L230 124L315 120"
          stroke="var(--orange)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        <circle cx="79" cy="74" r="8" fill="var(--ink)" />
        <circle cx="315" cy="120" r="11" fill="var(--orange)" />
        <circle cx="315" cy="120" r="5" fill="white" />
        <g className="final-rider">
          <circle r="15" fill="white" stroke="var(--ink)" strokeWidth="3" />
          <circle r="6" fill="var(--orange)" />
        </g>
      </svg>
      <div className="map-eta">
        <div>
          <b>{uiCopy.RiderMap__5}</b>
          <small>{uiCopy.RiderMap__6}</small>
        </div>
        <strong>
          {eta} {uiCopy.RiderMap__7}
        </strong>
      </div>
    </div>
  );
}
