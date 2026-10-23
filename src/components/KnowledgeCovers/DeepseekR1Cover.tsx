/**
 * جلد DeepSeek R1
 *
 * استعاره: یک prompt وارد مدل می‌شود ←
 *   درون مدل بیرون می‌آید `<think>` حباب فکر (کادر استدلال چندمرحله‌ای) ←
 *   در وسط یک "Wait." صاعقه بازاندیشی ← در نهایت پاسخ داده می‌شود.
 *   stamp R1 در بالا-راست + تکه فرمول GRPO در پایین-چپ.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: کارت user prompt ("x² = ?"）
 *   - وسط: ۳ حباب فکر به هم پیوسته (rect rounded)، وسطی را صاعقه coral می‌زند
 *   - راست: کارت answer "= 5"، با stamp ✓
 *   - stamp بالا-راست "R1"（butter）
 *   - تکه mono پایین-چپ: A=(r−μ)/σ
 *
 * hover: صاعقه wiggle می‌کند؛ حباب‌های فکر بالا و پایین شناورند؛ reward stamp کمی می‌چرخد.
 */
import React from "react";
import CoverShell from "./CoverShell";

const DeepseekR1Cover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.08}>
      {/* stamp بالا-راست · R1 */}
      <g
        transform="translate(286,30) rotate(8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-3deg] group-hover:scale-110"
      >
        <rect
          x="-22"
          y="-12"
          width="44"
          height="24"
          rx="4"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#F4D35E"
        >
          R1
        </text>
      </g>

      {/* پایین-چپ: تکه فرمول advantage در GRPO */}
      <g transform="translate(30,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="92"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="43"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          A = (r − μ) / σ
        </text>
      </g>

      {/* تزئین: کمان تزئینی بالا —— جریان استدلال */}
      <path
        d="M 38 60 Q 160 36 282 60"
        stroke="#E07A5F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.45"
      />

      {/* === چپ: کارت user prompt === */}
      <g
        transform="translate(40,100)"
        className="origin-center transition-transform duration-500 group-hover:-translate-x-1"
      >
        <rect
          x="-22"
          y="-22"
          width="44"
          height="44"
          rx="6"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="-7"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          fill="#88837C"
        >
          PROMPT
        </text>
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#241C15"
        >
          x²=?
        </text>
      </g>

      {/* فلش prompt ← think */}
      <g stroke="#241C15" strokeWidth="1.6" fill="none">
        <line x1="64" y1="100" x2="86" y2="100" strokeLinecap="round" />
        <polygon points="84,96 90,100 84,104" fill="#241C15" />
      </g>

      {/* === مرکز: ۳ حباب فکر === */}
      <g className="transition-transform duration-500 ease-out">
        {/* think 1 */}
        <g transform="translate(110,86)" className="animate-float-y-sm">
          <rect
            x="-18"
            y="-14"
            width="36"
            height="28"
            rx="6"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          {/* خط افقی جای‌نگهدار */}
          <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#241C15" strokeWidth="1.2" opacity="0.6" />
          <line x1="-12" y1="-1" x2="8" y2="-1" stroke="#241C15" strokeWidth="1.2" opacity="0.5" />
          <line x1="-12" y1="4" x2="10" y2="4" stroke="#241C15" strokeWidth="1.2" opacity="0.4" />
          <text
            x="-15"
            y="-19"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="700"
            fill="#88837C"
          >
            think
          </text>
        </g>

        {/* think 2 · صاعقه به آن خورده */}
        <g transform="translate(160,114)">
          <rect
            x="-20"
            y="-15"
            width="40"
            height="30"
            rx="6"
            fill="#FBE891"
            stroke="#241C15"
            strokeWidth="2"
          />
          <text
            x="0"
            y="-3"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fontWeight="800"
            fill="#241C15"
          >
            Wait.
          </text>
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fontWeight="600"
            fill="#241C15"
            opacity="0.65"
          >
            reflect
          </text>
        </g>

        {/* صاعقه (aha moment) از بالا-راست فرود می‌آید */}
        <g
          transform="translate(174,82)"
          className="origin-center animate-wiggle"
        >
          <polygon
            points="0,-14 5,-2 1,-2 6,12 -3,1 1,1 -4,-12"
            fill="#FF4D74"
            stroke="#241C15"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>

        {/* think 3 */}
        <g transform="translate(210,86)" className="animate-float-y-sm" style={{ animationDelay: "1s" }}>
          <rect
            x="-18"
            y="-14"
            width="36"
            height="28"
            rx="6"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <line x1="-12" y1="-6" x2="12" y2="-6" stroke="#241C15" strokeWidth="1.2" opacity="0.6" />
          <line x1="-12" y1="-1" x2="10" y2="-1" stroke="#241C15" strokeWidth="1.2" opacity="0.5" />
          <line x1="-12" y1="4" x2="8" y2="4" stroke="#241C15" strokeWidth="1.2" opacity="0.4" />
          <text
            x="-15"
            y="-19"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="700"
            fill="#88837C"
          >
            retry
          </text>
        </g>

        {/* خط نقطه‌چین بین سه حباب */}
        <g stroke="#241C15" strokeWidth="1" strokeDasharray="2 2.5" fill="none" opacity="0.55">
          <path d="M 128 88 Q 142 100 142 112" />
          <path d="M 178 112 Q 194 100 192 88" />
        </g>
      </g>

      {/* فلش think ← answer */}
      <g stroke="#241C15" strokeWidth="1.6" fill="none">
        <line x1="232" y1="100" x2="254" y2="100" strokeLinecap="round" />
        <polygon points="252,96 258,100 252,104" fill="#241C15" />
      </g>

      {/* === راست: کارت answer === */}
      <g
        transform="translate(280,100)"
        className="origin-center transition-transform duration-500 group-hover:translate-x-1"
      >
        <rect
          x="-22"
          y="-22"
          width="44"
          height="44"
          rx="6"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="-7"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          fill="#FBEFE3"
          opacity="0.75"
        >
          ANSWER
        </text>
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#F4D35E"
        >
          = 5
        </text>
      </g>

      {/* stamp کوچک ✓ بالا-راست، آویزان از گوشه کارت answer */}
      <g transform="translate(298,80)" className="origin-center transition-transform duration-500 group-hover:scale-125">
        <circle cx="0" cy="0" r="7" fill="#FF4D74" stroke="#241C15" strokeWidth="1.5" />
        <path
          d="M -3 0 L -1 2 L 3 -2"
          stroke="#FBEFE3"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* caption پایین */}
      <text
        x="160"
        y="192"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        think · reflect · answer
      </text>
    </CoverShell>
  );
};

export default DeepseekR1Cover;
