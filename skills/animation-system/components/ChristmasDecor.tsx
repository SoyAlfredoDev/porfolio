"use client";

import { useMotion } from "@/context/MotionProvider";

type Density = "full" | "light";

type Props = {
  density?: Density;
};

/** Elegant SVG garland — sway via CSS */
function Garland({ compact }: { compact?: boolean }) {
  const h = compact ? 28 : 42;
  return (
    <svg
      className="xmas-garland w-full"
      viewBox={`0 0 1200 ${h + 18}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        className="xmas-garland-cord"
        d={`M0 ${h * 0.35} Q150 ${h * 0.9} 300 ${h * 0.35} T600 ${h * 0.35} T900 ${h * 0.35} T1200 ${h * 0.35}`}
        stroke="#1B4332"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M0 ${h * 0.35} Q150 ${h * 0.9} 300 ${h * 0.35} T600 ${h * 0.35} T900 ${h * 0.35} T1200 ${h * 0.35}`}
        stroke="#2E8B57"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      {[100, 220, 340, 460, 580, 700, 820, 940, 1060].map((x, i) => {
        const y = h * (i % 2 === 0 ? 0.55 : 0.75);
        const color = i % 3 === 0 ? "#C41E3A" : i % 3 === 1 ? "#D4AF37" : "#2E8B57";
        return (
          <g key={x} className="xmas-bauble" style={{ transformOrigin: `${x}px ${y - 8}px` }}>
            <line
              x1={x}
              y1={y - 10}
              x2={x}
              y2={y}
              stroke="#D4AF37"
              strokeWidth="1.2"
            />
            <circle cx={x} cy={y + 5} r={compact ? 4 : 5.5} fill={color} />
            <circle
              cx={x - 1.5}
              cy={y + 3}
              r={1.2}
              fill="#F4EFE6"
              opacity="0.45"
            />
          </g>
        );
      })}
    </svg>
  );
}

function Tree() {
  return (
    <svg
      className="xmas-tree"
      viewBox="0 0 120 160"
      width="120"
      height="160"
      aria-hidden
    >
      <polygon points="60,8 105,70 15,70" fill="#1B4332" />
      <polygon points="60,32 112,100 8,100" fill="#1B4332" />
      <polygon points="60,58 118,138 2,138" fill="#14532D" />
      <rect x="52" y="138" width="16" height="18" rx="2" fill="#3D2914" />
      {/* Lights */}
      <circle className="xmas-light" cx="48" cy="52" r="3" fill="#C41E3A" />
      <circle className="xmas-light xmas-light-delay" cx="72" cy="58" r="3" fill="#D4AF37" />
      <circle className="xmas-light" cx="40" cy="88" r="3" fill="#D4AF37" />
      <circle className="xmas-light xmas-light-delay" cx="80" cy="92" r="3" fill="#C41E3A" />
      <circle className="xmas-light" cx="55" cy="118" r="3" fill="#F4EFE6" />
      <circle className="xmas-light xmas-light-delay" cx="70" cy="112" r="3" fill="#2E8B57" />
      {/* Star */}
      <polygon
        className="xmas-star"
        points="60,2 63,12 74,12 65,18 68,28 60,22 52,28 55,18 46,12 57,12"
        fill="#D4AF37"
      />
    </svg>
  );
}

function Gift({
  className,
  color = "#C41E3A",
  ribbon = "#D4AF37",
}: {
  className?: string;
  color?: string;
  ribbon?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      width="56"
      height="56"
      aria-hidden
    >
      <rect x="10" y="24" width="44" height="34" rx="3" fill={color} />
      <rect x="8" y="16" width="48" height="12" rx="2" fill={color} opacity="0.9" />
      <rect x="28" y="16" width="8" height="42" fill={ribbon} />
      <rect x="8" y="28" width="48" height="6" fill={ribbon} />
      <path
        d="M32 16 C28 6 18 6 18 14 C18 20 28 22 32 16 C36 6 46 6 46 14 C46 20 36 22 32 16Z"
        fill={ribbon}
        opacity="0.95"
      />
      <rect
        x="14"
        y="30"
        width="10"
        height="4"
        rx="1"
        fill="#F4EFE6"
        opacity="0.25"
        className="xmas-gift-shine"
      />
    </svg>
  );
}

function Twinkles() {
  const dots = [
    { top: "18%", left: "12%" },
    { top: "32%", left: "88%" },
    { top: "55%", left: "6%" },
    { top: "70%", left: "92%" },
    { top: "42%", left: "78%" },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          className={`xmas-twinkle${i % 2 ? " xmas-twinkle-delay" : ""}`}
          style={{ top: d.top, left: d.left }}
        />
      ))}
    </>
  );
}

/**
 * Festive decorations — full on Home, light accents on other views.
 * pointer-events: none; never blocks Navbar / CTAs / forms.
 */
export function ChristmasDecor({ density = "light" }: Props) {
  const { style, reducedMotion, motionLevel } = useMotion();

  if (style !== "christmas" || motionLevel === "none") {
    return null;
  }

  const animate = !reducedMotion;

  return (
    <div
      className={`xmas-decor xmas-decor-${density}${animate ? "" : " xmas-static"}`}
      aria-hidden
    >
      <div className="xmas-garland-wrap">
        <Garland compact={density === "light"} />
      </div>

      {density === "full" && (
        <>
          <div className="xmas-tree-wrap">
            <Tree />
          </div>
          <div className="xmas-gifts-wrap">
            <Gift className="xmas-gift xmas-gift-a" color="#C41E3A" ribbon="#D4AF37" />
            <Gift className="xmas-gift xmas-gift-b" color="#1B4332" ribbon="#C41E3A" />
            <Gift className="xmas-gift xmas-gift-c" color="#8B1E2D" ribbon="#D4AF37" />
          </div>
          <Twinkles />
        </>
      )}

      {density === "light" && (
        <div className="xmas-corner-accent" aria-hidden>
          <Gift className="xmas-gift xmas-gift-mini" color="#C41E3A" ribbon="#D4AF37" />
        </div>
      )}
    </div>
  );
}
