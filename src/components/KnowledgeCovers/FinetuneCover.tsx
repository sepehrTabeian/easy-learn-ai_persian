/**
 * جلد Finetune
 *
 * استعاره: مربع بزرگ base با «W» بی‌حرکت است و کنار آن یک جفت ماتریس باریک «B»×«A» موازی قرار دارد —— این هسته هندسی LoRA است.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز متمایل به چپ: مربع بزرگ W (ink تیره) + stamp «منجمد»
 *   - مرکز متمایل به راست: علامت + ← B (مربع باریک و بلند coral) × A (مربع باریک و پهن teal) ← کل گروه با outline به رنگ butter احاطه شده
 *   - تزئین بالا: سه chip شناور «LoRA · QLoRA · DoRA»
 *   - بالا-راست: stamp کاهش پارامتر «↓99.6%»
 *   - پایین: پانویس mono با rank=8
 *
 * hover: B و A کمی به بیرون رانده می‌شوند (یعنی قابل تفکیک‌اند)، W ثابت می‌ماند + chipها به ترتیب جابه‌جا می‌شوند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const FinetuneCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter-soft" dotOpacity={0.08}>
      {/* تزئین بالا: ۳ chip روش در یک ردیف افقی */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fontWeight="700"
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        {[
          { x: 30, label: "LoRA", fill: "#241C15", textFill: "#F4D35E" },
          { x: 82, label: "QLoRA", fill: "#FBEFE3", textFill: "#241C15" },
          { x: 138, label: "DoRA", fill: "#E07A5F", textFill: "#FBEFE3" },
        ].map((c) => (
          <g key={c.label} transform={`translate(${c.x},22)`}>
            <rect
              x="-2"
              y="-9"
              width={c.label.length * 7 + 8}
              height="16"
              rx="8"
              fill={c.fill}
              stroke="#241C15"
              strokeWidth="1.5"
            />
            <text
              x={(c.label.length * 7) / 2 + 2}
              y="2"
              textAnchor="middle"
              fill={c.textFill}
            >
              {c.label}
            </text>
          </g>
        ))}
      </g>

      {/* بالا-راست: stamp فشرده‌سازی پارامتر */}
      <g
        transform="translate(280,30) rotate(-10)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-12"
          width="56"
          height="24"
          rx="5"
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
          ↓99.6%
        </text>
      </g>

      {/* === تصویر اصلی مرکز: W + B × A === */}
      {/* مربع بزرگ W · base منجمد */}
      <g
        transform="translate(80,108)"
        className="transition-transform duration-500"
      >
        <rect
          x="-32"
          y="-32"
          width="64"
          height="64"
          rx="5"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* طرح زمینه شبکه‌ای */}
        <g stroke="#FBEFE3" strokeWidth="0.6" opacity="0.25">
          {[-20, -8, 4, 16].map((v) => (
            <g key={`grid-${v}`}>
              <line x1="-32" y1={v} x2="32" y2={v} />
              <line x1={v} y1="-32" x2={v} y2="32" />
            </g>
          ))}
        </g>
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontFamily="Smiley Sans, sans-serif"
          fontSize="24"
          fontWeight="800"
          fill="#FBEFE3"
        >
          W
        </text>
        {/* stamp منجمد */}
        <g transform="translate(28,-28) rotate(8)">
          <rect
            x="-10"
            y="-7"
            width="20"
            height="14"
            rx="3"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontFamily="Smiley Sans, sans-serif"
            fontSize="9"
            fontWeight="800"
            fill="#241C15"
          >
            منجمد
          </text>
        </g>
      </g>

      {/* علامت + */}
      <text
        x="138"
        y="115"
        textAnchor="middle"
        fontFamily="Smiley Sans, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#241C15"
        opacity="0.5"
      >
        +
      </text>

      {/* مسیر جانبی LoRA: outline بزرگ butter دور B × A */}
      <g
        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        {/* حلقه بیرونی */}
        <rect
          x="156"
          y="76"
          width="124"
          height="64"
          rx="14"
          fill="#FBE891"
          stroke="#241C15"
          strokeWidth="2"
          opacity="0.4"
        />
        <text
          x="218"
          y="74"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="1.4"
        >
          LoRA · این‌جا آموزش می‌بیند
        </text>

        {/* ماتریس B: باریک و بلند coral */}
        <g
          transform="translate(178,108)"
          className="transition-transform duration-500 ease-out group-hover:-translate-x-1"
        >
          <rect
            x="-9"
            y="-26"
            width="18"
            height="52"
            rx="3"
            fill="#E07A5F"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <g stroke="#FBEFE3" strokeWidth="0.5" opacity="0.5">
            {[-14, -2, 10].map((v) => (
              <line key={v} x1="-9" y1={v} x2="9" y2={v} />
            ))}
          </g>
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Smiley Sans, sans-serif"
            fontSize="14"
            fontWeight="800"
            fill="#FBEFE3"
          >
            B
          </text>
          <text
            x="0"
            y="38"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fill="#241C15"
            opacity="0.7"
          >
            d×r
          </text>
        </g>

        {/* علامت × */}
        <text
          x="208"
          y="113"
          textAnchor="middle"
          fontFamily="Smiley Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#241C15"
          opacity="0.55"
        >
          ×
        </text>

        {/* ماتریس A: باریک و پهن teal */}
        <g
          transform="translate(244,108)"
          className="transition-transform duration-500 ease-out group-hover:translate-x-1"
        >
          <rect
            x="-26"
            y="-9"
            width="52"
            height="18"
            rx="3"
            fill="#1B4B5A"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <g stroke="#FBEFE3" strokeWidth="0.5" opacity="0.5">
            {[-14, -2, 10].map((v) => (
              <line key={v} x1={v} y1="-9" x2={v} y2="9" />
            ))}
          </g>
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Smiley Sans, sans-serif"
            fontSize="14"
            fontWeight="800"
            fill="#FBEFE3"
          >
            A
          </text>
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fill="#241C15"
            opacity="0.7"
          >
            r×d
          </text>
        </g>
      </g>

      {/* پانویس mono پایین */}
      <g transform="translate(160,176)">
        <rect
          x="-58"
          y="-9"
          width="116"
          height="16"
          rx="8"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="2.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.4"
          fill="#F4D35E"
        >
          r = 8 · آموزش 0.4%
        </text>
      </g>
    </CoverShell>
  );
};

export default FinetuneCover;
