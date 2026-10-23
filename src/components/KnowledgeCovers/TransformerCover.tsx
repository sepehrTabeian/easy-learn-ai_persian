/**
 * جلد Transformer
 *
 * استعاره: پشته ۴ لایه block ترنسفورمر + یک ردیف token که با کمان‌های cross-attention به هم وصل‌اند،
 *      در راست سه chip با Q/K/V سه‌گانه attention را جدا می‌کنند.
 *
 * تفاوت با bert cover (یک جمله + [MASK] + top-3 کاندید + فلش همگرا به mask):
 *   ─ bert استعاره «mask شدن کلمه · پیش‌بینی دوطرفه» است
 *   ─ این‌جا استعاره معماری «اتصال بین tokenها · پشته لایه‌ها · Q/K/V» است
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   ─ stamp بالا-چپ «2017 · arXiv 1706.03762» (pill افقی coral)
 *   ─ ۸ نقطه مربعی کوچک بالا-راست (تصویر multi-head)
 *   ─ مرکز متمایل به چپ: پشته ۴ لایه block ترنسفورمر
 *   ─ مرکز متمایل به راست: سه کارت chip با Q / K / V (butter / coral / teal)
 *   ─ پایین: ۴ input token که با کمان‌های attention به هم وصل‌اند
 *   ─ caption پایین: self-attention · همه کلمات یک‌جا
 *
 * hover: جریان کمان‌ها سریع‌تر + نقاط multi-head نفس می‌کشند + chipهای Q/K/V کمی می‌چرخند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const TOKENS = ["گربه", "نشسته", "مبل", "روی"];

/* موقعیت token: یک ردیف در پایین */
const TOK_Y = 168;
const TOK_W = 26;
const TOK_H = 22;
const TOK_GAP = 8;
const TOK_X0 = 36; // x مرکز اولین token
const tokX = (i: number) => TOK_X0 + i * (TOK_W + TOK_GAP);

/* کمان attention: جفت (from, to). ۴ تا دستی انتخاب شده‌اند و از روی پشته block به بالا برآمده‌اند */
const ARCS: { a: number; b: number; tone: string }[] = [
  { a: 0, b: 2, tone: "#E07A5F" }, // گربه ← مبل
  { a: 1, b: 3, tone: "#1B4B5A" }, // نشسته ← روی
  { a: 0, b: 3, tone: "#241C15" }, // گربه ← روی
  { a: 2, b: 3, tone: "#F4D35E" }, // مبل ← روی
];

const TransformerCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* stamp بالا-چپ: ID مقاله 2017 */}
      <g
        transform="translate(54,28) rotate(-5)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3"
      >
        <rect
          x="-44"
          y="-11"
          width="88"
          height="22"
          rx="4"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="1.1"
          fill="#FBEFE3"
        >
          2017 · 1706.03762
        </text>
      </g>

      {/* بالا-راست: ۸ نقطه مربعی کوچک head */}
      <g
        transform="translate(238,28)"
        className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={`head-${i}`}
            x={i * 9}
            y="-4"
            width="7"
            height="8"
            rx="1.5"
            fill={
              i === 0 || i === 3 || i === 5
                ? "#241C15"
                : i === 1 || i === 6
                  ? "#E07A5F"
                  : "#F4D35E"
            }
            stroke="#241C15"
            strokeWidth="1"
          />
        ))}
        <text
          x="36"
          y="18"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.8"
        >
          8 heads
        </text>
      </g>

      {/* مرکز متمایل به چپ: پشته ۴ لایه block ترنسفورمر */}
      <g transform="translate(56,58)">
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={`blk-${i}`}>
            <rect
              x="0"
              y={i * 24}
              width="118"
              height="20"
              rx="5"
              fill={i % 2 === 0 ? "#FFFFFF" : "#FBEFE3"}
              stroke="#241C15"
              strokeWidth="1.75"
            />
            <text
              x="10"
              y={i * 24 + 13}
              fontFamily="Geist Mono, monospace"
              fontSize="8.5"
              fontWeight="700"
              fill="#88837C"
              letterSpacing="0.8"
            >
              layer {4 - i}
            </text>
            {/* سمت راست هر لایه: دو نشانه کوچک attention + ffn */}
            <circle
              cx="92"
              cy={i * 24 + 10}
              r="2.5"
              fill="#E07A5F"
              stroke="#241C15"
              strokeWidth="0.8"
            />
            <rect
              x="100"
              y={i * 24 + 7}
              width="6"
              height="6"
              rx="1"
              fill="#1B4B5A"
              stroke="#241C15"
              strokeWidth="0.8"
            />
          </g>
        ))}
        {/* برچسب ×N */}
        <text
          x="59"
          y="106"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="1"
        >
          × N
        </text>
      </g>

      {/* مرکز متمایل به راست: سه chip با Q / K / V */}
      <g transform="translate(212,62)">
        {[
          { label: "Q", fill: "#E07A5F", text: "#FBEFE3", y: 0 },
          { label: "K", fill: "#1B4B5A", text: "#FBEFE3", y: 28 },
          { label: "V", fill: "#F4D35E", text: "#241C15", y: 56 },
        ].map((q, i) => (
          <g
            key={q.label}
            transform={`translate(0, ${q.y})`}
            className="origin-left transition-transform duration-500"
          >
            <rect
              x="0"
              y="0"
              width="68"
              height="22"
              rx="5"
              fill={q.fill}
              stroke="#241C15"
              strokeWidth="1.75"
            />
            <text
              x="11"
              y="15"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill={q.text}
            >
              {q.label}
            </text>
            {/* ستون کوچک */}
            <g transform="translate(26,5)">
              {[5, 8, 11, 6, 9].map((h, j) => (
                <rect
                  key={j}
                  x={j * 7}
                  y={13 - h}
                  width="5"
                  height={h}
                  rx="0.8"
                  fill={q.text}
                  opacity="0.7"
                />
              ))}
            </g>
          </g>
        ))}
        {/* فلش همگرای softmax ← output */}
        <path
          d="M 74 11 Q 96 41 74 71"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeDasharray="3 2"
          fill="none"
          strokeLinecap="round"
          className="animate-dash-flow"
        />
        <text
          x="98"
          y="44"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.6"
        >
          softmax
        </text>
      </g>

      {/* ردیف token (پایین) + خطوط کمانی attention (بالای block برآمده) */}
      {/* کمان‌های attention اول رسم می‌شوند (لایه زیر token) */}
      {ARCS.map((arc, i) => {
        const xA = tokX(arc.a) + TOK_W / 2;
        const xB = tokX(arc.b) + TOK_W / 2;
        const yBase = TOK_Y - TOK_H / 2 - 2;
        const peak = 152 - i * 4; // ارتفاع‌های مختلف رأس کمان
        const cx = (xA + xB) / 2;
        return (
          <path
            key={`arc-${i}`}
            d={`M ${xA} ${yBase} Q ${cx} ${peak} ${xB} ${yBase}`}
            stroke={arc.tone}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="2.5 2.5"
            className="animate-dash-flow"
            opacity="0.85"
          />
        );
      })}

      {/* مربع token */}
      {TOKENS.map((t, i) => (
        <g
          key={`tk-${i}`}
          transform={`translate(${tokX(i)}, ${TOK_Y})`}
          className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
        >
          <rect
            x="0"
            y="0"
            width={TOK_W}
            height={TOK_H}
            rx="4"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.75"
          />
          <text
            x={TOK_W / 2}
            y={TOK_H / 2 + 4.5}
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="13"
            fontWeight="800"
            fill="#241C15"
          >
            {t}
          </text>
        </g>
      ))}

      {/* پایین-چپ: برچسب کوچک معماری */}
      <g transform="translate(28,193) rotate(-2)" className="origin-left">
        <rect
          x="-2"
          y="-9"
          width="106"
          height="14"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="51"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#F4D35E"
        >
          decoder-only · جریان اصلی 2026
        </text>
      </g>

      {/* caption پایین-راست */}
      <text
        x="248"
        y="194"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.5"
      >
        self-attention
      </text>
    </CoverShell>
  );
};

export default TransformerCover;
