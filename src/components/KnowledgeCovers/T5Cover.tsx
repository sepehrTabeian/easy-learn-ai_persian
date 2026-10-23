/**
 * جلد T5
 *
 * استعاره: کادر encoder (چپ) + کادر decoder (راست) + رشته فلش‌های cross-attention در وسط.
 * پایین-چپ مهر کوچک پیشوند «translate English to German:»، بالا-راست نمایش تبدیل «That is good.» ← «Das ist gut.».
 *
 * تمایز با transformer cover (پشته ۴ لایه + chipهای Q/K/V + کمان‌های token):
 *   ─ transformer یعنی «self-attention · تفکیک سه‌گانه Q/K/V»
 *   ─ این‌جا یعنی «encoder ↔ decoder · text-to-text · پیشوند چندوظیفه‌ای»
 *
 * تمایز با bert cover (یک جمله + [MASK] + top-3 کاندید):
 *   ─ bert تصویر mask تک token است
 *   ─ این‌جا دو کادر encoder-decoder + تصویر تبدیل رشته است
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   ─ stamp بالا-چپ «2019 · arXiv 1910.10683» (pill افقی teal)
 *   ─ در بالا یک ردیف جریان chip پیشوند وظیفه (۴ عدد)
 *   ─ مرکز متمایل به چپ: کادر encoder (پشته ۴ لایه · حاشیه teal)
 *   ─ مرکز متمایل به راست: کادر decoder (پشته ۴ لایه · حاشیه coral)
 *   ─ وسط: ۳ فلش dash برای cross-attention (encoder ← decoder)
 *   ─ پایین: تبدیل رشته «That is good.» ← «Das ist gut.»
 */
import React from "react";
import CoverShell from "./CoverShell";

const TASK_CHIPS = ["translate:", "summarize:", "cola:", "stsb:"];

const T5Cover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* stamp بالا-چپ: T5 + شماره مقاله */}
      <g
        transform="translate(54,24) rotate(-5)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2"
      >
        <rect
          x="-44"
          y="-11"
          width="88"
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
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="1.1"
          fill="#FBEFE3"
        >
          2019 · 1910.10683
        </text>
      </g>

      {/* سمت راست بالا: chipهای پیشوند وظیفه در یک ردیف (۴ عدد) */}
      <g transform="translate(166,18)">
        {TASK_CHIPS.map((label, i) => (
          <g
            key={label}
            transform={`translate(${i * 36}, 0)`}
            className="origin-center transition-transform duration-500 group-hover:translate-y-[-1px]"
          >
            <rect
              x="0"
              y="0"
              width="34"
              height="13"
              rx="3"
              fill={i === 0 ? "#F4D35E" : "#FFFFFF"}
              stroke="#241C15"
              strokeWidth="1.4"
            />
            <text
              x="17"
              y="9"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="7"
              fontWeight="700"
              fill="#241C15"
              letterSpacing="0.3"
            >
              {label}
            </text>
          </g>
        ))}
      </g>

      {/* کادر encoder (چپ) */}
      <g transform="translate(36,58)">
        {/* کادر */}
        <rect
          x="0"
          y="0"
          width="98"
          height="92"
          rx="8"
          fill="#FFFFFF"
          stroke="#1B4B5A"
          strokeWidth="2"
        />
        <text
          x="49"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          fill="#1B4B5A"
          letterSpacing="1"
        >
          ENCODER
        </text>
        {/* پشته ۴ لایه */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect
            key={`e-${i}`}
            x="10"
            y={22 + i * 16}
            width="78"
            height="12"
            rx="2.5"
            fill={i % 2 === 0 ? "#FBEFE3" : "#FFFFFF"}
            stroke="#241C15"
            strokeWidth="1.2"
          />
        ))}
        <text
          x="49"
          y="86"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.5"
        >
          attention دوطرفه
        </text>
      </g>

      {/* کادر decoder (راست) */}
      <g transform="translate(186,58)">
        <rect
          x="0"
          y="0"
          width="98"
          height="92"
          rx="8"
          fill="#FFFFFF"
          stroke="#E07A5F"
          strokeWidth="2"
        />
        <text
          x="49"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          fill="#E07A5F"
          letterSpacing="1"
        >
          DECODER
        </text>
        {Array.from({ length: 4 }).map((_, i) => (
          <rect
            key={`d-${i}`}
            x="10"
            y={22 + i * 16}
            width="78"
            height="12"
            rx="2.5"
            fill={i % 2 === 0 ? "#FBEFE3" : "#FFFFFF"}
            stroke="#241C15"
            strokeWidth="1.2"
          />
        ))}
        <text
          x="49"
          y="86"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.5"
        >
          mask علّی + cross-attn
        </text>
      </g>

      {/* cross-attention: ۳ فلش dash از encoder ← decoder */}
      {[0, 1, 2].map((i) => {
        const y = 70 + i * 22;
        return (
          <g key={`x-${i}`}>
            <line
              x1="134"
              y1={y}
              x2="186"
              y2={y}
              stroke="#241C15"
              strokeWidth="1.4"
              strokeDasharray="3 2"
              className="animate-dash-flow"
            />
            <polygon
              points={`184,${y - 3} 188,${y} 184,${y + 3}`}
              fill="#241C15"
            />
          </g>
        );
      })}
      <text
        x="160"
        y="138"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="7"
        fontWeight="700"
        fill="#88837C"
        letterSpacing="0.5"
      >
        cross-attention
      </text>

      {/* پایین: نمونه تبدیل رشته */}
      <g transform="translate(0,168)">
        {/* ورودی */}
        <rect
          x="22"
          y="0"
          width="118"
          height="22"
          rx="4"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="81"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="0.3"
        >
          That is good.
        </text>

        {/* فلش */}
        <line
          x1="142"
          y1="11"
          x2="176"
          y2="11"
          stroke="#E07A5F"
          strokeWidth="1.6"
          strokeDasharray="3 2"
          className="animate-dash-flow"
        />
        <polygon points="174,7 178,11 174,15" fill="#E07A5F" />

        {/* خروجی */}
        <rect
          x="180"
          y="0"
          width="118"
          height="22"
          rx="4"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="239"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="0.3"
        >
          Das ist gut.
        </text>
      </g>

      {/* برچسب کوچک پایین-چپ: text-to-text */}
      <g transform="translate(56,196) rotate(-2)" className="origin-left">
        <rect
          x="-2"
          y="-9"
          width="100"
          height="12"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="48"
          y="0"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#F4D35E"
        >
          text-to-text framework
        </text>
      </g>
    </CoverShell>
  );
};

export default T5Cover;
