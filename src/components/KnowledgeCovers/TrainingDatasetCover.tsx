/**
 * جلد مجموعه‌داده آموزشی
 *
 * استعاره: یک انبار/قیف بزرگ که چند دسته «ماده» دسته‌بندی‌شده (صفحه وب، کتاب، انسانی، مصنوعی) درون آن است،
 *       در پایین جمله «کیفیت توانایی را تعیین می‌کند». موضوع «یک مجموعه‌داده از چه نوع موادی تشکیل شده» است.
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: چهار بلوک ماده رنگی روی هم، هر کدام با برچسب کوچک
 *   - راست: یک صندوق بزرگ «DATASET» که چند جریان ماده وارد آن می‌شود
 *   - hover: بلوک‌های ماده کمی شناور می‌شوند
 * عمداً متمایز از هم‌خط‌های data-cleaning (فیلتر قیفی) / dataset-construction (خط تولید): این یکی بر «تجمیع دسته‌بندی‌شده» تأکید دارد.
 */
import React from "react";
import CoverShell from "./CoverShell";

const PILES = [
  { y: 36, fill: "#1B4B5A", label: "داده‌های وب", text: "#FBEFE3" },
  { y: 66, fill: "#F4D35E", label: "داده متن‌باز", text: "#241C15" },
  { y: 96, fill: "#E07A5F", label: "نوشته انسانی", text: "#FBEFE3" },
  { y: 126, fill: "#FF4D74", label: "داده مصنوعی", text: "#FBEFE3" },
];

const TrainingDatasetCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-teal/10" dotOpacity={0.08}>
      {/* چهار نوع بلوک ماده در چپ */}
      <g transform="translate(24,0)">
        <text x="0" y="24" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          SOURCES
        </text>
        {PILES.map((p, i) => (
          <g key={i} transform={`translate(0,${p.y})`} className="transition-transform duration-500 ease-spring" style={{ transformOrigin: "center" }}>
            <g className={i % 2 === 0 ? "group-hover:-translate-y-0.5 transition-transform duration-500" : "group-hover:translate-y-0.5 transition-transform duration-500"}>
              <rect x="0" y="0" width="92" height="22" rx="5" fill={p.fill} stroke="#241C15" strokeWidth="2" />
              <text x="46" y="15" textAnchor="middle" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="11" fontWeight="700" fill={p.text}>
                {p.label}
              </text>
            </g>
          </g>
        ))}
      </g>

      {/* فلش ورودی */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M 122 80 Q 150 95 176 95" strokeDasharray="4 4" />
        <path d="M 170 90 L 178 95 L 170 100" strokeLinejoin="round" />
      </g>

      {/* صندوق DATASET در راست */}
      <g transform="translate(186,42)">
        <rect x="0" y="-2" width="104" height="14" rx="3" fill="#241C15" />
        <text x="52" y="8" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.6" fill="#FBEFE3">
          DATASET
        </text>
        <rect x="0" y="20" width="108" height="96" rx="10" fill="#241C15" opacity="0.85" transform="translate(3,3)" />
        <rect x="0" y="20" width="108" height="96" rx="10" fill="#FBEFE3" stroke="#1B4B5A" strokeWidth="2.5" />
        {/* مواد لایه‌لایه داخل صندوق */}
        <rect x="12" y="34" width="84" height="16" rx="4" fill="#1B4B5A" opacity="0.85" />
        <rect x="12" y="54" width="84" height="16" rx="4" fill="#F4D35E" />
        <rect x="12" y="74" width="84" height="16" rx="4" fill="#E07A5F" opacity="0.85" />
        <rect x="12" y="94" width="84" height="16" rx="4" fill="#FF4D74" opacity="0.85" />
      </g>

      {/* یک جمله در پایین */}
      <g transform="translate(186,168)">
        <text x="0" y="0" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="10" fontWeight="800" fill="#241C15" opacity="0.7">
          کیفیت توانایی را تعیین می‌کند
        </text>
      </g>
    </CoverShell>
  );
};

export default TrainingDatasetCover;
