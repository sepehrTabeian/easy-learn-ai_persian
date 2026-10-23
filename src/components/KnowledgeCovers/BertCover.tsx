/**
 * جلد BERT
 *
 * استعاره: وسط یک جمله یک [MASK] گذاشته شده، کلمات دو طرف به سمت وسط فشار می‌آورند و BERT بالای سر آن top-3 کلمه کاندید را ارائه می‌دهد.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   ─ بالا: مهر stamp «MLM · 15%» (رنگ pop)
 *   ─ وسط y=70: نوارهای top-3 کلمه کاندید (butter / coral / teal) + ستون احتمال
 *   ─ پایین وسط y=130: یک ردیف ۷ مربع token، چهارمی [MASK] است (مربع بزرگ مشکی ink)
 *   ─ در هر طرف [MASK] ۳ مربع همسایه، از چپ/راست هر کدام یک فلش نقطه‌چین به سمت مرکز همگرا می‌شود
 *   ─ پایین-چپ: برچسب کوچک bert-base 110M
 *   ─ پایین-راست: آیکون کوچک ۴ لایه Encoder روی هم
 *
 * hover: نوارهای کاندید کمی چپ و راست می‌لرزند، فلش‌ها سریع‌تر می‌شوند، لایه‌های Encoder نفس می‌کشند.
 */
import React from "react";
import CoverShell from "./CoverShell";

/* ساختار جمله: کلمات جای‌نگهدار + [MASK] */
const LEFT_TOKENS = ["امروز", "هوا", "واقعاً"];
const RIGHT_TOKENS = ["，", "است", "！"];

/* top-3 کلمه کاندید و احتمال */
const CANDIDATES: { word: string; prob: number; tone: string; textColor: string }[] = [
  { word: "گرم", prob: 0.74, tone: "#F4D35E", textColor: "#241C15" }, // butter
  { word: "آفتابی", prob: 0.12, tone: "#E07A5F", textColor: "#FBEFE3" }, // coral
  { word: "خوب", prob: 0.09, tone: "#1B4B5A", textColor: "#FBEFE3" }, // teal
];

/* اندازه مربع تک token */
const TOK_W = 22;
const TOK_H = 22;
const TOK_GAP = 4;
const ROW_Y = 138;
const ROW_CX = 160;
const MASK_W = 30;

/* مختصات x سه token چپ و راست (هم‌تراز مرکز با [MASK]) */
const leftX = (i: number) => ROW_CX - MASK_W / 2 - TOK_GAP - (3 - i) * (TOK_W + TOK_GAP) + TOK_W / 2;
const rightX = (i: number) => ROW_CX + MASK_W / 2 + TOK_GAP + i * (TOK_W + TOK_GAP) + TOK_W / 2;

const BertCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* stamp بالا: MLM · 15% */}
      <g
        transform="translate(50,28) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3"
      >
        <rect
          x="-30"
          y="-11"
          width="60"
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
          letterSpacing="1.4"
          fill="#FBEFE3"
        >
          MLM · 15%
        </text>
      </g>

      {/* بالا-راست: آیکون کوچک ۴ لایه Encoder روی هم */}
      <g
        transform="translate(285,28)"
        className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
      >
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={`stack-${i}`}
            x="-22"
            y={-12 + i * 6}
            width="44"
            height="4"
            rx="1.2"
            fill={i === 0 ? "#241C15" : i === 1 ? "#5A5147" : "#88837C"}
            stroke="#241C15"
            strokeWidth="1"
            opacity={1 - i * 0.18}
          />
        ))}
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fill="#88837C"
          letterSpacing="0.8"
        >
          12 layers
        </text>
      </g>

      {/* وسط: نوارهای top-3 کلمه کاندید */}
      <g transform="translate(160,72)">
        {/* عنوان کوچک کانتینر کلمات کاندید */}
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fill="#88837C"
          letterSpacing="1.2"
        >
          top-3 candidates
        </text>

        {CANDIDATES.map((c, i) => {
          /* سه کلمه کاندید کنار هم */
          const x = (i - 1) * 48;
          const barWidth = c.prob * 38;
          return (
            <g
              key={`cand-${i}`}
              transform={`translate(${x},0)`}
              className="origin-center transition-transform duration-500"
            >
              {/* مربع کلمه */}
              <rect
                x="-19"
                y="-12"
                width="38"
                height="22"
                rx="4"
                fill={c.tone}
                stroke="#241C15"
                strokeWidth="1.8"
              />
              <text
                x="-3"
                y="3"
                textAnchor="middle"
                fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
                fontSize="13"
                fontWeight="800"
                fill={c.textColor}
              >
                {c.word}
              </text>
              {/* عدد کوچک احتمال */}
              <text
                x="9"
                y="3"
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="7"
                fontWeight="700"
                fill={c.textColor}
                opacity="0.7"
              >
                {(c.prob * 100).toFixed(0)}
              </text>
              {/* ستون احتمال */}
              <line
                x1="-19"
                y1="14"
                x2="19"
                y2="14"
                stroke="#241C15"
                strokeWidth="0.6"
                opacity="0.2"
              />
              <line
                x1="-19"
                y1="14"
                x2={-19 + barWidth}
                y2="14"
                stroke="#241C15"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>

      {/* خط نقطه‌چین رو به پایین از کلمه کاندید ← [MASK] (یک خط) */}
      <line
        x1="160"
        y1="88"
        x2="160"
        y2={ROW_Y - TOK_H / 2 - 2}
        stroke="#241C15"
        strokeWidth="1.2"
        strokeDasharray="2 2"
        strokeLinecap="round"
        className="animate-dash-flow"
      />
      <polygon
        points={`156,${ROW_Y - TOK_H / 2 - 4} 160,${ROW_Y - TOK_H / 2 + 1} 164,${ROW_Y - TOK_H / 2 - 4}`}
        fill="#241C15"
      />

      {/* ردیف جمله: ۳ چپ + [MASK] + ۳ راست */}
      {/* ۳ token چپ */}
      {LEFT_TOKENS.map((t, i) => (
        <g
          key={`l-${i}`}
          transform={`translate(${leftX(i)}, ${ROW_Y})`}
          className="origin-center transition-transform duration-500 group-hover:translate-x-[2px]"
        >
          <rect
            x={-TOK_W / 2}
            y={-TOK_H / 2}
            width={TOK_W}
            height={TOK_H}
            rx="3.5"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.7"
          />
          <text
            y="3.5"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="12"
            fontWeight="800"
            fill="#241C15"
          >
            {t}
          </text>
        </g>
      ))}

      {/* مربع بزرگ [MASK] در وسط */}
      <g transform={`translate(${ROW_CX}, ${ROW_Y})`}>
        <rect
          x={-MASK_W / 2}
          y={-TOK_H / 2}
          width={MASK_W}
          height={TOK_H}
          rx="3.5"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.7"
        />
        <text
          y="3.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="800"
          letterSpacing="0.8"
          fill="#F4D35E"
        >
          [MASK]
        </text>
      </g>

      {/* ۳ token راست */}
      {RIGHT_TOKENS.map((t, i) => (
        <g
          key={`r-${i}`}
          transform={`translate(${rightX(i)}, ${ROW_Y})`}
          className="origin-center transition-transform duration-500 group-hover:translate-x-[-2px]"
        >
          <rect
            x={-TOK_W / 2}
            y={-TOK_H / 2}
            width={TOK_W}
            height={TOK_H}
            rx="3.5"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.7"
          />
          <text
            y="3.5"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="12"
            fontWeight="800"
            fill="#241C15"
          >
            {t}
          </text>
        </g>
      ))}

      {/* کمان همگرای چپ ← [MASK] (هجوم attention) */}
      <path
        d={`M ${leftX(0)} ${ROW_Y + TOK_H / 2 + 4} Q ${(leftX(0) + ROW_CX) / 2} ${ROW_Y + 22} ${ROW_CX - MASK_W / 2 - 2} ${ROW_Y + TOK_H / 2 + 2}`}
        stroke="#E07A5F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 3"
        className="animate-dash-flow"
      />
      {/* کمان همگرای راست ← [MASK] */}
      <path
        d={`M ${rightX(2)} ${ROW_Y + TOK_H / 2 + 4} Q ${(rightX(2) + ROW_CX) / 2} ${ROW_Y + 22} ${ROW_CX + MASK_W / 2 + 2} ${ROW_Y + TOK_H / 2 + 2}`}
        stroke="#1B4B5A"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 3"
        className="animate-dash-flow"
      />
      {/* نقطه همگرایی فلش کوچک مرکزی */}
      <circle
        cx={ROW_CX}
        cy={ROW_Y + 28}
        r="2.5"
        fill="#E07A5F"
        stroke="#241C15"
        strokeWidth="1"
      />

      {/* پایین-چپ: برچسب کوچک bert-base 110M */}
      <g transform="translate(28,182) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="78"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="36"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          bert-base · 110M
        </text>
      </g>

      {/* caption پایین: encoder دوطرفه */}
      <text
        x="226"
        y="188"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.5"
      >
        bidirectional encoder
      </text>
    </CoverShell>
  );
};

export default BertCover;
