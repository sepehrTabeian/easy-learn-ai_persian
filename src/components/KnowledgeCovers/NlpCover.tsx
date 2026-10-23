/**
 * جلد NLP
 *
 * استعاره: تبدیل «متن ← عدد». یک جمله ← به مربع‌های token بریده می‌شود ← هر token به رشته‌ای از اعداد کوچک تبدیل می‌شود ← خروجی
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: مربع یک جمله کوتاه فارسی (پس‌زمینه cream + حاشیه ink) با نوشته «امروز هوا خیلی خوب است»
 *   - بالا وسط: ۵ مربع token رنگی (butter / coral / teal / cream / white)، نشان‌دهنده توکن‌سازی
 *   - پایین وسط: زیر هر token یک رشته ستون کوچک برداری با ارتفاع‌های مختلف آویزان است ("عدد"）
 *   - راست: یک "y" خروجی نقطه کوچک (teal) نشان‌دهنده خروجی مدل
 *   - بالا-راست: مهر «token → vec» (رنگ pop)
 *   - پایین-چپ: تکه فرمول BPE / 100k vocab
 *
 * hover: مربع‌های token به ترتیب کمی بزرگ و کوچک می‌شوند، ستون‌های برداری نوسان می‌کنند، dash روان خطوط اتصال سریع‌تر می‌شود.
 */
import React from "react";
import CoverShell from "./CoverShell";

const TOKENS: { text: string; tone: string; textColor: string }[] = [
  { text: "امروز", tone: "#F4D35E", textColor: "#241C15" }, // butter
  { text: "هوا", tone: "#FBEFE3", textColor: "#241C15" }, // cream
  { text: "واقعاً", tone: "#E07A5F", textColor: "#FBEFE3" },   // coral
  { text: "خوب", tone: "#1B4B5A", textColor: "#FBEFE3" },   // teal
  { text: "!", tone: "#FFFFFF", textColor: "#241C15" },    // white
];

/* ارتفاع ستون‌های بردار ۶ بعدی زیر هر token (حس تصادفی پایدار) */
const VECTOR_HEIGHTS: number[][] = [
  [6, 12, 5, 9, 7, 11],
  [9, 4, 11, 8, 13, 5],
  [4, 8, 10, 6, 5, 9],
  [11, 7, 5, 12, 6, 10],
  [5, 9, 7, 6, 11, 8],
];

const TOKEN_W = 38;
const TOKEN_H = 22;
const TOKEN_GAP = 10;
const TOKENS_X0 = 96;
const TOKENS_Y = 60;
const VEC_Y0 = 92;

const NlpCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* بالا-راست: مهر token→vec */}
      <g
        transform="translate(286,28) rotate(8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-26"
          y="-11"
          width="52"
          height="22"
          rx="4"
          fill="#FF4D74"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="1.2"
          fill="#FBEFE3"
        >
          tok→vec
        </text>
      </g>

      {/* پایین-چپ: تکه فرمول BPE */}
      <g transform="translate(28,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="80"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="37"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#FBEFE3"
        >
          BPE · 100k vocab
        </text>
      </g>

      {/* ① جمله ورودی (مربع بزرگ چپ) */}
      <g
        transform="translate(36,108)"
        className="origin-center transition-transform duration-500 group-hover:translate-x-1"
      >
        <rect
          x="-26"
          y="-26"
          width="52"
          height="52"
          rx="6"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* خط متن ۱ */}
        <text
          y="-8"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#241C15"
        >
          امروز هوا
        </text>
        <text
          y="6"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#241C15"
        >
          خیلی خوب است!
        </text>
        {/* label */}
        <rect
          x="-22"
          y="18"
          width="44"
          height="14"
          rx="7"
          fill="#241C15"
        />
        <text
          y="27.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1.4"
          fill="#F4D35E"
        >
          TEXT
        </text>
      </g>

      {/* فلش ورودی ← tokens */}
      <g>
        <line
          x1="62"
          y1="108"
          x2="92"
          y2="108"
          stroke="#241C15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <polygon points="91,105 97,108 91,111" fill="#241C15" />
      </g>

      {/* ② ۵ مربع token + ستون‌های بردار */}
      {TOKENS.map((tok, i) => {
        const x = TOKENS_X0 + i * (TOKEN_W + TOKEN_GAP);
        const heights = VECTOR_HEIGHTS[i];
        return (
          <g
            key={`tok-${i}`}
            className="origin-center transition-transform duration-500 group-hover:scale-[1.04]"
          >
            {/* مربع token */}
            <g transform={`translate(${x + TOKEN_W / 2}, ${TOKENS_Y})`}>
              <rect
                x={-TOKEN_W / 2}
                y={-TOKEN_H / 2}
                width={TOKEN_W}
                height={TOKEN_H}
                rx="3.5"
                fill={tok.tone}
                stroke="#241C15"
                strokeWidth="1.7"
              />
              <text
                y="3.5"
                textAnchor="middle"
                fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
                fontSize="11"
                fontWeight="800"
                fill={tok.textColor}
              >
                {tok.text}
              </text>
            </g>

            {/* خط کوچک اتصال token ← ستون بردار */}
            <line
              x1={x + TOKEN_W / 2}
              y1={TOKENS_Y + TOKEN_H / 2}
              x2={x + TOKEN_W / 2}
              y2={VEC_Y0}
              stroke="#241C15"
              strokeWidth="0.6"
              opacity="0.55"
              strokeDasharray="1.2 1.4"
            />

            {/* ستون بردار ۶ بعدی */}
            <g transform={`translate(${x + 4}, ${VEC_Y0 + 30})`}>
              {/* خط پایه */}
              <line
                x1="0"
                y1="0"
                x2={TOKEN_W - 8}
                y2="0"
                stroke="#241C15"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {heights.map((h, j) => {
                const bx = j * 5;
                return (
                  <rect
                    key={`v-${i}-${j}`}
                    x={bx}
                    y={-h}
                    width="3.5"
                    height={h}
                    rx="0.8"
                    fill="#241C15"
                    opacity={0.55 + (j % 2) * 0.25}
                  />
                );
              })}
            </g>
          </g>
        );
      })}

      {/* caption کوچک بالای tokens */}
      <text
        x={TOKENS_X0 + (TOKENS.length * (TOKEN_W + TOKEN_GAP)) / 2 - TOKEN_GAP / 2}
        y={TOKENS_Y - 22}
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#88837C"
        letterSpacing="1.2"
      >
        5 tokens
      </text>

      {/* caption زیر ستون‌های بردار */}
      <text
        x={TOKENS_X0 + (TOKENS.length * (TOKEN_W + TOKEN_GAP)) / 2 - TOKEN_GAP / 2}
        y={VEC_Y0 + 50}
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.8"
      >
        embedding · 6d (نمایشی)
      </text>

      {/* ③ فلش بردار ← مدل ← خروجی */}
      <g>
        <line
          x1={TOKENS_X0 + TOKENS.length * (TOKEN_W + TOKEN_GAP) - TOKEN_GAP}
          y1="108"
          x2="294"
          y2="108"
          stroke="#241C15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 3"
          className="animate-dash-flow"
        />
        <polygon points="293,105 299,108 293,111" fill="#241C15" />
      </g>

      {/* نقطه کوچک خروجی y */}
      <g transform="translate(304,108)">
        <circle r="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
        <text
          y="2.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          fill="#F4D35E"
        >
          y
        </text>
      </g>

      {/* راهنمای step پایین */}
      <text
        x="160"
        y="186"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.4"
      >
        text → tokenize → embed → model → y
      </text>
    </CoverShell>
  );
};

export default NlpCover;
