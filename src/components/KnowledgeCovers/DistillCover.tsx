/**
 * جلد Distill
 *
 * استعاره: معلم (دایره بزرگ · مغز پر از نورون) ← جریان ذرات احتمال ← دانش‌آموز (دایره کوچک · نورون کمتر اما با هایلایت coral).
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: دایره معلم (بزرگ، r=42) پر از ماتریس نقطه‌ای نورون 8x8، چند نقطه هایلایت coral
 *   - وسط: از معلم"نشت می‌کند"۵ ستون احتمال با ارتفاع‌های مختلف (ذرات دانش تاریک)، طبق توزیع softmax چیده می‌شوند
 *   - راست: دایره دانش‌آموز (کوچک، r=28) فقط 4x4 نورون دارد اما ۲ هایلایت coral را حفظ کرده —— دانش تاریک را یاد گرفته
 *   - یک کمان coral در بالا از معلم به دانش‌آموز می‌رود، نماینده"جریان دانش"
 *   - تزئین: بالا-راست"T=4" stamp دما، پایین-چپ دماسنج/خطوط درجه‌بندی توزیع
 *
 * hover: جریان ذرات به سمت دانش‌آموز سریع‌تر می‌شود؛ نقاط هایلایت نورون‌های دانش‌آموز بیشتر می‌شوند؛ معلم کمی به سمت دانش‌آموز خم می‌شود.
 */
import React from "react";
import CoverShell from "./CoverShell";

/* احتمال پیش‌نرمال‌سازی ۵ کلاس (خروجی softmax معلم با T=4)، ارتفاع ستون‌های وسط را تعیین می‌کند */
const SOFT_PROBS = [0.46, 0.19, 0.17, 0.115, 0.07];

const DistillCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* کمان تزئینی بالا —— جریان دانش */}
      <path
        d="M 76 56 Q 160 24 244 76"
        stroke="#E07A5F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.55"
        className="transition-opacity duration-500 group-hover:opacity-90"
      />

      {/* بالا-راست: stamp دما */}
      <g
        transform="translate(285,28) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
      >
        <rect
          x="-22"
          y="-11"
          width="44"
          height="22"
          rx="4"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          T=4
        </text>
      </g>

      {/* پایین-چپ: تزئین خطوط درجه‌بندی توزیع */}
      <g transform="translate(28,176)" className="origin-left">
        <rect
          x="-2"
          y="-9"
          width="62"
          height="14"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="29"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1.3"
          fill="#F4D35E"
        >
          soft labels
        </text>
      </g>

      {/* ① معلم · دایره بزرگ · مغز پر از نورون */}
      <g transform="translate(70,100)" className="transition-transform duration-500 group-hover:translate-x-1">
        <circle cx="0" cy="0" r="42" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.4" />
        <defs>
          <clipPath id="teacher-clip">
            <circle cx="0" cy="0" r="38" />
          </clipPath>
        </defs>
        <g clipPath="url(#teacher-clip)">
          {Array.from({ length: 8 }).flatMap((_, i) =>
            Array.from({ length: 8 }).map((_, j) => {
              const x = -38 + i * 11 + 5.5;
              const y = -38 + j * 11 + 5.5;
              const seed = (i * 31 + j * 17) % 13;
              const hi = seed === 1 || seed === 5 || seed === 9;
              const med = seed === 3 || seed === 7;
              return (
                <circle
                  key={`t-${i}-${j}`}
                  cx={x}
                  cy={y}
                  r={hi ? 2 : med ? 1.6 : 1.3}
                  fill={hi ? "#E07A5F" : "#241C15"}
                  opacity={hi ? 1 : med ? 0.5 : 0.2}
                />
              );
            }),
          )}
        </g>
        {/* برچسب معلم */}
        <rect
          x="-22"
          y="34"
          width="44"
          height="16"
          rx="8"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="45"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.3"
          fill="#F4D35E"
        >
          TEACHER
        </text>
      </g>

      {/* ② وسط · ستون‌های احتمال (۵ عدد): ذرات دانش تاریک */}
      <g transform="translate(160,118)">
        {SOFT_PROBS.map((p, i) => {
          const x = -34 + i * 16;
          const h = 8 + p * 60;
          const isTop = i === 0;
          return (
            <g
              key={`bar-${i}`}
              className="transition-transform duration-500 ease-out"
              style={{
                transformOrigin: `${x}px 0px`,
              }}
            >
              <rect
                x={x - 5}
                y={-h}
                width="10"
                height={h}
                rx="2"
                fill={isTop ? "#241C15" : "#E07A5F"}
                stroke="#241C15"
                strokeWidth="1.5"
                opacity={isTop ? 1 : 0.85}
              />
              {/* نقطه کوچک بالا (حس ذره) */}
              <circle
                cx={x}
                cy={-h - 3}
                r="2"
                fill={isTop ? "#241C15" : "#E07A5F"}
                opacity="0.85"
              />
            </g>
          );
        })}
        {/* خط پایه */}
        <line
          x1="-46"
          y1="0"
          x2="46"
          y2="0"
          stroke="#241C15"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>

      {/* برچسب وسط: probabilities */}
      <g transform="translate(160,138)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="600"
          fill="#241C15"
          opacity="0.6"
          letterSpacing="1.2"
        >
          p · soft target
        </text>
      </g>

      {/* ③ دانش‌آموز · دایره کوچک · نورون کم اما هایلایت حفظ شده */}
      <g transform="translate(248,108)" className="transition-transform duration-500 group-hover:-translate-x-1">
        <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.4" />
        <defs>
          <clipPath id="student-clip">
            <circle cx="0" cy="0" r="24.5" />
          </clipPath>
        </defs>
        <g clipPath="url(#student-clip)">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            Array.from({ length: 4 }).map((_, j) => {
              const x = -22 + i * 12 + 6;
              const y = -22 + j * 12 + 6;
              const seed = (i * 31 + j * 17) % 7;
              /* دانش‌آموز فقط در دو موقعیت هایلایت را حفظ کرده —— دانش تاریک به‌صورت فشرده منتقل شده */
              const hi = seed === 1 || seed === 4;
              return (
                <circle
                  key={`s-${i}-${j}`}
                  cx={x}
                  cy={y}
                  r={hi ? 2.4 : 1.6}
                  fill={hi ? "#E07A5F" : "#241C15"}
                  opacity={hi ? 1 : 0.32}
                  className={hi ? "transition-all duration-500 group-hover:r-3" : ""}
                />
              );
            }),
          )}
        </g>
        {/* برچسب دانش‌آموز */}
        <rect
          x="-22"
          y="22"
          width="44"
          height="16"
          rx="8"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="33"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.3"
          fill="#FBEFE3"
        >
          STUDENT
        </text>
      </g>

      {/* خط باریک معلم ← ستون‌های وسط ← دانش‌آموز */}
      <line
        x1="110"
        y1="100"
        x2="125"
        y2="115"
        stroke="#241C15"
        strokeWidth="0.8"
        opacity="0.3"
      />
      <line
        x1="195"
        y1="115"
        x2="222"
        y2="105"
        stroke="#241C15"
        strokeWidth="0.8"
        opacity="0.3"
      />
    </CoverShell>
  );
};

export default DistillCover;
