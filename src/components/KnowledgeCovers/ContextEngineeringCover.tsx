/**
 * جلد Context Engineering
 *
 * استعاره: مدل در هر بار کار فقط می‌تواند یک «سینی پنجره محدود» را ببیند. یک دسته کارت اطلاعات کاندید در سمت چپ چیده شده،
 *       کسی چند کارت پرسیگنال را برداشته در سینی می‌گذارد و بقیه حذف می‌شوند. موضوع همین است: «کدام‌ها را داخل بگذاریم».
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: یک دسته کارت اطلاعات کاندید (نوارهای کوچک خاکستری-سفید) که دو تای آن‌ها انتخاب شده و به راست می‌روند
 *   - راست: سینی پنجره با حاشیه teal که ۳ کارت رنگی انتخاب‌شده مرتب در آن قرار دارند
 *   - وسط: فلش انتخاب + یک کارت حذف‌شده با علامت ضربدر
 *   - hover: کارت‌های انتخاب‌شده آرام وارد سینی می‌شوند، sparkle می‌چرخد
 *
 * عمداً متمایز از ContextWindowCover (پنجره افقی + ورود قرص‌های token):
 *   - این یکی بر عمل «انتخاب» تأکید دارد (دسته کاندید ← فیلتر ← سینی)، آن یکی بر «پر شدن پنجره»
 *   - رنگ اصلی این یکی پس‌زمینه گرم coral است، آن یکی butter
 */
import React from "react";
import CoverShell from "./CoverShell";

const ContextEngineeringCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-coral/10" dotOpacity={0.08}>
      {/* دسته کارت اطلاعات کاندید در چپ */}
      <g transform="translate(26,58)">
        <text x="0" y="-8" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          CANDIDATES
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${i * 3},${i * 17})`}>
            <rect x="0" y="0" width="66" height="13" rx="3" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" />
            <rect x="5" y="5" width={40 - i * 5} height="3" rx="1.5" fill="#241C15" opacity="0.35" />
          </g>
        ))}
      </g>

      {/* فلش انتخاب */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M 104 78 Q 134 70 162 70" strokeDasharray="4 4" />
        <path d="M 156 66 L 164 70 L 156 74" strokeLinejoin="round" />
      </g>

      {/* کارت حذف‌شده (ضربدر خورده) */}
      <g transform="translate(120,128)">
        <rect x="0" y="0" width="44" height="13" rx="3" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" opacity="0.55" />
        <g stroke="#E07A5F" strokeWidth="2.2" strokeLinecap="round">
          <line x1="14" y1="2" x2="30" y2="11" />
          <line x1="30" y1="2" x2="14" y2="11" />
        </g>
      </g>

      {/* سینی پنجره در راست */}
      <g transform="translate(176,44)">
        {/* برچسب */}
        <rect x="0" y="-2" width="92" height="14" rx="3" fill="#241C15" />
        <text x="46" y="8" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#FBEFE3">
          CONTEXT
        </text>

        {/* سایه سینی + قاب بیرونی */}
        <rect x="0" y="20" width="118" height="104" rx="10" fill="#241C15" opacity="0.85" transform="translate(3,3)" />
        <rect x="0" y="20" width="118" height="104" rx="10" fill="#FBEFE3" stroke="#1B4B5A" strokeWidth="2.5" />

        {/* ۳ کارت رنگی انتخاب‌شده */}
        <SelCard y={32} fill="#1B4B5A" label="دستور سیستم" text="#FBEFE3" hover="group-hover:-translate-y-0.5" />
        <SelCard y={62} fill="#F4D35E" label="اطلاعات انتخاب‌شده" text="#241C15" hover="group-hover:translate-y-0.5" />
        <SelCard y={92} fill="#FF4D74" label="سؤال فعلی" text="#FBEFE3" hover="group-hover:-translate-y-0.5" />
      </g>

      {/* تزئین: sparkle بالا-راست */}
      <g transform="translate(292,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z" fill="#F4D35E" stroke="#241C15" strokeWidth="1.3" />
        </g>
      </g>
    </CoverShell>
  );
};

const SelCard: React.FC<{ y: number; fill: string; label: string; text: string; hover: string }> = ({
  y,
  fill,
  label,
  text,
  hover,
}) => (
  <g transform={`translate(10,${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hover}`}>
      <rect x="0" y="0" width="98" height="22" rx="5" fill={fill} stroke="#241C15" strokeWidth="2" />
      <text x="49" y="15" textAnchor="middle" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="11" fontWeight="700" fill={text}>
        {label}
      </text>
    </g>
  </g>
);

export default ContextEngineeringCover;
