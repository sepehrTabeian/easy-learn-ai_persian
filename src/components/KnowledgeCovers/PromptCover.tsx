/**
 * جلد Prompt
 *
 * استعاره: Prompt = دستوری که انسان برای مدل می‌فرستد.
 *   در چپ یک حباب گفتگو که در آن یک خط متن دستور + نشانگر چشمک‌زن تایپ شده؛
 *   در وسط یک فلش این جمله را می‌فرستد؛
 *   در راست مربع مدل (با نوشته AI) که پس از دریافت روشن می‌شود.
 *
 * رنگ‌بندی: رنگ اصلی teal (متمایز از سایت‌های هم‌خانواده) + حباب cream + نقطه‌های butter/coral.
 * hover: حباب آرام بالا می‌رود، فلش کمی به راست رانده می‌شود، مربع مدل کمی بزرگ می‌شود.
 */
import React from "react";
import CoverShell from "./CoverShell";

const PromptCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-teal/10" dotOpacity={0.08}>
      {/* تزئین: نقطه‌های ستاره و علامت سؤال کوچک بالا-راست */}
      <g transform="translate(288,34)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-45">
          <path
            d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* چپ: حباب گفتگو (prompt که شما تایپ کرده‌اید) */}
      <g
        transform="translate(30,52)"
        className="transition-transform duration-500 ease-spring group-hover:-translate-y-1.5"
      >
        {/* زیرسایه */}
        <rect x="3" y="3" width="138" height="86" rx="16" fill="#241C15" opacity="0.85" />
        {/* بدنه حباب */}
        <rect x="0" y="0" width="138" height="86" rx="16" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" />
        {/* دم کوچک حباب */}
        <path d="M 22 84 L 22 100 L 40 86 Z" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" strokeLinejoin="round" />
        {/* برچسب PROMPT */}
        <text x="14" y="22" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="#1B4B5A">
          PROMPT
        </text>
        {/* خط متن دستور */}
        <text x="14" y="44" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="11" fontWeight="700" fill="#241C15">
          برایم یک
        </text>
        <text x="14" y="62" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="11" fontWeight="700" fill="#241C15">
          ایمیل درخواست مرخصی بنویس
        </text>
        {/* نشانگر چشمک‌زن */}
        <rect x="76" y="52" width="2.5" height="13" fill="#E07A5F" className="animate-pulse-dot" />
      </g>

      {/* وسط: فلش (ارسال) */}
      <g
        transform="translate(178,95)"
        className="transition-transform duration-500 ease-spring group-hover:translate-x-2"
      >
        <line x1="0" y1="0" x2="42" y2="0" stroke="#241C15" strokeWidth="3" strokeLinecap="round" />
        <path d="M 36 -7 L 48 0 L 36 7 Z" fill="#E07A5F" stroke="#241C15" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* راست: مربع مدل */}
      <g transform="translate(238,58)">
        <g
          className="origin-center transition-transform duration-400 ease-spring group-hover:scale-105"
          style={{ transformBox: "fill-box" }}
        >
          {/* زیرسایه */}
          <rect x="3" y="3" width="66" height="74" rx="14" fill="#241C15" opacity="0.85" />
          {/* بدنه اصلی */}
          <rect x="0" y="0" width="66" height="74" rx="14" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
          {/* برچسب AI */}
          <text
            x="33"
            y="34"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="17"
            fontWeight="700"
            letterSpacing="1"
            fill="#FBEFE3"
          >
            AI
          </text>
          {/* caption مدل */}
          <text
            x="33"
            y="50"
            textAnchor="middle"
            fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif"
            fontSize="8.5"
            fontWeight="700"
            fill="#F4D35E"
          >
            مدل بزرگ
          </text>
          {/* سه نقطه کوچک خروجی (شروع به پاسخ می‌کند) */}
          <g transform="translate(33,62)">
            <circle cx="-8" cy="0" r="2.4" fill="#FBEFE3" />
            <circle cx="0" cy="0" r="2.4" fill="#FBEFE3" />
            <circle cx="8" cy="0" r="2.4" fill="#FBEFE3" />
          </g>
        </g>
      </g>
    </CoverShell>
  );
};

export default PromptCover;
