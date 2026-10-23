/**
 * جلد Epochs
 *
 * استعاره: دو منحنی loss برای train / val + نشانگر بهترین نقطه توقف زودهنگام.
 *   train همیشه پایین می‌رود، val اول پایین و بعد بالا می‌رود —— بیش‌برازش U شکل نماد «تعداد دوره‌های آموزش» است.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - پس‌زمینه: butter، با نقاط شبکه تیره
 *   - ۴ درجه‌بندی عمودی epoch (e=1/4/8/12)
 *   - یک خط پیوسته train (ink) از بالای چپ به پایین راست
 *   - یک خط نقطه‌چین val (coral) از بالای چپ تا پایینِ وسط و دوباره بالا
 *   - خط عمودی best epoch در وسط + stamp به رنگ teal «best · e=4»
 *   - بالا-راست: stamp با butter «N epochs»
 *   - پایین-چپ: legend با mono «train · val»
 *
 * رفتار hover: نقطه cursor کمی به راست می‌رود، best stamp کمی می‌پرد.
 */
import React from "react";
import CoverShell from "./CoverShell";

/* نگاشت پیشرفت epoch در [0..1] به مختصات x در SVG */
function toX(p: number): number {
  return 38 + p * 248;
}
/* loss ∈ [0..1] ← SVG y ∈ [50..160]؛ هرچه loss کمتر، y بیشتر (پایین نمودار) */
function yFromLoss(loss: number): number {
  return 160 - loss * 110;
}

/* تولید منحنی train (نزولی یکنواخت + نوسان) */
function trainPath(): string {
  const N = 32;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    const loss = Math.exp(-2.4 * p) * 0.85 + 0.12;
    pts.push(`${toX(p).toFixed(1)} ${yFromLoss(loss).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

/* منحنی val (اول نزولی بعد صعودی) · best در p≈0.32 */
function valPath(): string {
  const N = 32;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    const base = Math.exp(-2.0 * p) * 0.78 + 0.22;
    const overfit = p > 0.32 ? 0.55 * Math.pow(p - 0.32, 1.4) : 0;
    const loss = base + overfit;
    pts.push(`${toX(p).toFixed(1)} ${yFromLoss(loss).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const BEST_P = 0.32;

const EpochsCover: React.FC = () => {
  const trainD = trainPath();
  const valD = valPath();

  /* val loss در نقطه best = base(0.32) */
  const bestValLoss = Math.exp(-2.0 * BEST_P) * 0.78 + 0.22;
  const bestX = toX(BEST_P);
  const bestY = yFromLoss(bestValLoss);

  /* loss مربوط به train در نقطه best */
  const bestTrainLoss = Math.exp(-2.4 * BEST_P) * 0.85 + 0.12;
  const bestTrainY = yFromLoss(bestTrainLoss);

  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* بالا-راست: stamp با epochs */}
      <g
        transform="translate(286,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-30"
          y="-11"
          width="60"
          height="22"
          rx="4"
          fill="#E07A5F"
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
          fill="#FBEFE3"
        >
          N epochs
        </text>
      </g>

      {/* بالا-چپ: برچسب train / val */}
      <g transform="translate(40,30)">
        <rect
          x="-3"
          y="-9"
          width="106"
          height="16"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="50"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1"
          fill="#F4D35E"
        >
          train · val loss
        </text>
      </g>

      {/* محورهای مختصات */}
      <line x1="38" y1="160" x2="288" y2="160" stroke="#241C15" strokeWidth="1.6" />
      <line x1="38" y1="50" x2="38" y2="160" stroke="#241C15" strokeWidth="1.6" />

      {/* درجه‌بندی epoch */}
      {[0.07, 0.32, 0.6, 0.88].map((p, i) => (
        <g key={`tick-${i}`}>
          <line
            x1={toX(p)}
            x2={toX(p)}
            y1="160"
            y2="164"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x={toX(p)}
            y="174"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fill="#88837C"
          >
            e{[1, 4, 8, 12][i]}
          </text>
        </g>
      ))}

      {/* رنگ زمینه ناحیه بیش‌برازش (قرمز کم‌رنگ از best تا راست) */}
      <rect x={bestX} y="50" width={288 - bestX} height="110" fill="#E07A5F" fillOpacity="0.1" />

      {/* منحنی train (خط پیوسته ink) */}
      <path
        d={trainD}
        fill="none"
        stroke="#241C15"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* منحنی val (نقطه‌چین coral) */}
      <path
        d={valD}
        fill="none"
        stroke="#1B4B5A"
        strokeWidth="2.4"
        strokeDasharray="5 3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* خط نقطه‌چین عمودی best */}
      <line
        x1={bestX}
        x2={bestX}
        y1="50"
        y2="160"
        stroke="#241C15"
        strokeWidth="1.4"
        strokeDasharray="3 3"
        opacity="0.55"
      />

      {/* دو نقطه روی نقطه best */}
      <circle
        cx={bestX}
        cy={bestTrainY}
        r="4.5"
        fill="#FBEFE3"
        stroke="#241C15"
        strokeWidth="1.8"
      />
      <circle
        cx={bestX}
        cy={bestY}
        r="4.8"
        fill="#1B4B5A"
        stroke="#241C15"
        strokeWidth="1.8"
      />

      {/* best stamp */}
      <g
        transform={`translate(${bestX},42) rotate(-3)`}
        className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
      >
        <rect
          x="-32"
          y="-10"
          width="64"
          height="18"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.6"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#FBEFE3"
        >
          best · e=4
        </text>
      </g>

      {/* متن کوچک پایین · توضیح محور */}
      <text
        x="163"
        y="190"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        epoch → · train ↓ val ↘↗
      </text>

      {/* متن loss روی محور y */}
      <text
        x="30"
        y="52"
        textAnchor="end"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#241C15"
        fontWeight="600"
      >
        loss
      </text>

      {/* نقطه کوچک legend · train */}
      <g transform="translate(208,184)">
        <line x1="0" x2="14" y1="0" y2="0" stroke="#241C15" strokeWidth="2" />
        <text
          x="18"
          y="3"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#241C15"
        >
          train
        </text>
      </g>
      <g transform="translate(252,184)">
        <line
          x1="0"
          x2="14"
          y1="0"
          y2="0"
          stroke="#1B4B5A"
          strokeWidth="2"
          strokeDasharray="3 2"
        />
        <text
          x="18"
          y="3"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#241C15"
        >
          val
        </text>
      </g>
    </CoverShell>
  );
};

export default EpochsCover;
