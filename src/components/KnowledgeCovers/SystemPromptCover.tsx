/**
 * جلد System Prompt
 *
 * استعاره: یک «کارت قوانین / پنل تنظیمات» (SYSTEM) که با پونز به بالای گفتگو سنجاق شده،
 *       زیر آن حباب‌های پیام کاربر قرار دارند —— یعنی «system پیش از user است و در ابتدا قوانین را تعیین می‌کند».
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - بالا وسط: کارت قوانین گوشه‌گرد coral، شامل برچسب SYSTEM + سه خط افقی قانون
 *   - بالای کارت: یک نشان پونز (دایره cream + میخ ink)
 *   - زیر کارت: یک حباب user (سفید) + یک حباب پاسخ (butter-tint)، با جابه‌جایی رو به پایین
 *   - تزئین: sparkle بالا-چپ، ring کوچک پایین-راست
 *
 * hover: کارت قوانین آرام بالا می‌رود + پونز کمی می‌چرخد؛ دو حباب با فاصله زمانی پایین می‌روند و «کارت در بالا، پیام‌ها در پایین» را تقویت می‌کنند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const SystemPromptCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle بالا-چپ */}
      <g transform="translate(34,30)">
        <g className="origin-center rotate-[15deg] transition-transform duration-700 group-hover:rotate-[120deg]">
          <path
            d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: ring کوچک پایین-راست */}
      <g transform="translate(292,172)">
        <circle cx="0" cy="0" r="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* ─── لایه پایین: حباب‌های کاربر (اول رسم می‌شوند، بعد کارت قوانین رویشان قرار می‌گیرد) ─── */}
      {/* حباب پاسخ (پایین-چپ، butter-tint) */}
      <g
        transform="translate(56,150)"
        className="transition-transform duration-500 ease-spring group-hover:translate-y-[3px]"
      >
        <rect x="0" y="0" width="118" height="34" rx="9" fill="#241C15" transform="translate(2.5,2.5)" opacity="0.85" />
        <rect x="0" y="0" width="118" height="34" rx="9" fill="#FEF6D3" stroke="#241C15" strokeWidth="2" />
        <line x1="12" y1="13" x2="92" y2="13" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
        <line x1="12" y1="23" x2="66" y2="23" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* حباب user (پایین-راست، سفید) */}
      <g
        transform="translate(190,158)"
        className="transition-transform duration-500 ease-spring group-hover:translate-y-[5px]"
      >
        <rect x="0" y="0" width="78" height="30" rx="9" fill="#241C15" transform="translate(2.5,2.5)" opacity="0.85" />
        <rect x="0" y="0" width="78" height="30" rx="9" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
        <text
          x="12"
          y="19"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1"
          fill="#241C15"
        >
          USER
        </text>
        <circle cx="58" cy="15" r="2" fill="#241C15" opacity="0.4" />
        <circle cx="65" cy="15" r="2" fill="#241C15" opacity="0.4" />
      </g>

      {/* ─── لایه بالا: کارت قوانین (SYSTEM، coral، در بالاترین نقطه سنجاق شده) ─── */}
      <g
        transform="translate(60,46)"
        className="transition-transform duration-500 ease-spring group-hover:-translate-y-[3px]"
      >
        {/* زیرسایه */}
        <rect x="0" y="0" width="200" height="82" rx="13" fill="#241C15" transform="translate(3.5,3.5)" />
        {/* بدنه اصلی */}
        <rect x="0" y="0" width="200" height="82" rx="13" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />

        {/* برچسب SYSTEM */}
        <text
          x="18"
          y="26"
          fontFamily="Geist Mono, monospace"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
          fill="#FBEFE3"
        >
          SYSTEM
        </text>
        {/* برچسب گوشه: شما نمی‌بینید */}
        <g transform="translate(133,14)">
          <rect x="0" y="0" width="52" height="15" rx="7.5" fill="#241C15" />
          <text
            x="26"
            y="11"
            textAnchor="middle"
            fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif"
            fontSize="8"
            fontWeight="700"
            fill="#FBEFE3"
          >
            شما نمی‌بینید
          </text>
        </g>

        {/* سه خط افقی قانون */}
        <line x1="18" y1="44" x2="160" y2="44" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" opacity="0.92" />
        <line x1="18" y1="56" x2="140" y2="56" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" opacity="0.78" />
        <line x1="18" y1="68" x2="100" y2="68" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" opacity="0.62" />
      </g>

      {/* نشان پونز (بالای کارت، کمی چپ‌تر از وسط، در hover کمی می‌چرخد) */}
      <g transform="translate(82,46)">
        <g className="origin-center transition-transform duration-500 ease-spring group-hover:rotate-[18deg]">
          <circle cx="0" cy="0" r="11" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" />
          <circle cx="0" cy="-2" r="4" fill="#FF4D74" stroke="#241C15" strokeWidth="1.8" />
          <line x1="0" y1="2" x2="0" y2="9" stroke="#241C15" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>

      {/* اتصال: از کارت قوانین به پیام‌های پایین (نقطه‌چین کوتاه + فلش) */}
      <g className="transition-opacity duration-500 group-hover:opacity-100" opacity="0.55">
        <line x1="160" y1="132" x2="160" y2="146" stroke="#241C15" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
        <path d="M 156 142 L 160 148 L 164 142" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </CoverShell>
  );
};

export default SystemPromptCover;
