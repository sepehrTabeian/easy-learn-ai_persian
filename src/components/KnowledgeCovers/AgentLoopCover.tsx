/**
 * جلد Agent Loop
 *
 * استعاره: خودِ چرخه پنج‌مرحله‌ای —— Perceive · Reason · Plan · Act · Observe در امتداد حلقه چیده شده‌اند،
 *      و فلش‌ها یک حلقه بسته می‌سازند. تمرکز بصری روی «Loop» است تا از AgentCover (که بر شخصیت Agent + ابزار تأکید دارد) متمایز شود.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز: دایره cream + Geist Mono "LOOP" حروف درشت
 *   - دور مرکز: ۵ گره مرحله با رنگ‌های مختلف (butter/coral/teal/pop/ink)
 *   - گره‌ها با فلش به یک حلقه بسته (ساعت‌گرد) وصل می‌شوند
 *   - تزئین: small sparkle بالا-چپ، small arrow پایین-راست
 *
 * hover: کل حلقه آرام ساعت‌گرد می‌چرخد؛ متن LOOP در مرکز کمی بزرگ و کوچک می‌شود؛ گره active فعلی یک پرش می‌کند.
 */
import React from "react";
import CoverShell from "./CoverShell";

const STAGES = [
  { label: "ادراک", color: "#F4D35E", textOnFill: "#241C15" },
  { label: "استدلال", color: "#E07A5F", textOnFill: "#FBEFE3" },
  { label: "برنامه‌ریزی", color: "#1B4B5A", textOnFill: "#FBEFE3" },
  { label: "اقدام", color: "#FF4D74", textOnFill: "#FBEFE3" },
  { label: "مشاهده", color: "#241C15", textOnFill: "#FBEFE3" },
];

const CENTER_X = 160;
const CENTER_Y = 100;
const ORBIT_RX = 110;
const ORBIT_RY = 66;
const NODE_R = 18;

const AgentLoopCover: React.FC = () => {
  const stageCount = STAGES.length;

  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle چرخ‌دنده کوچک بالا-چپ */}
      <g transform="translate(34,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-90">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: فلش کوچک + عدد پایین-راست */}
      <g transform="translate(280,172)">
        <circle
          cx="0"
          cy="0"
          r="11"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="3.2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          ∞
        </text>
      </g>

      {/* ─── بدنه اصلی: حلقه ایستا (دیگر کل آن نمی‌چرخد تا rasterize مجدد بیضی نقطه‌چین لگ ایجاد نکند) ─── */}
      <g transform={`translate(${CENTER_X},${CENTER_Y})`}>
        {/* مدار بیضی (نقطه‌چین) */}
        <ellipse
          cx="0"
          cy="0"
          rx={ORBIT_RX}
          ry={ORBIT_RY}
          fill="none"
          stroke="#241C15"
          strokeWidth="1.8"
          strokeDasharray="4 5"
          opacity="0.45"
        />

        {/* ۵ گره مرحله */}
        {STAGES.map((stage, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / stageCount; // از بالا شروع می‌شود
          const x = Math.cos(angle) * ORBIT_RX;
          const y = Math.sin(angle) * ORBIT_RY;
          const nextAngle =
            -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / stageCount;
          // فلش‌های اتصال بین گره‌ها —— مثلث کوچکی در وسط دو گره، جهت ساعت‌گرد
          const midAngle = (angle + nextAngle) / 2;
          const mx = Math.cos(midAngle) * ORBIT_RX;
          const my = Math.sin(midAngle) * ORBIT_RY;
          const tangentDeg = (midAngle * 180) / Math.PI + 90;

          return (
            <g key={stage.label}>
              {/* علامت فلش ساعت‌گرد */}
              <g transform={`translate(${mx},${my}) rotate(${tangentDeg})`}>
                <path
                  d="M -3.5 -3 L 4 0 L -3.5 3 Z"
                  fill="#241C15"
                  opacity="0.55"
                />
              </g>

              {/* دایره گره مرحله —— ایستا (دیگر در hover بزرگ نمی‌شود تا ۵ زیردرخت متنی هم‌زمان
                  با بزرگ‌نمایی کشسان متن را مدام rasterize نکنند و لگ ایجاد نشود) */}
              <g transform={`translate(${x},${y})`}>
                {/* سایه */}
                <circle
                  cx="2"
                  cy="2"
                  r={NODE_R}
                  fill="#241C15"
                  opacity="0.85"
                />
                {/* بدنه */}
                <circle
                  cx="0"
                  cy="0"
                  r={NODE_R}
                  fill={stage.color}
                  stroke="#241C15"
                  strokeWidth="2"
                />
                {/* برچسب فارسی مرحله */}
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fontFamily='"Plus Jakarta Sans", "Vazirmatn", sans-serif'
                  fontSize="9.5"
                  fontWeight="800"
                  fill={stage.textOnFill}
                >
                  {stage.label}
                </text>
                {/* نشانه کوچک شماره */}
                <g transform={`translate(${NODE_R - 3},${-NODE_R + 4})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r="6"
                    fill="#FBEFE3"
                    stroke="#241C15"
                    strokeWidth="1.4"
                  />
                  <text
                    x="0"
                    y="2.5"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="7"
                    fontWeight="700"
                    fill="#241C15"
                  >
                    {i + 1}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </g>

      {/* ─── متن LOOP در مرکز ─── */}
      <g transform={`translate(${CENTER_X},${CENTER_Y})`}>
        <g
          className="origin-center transition-transform duration-400 ease-spring group-hover:scale-105"
          style={{ transformBox: "fill-box" }}
        >
          {/* سایه دایره زیرین */}
          <circle
            cx="3"
            cy="3"
            r="32"
            fill="#241C15"
            opacity="0.85"
          />
          {/* دایره اصلی */}
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="2.5"
          />
          {/* متن LOOP */}
          <text
            x="0"
            y="-2"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="14"
            fontWeight="800"
            letterSpacing="1.5"
            fill="#241C15"
          >
            LOOP
          </text>
          {/* توضیح کوچک پایینی */}
          <text
            x="0"
            y="11"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="600"
            letterSpacing="2.2"
            fill="#88837C"
          >
            5 PHASES
          </text>

          {/* کمان چرخه در نقطه مرکزی (اشاره چرخه زیر دایره کوچک) */}
          <path
            d="M -12 16 Q 0 22 12 16"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 12 16 L 9 13 M 12 16 L 15 13"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </g>
    </CoverShell>
  );
};

export default AgentLoopCover;
