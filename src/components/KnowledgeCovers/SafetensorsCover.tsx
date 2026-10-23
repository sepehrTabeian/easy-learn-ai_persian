/**
 * جلد Safetensors
 *
 * استعاره: یک «جعبه امن» قفل‌شده که فقط عدد (وزن‌ها) در آن است، نه کد.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز: یک جعبه فایل با قفل که روی بدنه آن اعداد تنسور چیده شده
 *   - بالا-راست: stamp سپر «.safetensors»
 *   - پایین-چپ: pickle خط‌خورده «<code/>» یعنی کد اجرا نمی‌شود
 */
import React from "react";
import CoverShell from "./CoverShell";

const SafetensorsCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-teal/10" dotOpacity={0.07}>
      {/* بدنه جعبه */}
      <g transform="translate(160,108)">
        <rect
          x="-72"
          y="-44"
          width="144"
          height="88"
          rx="10"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.4"
          className="transition-transform duration-500 group-hover:-translate-y-1"
        />
        {/* خط جداکننده درِ جعبه */}
        <line x1="-72" y1="-22" x2="72" y2="-22" stroke="#241C15" strokeWidth="1.6" opacity="0.5" />

        {/* قفل */}
        <g transform="translate(0,-22)" className="origin-center transition-transform duration-500 group-hover:scale-110">
          <rect x="-13" y="-2" width="26" height="20" rx="4" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
          <path d="M -7 -2 V -8 a 7 7 0 0 1 14 0 V -2" fill="none" stroke="#241C15" strokeWidth="2.2" />
          <circle cx="0" cy="8" r="2.6" fill="#F4D35E" />
        </g>

        {/* ردیف‌های عدد داخل جعبه (وزن‌ها) */}
        <g fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#241C15" opacity="0.6">
          <text x="-58" y="6">0.182</text>
          <text x="-20" y="6">−0.47</text>
          <text x="22" y="6">0.913</text>
          <text x="-58" y="22">−0.05</text>
          <text x="-20" y="22">0.640</text>
          <text x="22" y="22">−0.31</text>
          <text x="-58" y="38">0.778</text>
          <text x="-20" y="38">−0.92</text>
          <text x="22" y="38">0.224</text>
        </g>
      </g>

      {/* بالا-راست: stamp سپر */}
      <g transform="translate(280,30) rotate(8)" className="origin-center transition-transform duration-500 group-hover:rotate-0">
        <rect x="-30" y="-12" width="60" height="24" rx="5" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.8" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          fill="#FBEFE3"
        >
          .safetensors
        </text>
      </g>

      {/* پایین-چپ: code خط‌خورده (کد اجرا نمی‌شود) */}
      <g transform="translate(36,176) rotate(-4)">
        <rect x="-6" y="-11" width="62" height="18" rx="4" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" />
        <text
          x="25"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
          opacity="0.45"
        >
          &lt;code/&gt;
        </text>
        <line x1="-3" y1="-2" x2="53" y2="0" stroke="#E07A5F" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </CoverShell>
  );
};

export default SafetensorsCover;
