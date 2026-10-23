/**
 * جلد Agent Modes
 *
 * استعاره: سه حالت اجرا = یک دسته دنده + سه چراغ راهنما
 *   - نمای چپ: ستون چراغ راهنمای سه‌رنگ (butter PLAN / coral DEFAULT / teal AUTO)
 *   - راست: پایه + اهرم، روی دستگیره بالای اهرم نوشته MODE، روی دنده وسط (DEFAULT) ایستاده
 *   - زیر پایه درجه‌بندی سه دنده (PLAN / DEFAULT / AUTO)
 *
 * متمایز از جلدهای مجاور:
 *   - AgentCover: شخصیت کوچک مرکزی + مدار ابزار (دایره‌ای)
 *   - AgentLoopCover: چرخه ۵ گره (مدار دایره‌ای)
 *   - AgentMemoryCover: کمد بایگانی سه‌طبقه (کشوهای عمودی)
 *   - AgentModesCover: ستون چراغ در چپ + دسته دنده در راست (حس صنعتی افقی)
 *
 * hover：
 *   - اهرم از DEFAULT به AUTO می‌رود (کج به راست + جابه‌جایی)
 *   - سه چراغ به ترتیب با فاصله زمانی روشن می‌شوند (با transitionDelay شبیه‌سازی می‌شود)
 *   - رنگ دستگیره از coral به teal تغییر می‌کند (مطابق معنای دنده)
 */
import React from "react";
import CoverShell from "./CoverShell";

const AgentModesCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle کوچک بالا-چپ */}
      <g transform="translate(34,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[120deg]">
          <path
            d="M 0 -6 L 1.1 -1.1 L 6 0 L 1.1 1.1 L 0 6 L -1.1 1.1 L -6 0 L -1.1 -1.1 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: مهر کوچک پایین-راست "3" */}
      <g transform="translate(286,170)">
        <circle
          cx="0"
          cy="0"
          r="12"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="12"
          fontWeight="800"
          fill="#241C15"
        >
          3
        </text>
      </g>

      {/* ─── چپ: ستون چراغ راهنما ─── */}
      <g transform="translate(64,100)">
        {/* زیرسایه */}
        <rect
          x="-22"
          y="-58"
          width="44"
          height="120"
          rx="10"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* بدنه ستون */}
        <rect
          x="-22"
          y="-58"
          width="44"
          height="120"
          rx="10"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        {/* کلاهک بالا */}
        <rect
          x="-26"
          y="-66"
          width="52"
          height="10"
          rx="3"
          fill="#241C15"
        />
        {/* چراغ ۱ PLAN (butter) */}
        <g
          className="transition-opacity duration-300 ease-spring group-hover:opacity-100"
          style={{ opacity: 0.5, transitionDelay: "0ms" }}
        >
          <circle cx="0" cy="-36" r="13" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
          {/* هایلایت */}
          <circle cx="-4" cy="-40" r="3" fill="#FBEFE3" opacity="0.85" />
        </g>
        {/* چراغ ۲ DEFAULT (coral) · به‌طور پیش‌فرض روشن */}
        <g
          className="transition-opacity duration-300 ease-spring group-hover:opacity-100"
          style={{ opacity: 1, transitionDelay: "120ms" }}
        >
          <circle cx="0" cy="0" r="13" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
          <circle cx="-4" cy="-4" r="3" fill="#FBEFE3" opacity="0.85" />
        </g>
        {/* چراغ ۳ AUTO (teal) */}
        <g
          className="transition-opacity duration-300 ease-spring group-hover:opacity-100"
          style={{ opacity: 0.5, transitionDelay: "240ms" }}
        >
          <circle cx="0" cy="36" r="13" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
          <circle cx="-4" cy="32" r="3" fill="#FBEFE3" opacity="0.85" />
        </g>

        {/* پلاک کوچک ستون */}
        <g transform="translate(0,72)">
          <rect
            x="-22"
            y="-1"
            width="44"
            height="14"
            rx="3"
            fill="#241C15"
          />
          <text
            x="0"
            y="9"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="800"
            letterSpacing="1.6"
            fill="#FBEFE3"
          >
            MODES
          </text>
        </g>
      </g>

      {/* ─── نقاط کوچک جداکننده خط وسط ─── */}
      <g transform="translate(126,100)">
        {[-30, 0, 30].map((dy) => (
          <circle key={dy} cx="0" cy={dy} r="1.6" fill="#241C15" opacity="0.4" />
        ))}
      </g>

      {/* ─── راست: دسته دنده ─── */}
      <g transform="translate(220,100)">
        {/* سایه پایه */}
        <rect
          x="-58"
          y="32"
          width="116"
          height="26"
          rx="8"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* پایه */}
        <rect
          x="-58"
          y="32"
          width="116"
          height="26"
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        {/* شیار درجه‌بندی سه دنده */}
        <line
          x1="-44"
          y1="45"
          x2="44"
          y2="45"
          stroke="#241C15"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          opacity="0.55"
        />
        {/* نقطه تثبیت دنده */}
        {[-40, 0, 40].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy="45"
            r="3.5"
            fill="#241C15"
            opacity="0.7"
          />
        ))}

        {/* نوار برچسب دنده */}
        <g transform="translate(0,72)">
          <text
            x="-40"
            y="0"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="1.4"
            fill="#241C15"
            opacity="0.7"
          >
            PLAN
          </text>
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#241C15"
          >
            DEFAULT
          </text>
          <text
            x="40"
            y="0"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="1.4"
            fill="#241C15"
            opacity="0.7"
          >
            AUTO
          </text>
        </g>

        {/* اهرم (موقعیت پیش‌فرض DEFAULT در cx=0، در hover به AUTO در cx=40 می‌رود) */}
        <g
          className="transition-transform duration-500 ease-spring group-hover:translate-x-[40px] group-hover:-rotate-[8deg]"
          style={{ transformOrigin: "0px 45px", transformBox: "fill-box" }}
        >
          {/* بدنه اهرم */}
          <line
            x1="0"
            y1="45"
            x2="0"
            y2="-22"
            stroke="#241C15"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* سایه دستگیره */}
          <circle cx="0" cy="-30" r="20" fill="#241C15" opacity="0.85" transform="translate(3,3)" />
          {/* دستگیره: به‌طور پیش‌فرض coral (DEFAULT)، در hover به teal (AUTO) تغییر می‌کند */}
          <circle
            cx="0"
            cy="-30"
            r="20"
            className="fill-coral transition-colors duration-500 ease-spring group-hover:fill-teal"
            stroke="#241C15"
            strokeWidth="2.5"
          />
          {/* متن MODE روی دستگیره */}
          <text
            x="0"
            y="-26"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="800"
            letterSpacing="1.2"
            fill="#FBEFE3"
          >
            MODE
          </text>
          {/* خط کوچک نشانگر دنده روی دستگیره */}
          <line
            x1="0"
            y1="-50"
            x2="0"
            y2="-44"
            stroke="#FBEFE3"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </CoverShell>
  );
};

export default AgentModesCover;
