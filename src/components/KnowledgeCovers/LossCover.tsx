/**
 * جلد Loss
 *
 * استعاره: یک منحنی loss آموزش که مدام پایین می‌آید + توپ کوچک step فعلی + هدف «← 0».
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - پس‌زمینه: coral، با نقاط شبکه تیره
 *   - تصویر اصلی: ۳ منحنی کاهش loss (۲ مسیر تاریخی کم‌رنگ، ۱ خط اصلی ضخیم + توپ)
 *   - انتهای خط اصلی ← برچسب 0 (stamp به رنگ teal)
 *   - بالا-راست: stamp عدد loss فعلی (butter)
 *   - پایین-چپ: mono "training step →"
 *
 * رفتار hover: توپ به لغزیدن به سمت 0 ادامه می‌دهد (جابه‌جایی به پایین-راست)، مسیرهای تاریخی کمی محو می‌شوند.
 */
import React from "react";
import CoverShell from "./CoverShell";

/* تولید SVG path برای یک منحنی loss-decay · فرمول y = y0 * exp(-k * (x - x0)/L) + asymp + noise */
function decayPath(
  x0: number,
  y0: number,
  asymp: number,
  k: number,
  xEnd: number,
  L: number,
  seed: number,
  amp: number,
): string {
  const N = 28;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = x0 + (i / N) * (xEnd - x0);
    const t = (x - x0) / L;
    const noise = Math.sin(i * (7.3 + seed * 0.3) + seed * 11.7) * amp;
    const y = y0 * Math.exp(-k * t) + asymp + noise;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const LossCover: React.FC = () => {
  /* منحنی اصلی: کاهش از (45, 50) به (280, ~160) */
  const main = decayPath(45, 110, 50, 2.6, 280, 235, 1, 1.4);
  const past1 = decayPath(45, 100, 70, 2.2, 280, 235, 3, 1.8);
  const past2 = decayPath(45, 95, 85, 1.8, 280, 235, 5, 2.4);

  /* موقعیت توپ = انتهای منحنی اصلی */
  const ballX = 268;
  const ballY = 155;

  return (
    <CoverShell bgClassName="bg-coral" dotColor="#241C15" dotOpacity={0.1}>
      {/* تزئین eyebrow بالا-چپ · یک گروه عدد نزولی */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#241C15"
        opacity="0.5"
        className="transition-opacity duration-500 group-hover:opacity-25"
      >
        <text x="38" y="34">3.21</text>
        <text x="76" y="42">2.08</text>
        <text x="118" y="50">1.34</text>
        <text x="160" y="58">0.81</text>
      </g>

      {/* بالا-راست: stamp با loss فعلی (butter) */}
      <g
        transform="translate(282,30) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-12"
          width="56"
          height="24"
          rx="5"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="-1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#241C15"
          opacity="0.7"
        >
          LOSS
        </text>
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#241C15"
        >
          0.32
        </text>
      </g>

      {/* محورهای مختصات */}
      <g stroke="#241C15" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
        {/* محور x */}
        <line x1="36" y1="175" x2="295" y2="175" />
        {/* محور y */}
        <line x1="36" y1="40" x2="36" y2="175" />
      </g>

      {/* درجه‌بندی محور y */}
      <g
        stroke="#241C15"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="2 4"
      >
        <line x1="36" y1="80" x2="295" y2="80" />
        <line x1="36" y1="120" x2="295" y2="120" />
        <line x1="36" y1="160" x2="295" y2="160" />
      </g>

      {/* مسیرهای تاریخی (کم‌رنگ) */}
      <g
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="transition-opacity duration-500 group-hover:opacity-25"
      >
        <path d={past2} stroke="#241C15" strokeWidth="1.2" opacity="0.35" strokeDasharray="3 3" />
        <path d={past1} stroke="#241C15" strokeWidth="1.4" opacity="0.5" strokeDasharray="4 3" />
      </g>

      {/* منحنی اصلی loss */}
      <path
        d={main}
        fill="none"
        stroke="#241C15"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* موقعیت فعلی توپ · در hover به سمت 0 می‌لغزد */}
      <g
        className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:translate-y-1"
        style={{ transformOrigin: `${ballX}px ${ballY}px` }}
      >
        <circle cx={ballX} cy={ballY} r="9" fill="#1B4B5A" fillOpacity="0.15" />
        <circle
          cx={ballX}
          cy={ballY}
          r="5.5"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="2"
        />
      </g>

      {/* نقطه پایانی ← هدف 0 (پایین-راست) */}
      <g
        transform="translate(298,168)"
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        <text
          x="-2"
          y="3"
          textAnchor="end"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fill="#241C15"
          opacity="0.6"
        >
          →
        </text>
        <text
          x="9"
          y="3"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#241C15"
        >
          0
        </text>
      </g>

      {/* پایین-چپ: برچسب step */}
      <g transform="translate(36,190)">
        <text
          x="0"
          y="0"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          letterSpacing="1.4"
          fill="#241C15"
          opacity="0.65"
        >
          training step →
        </text>
      </g>

      {/* label محور y */}
      <g transform="translate(24,40)">
        <text
          x="0"
          y="0"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          letterSpacing="1.4"
          fill="#241C15"
          opacity="0.65"
        >
          ↑ loss
        </text>
      </g>

      {/* خط نقطه‌چین عمودی وسط + برچسب step فعلی */}
      <g opacity="0.6">
        <line
          x1={ballX}
          y1={ballY}
          x2={ballX}
          y2="175"
          stroke="#241C15"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
      </g>
    </CoverShell>
  );
};

export default LossCover;
