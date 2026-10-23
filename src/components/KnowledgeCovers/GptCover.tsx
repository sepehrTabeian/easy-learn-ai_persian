/**
 * جلد GPT
 *
 * استعاره: درون یک حباب گفتگوی ChatGPT سه گره نسلی که مدام بزرگ‌تر می‌شوند ظاهر می‌شوند ——
 *   GPT-1 (نقطه خاکستری کوچک) ← GPT-3 (نقطه قرمز متوسط) ← GPT-5 (نقطه صورتی بزرگ)
 *   در پایین یک ردیف دنباله token `next token →` اشاره به این‌که هدف «حدس token بعدی» ۸ سال ثابت مانده است.
 *   stamp بالا-راست «OpenAI · 2018→2026»، حباب کوچک think در بالا-چپ با عبارت «reasoning» نشان‌دهنده ادغام سری o.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   ─ بالا y=24: حباب mini با think در چپ / stamp 2018→2026 در راست
 *   ─ صحنه اصلی وسط: حباب گفتگوی بزرگ (rect rx=18) مرکز را اشغال کرده
 *     داخل آن ۳ گره دایره‌ای به‌صورت افقی (تحول پارامترها) + خطوط اتصال
 *   ─ پایین y=170: ردیف token (۵ مربع کوچک)، آخری «next» برجسته است
 *
 * hover: ۳ گره کمی float-y می‌شوند · stamp کمی می‌چرخد
 */
import React from "react";
import CoverShell from "./CoverShell";

/* گره‌های سه نسل · params شعاع را تعیین می‌کند */
const GENS = [
  { x: 95, name: "GPT-1", year: "'18", r: 10, fill: "#88837C", text: "117M" },
  { x: 160, name: "GPT-3", year: "'20", r: 16, fill: "#E07A5F", text: "175B" },
  { x: 225, name: "GPT-5", year: "'25", r: 22, fill: "#FF4D74", text: "?" },
];

/* ردیف token پایین */
const TOKENS = ["o", "p", "e", "n", "?"];

const GptCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* stamp بالا-راست · OpenAI · 2018→2026 */}
      <g
        transform="translate(282,28) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3"
      >
        <rect
          x="-32"
          y="-12"
          width="64"
          height="24"
          rx="4"
          fill="#241C15"
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
          letterSpacing="1.2"
          fill="#F4D35E"
        >
          2018→26
        </text>
      </g>

      {/* حباب کوچک think بالا-چپ · اشاره به سری o */}
      <g
        transform="translate(34,30) rotate(-4)"
        className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
      >
        <rect
          x="-22"
          y="-11"
          width="44"
          height="22"
          rx="5"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.6"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.4"
          fill="#FBEFE3"
        >
          &lt;think&gt;
        </text>
        {/* دم کوچک حباب */}
        <polygon
          points="-4,11 0,16 4,11"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.4"
        />
      </g>

      {/* حباب اصلی مرکزی · کادر گفتگوی ChatGPT */}
      <g transform="translate(160,108)">
        <rect
          x="-110"
          y="-38"
          width="220"
          height="76"
          rx="18"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* دم حباب پایین-چپ */}
        <polygon
          points="-90,38 -78,52 -72,38"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* برچسب کوچک بالا · GPT */}
        <text
          x="-94"
          y="-22"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="800"
          letterSpacing="1.4"
          fill="#88837C"
        >
          GPT · DECODER-ONLY
        </text>

        {/* ۳ گره نسل + خط نقطه‌چین اتصال (دستگاه مختصات بر مبنای مرکز -110~110) */}
        {/* خط نقطه‌چین اتصال (اول لایه زیرین رسم می‌شود) */}
        {GENS.slice(0, -1).map((g, i) => {
          const next = GENS[i + 1];
          return (
            <line
              key={`link-${i}`}
              x1={g.x - 160 + g.r}
              y1="8"
              x2={next.x - 160 - next.r}
              y2="8"
              stroke="#241C15"
              strokeWidth="1.4"
              strokeDasharray="3 3"
              opacity="0.6"
            />
          );
        })}

        {GENS.map((g, i) => (
          <g
            key={g.name}
            transform={`translate(${g.x - 160}, 8)`}
            className="origin-center animate-float-y-sm"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <circle
              cx="0"
              cy="0"
              r={g.r}
              fill={g.fill}
              stroke="#241C15"
              strokeWidth="1.8"
            />
            <text
              x="0"
              y={g.r + 11}
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8.5"
              fontWeight="700"
              fill="#241C15"
            >
              {g.name} {g.year}
            </text>
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize={g.r > 14 ? "9" : "7.5"}
              fontWeight="800"
              fill={g.r > 14 ? "#FBEFE3" : "#241C15"}
            >
              {g.text}
            </text>
          </g>
        ))}
      </g>

      {/* ردیف token پایین · استعاره next token */}
      <g transform="translate(160,176)">
        <text
          x="-100"
          y="-3"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#88837C"
          letterSpacing="1"
        >
          next token →
        </text>

        {TOKENS.map((t, i) => {
          const x = -54 + i * 28;
          const isNext = i === TOKENS.length - 1;
          return (
            <g key={i} transform={`translate(${x}, 0)`}>
              <rect
                x="-11"
                y="-9"
                width="22"
                height="18"
                rx="3"
                fill={isNext ? "#F4D35E" : "#FFFFFF"}
                stroke="#241C15"
                strokeWidth={isNext ? "1.8" : "1.4"}
              />
              <text
                y="3.5"
                textAnchor="middle"
                fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
                fontSize="11"
                fontWeight="800"
                fill="#241C15"
              >
                {t}
              </text>
            </g>
          );
        })}
      </g>
    </CoverShell>
  );
};

export default GptCover;
