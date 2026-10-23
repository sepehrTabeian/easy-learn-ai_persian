/**
 * جلد پاک‌سازی داده
 *
 * استعاره: یک قیف —— از بالا مقداری مواد کثیف و درهم ریخته می‌شود (تکراری/به‌هم‌ریخته/تبلیغ/مضر)،
 *       قیف ناخالصی‌ها را می‌گیرد و از پایین جمله‌های تمیز و خوب بیرون می‌آید. موضوع «دور ریختن موارد بی‌فایده و نگه داشتن موارد مفید» است.
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - بالا: چند ماده کثیف (با حس خط خوردگی)
 *   - وسط: شکل قیف
 *   - پایین: یک قطره تمیز «✓ داده تمیز» می‌چکد
 *   - hover: قطره تمیز کمی پایین می‌افتد
 * عمداً متمایز از training-dataset (دسته‌بندی انبار داده): این یکی بر «عمل فیلتر» تأکید دارد، رنگ اصلی coral.
 */
import React from "react";
import CoverShell from "./CoverShell";

const DIRTY = [
  { x: 40, label: "تکراری ×۳", fill: "#FBEFE3" },
  { x: 128, label: "به‌هم‌ریخته #@%", fill: "#FBEFE3" },
  { x: 216, label: "لینک تبلیغاتی", fill: "#FBEFE3" },
];

const DataCleaningCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-coral/10" dotOpacity={0.08}>
      {/* مواد کثیف بالا */}
      <g transform="translate(0,30)">
        {DIRTY.map((d, i) => (
          <g key={i} transform={`translate(${d.x},0)`}>
            <rect x="0" y="0" width="64" height="18" rx="4" fill={d.fill} stroke="#241C15" strokeWidth="1.8" opacity="0.65" />
            <text x="32" y="13" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8.5" fontWeight="700" fill="#241C15" opacity="0.7">
              {d.label}
            </text>
            <line x1="6" y1="4" x2="58" y2="15" stroke="#E07A5F" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
          </g>
        ))}
      </g>

      {/* قیف */}
      <g transform="translate(160,60)">
        <path
          d="M -88 0 L 88 0 L 24 70 L 24 104 L -24 104 L -24 70 Z"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* خطوط توری داخل قیف */}
        <g stroke="#241C15" strokeWidth="1.4" opacity="0.4">
          <line x1="-60" y1="22" x2="60" y2="22" />
          <line x1="-42" y1="40" x2="42" y2="40" />
        </g>
      </g>

      {/* قطره تمیز پایین */}
      <g transform="translate(160,176)" className="transition-transform duration-700 group-hover:translate-y-1">
        <rect x="-44" y="-14" width="88" height="22" rx="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
        <text x="0" y="1" textAnchor="middle" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="11" fontWeight="700" fill="#FBEFE3">
          ✓ داده تمیز
        </text>
      </g>

      {/* تزئین sparkle */}
      <g transform="translate(294,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z" fill="#FF4D74" stroke="#241C15" strokeWidth="1.3" />
        </g>
      </g>
    </CoverShell>
  );
};

export default DataCleaningCover;
