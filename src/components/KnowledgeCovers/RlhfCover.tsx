/**
 * جلد RLHF
 *
 * استعاره: دو پاسخ کاندید A / B ← دست انسان به A اشاره می‌کند (thumbs up) ← سیگنال reward به وزنه وزن‌های مدل برمی‌گردد
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: دو کارت پاسخ کاندید A / B (A برجسته با پس‌زمینه butter + مهر شست، B کم‌رنگ + خط‌خورده)
 *   - وسط: حلقه A توسط یک انگشت کوچک / قلب قرمز هدف گرفته می‌شود ← یک فلش reward به سمت راست می‌رود"وزنه model"
 *   - راست: وزنه model (حس مکعب teal) + دو گروه فلش کوچک بالا و پایین یعنی «وزن‌ها به سمت ترجیح حرکت می‌کنند»
 *   - بالا-راست: stamp با reward (رنگ pop +0.81)
 *   - پایین-چپ: تکه فرمول β·KL
 *
 * hover：
 *   - مهر شست wiggle می‌کند
 *   - dash روان reward سریع‌تر می‌شود
 *   - وزنه model کمی پایین می‌رود (حس اثر ترجیح)
 */
import React from "react";
import CoverShell from "./CoverShell";

const RlhfCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* stamp بالا-چپ: human-rated */}
      <g
        transform="translate(40,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2"
      >
        <rect
          x="-32"
          y="-10"
          width="64"
          height="20"
          rx="4"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          HUMAN RATED
        </text>
      </g>

      {/* stamp بالا-راست: reward +0.81 */}
      <g
        transform="translate(282,30) rotate(6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-11"
          width="56"
          height="22"
          rx="11"
          fill="#FF4D74"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          r = +0.81
        </text>
      </g>

      {/* پایین-چپ: تکه فرمول β·KL */}
      <g transform="translate(30,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="80"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="37"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          − β · KL(π‖SFT)
        </text>
      </g>

      {/* === چپ: دو کارت پاسخ کاندید === */}
      {/* کاندید A · chosen */}
      <g
        transform="translate(78,90)"
        className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
      >
        <rect
          x="-32"
          y="-22"
          width="64"
          height="44"
          rx="6"
          fill="#FBE891"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="-24"
          y="-11"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          A · chosen
        </text>
        {/* سه خط جای‌نگهدار متن */}
        <line x1="-24" y1="-2" x2="22" y2="-2" stroke="#241C15" strokeWidth="1.2" />
        <line x1="-24" y1="5" x2="14" y2="5" stroke="#241C15" strokeWidth="1.2" />
        <line x1="-24" y1="12" x2="20" y2="12" stroke="#241C15" strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* کاندید B · rejected */}
      <g transform="translate(78,150)">
        <rect
          x="-32"
          y="-18"
          width="64"
          height="36"
          rx="6"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
          opacity="0.85"
        />
        <text
          x="-24"
          y="-7"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="600"
          fill="#88837C"
        >
          B · rejected
        </text>
        <line
          x1="-24"
          y1="2"
          x2="22"
          y2="2"
          stroke="#88837C"
          strokeWidth="1.1"
          opacity="0.6"
        />
        <line
          x1="-24"
          y1="9"
          x2="14"
          y2="9"
          stroke="#88837C"
          strokeWidth="1.1"
          opacity="0.6"
        />
        {/* خط خورده */}
        <line
          x1="-30"
          y1="14"
          x2="30"
          y2="-14"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* === وسط: thumbs up · A توسط انسان انتخاب شده === */}
      <g
        transform="translate(132,90)"
        className="origin-center transition-transform duration-500 group-hover:scale-110 animate-wiggle"
      >
        <circle r="13" fill="#FF4D74" stroke="#241C15" strokeWidth="2" />
        {/* طرح ساده شست */}
        <path
          d="M -5 3 L -5 -1 L -2 -1 L -2 -6 Q -2 -8 0 -8 Q 2 -8 2 -6 L 2 -1 L 5 -1 Q 7 -1 7 1 L 7 4 Q 7 6 5 6 L -3 6 Q -5 6 -5 4 Z"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </g>

      {/* === فلش سیگنال A ← reward (dash روان) === */}
      <g
        stroke="#E07A5F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
        className="animate-dash-flow"
      >
        <path d="M 152 90 Q 180 80 210 96" />
      </g>
      <polygon points="210,92 218,96 210,100" fill="#E07A5F" />

      {/* برچسب کوچک وسط: سیگنال reward */}
      <text
        x="180"
        y="72"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fontWeight="600"
        fill="#241C15"
        opacity="0.7"
      >
        reward
      </text>

      {/* === راست: وزنه model (وزن‌های مدل که هل داده می‌شوند) === */}
      <g
        transform="translate(252,110)"
        className="origin-bottom transition-transform duration-500 group-hover:translate-y-1"
      >
        {/* مکعب اصلی */}
        <rect
          x="-26"
          y="-22"
          width="52"
          height="44"
          rx="6"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* هایلایت سطح بالا */}
        <rect
          x="-26"
          y="-22"
          width="52"
          height="10"
          rx="6"
          fill="#FBEFE3"
          opacity="0.18"
        />
        <text
          y="-3"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          π_RL
        </text>
        <text
          y="10"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#FBEFE3"
          opacity="0.7"
        >
          policy
        </text>
        {/* پایه */}
        <rect
          x="-32"
          y="22"
          width="64"
          height="6"
          rx="2"
          fill="#241C15"
        />
      </g>

      {/* بالا و پایین وزنه: دو گروه فلش کوچک نشان‌دهنده حرکت وزن‌ها */}
      <g stroke="#F4D35E" strokeWidth="1.6" fill="#F4D35E" strokeLinecap="round">
        {/* فلش بالا: reward هل می‌دهد */}
        <line x1="252" y1="78" x2="252" y2="84" />
        <polygon points="248,84 252,80 256,84" fill="#F4D35E" />
        {/* فلش پایین: KL می‌کشد */}
        <line x1="252" y1="140" x2="252" y2="146" />
        <polygon points="248,140 252,144 256,140" fill="#F4D35E" />
      </g>

      {/* توضیح پایین: preference → reward → policy */}
      <text
        x="160"
        y="192"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        preference → reward → policy
      </text>
    </CoverShell>
  );
};

export default RlhfCover;
