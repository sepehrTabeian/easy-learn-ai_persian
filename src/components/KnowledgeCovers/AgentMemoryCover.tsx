/**
 * جلد Agent Memory
 *
 * استعاره: حافظه بلندمدت = یک کمد بایگانی سه‌طبقه (اپیزودیک / معنایی / رویه‌ای)؛
 *      context window موقتی است"میز کار"؛ هر وقت لازم باشد یک کارت از کشو بیرون آورده و بالا فرستاده می‌شود.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - نوار کوچک بالا: context window (موقت · حاشیه نقطه‌چین)
 *   - مرکز: کشوهای کمد بایگانی سه‌طبقه (butter / coral / teal)
 *   - بین کشوها"بیرون آوردن"فلش رو به بالا
 *   - تزئین: sparkle بالا-چپ، نشان ∞ پایین-راست
 *
 * hover: سه کشو با فاصله زمانی کمی بیرون می‌آیند؛ کارت کشوی وسط به بالا وارد context می‌شود؛ ∞ پایین-راست می‌چرخد.
 */
import React from "react";
import CoverShell from "./CoverShell";

const DRAWERS = [
  { label: "اپیزودیک", en: "EPISODIC", color: "#F4D35E", textOn: "#241C15" },
  { label: "معنایی", en: "SEMANTIC", color: "#E07A5F", textOn: "#FBEFE3" },
  { label: "رویه‌ای", en: "PROCEDURAL", color: "#1B4B5A", textOn: "#FBEFE3" },
];

const CABINET_X = 130;
const CABINET_Y = 78;
const CABINET_W = 130;
const DRAWER_H = 28;
const DRAWER_GAP = 4;

const AgentMemoryCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle بالا-چپ */}
      <g transform="translate(34,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: ∞ پایین-راست */}
      <g transform="translate(282,172)">
        <g className="origin-center transition-transform duration-[1400ms] ease-linear group-hover:rotate-[180deg]" style={{ transformBox: "fill-box" }}>
          <circle cx="0" cy="0" r="11" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
          <text
            x="0"
            y="3.4"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="11"
            fontWeight="800"
            fill="#241C15"
          >
            ∞
          </text>
        </g>
      </g>

      {/* تزئین: ماتریس نقطه کوچک پایین-چپ */}
      <g transform="translate(28,150)">
        {Array.from({ length: 9 }).map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <circle
              key={i}
              cx={col * 6}
              cy={row * 6}
              r="1.2"
              fill="#241C15"
              opacity="0.35"
            />
          );
        })}
      </g>

      {/* ─── بالا: CONTEXT WINDOW (میز کار موقت) ─── */}
      <g transform="translate(160,40)">
        {/* سایه */}
        <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#241C15" opacity="0.85" transform="translate(2,2)" />
        {/* بدنه اصلی · حاشیه نقطه‌چین نشان‌دهنده"موقت" */}
        <rect
          x="-65"
          y="-12"
          width="130"
          height="24"
          rx="6"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <text
          x="-58"
          y="3.5"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#241C15"
        >
          CONTEXT WINDOW
        </text>
        {/* نوار کوچک اشغال در سمت راست */}
        <rect x="20" y="-4" width="40" height="8" rx="4" fill="#241C15" opacity="0.1" />
        <rect
          x="20"
          y="-4"
          width="22"
          height="8"
          rx="4"
          fill="#FF4D74"
          className="transition-all duration-700 ease-spring group-hover:[width:34]"
        />
      </g>

      {/* ─── فلش بیرون آوردن: از کشوی وسط بالا به context ─── */}
      <g transform="translate(160,60)">
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="14"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.65"
        />
        <path
          d="M -4 2 L 0 -3 L 4 2"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* ─── مرکز: کمد بایگانی سه‌طبقه ─── */}
      <g transform={`translate(${CABINET_X},${CABINET_Y})`}>
        {/* سایه بیرونی بدنه کمد */}
        <rect
          x="-3"
          y="-3"
          width={CABINET_W + 6}
          height={DRAWERS.length * (DRAWER_H + DRAWER_GAP) + 12}
          rx="8"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* کف بدنه کمد */}
        <rect
          x="-3"
          y="-3"
          width={CABINET_W + 6}
          height={DRAWERS.length * (DRAWER_H + DRAWER_GAP) + 12}
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.5"
        />

        {/* کشوهای سه‌طبقه */}
        {DRAWERS.map((d, i) => (
          <g
            key={d.en}
            className="origin-left transition-transform duration-500 ease-spring"
            style={{
              transform: "translateX(0)",
              transitionDelay: `${i * 90}ms`,
              transformBox: "fill-box",
            }}
          >
            <g
              className={
                i === 0
                  ? "transition-transform duration-500 ease-spring group-hover:translate-x-[6px]"
                  : i === 1
                  ? "transition-transform duration-500 ease-spring group-hover:translate-x-[10px]"
                  : "transition-transform duration-500 ease-spring group-hover:translate-x-[4px]"
              }
            >
              <rect
                x="0"
                y={i * (DRAWER_H + DRAWER_GAP) + 4}
                width={CABINET_W}
                height={DRAWER_H}
                rx="5"
                fill={d.color}
                stroke="#241C15"
                strokeWidth="2"
              />
              {/* دستگیره کشو */}
              <circle
                cx={CABINET_W - 12}
                cy={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2}
                r="3"
                fill="#241C15"
              />
              {/* برچسب کشو */}
              <text
                x="14"
                y={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2 + 2.5}
                fontFamily='"Plus Jakarta Sans", "Vazirmatn", sans-serif'
                fontSize="13"
                fontWeight="800"
                fill={d.textOn}
              >
                {d.label}
              </text>
              {/* برچسب کوچک انگلیسی */}
              <text
                x="44"
                y={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2 + 2}
                fontFamily="Geist Mono, monospace"
                fontSize="7.5"
                fontWeight="700"
                letterSpacing="1.5"
                fill={d.textOn}
                opacity="0.85"
              >
                {d.en}
              </text>
              {/* شماره */}
              <text
                x={CABINET_W - 26}
                y={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2 + 2}
                fontFamily="Geist Mono, monospace"
                fontSize="7"
                fontWeight="700"
                fill={d.textOn}
                opacity="0.7"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          </g>
        ))}

        {/* برچسب کوچک بالا: MEMORY */}
        <g transform="translate(0,-6)">
          <rect
            x="-2"
            y="-12"
            width="56"
            height="14"
            rx="3"
            fill="#241C15"
          />
          <text
            x="26"
            y="-2"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8"
            fontWeight="800"
            letterSpacing="1.8"
            fill="#FBEFE3"
          >
            MEMORY
          </text>
        </g>
      </g>

      {/* کارت کوچکی که به سمت context پرواز می‌کند (در hover بالا می‌رود) */}
      <g
        transform="translate(160,80)"
        className="transition-all duration-600 ease-spring opacity-0 group-hover:opacity-100 group-hover:-translate-y-[26px]"
      >
        <rect
          x="-14"
          y="-7"
          width="28"
          height="14"
          rx="3"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <line x1="-9" y1="-2" x2="9" y2="-2" stroke="#241C15" strokeWidth="1" opacity="0.6" />
        <line x1="-9" y1="2" x2="6" y2="2" stroke="#241C15" strokeWidth="1" opacity="0.6" />
      </g>
    </CoverShell>
  );
};

export default AgentMemoryCover;
