/**
 * جلد Agent Sandbox
 *
 * استعاره: یک شخصیت کوچک Agent درون یک حصار (مربع نقطه‌چین + علامت‌های محافظ ✕ در گوشه‌ها)،
 *      بیرون حصار ۳ فلش حمله تلاش می‌کنند وارد شوند و سر همه فلش‌ها برگشت می‌خورد (به ✕ تبدیل می‌شود).
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز متمایل به چپ: حصار مربعی با پس‌زمینه butter (حاشیه نقطه‌چین) + علامت‌های محافظ ✕ در ۴ گوشه
 *   - مرکز حصار: شخصیت کوچک Agent (بدنه teal + چشم‌های cream)
 *   - ۳ زاویه بیرون حصار: برچسب cmd + فلش ورودی + علامت ✕ برگشتی
 *   - تزئین: sparkle بالا-چپ، نشان دایره‌ای SHIELD پایین-راست
 *
 * متمایز از سری Agent مجاور:
 *   - AgentCover: مدار دایره‌ای + شاخک‌های ابزار
 *   - AgentLoopCover: بیضی + ۵ گره مرحله
 *   - AgentMemoryCover: کمد کشویی
 *   - این‌جا: حصار مربعی + فلش‌های برگشتی، در کل معنای «مرز + مانع»
 *
 * hover: علامت‌های محافظ ✕ در ۴ گوشه کمی ساعت‌گرد می‌چرخند؛ Agent درون حصار کمی بزرگ و کوچک می‌شود؛ فلش‌های بیرونی کمی جلو و عقب می‌روند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const ATTACKS = [
  { angle: -135, label: "rm -rf" },
  { angle: -45, label: "curl evil" },
  { angle: 135, label: "cat .ssh" },
];

const CENTER_X = 160;
const CENTER_Y = 102;
const FENCE_W = 158;
const FENCE_H = 110;
const FENCE_RX = 14;

const AgentSandboxCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle بالا-چپ */}
      <g transform="translate(34,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[120deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: نشان دایره‌ای کوچک SHIELD پایین-راست */}
      <g transform="translate(286,172)">
        <g
          className="origin-center transition-transform duration-[1200ms] ease-spring group-hover:rotate-[-30deg]"
          style={{ transformBox: "fill-box" }}
        >
          <circle cx="0" cy="0" r="13" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.8" />
          {/* shield shape */}
          <path
            d="M 0 -7 L 5 -5 L 5 1 Q 5 5 0 7 Q -5 5 -5 1 L -5 -5 Z"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <path d="M -2.5 -0.5 L -0.5 2 L 3 -2.5" stroke="#241C15" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ─── فلش‌های حمله بیرونی (اول رسم می‌شوند تا حصار روی آن‌ها قرار بگیرد) ─── */}
      {ATTACKS.map((a, i) => {
        const rad = (a.angle * Math.PI) / 180;
        // نقطه شروع فلش (دور، بیرون حصار) + نقطه پایان (نقطه برگشت روی لبه حصار)
        const startR = 110;
        const endR = 78;
        const sx = CENTER_X + Math.cos(rad) * startR;
        const sy = CENTER_Y + Math.sin(rad) * startR;
        const ex = CENTER_X + Math.cos(rad) * endR;
        const ey = CENTER_Y + Math.sin(rad) * endR;
        const labelR = 124;
        const lx = CENTER_X + Math.cos(rad) * labelR;
        const ly = CENTER_Y + Math.sin(rad) * labelR;
        return (
          <g key={i}>
            {/* برچسب cmd */}
            <g transform={`translate(${lx},${ly})`}>
              <rect
                x="-20"
                y="-7"
                width="40"
                height="14"
                rx="3"
                fill="#FBEFE3"
                stroke="#241C15"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="7"
                fontWeight="700"
                fill="#241C15"
              >
                {a.label}
              </text>
            </g>

            {/* فلش نقطه‌چین ورودی + لرزش خفیف */}
            <g
              className="transition-transform duration-500 ease-spring group-hover:scale-95"
              style={{ transformOrigin: `${sx}px ${sy}px`, transformBox: "fill-box" }}
            >
              <line
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke="#E07A5F"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />
              <g transform={`translate(${ex},${ey}) rotate(${a.angle + 180})`}>
                <path d="M -4 -3 L 0 0 L -4 3 Z" fill="#E07A5F" />
              </g>
            </g>

            {/* علامت ✕ برگشتی */}
            <g transform={`translate(${ex},${ey})`}>
              <circle cx="0" cy="0" r="6" fill="#FBEFE3" stroke="#E07A5F" strokeWidth="1.6" />
              <path
                d="M -2.5 -2.5 L 2.5 2.5 M 2.5 -2.5 L -2.5 2.5"
                stroke="#E07A5F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </g>
        );
      })}

      {/* ─── سایه حصار ─── */}
      <rect
        x={CENTER_X - FENCE_W / 2 + 3}
        y={CENTER_Y - FENCE_H / 2 + 3}
        width={FENCE_W}
        height={FENCE_H}
        rx={FENCE_RX}
        fill="#241C15"
        opacity="0.85"
      />
      {/* بدنه حصار (حاشیه نقطه‌چین) */}
      <rect
        x={CENTER_X - FENCE_W / 2}
        y={CENTER_Y - FENCE_H / 2}
        width={FENCE_W}
        height={FENCE_H}
        rx={FENCE_RX}
        fill="#FBE891"
        fillOpacity="0.65"
        stroke="#241C15"
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />

      {/* برچسب کوچک بالای SANDBOX */}
      <g transform={`translate(${CENTER_X},${CENTER_Y - FENCE_H / 2 - 8})`}>
        <rect x="-32" y="-8" width="64" height="14" rx="3" fill="#241C15" />
        <text
          x="0"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#FBEFE3"
        >
          SANDBOX
        </text>
      </g>

      {/* علامت‌های محافظ ✕ در ۴ گوشه حصار، در hover ساعت‌گرد می‌چرخند */}
      {[
        { x: CENTER_X - FENCE_W / 2, y: CENTER_Y - FENCE_H / 2 },
        { x: CENTER_X + FENCE_W / 2, y: CENTER_Y - FENCE_H / 2 },
        { x: CENTER_X - FENCE_W / 2, y: CENTER_Y + FENCE_H / 2 },
        { x: CENTER_X + FENCE_W / 2, y: CENTER_Y + FENCE_H / 2 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y})`}>
          <g
            className="origin-center transition-transform duration-600 ease-spring group-hover:rotate-[90deg]"
            style={{ transformBox: "fill-box" }}
          >
            <circle cx="0" cy="0" r="8" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
            <path
              d="M -3.5 -3.5 L 3.5 3.5 M 3.5 -3.5 L -3.5 3.5"
              stroke="#241C15"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}

      {/* ─── مرکز: شخصیت کوچک Agent ─── */}
      <g transform={`translate(${CENTER_X},${CENTER_Y})`}>
        <g
          className="origin-center transition-transform duration-500 ease-spring group-hover:scale-105"
          style={{ transformBox: "fill-box" }}
        >
          {/* سایه */}
          <rect x="-22" y="-18" width="44" height="36" rx="9" fill="#241C15" opacity="0.85" transform="translate(2,2)" />
          {/* بدنه اصلی */}
          <rect x="-22" y="-18" width="44" height="36" rx="9" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
          {/* آنتن */}
          <line x1="0" y1="-18" x2="0" y2="-26" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
          <circle cx="0" cy="-28" r="2.6" fill="#F4D35E" stroke="#241C15" strokeWidth="1.5" />
          {/* چشم‌ها */}
          <circle cx="-7" cy="-5" r="2.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.2" />
          <circle cx="-7" cy="-5" r="1.1" fill="#241C15" />
          <circle cx="7" cy="-5" r="2.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.2" />
          <circle cx="7" cy="-5" r="1.1" fill="#241C15" />
          {/* لبخند (درون حصار خیلی شاد زندگی می‌کند) */}
          <path d="M -5 5 Q 0 9 5 5" fill="none" stroke="#FBEFE3" strokeWidth="1.6" strokeLinecap="round" />
          {/* برچسب پایینی AGENT */}
          <text
            x="0"
            y="15"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#FBEFE3"
            opacity="0.85"
          >
            AGENT
          </text>
        </g>
      </g>

      {/* برچسب کوچک اجبار OS در پایین */}
      <g transform="translate(160,180)">
        <rect x="-46" y="-8" width="92" height="14" rx="7" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" />
        <text
          x="0"
          y="2.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          fill="#241C15"
        >
          ENFORCED BY OS
        </text>
      </g>
    </CoverShell>
  );
};

export default AgentSandboxCover;
