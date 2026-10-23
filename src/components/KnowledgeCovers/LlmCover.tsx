/**
 * جلد LLM
 *
 * استعاره: مدل بزرگ = یک «مغز» پر از نورون‌های بی‌شمار که از چپ token می‌خورد و از راست token بیرون می‌دهد.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - دایره بزرگ مرکزی = مغز (پس‌زمینه سفید / حاشیه ink / ماتریس نقطه‌ای نورون 8×8 داخلی + هایلایت coral)
 *   - ۴ مربع token با فونت mono در چپ ("درک آسان هوش مصنوعی") ←  مغز
 *   - مغز ← ۴ مربع token در راست ("L L M ✦"）
 *   - یک کمان coral در بالا (نشان‌دهنده جریان attention)
 *   - تزئین: sparkle بالا-راست، مربع کوچک پایین-چپ
 *
 * رفتار hover: حلقه بیرونی مغز کمی گسترش می‌یابد؛ tokenهای چپ و راست هر کدام 2px به سمت مرکز جابه‌جا می‌شوند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const LlmCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* کمان تزئینی بالا —— جریان attention */}
      <path
        d="M 30 30 Q 160 -8 290 30"
        stroke="#E07A5F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.55"
      />

      {/* تزئین: sparkle بالا-راست */}
      <g transform="translate(285,28) rotate(15)" className="origin-center transition-transform duration-700 group-hover:rotate-45">
        <path
          d="M 0 -8 L 1.5 -1.5 L 8 0 L 1.5 1.5 L 0 8 L -1.5 1.5 L -8 0 L -1.5 -1.5 Z"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.2"
        />
      </g>

      {/* تزئین: مربع کوچک پایین-چپ */}
      <g transform="translate(30,170) rotate(-12)" className="origin-center transition-transform duration-500 group-hover:-rotate-2">
        <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* رشته token ورودی در چپ */}
      <g className="transition-transform duration-500 ease-out group-hover:translate-x-1">
        {[
          { y: 50, label: "درک" },
          { y: 82, label: "آسان" },
          { y: 114, label: "هوش" },
          { y: 146, label: "مصنوعی" },
        ].map((t, i) => (
          <g key={`in-${i}`} transform={`translate(30, ${t.y})`}>
            <rect
              x="0"
              y="-12"
              width="32"
              height="24"
              rx="5"
              fill="#FBEFE3"
              stroke="#241C15"
              strokeWidth="2"
            />
            <text
              x="16"
              y="5"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#241C15"
            >
              {t.label}
            </text>
            {/* خطوط باریک متصل به مغز */}
            <line x1="34" y1="0" x2="105" y2="100" stroke="#241C15" strokeWidth="0.8" opacity="0.22" />
          </g>
        ))}
      </g>

      {/* مرکز: مغز */}
      <g transform="translate(160,100)">
        {/* حلقه گسترش در hover */}
        <circle
          cx="0"
          cy="0"
          r="50"
          fill="none"
          stroke="#E07A5F"
          strokeWidth="2"
          opacity="0"
          className="transition-all duration-500 group-hover:opacity-60 group-hover:r-[58]"
          style={{ transformOrigin: "center" }}
        />
        {/* دایره اصلی */}
        <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.5" />
        {/* clipPath ماتریس نورون را درون دایره محدود می‌کند */}
        <defs>
          <clipPath id="llm-brain-clip">
            <circle cx="0" cy="0" r="42" />
          </clipPath>
        </defs>
        <g clipPath="url(#llm-brain-clip)">
          {/* ۸ ستون × ۸ ردیف نورون */}
          {Array.from({ length: 8 }).flatMap((_, i) =>
            Array.from({ length: 8 }).map((_, j) => {
              const x = -42 + i * 12 + 6;
              const y = -42 + j * 12 + 6;
              /* با هش قطعی چند نقطه هایلایت انتخاب می‌شوند تا در هر رندر نلرزند */
              const seed = (i * 31 + j * 17) % 13;
              const highlight = seed === 1 || seed === 5 || seed === 9;
              const med = seed === 3 || seed === 7;
              return (
                <circle
                  key={`n-${i}-${j}`}
                  cx={x}
                  cy={y}
                  r={highlight ? 2.2 : med ? 1.8 : 1.4}
                  fill={highlight ? "#E07A5F" : med ? "#241C15" : "#241C15"}
                  opacity={highlight ? 1 : med ? 0.55 : 0.22}
                />
              );
            }),
          )}
        </g>
        {/* برچسب LLM */}
        <rect
          x="-22"
          y="34"
          width="44"
          height="18"
          rx="9"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="46"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          LLM
        </text>
      </g>

      {/* رشته token خروجی در راست */}
      <g className="transition-transform duration-500 ease-out group-hover:-translate-x-1">
        {[
          { y: 50, label: "قابل", tone: "ink" },
          { y: 82, label: "فهم", tone: "ink" },
          { y: 114, label: "و", tone: "coral" },
          { y: 146, label: "！", tone: "ink" },
        ].map((t, i) => (
          <g key={`out-${i}`} transform={`translate(258, ${t.y})`}>
            {/* خطوط باریک متصل به مغز */}
            <line x1="-3" y1="0" x2="-58" y2="0" stroke="#241C15" strokeWidth="0.8" opacity="0.22" />
            <rect
              x="0"
              y="-12"
              width="32"
              height="24"
              rx="5"
              fill={t.tone === "coral" ? "#E07A5F" : "#FFFFFF"}
              stroke="#241C15"
              strokeWidth="2"
            />
            <text
              x="16"
              y="5"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill={t.tone === "coral" ? "#FBEFE3" : "#241C15"}
            >
              {t.label}
            </text>
          </g>
        ))}
      </g>
    </CoverShell>
  );
};

export default LlmCover;
