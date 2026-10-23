/**
 * جلد ساخت مجموعه‌داده
 *
 * استعاره: سند وارد می‌شود ← یک ماشین (چرخ‌دنده) خودکار پردازش می‌کند ← کارت‌های پرسش و پاسخ «Q+A» یکی‌یکی بیرون می‌آیند.
 *       موضوع «تبدیل خودکار اسناد به داده آموزشی با ابزار» است.
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: یک دسته سند
 *   - وسط: ماشین چرخ‌دنده‌ای
 *   - راست: کارت‌های پرسش و پاسخ خروجی (Q/A)
 *   - hover: چرخ‌دنده می‌چرخد، کارت‌های پرسش و پاسخ شناور می‌شوند
 * متمایز از هم‌خط‌ها: این یکی بر «خط تولید خودکار / سند ← پرسش و پاسخ» تأکید دارد، رنگ اصلی butter.
 */
import React from "react";
import CoverShell from "./CoverShell";

const DatasetConstructionCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter/25" dotOpacity={0.08}>
      {/* دسته سند در چپ */}
      <g transform="translate(22,48)">
        <text x="0" y="-10" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          DOCS
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 4},${i * 22})`}>
            <rect x="0" y="0" width="58" height="30" rx="5" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
            <rect x="9" y="8" width="34" height="3.5" rx="1.75" fill="#241C15" opacity="0.35" />
            <rect x="9" y="16" width="26" height="3.5" rx="1.75" fill="#241C15" opacity="0.25" />
          </g>
        ))}
      </g>

      {/* ماشین چرخ‌دنده‌ای در وسط */}
      <g transform="translate(160,100)">
        <rect x="-34" y="-34" width="68" height="68" rx="14" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
        <g className="origin-center transition-transform duration-1000 group-hover:rotate-180">
          <Gear r={18} teeth={8} fill="#F4D35E" />
        </g>
      </g>

      {/* فلش چپ ← ماشین */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M 92 100 L 120 100" strokeDasharray="4 4" />
        <path d="M 114 95 L 122 100 L 114 105" strokeLinejoin="round" />
      </g>
      {/* فلش ماشین ← راست */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M 200 100 L 226 100" strokeDasharray="4 4" />
        <path d="M 220 95 L 228 100 L 220 105" strokeLinejoin="round" />
      </g>

      {/* کارت‌های پرسش و پاسخ در راست */}
      <g transform="translate(236,52)">
        <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5">
          <rect x="0" y="0" width="62" height="40" rx="7" fill="#FF4D74" stroke="#241C15" strokeWidth="2" />
          <text x="9" y="17" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="11" fontWeight="800" fill="#FBEFE3">Q ?</text>
          <rect x="9" y="25" width="44" height="4" rx="2" fill="#FBEFE3" opacity="0.7" />
        </g>
        <g transform="translate(0,52)" className="transition-transform duration-500 ease-spring group-hover:translate-y-0.5">
          <rect x="0" y="0" width="62" height="40" rx="7" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
          <text x="9" y="17" fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif" fontSize="11" fontWeight="800" fill="#241C15">A</text>
          <rect x="9" y="25" width="44" height="4" rx="2" fill="#241C15" opacity="0.3" />
        </g>
      </g>
    </CoverShell>
  );
};

const Gear: React.FC<{ r: number; teeth: number; fill: string }> = ({ r, teeth, fill }) => {
  const spokes = Array.from({ length: teeth }).map((_, i) => {
    const a = (i / teeth) * Math.PI * 2;
    const x = Math.cos(a) * (r + 5);
    const y = Math.sin(a) * (r + 5);
    return <rect key={i} x={x - 3} y={y - 3} width="6" height="6" rx="1.5" fill={fill} stroke="#241C15" strokeWidth="1.5" transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} />;
  });
  return (
    <g>
      {spokes}
      <circle cx="0" cy="0" r={r} fill={fill} stroke="#241C15" strokeWidth="2.5" />
      <circle cx="0" cy="0" r={r * 0.4} fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
    </g>
  );
};

export default DatasetConstructionCover;
