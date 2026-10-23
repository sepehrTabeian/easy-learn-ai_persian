/**
 * جلد Pretrain
 *
 * استعاره: چهار جریان داده ← ظرف مدل (ماتریس نقطه‌ای وزن 8×8 داخلی) ← stamp «BASE» از تنور بیرون می‌آید.
 * بالای ظرف یک ترازوی کوچک Chinchilla 20:1: سمت چپ N (وزنه پارامتر)، سمت راست D (وزنه داده).
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: ۴ chip داده (WEB / CODE / BOOK / MATH) به‌صورت عمودی
 *   - وسط: خطوط جریان کمانی به ظرف model همگرا می‌شوند (rounded rect with 8×8 weight dots)
 *   - راست: stamp دایره‌ای «BASE»، همراه با برچسب ↓ loss
 *   - بالا: ترازوی Chinchilla 20:1، کفه چپ N و کفه راست D کج
 *   - پایین: خط کاهش loss بسیار کم‌رنگ
 *
 * hover: خطوط جریان پررنگ می‌شوند، نقاط وزن روشن‌تر می‌شوند، کجی ترازو بیشتر می‌شود.
 */
import React from "react";
import CoverShell from "./CoverShell";

const DATA_CHIPS = [
  { label: "WEB", color: "#F4D35E" },
  { label: "CODE", color: "#1B4B5A" },
  { label: "BOOK", color: "#E07A5F" },
  { label: "MATH", color: "#FF4D74" },
];

const PretrainCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* بالا: ترازوی Chinchilla */}
      <g
        transform="translate(160,30)"
        className="transition-transform duration-600 group-hover:rotate-[-6deg] origin-center"
      >
        {/* ستون */}
        <line x1="0" y1="-2" x2="0" y2="20" stroke="#241C15" strokeWidth="2" />
        {/* تیر افقی · کمی کج */}
        <line
          x1="-32"
          y1="-3"
          x2="32"
          y2="3"
          stroke="#241C15"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* کفه چپ · وزنه N */}
        <g transform="translate(-32,-3)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#241C15" strokeWidth="1.2" />
          <rect
            x="-9"
            y="8"
            width="18"
            height="9"
            rx="2"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x="0"
            y="15"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="800"
            fill="#241C15"
          >
            N
          </text>
        </g>
        {/* کفه راست · وزنه D (بلوک بزرگ‌تر = بیش‌آموزی مدرن) */}
        <g transform="translate(32,3)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#241C15" strokeWidth="1.2" />
          <rect
            x="-12"
            y="6"
            width="24"
            height="12"
            rx="2"
            fill="#1B4B5A"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x="0"
            y="14.5"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="800"
            fill="#FBEFE3"
          >
            D
          </text>
        </g>
      </g>

      {/* بالا-راست: stamp با 20:1 */}
      <g
        transform="translate(288,38) rotate(8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-1 group-hover:scale-110"
      >
        <rect
          x="-21"
          y="-11"
          width="42"
          height="22"
          rx="5"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#F4D35E"
        >
          20:1
        </text>
      </g>

      {/* چپ: ۴ chip داده به‌صورت عمودی */}
      {DATA_CHIPS.map((d, i) => {
        const y = 72 + i * 22;
        return (
          <g
            key={d.label}
            transform={`translate(34,${y})`}
            className="transition-transform duration-500 ease-out"
            style={{ transformOrigin: "center" }}
          >
            <rect
              x="-18"
              y="-8"
              width="36"
              height="16"
              rx="4"
              fill={d.color}
              stroke="#241C15"
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="3.5"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="7.5"
              fontWeight="700"
              letterSpacing="0.5"
              fill={d.color === "#1B4B5A" || d.color === "#FF4D74" ? "#FBEFE3" : "#241C15"}
            >
              {d.label}
            </text>
          </g>
        );
      })}

      {/* خطوط جریان کمانی: ۴ chip ← مدل */}
      <g
        stroke="#241C15"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.45"
        className="transition-opacity duration-500 group-hover:opacity-90"
      >
        <path d="M 56 72 Q 110 80 144 110" />
        <path d="M 56 94 Q 110 100 144 116" />
        <path d="M 56 116 Q 110 110 144 124" />
        <path d="M 56 138 Q 110 130 144 130" />
      </g>

      {/* مرکز: ظرف model · نقاط وزن 8x8 داخلی */}
      <g transform="translate(184,118)">
        <rect
          x="-40"
          y="-32"
          width="80"
          height="64"
          rx="10"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2.2"
        />
        {/* نقاط وزن 8x6 */}
        <g>
          {Array.from({ length: 6 }).flatMap((_, j) =>
            Array.from({ length: 8 }).map((_, i) => {
              const cx = -34 + i * 9;
              const cy = -25 + j * 9;
              // چند هایلایت coral = یادگرفته‌ها"دانش"
              const lit = (i * 3 + j * 5) % 11 === 0;
              const med = (i + j) % 4 === 0;
              return (
                <circle
                  key={`w-${i}-${j}`}
                  cx={cx}
                  cy={cy}
                  r={lit ? 1.8 : med ? 1.4 : 1.0}
                  fill={lit ? "#E07A5F" : med ? "#241C15" : "#241C15"}
                  opacity={lit ? 1 : med ? 0.55 : 0.22}
                  className={
                    lit
                      ? "transition-opacity duration-700 group-hover:opacity-100"
                      : ""
                  }
                />
              );
            }),
          )}
        </g>
        {/* برچسب model */}
        <text
          x="0"
          y="-37"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          fontWeight="700"
          letterSpacing="1.3"
          fill="#241C15"
          opacity="0.6"
        >
          MODEL · وزن‌ها
        </text>
      </g>

      {/* فلش مدل ← BASE */}
      <g
        stroke="#241C15"
        strokeWidth="1.8"
        fill="#241C15"
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        <line
          x1="226"
          y1="118"
          x2="252"
          y2="118"
          strokeLinecap="round"
        />
        <polygon points="252,113 252,123 260,118" />
      </g>

      {/* راست: stamp دایره‌ای BASE */}
      <g
        transform="translate(286,118)"
        className="transition-transform duration-500 group-hover:scale-110 origin-center"
      >
        <circle
          cx="0"
          cy="0"
          r="22"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2.2"
        />
        <text
          x="0"
          y="-1.5"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#241C15"
        >
          BASE
        </text>
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#241C15"
          opacity="0.7"
        >
          model
        </text>
      </g>

      {/* پایین: خط کاهش loss (کم‌رنگ) */}
      <g opacity="0.4">
        <path
          d="M 30 178 Q 80 168 130 164 T 230 158 T 290 156"
          fill="none"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <text
          x="30"
          y="190"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          letterSpacing="0.8"
          fill="#241C15"
          opacity="0.6"
        >
          loss ↓ · چند ده تریلیون next-token
        </text>
      </g>
    </CoverShell>
  );
};

export default PretrainCover;
