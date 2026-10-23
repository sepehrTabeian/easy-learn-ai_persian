/**
 * جلد برچسب‌گذاری داده
 *
 * استعاره: یک داده خام که یک یادداشت «برچسب/پاسخ درست» رویش چسبانده می‌شود. موضوع «چسباندن پاسخ درست یا برچسب به داده» است.
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: یک کارت نمونه خام (خاکستری-سفید، بدون برچسب)
 *   - وسط: فلش عمل یک دست/قلم که برچسب می‌زند
 *   - راست: همان کارت با یادداشت برچسب رنگی (دستور/ترجیح/ارزیابی)
 *   - hover: یادداشت برچسب آرام بلند می‌شود
 * عمداً از بقیه هم‌خط متمایز: این یکی بر عمل «برچسب زدن» تأکید دارد، رنگ اصلی pop.
 */
import React from "react";
import CoverShell from "./CoverShell";

const TAGS = [
  { y: 40, fill: "#FF4D74", label: "دستور", text: "#FBEFE3" },
  { y: 86, fill: "#1B4B5A", label: "ترجیح", text: "#FBEFE3" },
  { y: 132, fill: "#F4D35E", label: "ارزیابی", text: "#241C15" },
];

const DataAnnotationCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-pop/10" dotOpacity={0.08}>
      {/* نمونه خام در چپ */}
      <g transform="translate(24,0)">
        <text x="0" y="24" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          RAW
        </text>
        {[40, 86, 132].map((y, i) => (
          <g key={i} transform={`translate(0,${y})`}>
            <rect x="0" y="0" width="92" height="30" rx="6" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
            <rect x="10" y="9" width="50" height="4" rx="2" fill="#241C15" opacity="0.35" />
            <rect x="10" y="18" width="34" height="4" rx="2" fill="#241C15" opacity="0.25" />
          </g>
        ))}
      </g>

      {/* فلش عمل برچسب‌زنی در وسط */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M 124 100 Q 152 100 178 100" strokeDasharray="4 4" />
        <path d="M 172 95 L 180 100 L 172 105" strokeLinejoin="round" />
      </g>

      {/* کارت برچسب‌خورده در راست */}
      <g transform="translate(188,0)">
        <text x="0" y="24" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          LABELED
        </text>
        {TAGS.map((t, i) => (
          <g key={i} transform={`translate(0,${t.y})`}>
            <rect x="0" y="0" width="92" height="30" rx="6" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
            <rect x="10" y="9" width="50" height="4" rx="2" fill="#241C15" opacity="0.35" />
            <rect x="10" y="18" width="34" height="4" rx="2" fill="#241C15" opacity="0.25" />
            {/* یادداشت برچسب */}
            <g
              transform="translate(60,-8)"
              className={i % 2 === 0 ? "transition-transform duration-500 ease-spring group-hover:-rotate-6" : "transition-transform duration-500 ease-spring group-hover:rotate-6"}
              style={{ transformOrigin: "60px 4px" }}
            >
              <rect x="0" y="0" width="40" height="20" rx="5" fill={t.fill} stroke="#241C15" strokeWidth="2" />
              <text x="20" y="14" textAnchor="middle" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="10.5" fontWeight="700" fill={t.text}>
                {t.label}
              </text>
            </g>
          </g>
        ))}
      </g>
    </CoverShell>
  );
};

export default DataAnnotationCover;
