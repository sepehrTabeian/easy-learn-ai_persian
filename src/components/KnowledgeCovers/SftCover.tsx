/**
 * جلد SFT
 *
 * استعاره: در چپ جفت کارت‌های (Q, A) مثل نوار نقاله یکی‌یکی بلعیده می‌شوند ← در مرکز توپ مدل base است ←
 *   توپ با <|im_start|>...<|im_end|> chat-template "روکش" پوشانده می‌شود ← در راست به مدل chat تبدیل می‌شود که می‌تواند گفتگو کند
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: ۳ کارت (Q, A) روی هم، با برچسب instruction · response
 *   - وسط: توپ مدل base (دایره teal) + special tokenهای ChatML دور آن (برچسب‌های coral)
 *   - راست: حباب chat، داخل آن ✓ + یک خط پاسخ
 *   - stamp بالا:"→ chat model"
 *   - caption پایین:"base + (q,a) × N"
 *
 * hover：
 *   - صف کارت‌ها یک گام جلو می‌رود
 *   - برچسب chat-template کمی می‌چرخد (حس سفت شدن روکش)
 *   - حباب راست 1px کمی بالا می‌رود
 */
import React from "react";
import CoverShell from "./CoverShell";

const SftCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter-soft" dotOpacity={0.08}>
      {/* stamp بالا · → chat */}
      <g
        transform="translate(258,28) rotate(7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-34"
          y="-11"
          width="68"
          height="22"
          rx="11"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
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
          → chat
        </text>
      </g>

      {/* stamp بالا-چپ · base */}
      <g
        transform="translate(38,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2"
      >
        <rect
          x="-26"
          y="-10"
          width="52"
          height="20"
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
          fontWeight="700"
          letterSpacing="1.2"
          fill="#FBEFE3"
        >
          BASE
        </text>
      </g>

      {/* پایین-چپ: caption */}
      <text
        x="38"
        y="188"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fontWeight="600"
        fill="#88837C"
      >
        base + (q, a) × N
      </text>

      {/* === چپ: صف کارت‌های (Q, A) === */}
      {/* کارت ۳ (دورترین · نیمه‌شفاف) */}
      <g
        transform="translate(34,100) rotate(-3)"
        opacity="0.45"
        className="transition-transform duration-500 group-hover:translate-x-2"
      >
        <rect
          x="-22"
          y="-22"
          width="44"
          height="44"
          rx="5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
        />
      </g>

      {/* کارت ۲ (وسط · نیمه‌شفاف) */}
      <g
        transform="translate(46,98) rotate(2)"
        opacity="0.7"
        className="transition-transform duration-500 group-hover:translate-x-2"
      >
        <rect
          x="-24"
          y="-24"
          width="48"
          height="48"
          rx="5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.6"
        />
      </g>

      {/* کارت ۱ (جلو · کامل) */}
      <g
        transform="translate(62,95)"
        className="origin-center transition-transform duration-500 group-hover:translate-x-3"
      >
        <rect
          x="-28"
          y="-28"
          width="56"
          height="56"
          rx="6"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* ردیف Q */}
        <text
          x="-22"
          y="-15"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#E07A5F"
          letterSpacing="0.5"
        >
          Q
        </text>
        <line x1="-12" y1="-16" x2="22" y2="-16" stroke="#241C15" strokeWidth="1.1" />
        <line x1="-12" y1="-10" x2="14" y2="-10" stroke="#241C15" strokeWidth="1.1" opacity="0.6" />
        {/* ردیف A */}
        <text
          x="-22"
          y="5"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#1B4B5A"
          letterSpacing="0.5"
        >
          A
        </text>
        <line x1="-12" y1="4" x2="22" y2="4" stroke="#241C15" strokeWidth="1.1" />
        <line x1="-12" y1="10" x2="18" y2="10" stroke="#241C15" strokeWidth="1.1" opacity="0.6" />
        <line x1="-12" y1="16" x2="20" y2="16" stroke="#241C15" strokeWidth="1.1" opacity="0.6" />
      </g>

      {/* === فلش جریان: کارت ← توپ base === */}
      <g
        stroke="#E07A5F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
        className="animate-dash-flow"
      >
        <path d="M 95 100 L 138 100" />
      </g>
      <polygon points="138,96 146,100 138,104" fill="#E07A5F" />

      {/* === مرکز: توپ مدل base + پوشش chat template === */}
      {/* روکش · <|im_start|> برچسب چپ */}
      <g
        transform="translate(160,68)"
        className="origin-bottom transition-transform duration-500 group-hover:translate-y-[-3px]"
      >
        <rect
          x="-30"
          y="-9"
          width="60"
          height="18"
          rx="3"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          {"<|im_start|>"}
        </text>
      </g>

      {/* توپ base */}
      <g
        transform="translate(160,108)"
        className="origin-center transition-transform duration-500 group-hover:scale-105"
      >
        <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
        <circle cx="-7" cy="-7" r="6" fill="#F4D35E" stroke="#241C15" strokeWidth="1.4" opacity="0.85" />
        <circle cx="6" cy="4" r="4.5" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.4" opacity="0.85" />
        <circle cx="-4" cy="8" r="3" fill="#E07A5F" stroke="#241C15" strokeWidth="1.2" opacity="0.85" />
        <text
          y="22"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="10"
          fontWeight="800"
          fill="#241C15"
        >
          model
        </text>
      </g>

      {/* روکش · <|im_end|> برچسب راست */}
      <g
        transform="translate(160,148)"
        className="origin-top transition-transform duration-500 group-hover:translate-y-[3px]"
      >
        <rect
          x="-28"
          y="-9"
          width="56"
          height="18"
          rx="3"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          {"<|im_end|>"}
        </text>
      </g>

      {/* === وسط ← راست: فلش جریان reward === */}
      <g
        stroke="#241C15"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
        className="animate-dash-flow"
        opacity="0.6"
      >
        <path d="M 198 108 L 232 108" />
      </g>
      <polygon points="232,104 240,108 232,112" fill="#241C15" opacity="0.7" />

      {/* === راست: حباب chat === */}
      <g
        transform="translate(272,108)"
        className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
      >
        {/* بدنه حباب */}
        <rect
          x="-32"
          y="-26"
          width="64"
          height="52"
          rx="8"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* دم حباب */}
        <polygon
          points="-32,16 -38,24 -28,12"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* ✓ + متن جای‌نگهدار */}
        <circle cx="-22" cy="-14" r="4.5" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.4" />
        <path
          d="M -25 -14 L -23 -12 L -19 -16"
          stroke="#FBEFE3"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="-14" y1="-15" x2="22" y2="-15" stroke="#241C15" strokeWidth="1.2" />
        <line x1="-22" y1="-3" x2="22" y2="-3" stroke="#241C15" strokeWidth="1.2" opacity="0.7" />
        <line x1="-22" y1="6" x2="14" y2="6" stroke="#241C15" strokeWidth="1.2" opacity="0.7" />
        <line x1="-22" y1="15" x2="20" y2="15" stroke="#241C15" strokeWidth="1.2" opacity="0.4" />
      </g>
    </CoverShell>
  );
};

export default SftCover;
