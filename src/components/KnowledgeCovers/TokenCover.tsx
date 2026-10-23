/**
 * جلد Token
 *
 * استعاره: «۱ کلمه انگلیسی ≠ ۱ token». یک خط «strawberry» با دو خط برش به ۳ قطعه تقسیم شده،
 *       زیر هر قطعه یک شماره token id آویزان است.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - بالا وسط: کل کلمه «strawberry» (فونت display، پس‌زمینه با حاشیه cream)، دو خط برش dashed از آن عبور می‌کنند
 *   - پایین وسط: ۳ بلوک رنگی token: «str» (butter)، «aw» (coral)، «berry» (teal)،
 *           زیر هر بلوک یک عدد id با mono
 *   - بالا-راست: مهر «1 → 3 tokens» (رنگ pop)
 *   - پایین-چپ: برچسب کوچک BPE / vocab 199,997
 *   - بالا-چپ: برچسب کوچک قیچی
 *
 * نکات تمایز با NlpCover:
 *   ─ تصویر اصلی Nlp «کادر ورودی ← ۵ token ← ستون بردار ← y» است، یعنی کل زنجیره
 *   ─ تصویر اصلی Token روی عمل «بریده شدن کلمه» تمرکز دارد —— ۱ کلمه انگلیسی به ۳ قطعه بریده می‌شود + id هر کدام
 *
 * hover: ۳ بلوک رنگی به ترتیب بالا و پایین جابه‌جا می‌شوند (mimic پخش شدن پس از برش)، dash روان خطوط برش سریع‌تر می‌شود.
 */
import React from "react";
import CoverShell from "./CoverShell";

const PIECES: { text: string; tone: string; textColor: string; id: string }[] = [
  { text: "str", tone: "#F4D35E", textColor: "#241C15", id: "496" },
  { text: "aw", tone: "#E07A5F", textColor: "#FBEFE3", id: "2114" },
  { text: "berry", tone: "#1B4B5A", textColor: "#FBEFE3", id: "37738" },
];

const TokenCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* بالا-راست: مهر 1 → 3 tokens */}
      <g
        transform="translate(280,28) rotate(8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-32"
          y="-12"
          width="64"
          height="24"
          rx="4"
          fill="#FF4D74"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="1.0"
          fill="#FBEFE3"
        >
          1 → 3 tok
        </text>
      </g>

      {/* پایین-چپ: برچسب BPE */}
      <g transform="translate(28,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="92"
          height="14"
          rx="3"
          fill="#241C15"
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
          letterSpacing="0.6"
          fill="#F4D35E"
        >
          BPE · o200k 199,997
        </text>
      </g>

      {/* بالا-چپ: icon قیچی (SVG دست‌نویس، برای پرهیز از وابستگی به lucide) */}
      <g
        transform="translate(36,40) rotate(-12)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[4deg]"
      >
        <circle cx="-4" cy="-2" r="4" fill="none" stroke="#241C15" strokeWidth="1.6" />
        <circle cx="-4" cy="6" r="4" fill="none" stroke="#241C15" strokeWidth="1.6" />
        <line x1="0" y1="-2" x2="14" y2="2" stroke="#241C15" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="0" y1="6" x2="14" y2="2" stroke="#241C15" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* بالا وسط: کل کلمه «strawberry» + دو خط برش */}
      <g transform="translate(160,80)">
        {/* نوار سفید پس‌زمینه */}
        <rect
          x="-110"
          y="-22"
          width="220"
          height="44"
          rx="8"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* کلمه */}
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="26"
          fontWeight="800"
          letterSpacing="-0.4"
          fill="#241C15"
        >
          strawberry
        </text>
        {/* دو خط برش (موقعیت مطابق مرزهای str|aw|berry) */}
        <line
          x1="-46"
          y1="-30"
          x2="-46"
          y2="30"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 3"
          className="animate-dash-flow"
        />
        <line
          x1="-18"
          y1="-30"
          x2="-18"
          y2="30"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 3"
          className="animate-dash-flow"
        />
      </g>

      {/* فلش کوچک بین خط برش ← قطعه */}
      <g>
        <line
          x1="160"
          y1="108"
          x2="160"
          y2="124"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <polygon points="157,121 163,121 160,127" fill="#241C15" />
      </g>

      {/* پایین وسط: ۳ بلوک رنگی token + id */}
      {PIECES.map((p, i) => {
        const totalWidth = 200;
        const gap = 8;
        const widthMap = [44, 36, 76]; // str / aw / berry · بر اساس عرض کاراکتر
        let xOffset = -totalWidth / 2;
        for (let j = 0; j < i; j++) xOffset += widthMap[j] + gap;
        const x = 160 + xOffset + widthMap[i] / 2;
        return (
          <g
            key={p.text}
            transform={`translate(${x}, 148)`}
            className="origin-center transition-transform duration-500 group-hover:translate-y-1"
            style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
          >
            {/* بلوک token */}
            <rect
              x={-widthMap[i] / 2}
              y={-14}
              width={widthMap[i]}
              height={28}
              rx="5"
              fill={p.tone}
              stroke="#241C15"
              strokeWidth="2"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="14"
              fontWeight="800"
              fill={p.textColor}
            >
              {p.text}
            </text>
            {/* عدد id */}
            <text
              x="0"
              y="29"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9.5"
              fontWeight="700"
              letterSpacing="0.4"
              fill="#88837C"
            >
              #{p.id}
            </text>
          </g>
        );
      })}

      {/* caption پایین */}
      <text
        x="160"
        y="194"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.5"
      >
        1 word ≠ 1 token · زیرکلمه کوچک‌ترین واحدی است که مدل می‌خواند
      </text>
    </CoverShell>
  );
};

export default TokenCover;
