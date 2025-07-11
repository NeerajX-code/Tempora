import React from "react";

/* ---------- Helpers (shared defs) ---------- */
const Shadow = () => (
  <filter id="wds-shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
  </filter>
);

const SunRays = ({ count = 8, inner = 18, outer = 26 }) =>
  [...Array(count)].map((_, i) => {
    const a = (i * 360) / count;
    const rad = (a * Math.PI) / 180;
    return (
      <line
        key={i}
        x1={32 + inner * Math.cos(rad)}
        y1={32 + inner * Math.sin(rad)}
        x2={32 + outer * Math.cos(rad)}
        y2={32 + outer * Math.sin(rad)}
        stroke="url(#sun-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    );
  });

/* ---------- Icon Components ---------- */
export const Clear = ({ size =100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <radialGradient id="sun-grad" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#fffbe8" />
        <stop offset="60%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#f9a825" />
      </radialGradient>
      <Shadow />
    </defs>
    <g filter="url(#wds-shadow)">
      <circle cx="32" cy="32" r="14" fill="url(#sun-grad)" />
      <SunRays />
    </g>
  </svg>
);

export const FewClouds = ({ size =100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="cloud-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#fafafa" />
        <stop offset="100%" stopColor="#d7d7d7" />
      </linearGradient>
      <radialGradient id="sun-grad" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#fffbe8" />
        <stop offset="60%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#f9a825" />
      </radialGradient>
      <Shadow />
    </defs>
    {/* Sun */}
    <g filter="url(#wds-shadow)">
      <circle cx="20" cy="20" r="10" fill="url(#sun-grad)" />
      <SunRays count={6} inner={13} outer={19} />
    </g>
    {/* Cloud foreground */}
    <g filter="url(#wds-shadow)" fill="url(#cloud-grad)">
      <ellipse cx="34" cy="36" rx="16" ry="10" />
      <ellipse cx="46" cy="38" rx="10" ry="8" />
      <ellipse cx="25" cy="38" rx="10" ry="8" />
    </g>
  </svg>
);

export const Clouds = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="cloud-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#f0f0f0" />
        <stop offset="100%" stopColor="#c8c8c8" />
      </linearGradient>
      <Shadow />
    </defs>
    <g filter="url(#wds-shadow)" fill="url(#cloud-grad)">
      <ellipse cx="24" cy="34" rx="14" ry="9" />
      <ellipse cx="44" cy="36" rx="15" ry="10" />
      <ellipse cx="34" cy="28" rx="12" ry="8" />
    </g>
  </svg>
);

export const BrokenClouds = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="cloud-dark" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#d2d2d2" />
        <stop offset="100%" stopColor="#9e9e9e" />
      </linearGradient>
      <Shadow />
    </defs>
    <g filter="url(#wds-shadow)" fill="url(#cloud-dark)">
      <ellipse cx="20" cy="36" rx="15" ry="10" />
      <ellipse cx="42" cy="32" rx="17" ry="11" />
      <ellipse cx="32" cy="40" rx="18" ry="12" />
    </g>
  </svg>
);

export const ShowerRain = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="cloud-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#eeeeee" />
        <stop offset="100%" stopColor="#bdbdbd" />
      </linearGradient>
      <linearGradient id="rain-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#90caf9" />
        <stop offset="100%" stopColor="#42a5f5" />
      </linearGradient>
      <Shadow />
    </defs>
    {/* Cloud */}
    <g filter="url(#wds-shadow)" fill="url(#cloud-grad)">
      <ellipse cx="32" cy="28" rx="18" ry="12" />
      <ellipse cx="20" cy="30" rx="12" ry="9" />
      <ellipse cx="44" cy="32" rx="14" ry="10" />
    </g>
    {/* Rain drops */}
    {[-8, 0, 8, 16, -16].map((x, i) => (
      <line
        key={i}
        x1={32 + x}
        y1={42}
        x2={28 + x}
        y2={56}
        stroke="url(#rain-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

export const Rain = ShowerRain;

export const Drizzle = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="cloud-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#eeeeee" />
        <stop offset="100%" stopColor="#bdbdbd" />
      </linearGradient>
      <linearGradient id="rain-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#bbdefb" />
        <stop offset="100%" stopColor="#64b5f6" />
      </linearGradient>
      <Shadow />
    </defs>
    {/* Cloud */}
    <g filter="url(#wds-shadow)" fill="url(#cloud-grad)">
      <ellipse cx="32" cy="28" rx="18" ry="12" />
    </g>
    {/* Tiny drops */}
    {[-10, -4, 2, 8, 14].map((x, i) => (
      <circle key={i} cx={32 + x} cy={46 + (i % 2) * 4} r="3" fill="url(#rain-grad)" />
    ))}
  </svg>
);

export const Thunderstorm = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="cloud-dark" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#cfcfcf" />
        <stop offset="100%" stopColor="#8d8d8d" />
      </linearGradient>
      <linearGradient id="bolt-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#fff176" />
        <stop offset="100%" stopColor="#fbc02d" />
      </linearGradient>
      <Shadow />
    </defs>
    {/* Cloud */}
    <g filter="url(#wds-shadow)" fill="url(#cloud-dark)">
      <ellipse cx="32" cy="26" rx="18" ry="12" />
      <ellipse cx="20" cy="28" rx="12" ry="9" />
      <ellipse cx="44" cy="30" rx="14" ry="10" />
    </g>
    {/* Lightning bolt */}
    <polygon
      points="32,36 38,36 30,56 36,56 28,72"
      transform="translate(0,-8) scale(0.8)"
      fill="url(#bolt-grad)"
      filter="url(#wds-shadow)"
    />
  </svg>
);

export const Snow = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="cloud-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#eeeeee" />
        <stop offset="100%" stopColor="#cfcfcf" />
      </linearGradient>
      <Shadow />
    </defs>
    {/* Cloud */}
    <g filter="url(#wds-shadow)" fill="url(#cloud-grad)">
      <ellipse cx="32" cy="26" rx="18" ry="12" />
      <ellipse cx="20" cy="28" rx="12" ry="9" />
      <ellipse cx="44" cy="30" rx="14" ry="10" />
    </g>
    {/* Snowflakes */}
    {[-12, -4, 4, 12].map((x, i) => (
      <g key={i} transform={`translate(${32 + x},48) scale(0.7)`} stroke="#90caf9" strokeWidth="3" strokeLinecap="round">
        <line x1="-4" y1="0" x2="4" y2="0" />
        <line x1="0" y1="-4" x2="0" y2="4" />
        <line x1="-3" y1="-3" x2="3" y2="3" />
        <line x1="-3" y1="3" x2="3" y2="-3" />
      </g>
    ))}
  </svg>
);

export const Mist = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="fog-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#e0f7fa" />
        <stop offset="100%" stopColor="#b2ebf2" />
      </linearGradient>
    </defs>
    {[20, 28, 36, 44].map((y, i) => (
      <rect
        key={i}
        x="12"
        y={y}
        width="40"
        height="6"
        rx="3"
        fill="url(#fog-grad)"
        opacity={0.9 - i * 0.15}
      />
    ))}
  </svg>
);

export const Tornado = ({ size = 100, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...p}>
    <defs>
      <linearGradient id="twist-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#e0e0e0" />
        <stop offset="100%" stopColor="#9e9e9e" />
      </linearGradient>
      <Shadow />
    </defs>
    <g filter="url(#wds-shadow)" fill="url(#twist-grad)">
      {[0, 1, 2, 3, 4].map((n) => (
        <ellipse
          key={n}
          cx="32"
          cy={24 + n * 6}
          rx={20 - n * 4}
          ry="6"
          transform={`rotate(${n % 2 ? 4 : -4},32,${24 + n * 6})`}
        />
      ))}
    </g>
  </svg>
);

/* ---------- Atmosphere aliases ---------- */
export const Smoke = Mist;
export const Haze = Mist;
export const Fog = Mist;
export const Dust = Mist;
export const Sand = Mist;
export const Ash = Mist;
export const Squall = ShowerRain;

/* ---------- Usage ----------
import { Clear, Rain, Thunderstorm, ... } from "./WeatherIcons";

<Thunderstorm size={96} />
-------------------------------- */
