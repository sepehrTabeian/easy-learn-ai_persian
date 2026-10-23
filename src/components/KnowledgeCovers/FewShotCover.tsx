/**
 * جلد Few-shot Learning
 *
 * استعاره: چند کارت نمونه «ورودی ← خروجی» روی هم قرار گرفته‌اند و فلشی آن‌ها را به یک کار جدید خالی در سمت راست (با ?) می‌دهد ——
 * یعنی «حل مسئله جدید با الگو گرفتن از چند نمونه». رنگ اصلی butter / amber، متمایز از سایت‌های هم‌خانواده.
 *
 * ترکیب‌بندی (viewBox 320×200):
 *   - چپ وسط: ۳ کارت نمونه کوچک که با فاصله روی هم چیده شده‌اند، هر کارت = یک خط ورودی + → + یک برچسب خروجی رنگی
 *   - وسط: فلش افقی «از روی آن انجام بده»
 *   - راست: کارت خالی نقطه‌چین «کار جدید» با یک علامت سؤال بزرگ در وسط
 *
 * hover: سه کارت آرام باز می‌شوند (fan out)؛ فلش کمی جلو می‌رود؛ کارت علامت سؤال یک پرش می‌کند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const ExampleCard: React.FC<{
  x: number;
  y: number;
  chip: string;
  hoverClass: string;
}> = ({ x, y, chip, hoverClass }) => (
  <g transform={`translate(${x},${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hoverClass}`}>
      {/* زیرسایه */}
      <rect x="3" y="3" width="118" height="30" rx="7" fill="#241C15" opacity="0.85" />
      {/* روی کارت */}
      <rect width="118" height="30" rx="7" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
      {/* ورودی: دو خط کوتاه */}
      <line x1="12" y1="12" x2="52" y2="12" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <line x1="12" y1="20" x2="40" y2="20" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      {/* فلش → */}
      <path d="M 62 15 L 74 15 M 70 11 L 74 15 L 70 19" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* برچسب خروجی */}
      <rect x="80" y="6" width="30" height="18" rx="5" fill={chip} stroke="#241C15" strokeWidth="2" />
    </g>
  </g>
);

const FewShotCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.08}>
      {/* تزئین: مربع کوچک بالا-چپ (نمونه‌های پراکنده) */}
      <g transform="translate(30,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-45">
          <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#FEF6D3" stroke="#241C15" strokeWidth="1.8" />
        </g>
      </g>

      {/* سه کارت نمونه که با فاصله روی هم چیده شده‌اند */}
      <ExampleCard x={26} y={58} chip="#1B4B5A" hoverClass="group-hover:-translate-y-2 group-hover:-rotate-2" />
      <ExampleCard x={34} y={84} chip="#E07A5F" hoverClass="group-hover:translate-x-0.5" />
      <ExampleCard x={42} y={110} chip="#7A28CB" hoverClass="group-hover:translate-y-2 group-hover:rotate-2" />

      {/* فلش افقی «از روی آن انجام بده» در وسط */}
      <g transform="translate(168,100)">
        <g className="transition-transform duration-500 ease-spring group-hover:translate-x-1">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#241C15" strokeWidth="3" strokeLinecap="round" />
          <path d="M 24 -6 L 32 0 L 24 6" stroke="#241C15" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text
          x="16"
          y="-12"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          از روی آن انجام بده
        </text>
      </g>

      {/* راست: کارت خالی «کار جدید» + علامت سؤال */}
      <g transform="translate(214,72)">
        <g className="origin-center transition-transform duration-400 ease-spring group-hover:scale-105" style={{ transformBox: "fill-box" }}>
          {/* زیرسایه */}
          <rect x="3" y="3" width="80" height="56" rx="10" fill="#241C15" opacity="0.85" />
          {/* روی کارت (نقطه‌چین) */}
          <rect width="80" height="56" rx="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" strokeDasharray="6 5" />
          {/* خط ورودی (برای پر شدن) */}
          <line x1="14" y1="20" x2="50" y2="20" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          {/* علامت سؤال بزرگ */}
          <text
            x="40"
            y="48"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="26"
            fontWeight="800"
            fill="#E07A5F"
          >
            ?
          </text>
        </g>
      </g>

      {/* نوار عنوان پایین */}
      <g transform="translate(160,182)">
        <rect x="-58" y="-12" width="116" height="22" rx="11" fill="#241C15" />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#FBEFE3"
        >
          FEW-SHOT
        </text>
      </g>
    </CoverShell>
  );
};

export default FewShotCover;
