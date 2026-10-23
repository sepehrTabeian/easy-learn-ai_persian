/**
 * جلد Multi Agent
 *
 * استعاره: یک وظیفه کلی (بالا) بین چند شخصیت کوچک که هر کدام مسئول بخشی‌اند تقسیم می‌شود، آن‌ها یک شبکه همکاری می‌سازند و سپس نتایج را جمع می‌کنند.
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز بالا: مربع مدیر teal (با نوشته «مدیر»)
 *   - در پایین یک ردیف سه گره دایره‌ای worker (coral / butter / pop) که با خط به مدیر وصل‌اند
 *   - hover: گره‌های worker با فاصله زمانی کمی شناور می‌شوند، خطوط نقطه‌چین حس جریان دارند (با جابه‌جایی group-hover)
 */
import React from "react";
import CoverShell from "./CoverShell";

const MultiAgentCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-teal/10" dotOpacity={0.08}>
      {/* خطوط اتصال */}
      <g stroke="#241C15" strokeWidth="2" opacity="0.55">
        <line x1="160" y1="70" x2="80" y2="135" strokeDasharray="4 5" />
        <line x1="160" y1="70" x2="160" y2="135" strokeDasharray="4 5" />
        <line x1="160" y1="70" x2="240" y2="135" strokeDasharray="4 5" />
      </g>

      {/* مربع مدیر در بالا */}
      <g transform="translate(160,52)">
        <g className="origin-center transition-transform duration-400 ease-spring group-hover:-rotate-2">
          <rect x="-38" y="-22" width="76" height="44" rx="11" fill="#241C15" transform="translate(3,3)" opacity="0.85" />
          <rect x="-38" y="-22" width="76" height="44" rx="11" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
          <text x="0" y="6" textAnchor="middle" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="15" fontWeight="800" fill="#FBEFE3">
            مدیر
          </text>
        </g>
      </g>

      {/* سه گره worker */}
      <Worker x={80} y={150} fill="#E07A5F" label="اجرا" hover="group-hover:-translate-y-1.5" textFill="#FBEFE3" />
      <Worker x={160} y={150} fill="#F4D35E" label="بازبینی" hover="group-hover:translate-y-1.5" textFill="#241C15" />
      <Worker x={240} y={150} fill="#FF4D74" label="جمع‌بندی" hover="group-hover:-translate-y-1.5" textFill="#FBEFE3" />

      {/* تزئین: sparkle بالا-چپ */}
      <g transform="translate(34,30)">
        <path d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z" fill="#F4D35E" stroke="#241C15" strokeWidth="1.2" />
      </g>
    </CoverShell>
  );
};

const Worker: React.FC<{
  x: number;
  y: number;
  fill: string;
  label: string;
  hover: string;
  textFill: string;
}> = ({ x, y, fill, label, hover, textFill }) => (
  <g transform={`translate(${x},${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hover}`}>
      <circle cx="0" cy="0" r="22" fill="#241C15" transform="translate(2,2)" opacity="0.8" />
      <circle cx="0" cy="0" r="22" fill={fill} stroke="#241C15" strokeWidth="2.5" />
      <text x="0" y="5" textAnchor="middle" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="12" fontWeight="700" fill={textFill}>
        {label}
      </text>
    </g>
  </g>
);

export default MultiAgentCover;
