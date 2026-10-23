/**
 * جلد Chain of Thought
 *
 * استعاره: زنجیره فکر = رشته‌ای از گام‌های استدلالی پیوسته (سؤال ← ۱ ← ۲ ← پاسخ)، گام‌به‌گام تا پاسخ پیش می‌رود؛
 *       در بالا به‌طور کم‌رنگ یک کمان «پرش مستقیم به پاسخ» برای مقایسه کشیده شده (با ✕) تا نشان دهد «استدلال گام‌به‌گام» مطمئن‌تر است.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - ردیف بالا: نقطه سؤال ← کمان نقطه‌چین با دهانه بزرگ (یک پرش) ← بلوک پاسخ (✕)، کل آن تیره‌تر
 *   - ردیف اصلی: ۴ بلوک گوشه‌گرد بنفش pop با فلش‌های اتصال به هم وصل شده‌اند، بلوک آخر با پس‌زمینه butter + ✓
 *
 * رفتار hover: گره‌های زنجیره اصلی با فاصله زمانی آرام بالا می‌روند + ✓ بلوک آخر یک پرش می‌کند؛ کمان «یک پرش» بالا پایین می‌رود و کم‌رنگ می‌شود.
 * رنگ‌ها فقط از token استفاده می‌کنند؛ حاشیه‌ها یکسان #241C15.
 */
import React from "react";
import CoverShell from "./CoverShell";

const ChainOfThoughtCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* ── ردیف بالا: پرش مستقیم (مقایسه، تیره‌شده) ── */}
      <g opacity="0.4" className="transition-transform duration-500 ease-spring group-hover:translate-y-1">
        {/* نقطه سؤال */}
        <circle cx="46" cy="52" r="9" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
        {/* کمان یک پرش */}
        <path
          d="M 58 50 Q 165 6 262 48"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <path d="M 254 42 L 264 49 L 253 53" fill="none" stroke="#241C15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* بلوک پاسخ + ✕ */}
        <g transform="translate(284,52)">
          <rect x="-16" y="-13" width="32" height="26" rx="7" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
          <path d="M -5 -5 L 5 5 M 5 -5 L -5 5" stroke="#FF4D74" strokeWidth="2.6" strokeLinecap="round" />
        </g>
        <text
          x="150"
          y="22"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#241C15"
        >
          پاسخ مستقیم
        </text>
      </g>

      {/* ── ردیف اصلی: زنجیره استدلال ── */}
      {/* فلش اتصال (اول رسم می‌شود، زیر گره‌ها) */}
      {[
        [70, 130],
        [148, 208],
        [226, 286],
      ].map(([x1, x2], i) => (
        <g key={i}>
          <line x1={x1} y1="128" x2={x2 - 4} y2="128" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d={`M ${x2 - 9} 123 L ${x2 - 1} 128 L ${x2 - 9} 133`}
            fill="none"
            stroke="#241C15"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      <ChainNode cx={44} label="سؤال" tone="q" delay={0} />
      <ChainNode cx={122} label="1" tone="step" delay={90} />
      <ChainNode cx={200} label="2" tone="step" delay={180} />
      <ChainNode cx={278} label="پاسخ" tone="answer" delay={270} check />

      {/* برچسب ردیف اصلی */}
      <text
        x="160"
        y="178"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif"
        fontSize="11"
        fontWeight="800"
        fill="#241C15"
      >
        اول فکر کن بعد جواب بده · گام‌به‌گام
      </text>
    </CoverShell>
  );
};

const ChainNode: React.FC<{
  cx: number;
  label: string;
  tone: "q" | "step" | "answer";
  delay: number;
  check?: boolean;
}> = ({ cx, label, tone, delay, check }) => {
  const fill = tone === "q" ? "#1B4B5A" : tone === "answer" ? "#F4D35E" : "#7A28CB";
  const fg = tone === "answer" ? "#241C15" : "#FBEFE3";
  return (
    <g transform={`translate(${cx},128)`}>
      <g
        className="transition-transform duration-500 ease-spring group-hover:-translate-y-1.5"
        style={{ transitionDelay: `${delay}ms`, transformBox: "fill-box", transformOrigin: "center" }}
      >
        {/* سایه */}
        <rect x="-22" y="-19" width="44" height="38" rx="9" fill="#241C15" transform="translate(2.5,2.5)" opacity="0.9" />
        {/* بدنه اصلی */}
        <rect x="-22" y="-19" width="44" height="38" rx="9" fill={fill} stroke="#241C15" strokeWidth="2.5" />
        <text
          x="0"
          y={check ? -2 : 5}
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Vazirmatn, sans-serif"
          fontSize="15"
          fontWeight="800"
          fill={fg}
        >
          {label}
        </text>
        {check && (
          <g transform="translate(0,9)" className="origin-center transition-transform duration-300 ease-spring group-hover:scale-125" style={{ transformBox: "fill-box" }}>
            <path d="M -5 0 L -1.5 3.5 L 5 -4" fill="none" stroke="#241C15" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    </g>
  );
};

export default ChainOfThoughtCover;
