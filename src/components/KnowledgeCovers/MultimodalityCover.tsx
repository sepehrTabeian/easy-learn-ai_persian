/**
 * جلد Multimodality
 *
 * استعاره: یک تصویر به شبکه patch بریده می‌شود ← یک ردیف جریان token بیرون می‌آید ← همراه با متن بالا / موج صدای پایین وارد یک قاب مدل می‌شوند.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: یک"تصویر"رنگی کوچک (به سبک کیک 64×64) + شبکه patch با ابعاد 7×7 (dashed ← خط پیوسته on hover)
 *   - وسط: یک فلش dashed از تصویر بریده شده بیرون می‌آید ← به سمت رشته token می‌رود
 *   - بالا-راست: یک ردیف ۸ مربع کوچک token (teal/butter یک‌درمیان)
 *   - پایین-راست: یک ردیف موج صدای کوچک + یک ردیف سه frame پیاپی
 *   - stamp بالا-راست:"224→196"
 *   - mono پایین-چپ:"image patch ⊕ text ⊕ audio"
 *
 * hover: تصویر کمی"بالا می‌آید" + خطوط برش پررنگ می‌شوند + مربع‌های token به ترتیب pulse می‌شوند + موج صدا کمی حرکت می‌کند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const PATCH_GRID = 7; // شبکه برش 7×7
const IMG_X = 24;
const IMG_Y = 50;
const IMG_SIZE = 78;
const CELL = IMG_SIZE / PATCH_GRID;

const TOKEN_X = 156;
const TOKEN_Y = 52;
const TOKEN_W = 17;
const TOKEN_H = 22;
const TOKEN_GAP = 4;
const TOKEN_COLORS = ["#1B4B5A", "#1B4B5A", "#F4D35E", "#1B4B5A", "#F4D35E", "#1B4B5A", "#1B4B5A", "#F4D35E"];

const MultimodalityCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-coral" dotColor="#FBEFE3" dotOpacity={0.16}>
      {/* تزئین بالا: برچسب mono */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#FBEFE3"
        opacity="0.55"
      >
        <text x="24" y="36">image · text · audio → token</text>
      </g>

      {/* stamp بالا-راست */}
      <g
        transform="translate(282,24) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-12"
          width="56"
          height="24"
          rx="5"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#241C15"
        >
          224→196
        </text>
      </g>

      {/* چپ: تصویر کوچک + شبکه patch */}
      <g
        className="origin-center transition-transform duration-500 ease-out group-hover:-translate-y-1"
        style={{ transformBox: "fill-box" }}
      >
        {/* زمینه تصویر (سبک کیک: butter bg + کیک قرمز) */}
        <rect x={IMG_X} y={IMG_Y} width={IMG_SIZE} height={IMG_SIZE} rx="3" fill="#FBE891" stroke="#241C15" strokeWidth="1.8" />
        {/* کیک */}
        <rect x={IMG_X + 14} y={IMG_Y + 46} width={IMG_SIZE - 28} height="22" fill="#E07A5F" stroke="#241C15" strokeWidth="1" />
        <rect x={IMG_X + 18} y={IMG_Y + 36} width={IMG_SIZE - 36} height="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="1" />
        <rect x={IMG_X + 22} y={IMG_Y + 26} width={IMG_SIZE - 44} height="10" fill="#FF4D74" stroke="#241C15" strokeWidth="1" />
        {/* شمع */}
        <line x1={IMG_X + 30} y1={IMG_Y + 18} x2={IMG_X + 30} y2={IMG_Y + 26} stroke="#241C15" strokeWidth="1.4" />
        <line x1={IMG_X + 48} y1={IMG_Y + 18} x2={IMG_X + 48} y2={IMG_Y + 26} stroke="#241C15" strokeWidth="1.4" />
        <circle cx={IMG_X + 30} cy={IMG_Y + 16} r="1.8" fill="#F4D35E" stroke="#241C15" strokeWidth="0.6" />
        <circle cx={IMG_X + 48} cy={IMG_Y + 16} r="1.8" fill="#F4D35E" stroke="#241C15" strokeWidth="0.6" />

        {/* خطوط برش شبکه patch */}
        <g
          stroke="#241C15"
          strokeWidth="0.7"
          strokeDasharray="1.5 2"
          opacity="0.55"
          className="transition-opacity duration-500 group-hover:opacity-95 group-hover:[stroke-dasharray:0]"
        >
          {Array.from({ length: PATCH_GRID + 1 }).map((_, i) => (
            <g key={i}>
              <line
                x1={IMG_X + i * CELL}
                y1={IMG_Y}
                x2={IMG_X + i * CELL}
                y2={IMG_Y + IMG_SIZE}
              />
              <line
                x1={IMG_X}
                y1={IMG_Y + i * CELL}
                x2={IMG_X + IMG_SIZE}
                y2={IMG_Y + i * CELL}
              />
            </g>
          ))}
        </g>
      </g>

      {/* برچسب تصویر: 7×7 = 49 */}
      <g
        transform={`translate(${IMG_X + IMG_SIZE / 2}, ${IMG_Y + IMG_SIZE + 14})`}
      >
        <rect
          x="-22"
          y="-9"
          width="44"
          height="16"
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.4"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          7×7=49
        </text>
      </g>

      {/* وسط: فلش جریان dashed (تصویر ← ردیف token) */}
      <g
        fill="none"
        stroke="#FBEFE3"
        strokeWidth="1.6"
        strokeDasharray="3 3"
        className="group-hover:[animation:dashFlow_1.2s_linear_infinite]"
      >
        <path d={`M ${IMG_X + IMG_SIZE + 4} ${IMG_Y + 30} Q ${TOKEN_X - 12} ${IMG_Y + 30} ${TOKEN_X - 4} ${TOKEN_Y + TOKEN_H / 2}`} />
      </g>
      <polygon points={`${TOKEN_X - 4},${TOKEN_Y + TOKEN_H / 2 - 4} ${TOKEN_X + 2},${TOKEN_Y + TOKEN_H / 2} ${TOKEN_X - 4},${TOKEN_Y + TOKEN_H / 2 + 4}`} fill="#FBEFE3" />

      {/* بالا-راست: ردیف token (۸ مربع) */}
      <g>
        {TOKEN_COLORS.map((c, i) => (
          <rect
            key={i}
            x={TOKEN_X + i * (TOKEN_W + TOKEN_GAP)}
            y={TOKEN_Y}
            width={TOKEN_W}
            height={TOKEN_H}
            rx="3"
            fill={c}
            stroke="#241C15"
            strokeWidth="1.4"
            className="origin-center"
            style={{
              transformBox: "fill-box",
              animation: `floatYSm 4.5s ${i * 0.12}s ease-in-out infinite`,
            }}
          />
        ))}
      </g>

      {/* برچسب token بالا-راست */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="8"
        fill="#FBEFE3"
        opacity="0.7"
      >
        <text x={TOKEN_X} y={TOKEN_Y - 5}>token stream</text>
      </g>

      {/* وسط-راست: موج صدا (۵ خط عمودی با ارتفاع‌های مختلف) */}
      <g
        transform={`translate(${TOKEN_X + 4}, ${TOKEN_Y + 50})`}
        className="transition-transform duration-500 group-hover:translate-y-1"
      >
        <g
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#FBEFE3"
          opacity="0.6"
        >
          <text x="0" y="-4">audio</text>
        </g>
        {[10, 18, 7, 14, 22, 12, 16, 9, 13, 20, 11, 16, 8].map((h, i) => (
          <rect
            key={i}
            x={i * 6}
            y={(24 - h) / 2}
            width="3"
            height={h}
            rx="1"
            fill="#241C15"
            stroke="#241C15"
            strokeWidth="0.8"
          />
        ))}
      </g>

      {/* پایین-راست: ۳ frame ویدئو */}
      <g transform={`translate(${TOKEN_X + 4}, ${TOKEN_Y + 96})`}>
        <g
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#FBEFE3"
          opacity="0.6"
        >
          <text x="0" y="-4">video · 3 frames</text>
        </g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 36}, 0)`}>
            <rect
              x="0"
              y="0"
              width="30"
              height="20"
              rx="2"
              fill="#FBEFE3"
              stroke="#241C15"
              strokeWidth="1.4"
            />
            {/* یک تپه کوچک نماینده تصویر */}
            <polygon
              points="3,17 12,7 18,12 27,17"
              fill="#1B4B5A"
              opacity="0.8"
            />
            <circle cx="24" cy="5" r="2" fill="#F4D35E" stroke="#241C15" strokeWidth="0.6" />
          </g>
        ))}
      </g>

      {/* پایین-چپ: نوار برچسب mono سه‌حالتی */}
      <g transform="translate(20,180) rotate(-3)" className="origin-left">
        <rect
          x="-2"
          y="-8"
          width="92"
          height="14"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="44"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1"
          fill="#FBEFE3"
        >
          img ⊕ txt ⊕ aud
        </text>
      </g>
    </CoverShell>
  );
};

export default MultimodalityCover;
