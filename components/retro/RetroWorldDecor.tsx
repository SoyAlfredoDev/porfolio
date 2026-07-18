"use client";

import { useMotion } from "@/context/MotionProvider";

type Density = "full" | "light";

type Props = {
  density?: Density;
};

/** Pixel-ish cloud — geometric, no copyright assets */
function PixelCloud({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 48"
      width="96"
      height="48"
      aria-hidden
    >
      <rect x="16" y="20" width="64" height="20" fill="#fff8e7" stroke="#0a0a0a" strokeWidth="3" />
      <rect x="28" y="8" width="40" height="16" fill="#fff8e7" stroke="#0a0a0a" strokeWidth="3" />
      <rect x="8" y="24" width="16" height="12" fill="#fff8e7" stroke="#0a0a0a" strokeWidth="3" />
      <rect x="72" y="24" width="16" height="12" fill="#fff8e7" stroke="#0a0a0a" strokeWidth="3" />
    </svg>
  );
}

function Pipe({ className, tall }: { className?: string; tall?: boolean }) {
  const h = tall ? 140 : 100;
  return (
    <svg
      className={className}
      viewBox={`0 0 56 ${h}`}
      width="56"
      height={h}
      aria-hidden
    >
      <rect x="8" y="20" width="40" height={h - 20} fill="#3d9e00" stroke="#0a0a0a" strokeWidth="3" />
      <rect x="12" y="28" width="8" height={h - 36} fill="#2d7a00" opacity="0.45" />
      <rect x="2" y="4" width="52" height="24" rx="2" fill="#3d9e00" stroke="#0a0a0a" strokeWidth="3" />
      <rect x="6" y="8" width="10" height="16" fill="#6bcb2a" opacity="0.5" />
      <rect x="2" y="22" width="52" height="4" fill="#0a0a0a" opacity="0.25" />
    </svg>
  );
}

function BrickBlock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" width="40" height="40" aria-hidden>
      <rect x="2" y="2" width="36" height="36" fill="#c84c0c" stroke="#0a0a0a" strokeWidth="3" />
      <line x1="2" y1="14" x2="38" y2="14" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="2" y1="26" x2="38" y2="26" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="20" y1="2" x2="20" y2="14" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="12" y1="14" x2="12" y2="26" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="28" y1="14" x2="28" y2="26" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="20" y1="26" x2="20" y2="38" stroke="#0a0a0a" strokeWidth="2" />
    </svg>
  );
}

function QuestionBlock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" width="40" height="40" aria-hidden>
      <rect x="2" y="2" width="36" height="36" fill="#f8c800" stroke="#0a0a0a" strokeWidth="3" />
      <text
        x="20"
        y="28"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="22"
        fontWeight="700"
        fill="#0a0a0a"
      >
        ?
      </text>
    </svg>
  );
}

function Coin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" width="28" height="28" aria-hidden>
      <ellipse cx="16" cy="16" rx="12" ry="12" fill="#f8c800" stroke="#0a0a0a" strokeWidth="3" />
      <ellipse cx="16" cy="16" rx="7" ry="7" fill="none" stroke="#c49a00" strokeWidth="2" />
      <rect x="14" y="8" width="4" height="16" rx="1" fill="#c49a00" opacity="0.55" />
    </svg>
  );
}

function Ring({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" width="30" height="30" aria-hidden>
      <circle cx="16" cy="16" r="11" fill="none" stroke="#f8c800" strokeWidth="5" />
      <circle cx="16" cy="16" r="11" fill="none" stroke="#0a0a0a" strokeWidth="2" />
      <circle cx="11" cy="11" r="2" fill="#fff8e7" opacity="0.7" />
    </svg>
  );
}

