/**
 * جلد DeepSpeed
 *
 * استعاره: یک مدل بسیار بزرگ ← به ۴ بخش تقسیم و روی ۴ مربع GPU پخش می‌شود.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - بالا-چپ: یک حباب بزرگ «Model 70B» (cream + حاشیه ink، stamp)
 *   - مرکز: ۴ منحنی از مدل بزرگ باز می‌شوند
 *   - پایین-راست: ۴ مربع GPU (coral / butter / teal / pop)، در هر کدام یک مربع کوچک ۱/۴ نشان‌دهنده «سهم خودش»
 *   - بالا-راست: stamp فشرده‌سازی «÷4»
 *   - پایین-چپ: تزئین mono با ZeRO
 *
 * hover: ۴ مربع GPU هر کدام کمی به بیرون شناور می‌شوند، dash روان خطوط بادبزنی سریع‌تر می‌شود.
 */
import React from "react";
import CoverShell from "./CoverShell";

const GPU_BOXES = [
  { x: 218, y: 60, color: "#E07A5F", piece: 0 }, // coral · GPU0 تکه ۰ را نگه می‌دارد
  { x: 268, y: 60, color: "#E5BD3A", piece: 1 }, // butter · GPU1
  { x: 218, y: 120, color: "#1B4B5A", piece: 2 }, // teal · GPU2
  { x: 268, y: 120, color: "#FF4D74", piece: 3 }, // pop · GPU3
];

const MODEL = { x: 78, y: 88 };

const DeepspeedCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* stamp ÷4 بالا-راست */}
      <g
        transform="translate(286,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
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
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          ÷ 4
        </text>
      </g>

      {/* برچسب کوچک بالا-چپ ZeRO-3 */}
      <g transform="translate(60,30)">
        <rect
          x="-30"
          y="-9"
          width="60"
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
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          ZeRO-3
        </text>
      </g>

      {/* پایین-چپ: تزئین mono با DeepSpeed */}
      <g transform="translate(28,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="90"
          height="14"
          rx="3"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="42"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          P + G + S → P/N
        </text>
      </g>

      {/* حباب بزرگ «Model 70B» در مرکز */}
      <g
        transform={`translate(${MODEL.x},${MODEL.y})`}
        className="origin-center transition-transform duration-500 group-hover:-translate-x-1"
      >
        {/* حباب cream بیرونی */}
        <rect
          x="-38"
          y="-30"
          width="76"
          height="60"
          rx="14"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* ۴ بخش روی هم در داخل = مدل کامل */}
        <rect x="-30" y="-22" width="60" height="10" rx="2" fill="#E07A5F" stroke="#241C15" strokeWidth="1.2" />
        <rect x="-30" y="-10" width="60" height="10" rx="2" fill="#E5BD3A" stroke="#241C15" strokeWidth="1.2" />
        <rect x="-30" y="2" width="60" height="10" rx="2" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.2" />
        <rect x="-30" y="14" width="60" height="10" rx="2" fill="#FF4D74" stroke="#241C15" strokeWidth="1.2" />
        {/* برچسب */}
        <text
          x="0"
          y="-36"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#241C15"
        >
          Model 70B
        </text>
      </g>

      {/* ۴ خط اتصال بادبزنی: از مدل ← ۴ GPU */}
      <g
        stroke="#241C15"
        strokeWidth="1.4"
        strokeDasharray="3 3"
        opacity="0.45"
        className="transition-opacity duration-400 group-hover:opacity-80"
      >
        {GPU_BOXES.map((g, i) => (
          <line
            key={`l-${i}`}
            x1={MODEL.x + 38}
            y1={MODEL.y + (i - 1.5) * 6}
            x2={g.x - 14}
            y2={g.y}
          />
        ))}
      </g>

      {/* گره قیف کوچک وسط */}
      <g transform="translate(160,90)">
        <circle r="7.5" fill="#241C15" stroke="#241C15" strokeWidth="1.5" />
        <text
          y="2.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#F4D35E"
        >
          ZeRO
        </text>
      </g>

      {/* ۴ مربع GPU · در هر کدام ۴ خانه، خانه خودش پررنگ و بقیه کم‌رنگ */}
      {GPU_BOXES.map((g, i) => (
        <g
          key={`gpu-${i}`}
          transform={`translate(${g.x},${g.y})`}
          className="origin-center transition-transform duration-500"
          style={{
            transformOrigin: `${g.x}px ${g.y}px`,
          }}
        >
          {/* قاب بیرونی */}
          <rect
            x="-22"
            y="-22"
            width="44"
            height="44"
            rx="6"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          {/* ۴ خانه داخلی */}
          {[0, 1, 2, 3].map((idx) => {
            const cx = (idx % 2) * 18 - 18;
            const cy = Math.floor(idx / 2) * 18 - 18;
            const own = idx === g.piece;
            return (
              <rect
                key={idx}
                x={cx + 1}
                y={cy + 1}
                width="16"
                height="16"
                rx="2"
                fill={own ? g.color : "#FBEFE3"}
                stroke="#241C15"
                strokeWidth={own ? 1.4 : 0.9}
                opacity={own ? 1 : 0.5}
              />
            );
          })}
          {/* شماره GPU */}
          <text
            y="-28"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fontWeight="700"
            fill="#241C15"
          >
            GPU{i}
          </text>
        </g>
      ))}

      {/* caption پایین */}
      <text
        x="160"
        y="195"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        big model → 1/N per GPU
      </text>
    </CoverShell>
  );
};

export default DeepspeedCover;
