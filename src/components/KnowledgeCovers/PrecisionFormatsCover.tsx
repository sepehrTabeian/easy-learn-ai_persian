/**
 * جلد PrecisionFormats (فرمت‌های دقت مدل بزرگ)
 *
 * استعاره: یک عدد π با خانه‌هایی با تعداد بیت مختلف ذخیره می‌شود —— هرچه خانه کمتر، ذخیره «گردتر» است.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چهار ردیف «نوار خانه‌های بیت» FP32 / BF16 / FP16 / FP8، با طول کاهشی
 *   - هر نوار سه بخش رنگی دارد: علامت (ink) / توان (coral) / مانتیس (butter-deep)
 *   - راست: تقریب ذخیره‌شده π با تغییر فرمت زمخت‌تر می‌شود
 */
import React from "react";
import CoverShell from "./CoverShell";

type Bar = { name: string; sign: number; exp: number; mant: number };

const BARS: Bar[] = [
  { name: "FP32", sign: 1, exp: 8, mant: 23 },
  { name: "BF16", sign: 1, exp: 8, mant: 7 },
  { name: "FP16", sign: 1, exp: 5, mant: 10 },
  { name: "FP8", sign: 1, exp: 4, mant: 3 },
];

const CELL = 5.2; // عرض پیکسلی هر بیت
const GAP = 1.2;

const PrecisionFormatsCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-coral/10" dotOpacity={0.07}>
      {BARS.map((b, row) => {
        const y = 36 + row * 38;
        const cells: string[] = [
          ...Array(b.sign).fill("#241C15"),
          ...Array(b.exp).fill("#E07A5F"),
          ...Array(b.mant).fill("#E5BD3A"),
        ];
        return (
          <g key={b.name} transform={`translate(28,${y})`}>
            {/* نام فرمت */}
            <text
              x="0"
              y="9"
              fontFamily="Geist Mono, monospace"
              fontSize="9.5"
              fontWeight="700"
              fill="#241C15"
            >
              {b.name}
            </text>
            {/* خانه بیت */}
            <g
              transform="translate(38,0)"
              className="origin-left transition-transform duration-500 group-hover:translate-x-1"
            >
              {cells.map((c, i) => (
                <rect
                  key={i}
                  x={i * (CELL + GAP)}
                  y="0"
                  width={CELL}
                  height="13"
                  rx="1.2"
                  fill={c}
                  stroke="#241C15"
                  strokeWidth="0.6"
                />
              ))}
            </g>
          </g>
        );
      })}

      {/* بالا-راست: نقطه‌های راهنما */}
      <g transform="translate(228,24)" fontFamily="Geist Mono, monospace" fontSize="7.5" fill="#241C15">
        <rect x="0" y="-6" width="7" height="7" rx="1.5" fill="#241C15" />
        <text x="11" y="0">علامت</text>
        <rect x="40" y="-6" width="7" height="7" rx="1.5" fill="#E07A5F" />
        <text x="51" y="0">توان</text>
      </g>
      <g transform="translate(228,38)" fontFamily="Geist Mono, monospace" fontSize="7.5" fill="#241C15">
        <rect x="0" y="-6" width="7" height="7" rx="1.5" fill="#E5BD3A" />
        <text x="11" y="0">مانتیس</text>
      </g>

      {/* پایین: stamp گرد کردن π */}
      <g transform="translate(255,176) rotate(-6)" className="origin-center transition-transform duration-500 group-hover:rotate-2">
        <rect x="-50" y="-12" width="100" height="24" rx="5" fill="#241C15" stroke="#241C15" strokeWidth="1.8" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#F4D35E"
        >
          π → 3.14159 → 3.0
        </text>
      </g>
    </CoverShell>
  );
};

export default PrecisionFormatsCover;
