/**
 * جلد Learning Rate
 *
 * استعاره: اندازه گام در فضای پارامتر ── روی یک شیب، ۳ توپ θ به سمت پایین‌ترین نقطه می‌پرند، طول فلش = lr.
 *   توپ lr کوچک: گام‌های کوچک، هنوز از پایین‌ترین نقطه خیلی دور است و تقلا می‌کند
 *   توپ lr متعادل: دقیقاً به ته دره می‌رسد
 *   توپ lr بزرگ: گام آن‌قدر بزرگ است که به دیواره روبه‌رو برمی‌خورد و loss بالا می‌رود
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   ─ یک سهمی bowl در وسط (خط پیوسته teal)، نماینده شیب loss
 *   ─ چپ: زنجیره lr کوچک (فلش کوتاه ×3، وسط شیب می‌ایستد)
 *   ─ وسط: زنجیره lr متعادل (فلش متوسط ×2، در ته دره می‌ایستد)
 *   ─ راست: زنجیره lr بزرگ (فلش بلند ×1، به نقطه بالاتر روبه‌رو می‌پرد + stamp هشدار NaN)
 *   ─ بالا-راست: stamp با butter «lr»
 *   ─ پایین-چپ: نوار تزئینی فرمول «θ ← θ − lr·∇L»
 *   ─ بالا: ۳ ردیف برچسب کوچک small / ok / big
 */
import React from "react";
import CoverShell from "./CoverShell";

/* سهمی bowl با L(θ) = (θ−2)² به مختصات SVG مقیاس داده می‌شود */
function lossY(theta: number): number {
  /* loss ∈ [0..18] ← y ∈ [148..40] (هرچه loss بزرگ‌تر، y کوچک‌تر) */
  const l = Math.min(18, (theta - 2) * (theta - 2));
  return 148 - (l / 18) * 108;
}
function thetaX(theta: number): number {
  /* theta ∈ [-4..8] → x ∈ [42..278] */
  return 42 + ((theta + 4) / 12) * 236;
}

function bowlPath(): string {
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = -4 + (i / 80) * 12;
    pts.push(`${thetaX(t).toFixed(1)} ${lossY(t).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const LrCover: React.FC = () => {
  /* سه گروه مسیر توپ */
  /* small lr=0.05: از -3 شروع می‌کند و پس از ۴ گام هنوز دور است */
  const smallTrail = simulate(-3, 0.05, 4);
  /* ok lr=0.4: از -3 شروع می‌کند و در ۴ گام به نزدیکی 2 می‌رسد */
  const okTrail = simulate(-3, 0.4, 4);
  /* big lr=1.05: از -3 شروع می‌کند و در ۲ گام به طرف مقابل می‌پرد */
  const bigTrail = simulate(-3, 1.05, 2);

  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* بالا-راست: stamp با lr */}
      <g
        transform="translate(286,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-26"
          y="-11"
          width="52"
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
          lr
        </text>
      </g>

      {/* بالا-چپ: نوار عنوان */}
      <g transform="translate(70,30)">
        <rect
          x="-3"
          y="-9"
          width="118"
          height="16"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="56"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1"
          fill="#F4D35E"
        >
          step size matters
        </text>
      </g>

      {/* پایین-چپ: تزئین فرمول */}
      <g transform="translate(28,182) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="100"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="47"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          θ ← θ − lr · ∇L
        </text>
      </g>

      {/* شیب اصلی loss */}
      <path
        d={bowlPath()}
        fill="none"
        stroke="#1B4B5A"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* marker ته دره */}
      <line x1={thetaX(2)} y1={lossY(2) - 5} x2={thetaX(2)} y2="156" stroke="#241C15" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.5" />
      <text
        x={thetaX(2)}
        y="166"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8"
        fill="#88837C"
      >
        θ*
      </text>

      {/* مسیر small lr (خاکستری تیره، فلش کوتاه) */}
      <BallTrail trail={smallTrail} color="#88837C" tagColor="#88837C" tag="lr کوچک" tagY={32} groupClass="" />

      {/* مسیر ok lr (رنگ توپر butter) */}
      <BallTrail trail={okTrail} color="#241C15" tagColor="#241C15" tag="lr مناسب" tagY={48} groupClass="origin-center transition-transform duration-500 group-hover:scale-110" />

      {/* مسیر big lr (coral · به طرف مقابل می‌پرد) */}
      <BallTrail trail={bigTrail} color="#E07A5F" tagColor="#E07A5F" tag="lr بزرگ" tagY={64} groupClass="" />

      {/* هشدار NaN در انتهای big */}
      {bigTrail.length > 0 && (() => {
        const last = bigTrail[bigTrail.length - 1];
        return (
          <g
            transform={`translate(${thetaX(last).toFixed(1)},${(lossY(last) - 14).toFixed(1)}) rotate(8)`}
            className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
          >
            <rect
              x="-16"
              y="-7"
              width="32"
              height="14"
              rx="3"
              fill="#FF4D74"
              stroke="#241C15"
              strokeWidth="1.4"
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8.5"
              fontWeight="800"
              fill="#FBEFE3"
            >
              NaN
            </text>
          </g>
        );
      })()}
    </CoverShell>
  );
};

/* ── شبیه‌سازی گرادیان کاهشی · L(θ) = (θ−2)² · دنباله θ را برمی‌گرداند ──────────────────────────── */
function simulate(theta0: number, lr: number, steps: number): number[] {
  const arr: number[] = [theta0];
  let t = theta0;
  for (let i = 0; i < steps; i++) {
    const g = 2 * (t - 2);
    t = t - lr * g;
    arr.push(t);
  }
  return arr;
}

/* ── مسیر + توپ ───────────────────────────────────────────────────────────── */
const BallTrail: React.FC<{
  trail: number[];
  color: string;
  tag: string;
  tagY: number;
  tagColor: string;
  groupClass: string;
}> = ({ trail, color, tag, tagY, tagColor, groupClass }) => {
  return (
    <g className={groupClass}>
      {/* خط فلش بین گام‌ها */}
      {trail.slice(1).map((t, i) => {
        const prev = trail[i];
        return (
          <line
            key={`arrow-${i}`}
            x1={thetaX(prev)}
            y1={lossY(prev)}
            x2={thetaX(t)}
            y2={lossY(t)}
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity={0.55}
            strokeDasharray="2 2"
          />
        );
      })}

      {/* نقطه کوچک گام‌های میانی */}
      {trail.slice(0, -1).map((t, i) => (
        <circle
          key={`mid-${i}`}
          cx={thetaX(t)}
          cy={lossY(t)}
          r="2.2"
          fill="#FBEFE3"
          stroke={color}
          strokeWidth="1.2"
        />
      ))}

      {/* توپ بزرگ نقطه پایانی */}
      {trail.length > 0 && (
        <circle
          cx={thetaX(trail[trail.length - 1])}
          cy={lossY(trail[trail.length - 1])}
          r="5.5"
          fill={color}
          stroke="#241C15"
          strokeWidth="1.5"
        />
      )}

      {/* برچسب کوچک نقطه شروع */}
      <text
        x={thetaX(trail[0]) - 6}
        y={tagY}
        textAnchor="end"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill={tagColor}
        fontWeight="700"
      >
        {tag}
      </text>
    </g>
  );
};

export default LrCover;
