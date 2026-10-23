/**
 * جلد SubAgent
 *
 * استعاره: Agent اصلی زیرکارهایی را که context اصلی را آلوده می‌کنند به یک Agent فرعی برون‌سپاری می‌کند،
 *      Agent فرعی در یک فضای مستقل (کادر نقطه‌چین) کار می‌کند و فقط یک خط خلاصه به Agent اصلی برمی‌گرداند.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: مربع بزرگ Agent اصلی (coral) + برچسب MAIN در بالا
 *   - بخش وسط: فلش کوچک اعزام + "DELEGATE" برچسب
 *   - راست: فضای مستقل (rounded box نقطه‌چین)، داخل آن مربع کوچک SubAgent (butter) + دسته‌ای از نوارهای کوتاه نویز
 *   - فلش کمانی پایین: از SubAgent به Agent اصلی برمی‌گردد، کنار فلش یک کارت کوچک «خلاصه» آویزان است
 *   - تزئین: sparkle بالا-چپ، نقطه کوچک پایین-راست
 *
 * hover：
 *   - مربع کوچک SubAgent در جهت فلش اعزام کمی بیشتر به بیرون می‌لغزد
 *   - کارت کوچک خلاصه در جهت کمان برمی‌گردد
 *   - دامنه نوارهای کوتاه نویز بیشتر می‌شود (در فضای فرعی محبوس شده و تقلا می‌کند)
 *   - sparkle زاویه می‌چرخد
 *
 * با AgentCover مجاور (چرخه + شاخک‌های ابزار) / AgentLoopCover (حلقه چرخان) /
 * AgentMemoryCover (کشوهای کمد بایگانی سه‌طبقه) متفاوت است.
 */
import React from "react";
import CoverShell from "./CoverShell";

const SubAgentCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle بالا-چپ */}
      <g transform="translate(34,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: ماتریس نقطه کوچک پایین-راست */}
      <g transform="translate(282,168)">
        {Array.from({ length: 6 }).map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <circle
              key={i}
              cx={col * 6}
              cy={row * 6}
              r="1.2"
              fill="#241C15"
              opacity="0.35"
            />
          );
        })}
      </g>

      {/* برچسب کوچک بالا MAIN CONVERSATION */}
      <g transform="translate(82,30)">
        <rect x="-44" y="-9" width="88" height="18" rx="9" fill="#241C15" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#FBEFE3"
        >
          MAIN AGENT
        </text>
      </g>

      {/* ─── چپ: مربع بزرگ Agent اصلی ─── */}
      <g transform="translate(82,108)">
        {/* سایه */}
        <rect
          x="-38"
          y="-36"
          width="76"
          height="72"
          rx="12"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* بدنه اصلی */}
        <rect
          x="-38"
          y="-36"
          width="76"
          height="72"
          rx="12"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        {/* چشم‌ها */}
        <circle cx="-12" cy="-12" r="3.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
        <circle cx="-12" cy="-12" r="1.6" fill="#241C15" />
        <circle cx="12" cy="-12" r="3.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
        <circle cx="12" cy="-12" r="1.6" fill="#241C15" />
        {/* دهان */}
        <path
          d="M -7 4 Q 0 9 7 4"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* برچسب پایینی MAIN */}
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#FBEFE3"
        >
          MAIN
        </text>
      </g>

      {/* ─── فلش اعزام (چپ ← راست) ─── */}
      <g>
        <line
          x1="126"
          y1="100"
          x2="178"
          y2="92"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <path
          d="M 172 86 L 182 91 L 174 99"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* "DELEGATE" برچسب */}
        <g transform="translate(152,78)">
          <rect x="-22" y="-7" width="44" height="13" rx="6.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
          <text
            x="0"
            y="2.5"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="800"
            letterSpacing="1.6"
            fill="#241C15"
          >
            DELEGATE
          </text>
        </g>
      </g>

      {/* ─── راست: کادر نقطه‌چین فضای مستقل ─── */}
      <g transform="translate(238,98)">
        <rect
          x="-48"
          y="-44"
          width="96"
          height="98"
          rx="14"
          fill="none"
          stroke="#241C15"
          strokeWidth="1.6"
          strokeDasharray="5 4"
          opacity="0.55"
        />
        {/* برچسب: فضای مستقل */}
        <g transform="translate(-22,-46)">
          <rect x="-22" y="-7" width="44" height="13" rx="3" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.4" />
          <text
            x="0"
            y="2.5"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#241C15"
          >
            ISOLATED
          </text>
        </g>

        {/* مربع کوچک SubAgent (butter) —— در hover کمی بیشتر به بیرون می‌لغزد */}
        <g className="transition-transform duration-500 ease-spring group-hover:translate-x-[4px] group-hover:-translate-y-[2px]">
          {/* سایه */}
          <rect
            x="-26"
            y="-30"
            width="52"
            height="48"
            rx="9"
            fill="#241C15"
            opacity="0.85"
            transform="translate(2.5,2.5)"
          />
          <rect
            x="-26"
            y="-30"
            width="52"
            height="48"
            rx="9"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="2.2"
          />
          {/* چشم‌های کوچک */}
          <circle cx="-9" cy="-11" r="2.8" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.3" />
          <circle cx="-9" cy="-11" r="1.2" fill="#241C15" />
          <circle cx="9" cy="-11" r="2.8" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.3" />
          <circle cx="9" cy="-11" r="1.2" fill="#241C15" />
          {/* دهان کوچک */}
          <path
            d="M -5 1 Q 0 4 5 1"
            fill="none"
            stroke="#241C15"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* برچسب SUB */}
          <text
            x="0"
            y="13"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fontWeight="800"
            letterSpacing="1.5"
            fill="#241C15"
          >
            SUB
          </text>
        </g>

        {/* نوارهای کوتاه نویز زیر Agent فرعی —— در hover کشیده می‌شوند (در فضای مستقل تقلا می‌کند) */}
        <g transform="translate(0,28)">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={-24}
              y={i * 4}
              height="2"
              rx="1"
              fill="#241C15"
              opacity={0.35 - i * 0.05}
              className="transition-all duration-500 ease-spring"
              style={{
                width: `${30 - i * 6}px`,
              }}
            />
          ))}
        </g>
      </g>

      {/* ─── بازگشت خلاصه: کمان از Agent فرعی به Agent اصلی ─── */}
      <g>
        <path
          d="M 220 150 Q 160 188 100 156"
          fill="none"
          stroke="#241C15"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* سر فلش رو به Agent اصلی */}
        <path
          d="M 108 148 L 96 156 L 106 164"
          fill="none"
          stroke="#241C15"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* کارت کوچک خلاصه —— در hover در جهت کمان برمی‌گردد (به چپ) */}
        <g
          transform="translate(180,178)"
          className="transition-transform duration-500 ease-spring group-hover:-translate-x-[12px]"
        >
          {/* سایه */}
          <rect
            x="-26"
            y="-9"
            width="52"
            height="18"
            rx="4"
            fill="#241C15"
            opacity="0.85"
            transform="translate(2,2)"
          />
          {/* بدنه اصلی */}
          <rect
            x="-26"
            y="-9"
            width="52"
            height="18"
            rx="4"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <text
            x="-20"
            y="-1"
            fontFamily="Geist Mono, monospace"
            fontSize="6"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#241C15"
            opacity="0.7"
          >
            SUMMARY
          </text>
          <line x1="-20" y1="3" x2="20" y2="3" stroke="#241C15" strokeWidth="1" opacity="0.45" />
          <line x1="-20" y1="6" x2="12" y2="6" stroke="#241C15" strokeWidth="1" opacity="0.45" />
        </g>
      </g>
    </CoverShell>
  );
};

export default SubAgentCover;
