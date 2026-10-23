/**
 * جلد MCP
 *
 * استعاره: MCP «USB-C هوش مصنوعی» است —— یک hub مرکزی که ۳ client و ۴ server را به هم وصل می‌کند.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - وسط: MCP hub (مربع گوشه‌گرد teal با نوشته «MCP» + json-rpc)
 *   - چپ: ۳ client (کارت‌های کوچک به سبک Claude / Cursor / VS Code)
 *   - راست: ۴ server (کارت‌های کوچک به سبک GitHub / Postgres / Slack / Sentry)
 *   - بین hub و هر کارت یک خط · همه dash روان
 *   - stamp بالا-راست: «USB-C · AI»
 *   - mono پایین-چپ: «json-rpc 2.0 · 2024-11»
 *
 * hover：
 *   - dash خطوط اتصال سریع‌تر جریان می‌یابد
 *   - hub کمی بزرگ و کوچک می‌شود
 *   - کارت‌ها کمی شناور می‌شوند
 */
import React from "react";
import CoverShell from "./CoverShell";

type Node = {
  x: number;
  y: number;
  label: string;
  bg: string;
  fg: string;
  /** زیربرچسب mono */
  sub: string;
  rot?: number;
};

const CLIENTS: Node[] = [
  { x: 48, y: 52, label: "Claude", bg: "#FBE891", fg: "#241C15", sub: "host", rot: -4 },
  { x: 40, y: 102, label: "Cursor", bg: "#FBEFE3", fg: "#241C15", sub: "host", rot: 2 },
  { x: 48, y: 152, label: "VS Code", bg: "#FFFFFF", fg: "#241C15", sub: "host", rot: -2 },
];

const SERVERS: Node[] = [
  { x: 270, y: 38, label: "GitHub", bg: "#241C15", fg: "#FBEFE3", sub: "51 tools", rot: 3 },
  { x: 282, y: 80, label: "Postgres", bg: "#1B4B5A", fg: "#FBEFE3", sub: "5 tools", rot: -3 },
  { x: 282, y: 124, label: "Slack", bg: "#FF4D74", fg: "#FBEFE3", sub: "8 tools", rot: 4 },
  { x: 270, y: 166, label: "Sentry", bg: "#E07A5F", fg: "#FBEFE3", sub: "18 tools", rot: -3 },
];

const HUB = { x: 160, y: 102 };

const NodeChip: React.FC<{ n: Node; align: "left" | "right" }> = ({ n, align }) => {
  const w = 60;
  const h = 28;
  const tx = align === "left" ? -w / 2 + 6 : w / 2 - 6;
  return (
    <g
      transform={`translate(${n.x},${n.y}) rotate(${n.rot ?? 0})`}
      className="origin-center transition-transform duration-500 group-hover:translate-y-[-1px]"
    >
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx="5"
        fill={n.bg}
        stroke="#241C15"
        strokeWidth="1.6"
      />
      <text
        x={align === "left" ? -22 : -22}
        y="-2"
        fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
        fontSize="10.5"
        fontWeight="800"
        fill={n.fg}
      >
        {n.label}
      </text>
      <text
        x={-22}
        y="8.5"
        fontFamily="Geist Mono, monospace"
        fontSize="7"
        fontWeight="600"
        letterSpacing="0.4"
        fill={n.fg}
        opacity="0.65"
      >
        {n.sub}
      </text>
      {/* نقطه کوچک رابط */}
      <circle
        cx={align === "left" ? w / 2 : -w / 2}
        cy="0"
        r="2.2"
        fill="#1B4B5A"
        stroke="#241C15"
        strokeWidth="1"
      />
    </g>
  );
};

const McpCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* stamp بالا-راست: USB-C · AI */}
      <g
        transform="translate(280,24) rotate(7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-32"
          y="-11"
          width="64"
          height="22"
          rx="11"
          fill="#FF4D74"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          USB-C · AI
        </text>
      </g>

      {/* stamp پایین-چپ: json-rpc */}
      <g transform="translate(30,182) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="92"
          height="14"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="43"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#F4D35E"
        >
          json-rpc · 2024-11
        </text>
      </g>

      {/* خط اتصال: هر client ← hub */}
      <g
        stroke="#241C15"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.55"
        className="animate-dash-flow"
      >
        {CLIENTS.map((c, i) => (
          <line key={`c-${i}`} x1={c.x + 30} y1={c.y} x2={HUB.x - 22} y2={HUB.y} />
        ))}
      </g>
      {/* خط اتصال: hub ← هر server */}
      <g
        stroke="#241C15"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.55"
        className="animate-dash-flow"
      >
        {SERVERS.map((s, i) => (
          <line key={`s-${i}`} x1={HUB.x + 22} y1={HUB.y} x2={s.x - 30} y2={s.y} />
        ))}
      </g>

      {/* MCP hub مرکزی */}
      <g
        transform={`translate(${HUB.x},${HUB.y})`}
        className="origin-center transition-transform duration-500 group-hover:scale-105"
      >
        {/* تزئین حلقه بیرونی */}
        <circle
          r="28"
          fill="none"
          stroke="#1B4B5A"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.5"
        />
        <rect
          x="-22"
          y="-22"
          width="44"
          height="44"
          rx="11"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* هایلایت سطح بالا */}
        <rect
          x="-22"
          y="-22"
          width="44"
          height="10"
          rx="11"
          fill="#FBEFE3"
          opacity="0.18"
        />
        <text
          y="-2"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#FBEFE3"
        >
          MCP
        </text>
        <text
          y="11"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="0.5"
          fill="#FBE891"
          opacity="0.85"
        >
          hub
        </text>

        {/* دو شکاف رابط در چپ و راست (تصویر USB-C) */}
        <rect
          x="-25"
          y="-4"
          width="6"
          height="8"
          rx="1.5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.2"
        />
        <rect
          x="19"
          y="-4"
          width="6"
          height="8"
          rx="1.5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.2"
        />
      </g>

      {/* کارت‌های client در چپ */}
      {CLIENTS.map((c, i) => (
        <NodeChip key={`cl-${i}`} n={c} align="left" />
      ))}
      {/* کارت‌های server در راست */}
      {SERVERS.map((s, i) => (
        <NodeChip key={`sv-${i}`} n={s} align="right" />
      ))}

      {/* توضیح پایین: N+M ↘ */}
      <text
        x="160"
        y="194"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        N hosts × M servers → one hub
      </text>
    </CoverShell>
  );
};

export default McpCover;
