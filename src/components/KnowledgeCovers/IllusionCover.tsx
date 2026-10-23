/**
 * Illusion · جلد توهم مدل
 *
 * استعاره: در یک متن روان، چند واقعیت آرام با مهر قرمز «ساختگی» افشا می‌شوند.
 * مدل خیلی روان حرف می‌زند، اما مهر قرمز به شما می‌گوید —— این بخش را خودش ساخته است.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - بدنه: یک"برگه خروجی"، که درون آن ۵ خط متن است (خط افقی + بخش‌های ink با طول‌های مختلف نماینده جمله‌ها)
 *   - خط ۲ و خط ۴ مهر قرمز"ساختگی"در انتها خورده‌اند
 *   - بالا-راست: هشدار دایره‌ای قرمز ⚠
 *   - پایین-چپ: برچسب کوچک mono «LLM said:»
 *   - یک خط موجی coral زیر بخش مشکوک خط ۲ کشیده شده
 *
 * رفتار hover: مهر قرمز کمی می‌لرزد و بزرگ می‌شود؛ گوشه پایین-راست برگه کمی پایین می‌رود.
 */
import React from "react";
import CoverShell from "./CoverShell";

/* ۵ خط"متن" · هر خط N بخش rect با ink که کلمات را شبیه‌سازی می‌کند */
const LINES: { y: number; segs: { x: number; w: number }[]; redIdx?: number[] }[] = [
  { y: 56, segs: [
    { x: 36, w: 22 }, { x: 62, w: 30 }, { x: 96, w: 18 }, { x: 118, w: 26 }, { x: 148, w: 20 },
    { x: 172, w: 28 }, { x: 204, w: 16 }, { x: 224, w: 24 },
  ] },
  /* خط ۲: انتهای آن قرمز */
  { y: 80, segs: [
    { x: 36, w: 18 }, { x: 58, w: 24 }, { x: 86, w: 22 }, { x: 112, w: 30 }, { x: 146, w: 18 },
    { x: 168, w: 36 }, { x: 208, w: 20 }, { x: 232, w: 28 },
  ], redIdx: [5, 6, 7] },
  { y: 104, segs: [
    { x: 36, w: 26 }, { x: 66, w: 18 }, { x: 88, w: 24 }, { x: 116, w: 20 }, { x: 140, w: 30 },
    { x: 174, w: 16 }, { x: 194, w: 28 }, { x: 226, w: 22 },
  ] },
  /* خط ۴: یک token در بخش میانی قرمز */
  { y: 128, segs: [
    { x: 36, w: 22 }, { x: 62, w: 28 }, { x: 94, w: 18 }, { x: 116, w: 24 }, { x: 144, w: 30 },
    { x: 178, w: 18 }, { x: 200, w: 24 }, { x: 228, w: 30 },
  ], redIdx: [4] },
  { y: 152, segs: [
    { x: 36, w: 20 }, { x: 60, w: 28 }, { x: 92, w: 22 }, { x: 118, w: 18 }, { x: 140, w: 26 },
    { x: 170, w: 20 }, { x: 194, w: 24 },
  ] },
];

const IllusionCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* بالا-راست: هشدار ⚠ */}
      <g
        transform="translate(286,30) rotate(8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <circle cx="0" cy="0" r="14" fill="#FF4D74" stroke="#241C15" strokeWidth="1.8" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#FBEFE3"
        >
          !
        </text>
      </g>

      {/* تزئین بالا-چپ + پایین-چپ: چرخ‌دنده کوچک / مربع کوچک */}
      <g transform="translate(26,28) rotate(-10)" className="origin-center transition-transform duration-500 group-hover:rotate-0">
        <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.4" />
      </g>

      {/* بدنه برگه */}
      <g className="transition-transform duration-500 ease-out group-hover:translate-y-0.5">
        {/* برگه */}
        <rect
          x="22"
          y="40"
          width="232"
          height="135"
          rx="6"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* سایه stamp برگه */}
        <rect
          x="26"
          y="44"
          width="232"
          height="135"
          rx="6"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          opacity="0.18"
        />

        {/* برچسب mono بالا "LLM said:" */}
        <text
          x="32"
          y="50"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="1.2"
          fill="#88837C"
        >
          LLM SAID:
        </text>

        {/* ۵ خط متن */}
        {LINES.map((line, li) => (
          <g key={li}>
            {line.segs.map((s, si) => {
              const red = line.redIdx?.includes(si);
              return (
                <rect
                  key={si}
                  x={s.x}
                  y={line.y - 4}
                  width={s.w}
                  height="6"
                  rx="1.5"
                  fill={red ? "#FF4D74" : "#241C15"}
                  opacity={red ? 0.95 : 0.85}
                />
              );
            })}
          </g>
        ))}

        {/* خط موجی زیر خط ۲ (fact-check failed) */}
        <path
          d="M 168 86 q 4 -3 8 0 t 8 0 t 8 0 t 8 0 t 8 0 t 8 0"
          stroke="#FF4D74"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* مهر قرمز «ساختگی» در انتهای خط ۲ · در hover می‌لرزد */}
        <g
          transform="translate(242,80) rotate(-10)"
          className="origin-center transition-transform duration-300 group-hover:rotate-[6deg] group-hover:scale-110"
        >
          <rect
            x="-15"
            y="-11"
            width="30"
            height="22"
            rx="3"
            fill="#FF4D74"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="14"
            fontWeight="800"
            fill="#FBEFE3"
          >
            ساختگی
          </text>
        </g>
      </g>

      {/* برچسب کوچک پایین · hallucination */}
      <g transform="translate(160,189)">
        <rect
          x="-44"
          y="-9"
          width="88"
          height="16"
          rx="8"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.6"
          fill="#F4D35E"
        >
          HALLUCINATION
        </text>
      </g>
    </CoverShell>
  );
};

export default IllusionCover;