function Mushroom({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" width="36" height="36" aria-hidden>
      <ellipse cx="20" cy="16" rx="16" ry="12" fill="#e52521" stroke="#0a0a0a" strokeWidth="3" />
      <circle cx="12" cy="14" r="4" fill="#fff8e7" />
      <circle cx="26" cy="12" r="3.5" fill="#fff8e7" />
      <rect x="12" y="22" width="16" height="14" rx="2" fill="#fff8e7" stroke="#0a0a0a" strokeWidth="3" />
      <rect x="16" y="26" width="3" height="6" fill="#0a0a0a" opacity="0.35" />
      <rect x="22" y="26" width="3" height="6" fill="#0a0a0a" opacity="0.35" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" width="32" height="32" aria-hidden>
      <polygon
        points="18,2 22,13 34,13 24,20 28,32 18,25 8,32 12,20 2,13 14,13"
        fill="#f8c800"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Hills() {
  return (
    <svg
      className="retro-hills"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 80 Q80 40 160 80 T320 80 T480 80 T640 80 T800 80 T960 80 T1120 80 T1200 80 V120 H0Z"
        fill="#3d9e00"
        stroke="#0a0a0a"
        strokeWidth="3"
      />
      <path
        d="M0 95 Q60 70 120 95 T240 95 T360 95 T480 95 T600 95 T720 95 T840 95 T960 95 T1080 95 T1200 95 V120 H0Z"
        fill="#2d7a00"
        opacity="0.85"
      />
    </svg>
  );
}

function GroundStrip() {
  return (
    <div className="retro-ground-strip" aria-hidden>
      <div className="retro-ground-grass" />
      <div className="retro-ground-dirt">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="retro-ground-tile" />
        ))}
      </div>
    </div>
  );
}

/**
 * Arcade world decorations — original geometric shapes only.
 * pointer-events: none; never blocks Navbar / CTAs / forms.
 */
export function RetroWorldDecor({ density = "light" }: Props) {
  const { style, reducedMotion } = useMotion();

  if (style !== "retro") {
    return null;
  }

  // Prefer static decor over hiding the whole world when a11y reduces motion
  const animate = !reducedMotion;

  return (
    <div
      className={`retro-world retro-world-${density}${animate ? "" : " retro-static"}`}
      aria-hidden
    >
      {/* Parallax cloud bands — duplicated track for seamless loop */}
      <div className="retro-clouds retro-clouds-far">
        <div className="retro-cloud-track">
          {Array.from({ length: 2 }, (_, loop) => (
            <span key={loop} className="retro-cloud-set">
              <PixelCloud className="retro-cloud" />
              <PixelCloud className="retro-cloud retro-cloud-sm" />
              <PixelCloud className="retro-cloud" />
              <PixelCloud className="retro-cloud retro-cloud-sm" />
            </span>
          ))}
        </div>
      </div>
      {density === "full" && (
        <div className="retro-clouds retro-clouds-near">
          <div className="retro-cloud-track retro-cloud-track-fast">
            {Array.from({ length: 2 }, (_, loop) => (
              <span key={loop} className="retro-cloud-set">
                <PixelCloud className="retro-cloud" />
                <PixelCloud className="retro-cloud retro-cloud-sm" />
                <PixelCloud className="retro-cloud" />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pickups only on Home/full — kept in side gutters so they never cover copy */}
      {density === "full" && (
        <div className="retro-pickups">
          <Coin className="retro-coin retro-coin-a" />
          <Coin className="retro-coin retro-coin-b" />
          <Ring className="retro-ring retro-ring-a" />
          <Ring className="retro-ring retro-ring-b" />
          <StarIcon className="retro-star-icon" />
          <Mushroom className="retro-shroom" />
          <div className="retro-blocks-left">
            <BrickBlock className="retro-brick retro-bob" />
            <QuestionBlock className="retro-qblock retro-bob retro-bob-delay" />
          </div>
          <div className="retro-pipe-left">
            <Pipe tall />
          </div>
          <div className="retro-pipe-right">
            <Pipe />
          </div>
          <div className="retro-hud">
            <span>SCORE</span>
            <span className="retro-hud-val">000128</span>
            <span>★×3</span>
          </div>
        </div>
      )}

      {density === "light" && (
        <div className="retro-accent-right">
          <Coin className="retro-coin retro-coin-mini" />
        </div>
      )}

      {/* Floor: full home only. Light views rely on body CSS strip (no fixed overlay). */}
      {density === "full" && (
        <div className="retro-world-floor">
          <Hills />
          <GroundStrip />
        </div>
      )}

      {/* Soft scanline overlay — CSS only */}
      <div className="retro-scanlines" />
    </div>
  );
}
