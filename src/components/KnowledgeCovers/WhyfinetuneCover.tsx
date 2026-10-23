/**
 * جلد Whyfinetune
 *
 * استعاره: یک نقطه تصمیم ایستاده در یک دوراهی سه‌طرفه —— انتخاب یکی از context طولانی / RAG / تنظیم دقیق.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز: یک نقطه تصمیم دایره‌ای ink-stamp، با «?» + عقربه داخلی
 *   - سه مسیر stroke-dashed به سه طرف امتداد دارند (مسیرها با سه رنگ تم)
 *   - در انتهای مسیرها ۳ آیکون کوچک:
 *       چپ   · کادر prompt با butter      (context طولانی)
 *       بالا-راست · استوانه پایگاه داده coral      (RAG)
 *       پایین-راست · وزنه چرخ‌دنده teal         (تنظیم دقیق)
 *   - تزئین: sparkle پایین-چپ، مربع کوچک بالا-راست، متن mono پایین
 *
 * hover: عقربه نقطه تصمیم آرام تاب می‌خورد + dashOffset سه مسیر جریان می‌یابد، سه هدف کمی بزرگ و کوچک می‌شوند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const WhyfinetuneCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* تزئین: sparkle پایین-چپ */}
      <g
        transform="translate(30,170) rotate(10)"
        className="origin-center transition-transform duration-700 group-hover:rotate-90"
      >
        <path
          d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.1"
        />
      </g>

      {/* تزئین: مربع کوچک بالا-راست */}
      <g transform="translate(296,32) rotate(15)">
        <rect
          x="-5"
          y="-5"
          width="10"
          height="10"
          rx="2"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="1.4"
        />
      </g>

      {/* سه مسیر (dashed) —— از مرکز (160,108) شروع می‌شوند */}
      <g
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="4 5"
        className="transition-[stroke-dashoffset] duration-700 group-hover:[stroke-dashoffset:-18px]"
      >
        {/* به چپ · context طولانی · butter */}
        <path d="M 142 108 Q 110 108 80 108" stroke="#E5BD3A" />
        {/* به بالا-راست · RAG · coral */}
        <path d="M 178 96 Q 210 76 244 56" stroke="#E07A5F" />
        {/* به پایین-راست · تنظیم دقیق · teal */}
        <path d="M 178 122 Q 210 142 244 162" stroke="#1B4B5A" />
      </g>

      {/* برچسب نقطه پایانی مسیر (mono کوچک) */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="7.5"
        fontWeight="700"
        fill="#241C15"
        opacity="0.55"
        letterSpacing="0.8"
      >
        <text x="80" y="98" textAnchor="middle">CONTEXT</text>
        <text x="244" y="44" textAnchor="middle">RAG</text>
        <text x="244" y="178" textAnchor="middle">FINE-TUNE</text>
      </g>

      {/* ① نقطه پایانی چپ · کادر prompt (context طولانی) */}
      <g
        transform="translate(54,108)"
        className="transition-transform duration-500 ease-out group-hover:scale-110 origin-center"
      >
        <rect
          x="-20"
          y="-14"
          width="40"
          height="28"
          rx="4"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* سه خط متن */}
        <line x1="-14" y1="-6" x2="14" y2="-6" stroke="#241C15" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <line x1="-14" y1="0" x2="9" y2="0" stroke="#241C15" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        <line x1="-14" y1="6" x2="12" y2="6" stroke="#241C15" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
        {/* > نماد به‌عنوان prompt indicator */}
        <text
          x="-26"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="800"
          fill="#241C15"
        >
          {">"}
        </text>
      </g>

      {/* ② نقطه پایانی بالا-راست · استوانه پایگاه داده (RAG) */}
      <g
        transform="translate(264,72)"
        className="transition-transform duration-500 ease-out group-hover:-translate-y-1 origin-center"
      >
        {/* سینی سایه */}
        <ellipse cx="0" cy="20" rx="20" ry="5" fill="#241C15" opacity="0.15" />
        {/* بدنه استوانه */}
        <rect x="-20" y="-12" width="40" height="26" rx="2" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
        {/* ellipse بالا */}
        <ellipse cx="0" cy="-12" rx="20" ry="5.5" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
        {/* هایلایت بالا */}
        <ellipse cx="0" cy="-12" rx="20" ry="5.5" fill="#FBEFE3" opacity="0.25" />
        {/* خط جداکننده میانی */}
        <ellipse cx="0" cy="-2" rx="20" ry="5" fill="none" stroke="#241C15" strokeWidth="1.4" opacity="0.55" />
        <ellipse cx="0" cy="8" rx="20" ry="5" fill="none" stroke="#241C15" strokeWidth="1.4" opacity="0.4" />
      </g>

      {/* ③ نقطه پایانی پایین-راست · چرخ‌دنده (تنظیم دقیق) */}
      <g
        transform="translate(264,140)"
        className="transition-transform duration-700 ease-out origin-center group-hover:rotate-45"
      >
        {/* دندانه‌ها (۸ عدد) */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI * 2) / 8;
          const x1 = Math.cos(a) * 12;
          const y1 = Math.sin(a) * 12;
          const x2 = Math.cos(a) * 18;
          const y2 = Math.sin(a) * 18;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#241C15"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
        {/* مرکز دایره */}
        <circle cx="0" cy="0" r="14" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
      </g>

      {/* ④ نقطه تصمیم مرکزی (برجسته‌ترین، آخر قرار می‌گیرد تا در لایه بالا باشد) */}
      <g transform="translate(160,108)">
        {/* دایره بزرگ ink-stamp */}
        <circle cx="0" cy="0" r="22" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.4" />
        {/* دایره داخلی butter */}
        <circle cx="0" cy="0" r="15" fill="#F4D35E" stroke="#241C15" strokeWidth="1.8" />
        {/* متن ? */}
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="20"
          fontWeight="800"
          fill="#241C15"
        >
          ?
        </text>
        {/* عقربه تصمیم (در hover تاب می‌خورد) */}
        <g
          className="origin-center transition-transform duration-700 ease-out group-hover:rotate-[20deg]"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-19"
            stroke="#E07A5F"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.65"
          />
          <polygon points="-2.5,-16 2.5,-16 0,-22" fill="#E07A5F" opacity="0.75" />
        </g>
      </g>

      {/* caption با mono در پایین */}
      <text
        x="160"
        y="194"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="7.5"
        letterSpacing="3.2"
        fontWeight="700"
        fill="#241C15"
        opacity="0.4"
      >
        PICK YOUR FORK · CONTEXT / RAG / FT
      </text>
    </CoverShell>
  );
};

export default WhyfinetuneCover;
