/**
 * جلد Agent
 *
 * استعاره: Agent = مغز کوچکی که فکر می‌کند، دست به کار می‌شود و مشاهده می‌کند + چرخه + شاخک‌های ابزار.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز: شخصیت کوچک مستطیل گوشه‌گرد coral (نوشته «AGT»)، با چشم و آنتن کوچک
 *   - اطراف: مدار بیضی نقطه‌چین (dashed circle) نشان‌دهنده چرخه Think→Act→Observe
 *   - ۳ گره ابزار روی مدار (چرخ‌دنده / صاعقه / پایگاه داده)
 *   - سه برچسب عمل THINK / ACT / OBSERVE در سه گوشه
 *   - تزئین: sparkle بالا-چپ، نقطه کوچک پایین-راست
 *
 * رفتار hover: مدار چرخه کمی ساعت‌گرد می‌چرخد؛ شخصیت مرکزی آرام سر تکان می‌دهد؛ گره‌های ابزار با فاصله زمانی شناور می‌شوند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const AgentCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle بالا-چپ */}
      <g transform="translate(36,32)">
        <g className="origin-center rotate-[20deg] transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: ring پایین-راست */}
      <g transform="translate(290,170)">
        <circle cx="0" cy="0" r="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* مدار چرخه نقطه‌چین بیرونی (بیضی) —— ایستا، دیگر کل آن نمی‌چرخد تا از لگ rasterize مجدد نقطه‌چین جلوگیری شود */}
      <g transform="translate(160,100)">
        <g>
          <ellipse
            cx="0"
            cy="0"
            rx="115"
            ry="68"
            fill="none"
            stroke="#241C15"
            strokeWidth="2"
            strokeDasharray="5 6"
            opacity="0.55"
          />
          {/* ۳ نقطه فلش روی مدار (اشاره به جهت چرخه) */}
          {[0, 120, 240].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = Math.cos(rad) * 115;
            const y = Math.sin(rad) * 68;
            return (
              <g key={deg} transform={`translate(${x},${y}) rotate(${deg + 90})`}>
                <path d="M -4 -3 L 4 0 L -4 3 Z" fill="#241C15" />
              </g>
            );
          })}
        </g>
      </g>

      {/* سه گره ابزار (موقعیت روی دایره نقطه‌چین) */}
      {/* ابزار ۱: چرخ‌دنده (بالا-چپ) */}
      <ToolNode x={62} y={62} label="ابزار" color="#F4D35E" hoverClassName="group-hover:-translate-y-1">
        <Gear />
      </ToolNode>
      {/* ابزار ۲: صاعقه (بالا-راست) */}
      <ToolNode x={258} y={62} label="اقدام" color="#1B4B5A" hoverClassName="group-hover:translate-y-1">
        <Bolt />
      </ToolNode>
      {/* ابزار ۳: چشم (پایین وسط) */}
      <ToolNode x={160} y={180} label="مشاهده" color="#FBEFE3" hoverClassName="group-hover:-translate-y-1">
        <Eye />
      </ToolNode>

      {/* مرکز: شخصیت کوچک Agent */}
      <g transform="translate(160,100)">
        <g
          className="origin-center transition-transform duration-400 ease-spring group-hover:-rotate-3 group-hover:scale-[1.03]"
          style={{ transformBox: "fill-box" }}
        >
          {/* زیرسایه */}
          <rect x="-30" y="-26" width="60" height="52" rx="12" fill="#241C15" transform="translate(3,3)" opacity="0.85" />
          {/* بدنه اصلی */}
          <rect x="-30" y="-26" width="60" height="52" rx="12" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />
          {/* آنتن */}
          <line x1="0" y1="-26" x2="0" y2="-36" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="-38" r="3.5" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
          {/* چشم‌ها */}
          <circle cx="-9" cy="-8" r="3.2" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
          <circle cx="-9" cy="-8" r="1.4" fill="#241C15" />
          <circle cx="9" cy="-8" r="3.2" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
          <circle cx="9" cy="-8" r="1.4" fill="#241C15" />
          {/* دهان */}
          <path d="M -6 6 Q 0 11 6 6" fill="none" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
          {/* برچسب پایینی AGT */}
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#FBEFE3"
          >
            AGENT
          </text>
        </g>
      </g>
    </CoverShell>
  );
};

/* ----- گره‌های ابزار ----- */

const ToolNode: React.FC<{
  x: number;
  y: number;
  label: string;
  color: string;
  hoverClassName?: string;
  children: React.ReactNode;
}> = ({ x, y, label, color, hoverClassName = "", children }) => (
  <g transform={`translate(${x},${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hoverClassName}`}>
      <circle cx="0" cy="0" r="16" fill={color} stroke="#241C15" strokeWidth="2.5" />
      {children}
      <g transform="translate(0,28)">
        <rect
          x="-18"
          y="-7"
          width="36"
          height="14"
          rx="7"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#FBEFE3"
        >
          {label}
        </text>
      </g>
    </g>
  </g>
);

/* ----- آیکون‌های ابزار ----- */

const Gear: React.FC = () => (
  <g>
    {/* ۸ دندانه */}
    {Array.from({ length: 8 }).map((_, i) => {
      const deg = i * 45;
      const rad = (deg * Math.PI) / 180;
      const x1 = Math.cos(rad) * 7;
      const y1 = Math.sin(rad) * 7;
      const x2 = Math.cos(rad) * 11;
      const y2 = Math.sin(rad) * 11;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />;
    })}
    <circle cx="0" cy="0" r="5" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
    <circle cx="0" cy="0" r="1.5" fill="#241C15" />
  </g>
);

const Bolt: React.FC = () => (
  <path
    d="M 1 -8 L -5 1 L 0 1 L -1 8 L 5 -1 L 0 -1 Z"
    fill="#F4D35E"
    stroke="#241C15"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
);

const Eye: React.FC = () => (
  <g>
    <path d="M -8 0 Q 0 -6 8 0 Q 0 6 -8 0 Z" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
    <circle cx="0" cy="0" r="3" fill="#241C15" />
    <circle cx="1" cy="-1" r="0.9" fill="#FBEFE3" />
  </g>
);

export default AgentCover;
