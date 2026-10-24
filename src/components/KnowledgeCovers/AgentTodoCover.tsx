/**
 * جلد Agent TodoList
 *
 * استعاره: Agent TodoList = یک چک‌لیست با گوشه تاخورده که روی دیوار سنجاق شده.
 *      هر ردیف یک کار است، ✓ و ○ (pending) یک‌درمیان چیده شده‌اند و ردیف آخر
 *      مورد برجسته در حال in_progress است. از نظر بصری با AgentCover (چرخه + شاخک) /
 *      AgentLoopCover (حلقه چرخان) / AgentMemoryCover (کمد بایگانی) متفاوت است.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز: یادداشت چسبان با گوشه تاخورده به رنگ butter، با یک پونز به رنگ pop در بالا
 *   - محتوای یادداشت: نوار عنوان + ۴ ردیف کار (۲ ✓ / ۱ in_progress / ۱ ○)
 *   - گوشه پایین-راست: مثلث تاخورده (رنگ cream + سایه)
 *   - تزئین: sparkle بالا-چپ، مهر کوچک ✓ پایین-راست، ماتریس نقطه کوچک پایین-چپ
 *
 * رفتار hover:
 *   - کل یادداشت کمی بلند می‌شود (جابه‌جایی به بالا + تغییر زاویه چرخش)
 *   - ۴ checkbox با فاصله زمانی تیک می‌خورند: از بالا به پایین به ترتیب 0/120/240/360ms
 *   - مهر پایین-راست کمی بزرگ و کوچک می‌شود، sparkle بالا-چپ می‌چرخد
 */
import React from "react";
import CoverShell from "./CoverShell";

const STICKY_X = 90;
const STICKY_Y = 36;
const STICKY_W = 170;
const STICKY_H = 138;

const ITEMS = [
  { y: 80, text: "بررسی تقویم", initialChecked: true, delayMs: 0 },
  { y: 100, text: "دریافت ایمیل", initialChecked: true, delayMs: 120 },
  { y: 120, text: "بررسی Git", initialChecked: false, delayMs: 240, inProgress: true },
  { y: 140, text: "پیش‌نویس گزارش کار", initialChecked: false, delayMs: 360 },
];

const AgentTodoCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* تزئین: sparkle بالا-چپ */}
      <g transform="translate(34,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* تزئین: ماتریس نقطه کوچک پایین-چپ */}
      <g transform="translate(34,150)">
        {Array.from({ length: 9 }).map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <circle
              key={i}
              cx={col * 6}
              cy={row * 6}
              r="1.2"
              fill="#241C15"
              opacity="0.35"
            />
          );
        })}
      </g>

      {/* تزئین: مهر ✓ پایین-راست */}
      <g transform="translate(286,170)">
        <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-110">
          <circle cx="0" cy="0" r="13" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.8" />
          <path
            d="M -5 0 L -1.5 4 L 5.5 -3.5"
            stroke="#FBEFE3"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>

      {/* یادداشت کوچک کناری · زاویه چرخش (پایین-چپ) */}
      <g
        transform="translate(56,150) rotate(-12)"
        className="transition-transform duration-500 ease-spring group-hover:rotate-[-18deg]"
      >
        <rect
          x="-12"
          y="-9"
          width="40"
          height="18"
          rx="4"
          fill="#241C15"
          opacity="0.85"
          transform="translate(2,2)"
        />
        <rect
          x="-12"
          y="-9"
          width="40"
          height="18"
          rx="4"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="8"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1"
          fill="#FBEFE3"
        >
          ✕ SKIP
        </text>
      </g>

      {/* ─── بدنه اصلی: یادداشت با گوشه تاخورده ─── */}
      <g
        transform={`translate(${STICKY_X + STICKY_W / 2},${STICKY_Y + STICKY_H / 2}) rotate(-3)`}
        className="origin-center transition-transform duration-500 ease-spring group-hover:rotate-[-5deg] group-hover:-translate-y-1"
        style={{ transformBox: "fill-box" }}
      >
        {/* زیرسایه */}
        <rect
          x={-STICKY_W / 2}
          y={-STICKY_H / 2}
          width={STICKY_W}
          height={STICKY_H}
          rx="8"
          fill="#241C15"
          opacity="0.85"
          transform="translate(4,4)"
        />
        {/* بدنه یادداشت · رنگ butter */}
        <rect
          x={-STICKY_W / 2}
          y={-STICKY_H / 2}
          width={STICKY_W}
          height={STICKY_H}
          rx="8"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2.5"
        />

        {/* پونز بالا (درست بالای یادداشت) */}
        <g transform={`translate(0,${-STICKY_H / 2 - 6})`}>
          <circle cx="0" cy="0" r="6" fill="#FF4D74" stroke="#241C15" strokeWidth="2" />
          <circle cx="0" cy="0" r="1.5" fill="#241C15" />
        </g>

        {/* نوار عنوان */}
        <g transform={`translate(${-STICKY_W / 2 + 12},${-STICKY_H / 2 + 22})`}>
          <text
            x="0"
            y="0"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#241C15"
            opacity="0.65"
          >
            /DAILY-BRIEF
          </text>
          <text
            x="0"
            y="13"
            fontFamily='"Plus Jakarta Sans", "Vazirmatn", sans-serif'
            fontSize="13"
            fontWeight="800"
            fill="#241C15"
          >
            کارهای امروز
          </text>
        </g>

        {/* خط جداکننده */}
        <line
          x1={-STICKY_W / 2 + 12}
          y1={-STICKY_H / 2 + 50}
          x2={STICKY_W / 2 - 12}
          y2={-STICKY_H / 2 + 50}
          stroke="#241C15"
          strokeWidth="1.2"
          strokeDasharray="3 2.5"
          opacity="0.5"
        />

        {/* ۴ ردیف کار */}
        {ITEMS.map((item, i) => {
          const itemY = -STICKY_H / 2 + 64 + i * 18;
          return (
            <g key={i} transform={`translate(${-STICKY_W / 2 + 14},${itemY})`}>
              {/* checkbox */}
              <g
                className={
                  item.initialChecked || item.inProgress
                    ? "transition-transform duration-300 ease-spring"
                    : "transition-transform duration-300 ease-spring group-hover:scale-110"
                }
                style={{
                  transformBox: "fill-box",
                  transitionDelay: `${item.delayMs}ms`,
                }}
              >
                <rect
                  x="0"
                  y="-5"
                  width="10"
                  height="10"
                  rx="2"
                  fill={
                    item.initialChecked
                      ? "#241C15"
                      : item.inProgress
                      ? "#E07A5F"
                      : "#FBEFE3"
                  }
                  stroke="#241C15"
                  strokeWidth="1.5"
                />
                {/* ✓ همیشه (initialChecked) */}
                {item.initialChecked && (
                  <path
                    d="M 2 0 L 4 2 L 8 -3"
                    stroke="#F4D35E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                )}
                {/* در hover مورد چهارم هم تیک می‌خورد */}
                {!item.initialChecked && !item.inProgress && (
                  <path
                    d="M 2 0 L 4 2 L 8 -3"
                    stroke="#241C15"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ transitionDelay: `${item.delayMs}ms` }}
                  />
                )}
                {/* نقطه in_progress (پالس) */}
                {item.inProgress && (
                  <circle
                    cx="5"
                    cy="0"
                    r="2"
                    fill="#FBEFE3"
                    className="animate-pulse-dot"
                  />
                )}
              </g>

              {/* متن */}
              <text
                x="18"
                y="3"
                fontFamily='"Plus Jakarta Sans", "Vazirmatn", sans-serif'
                fontSize="10"
                fontWeight="700"
                fill="#241C15"
                opacity={item.initialChecked ? 0.55 : 0.9}
                textDecoration={item.initialChecked ? "line-through" : "none"}
              >
                {item.text}
              </text>

              {/* شماره */}
              <text
                x={STICKY_W - 32}
                y="3"
                fontFamily="Geist Mono, monospace"
                fontSize="7.5"
                fontWeight="700"
                fill="#241C15"
                opacity="0.5"
                textAnchor="end"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}

        {/* نوار کوچک پیشرفت در پایین */}
        <g transform={`translate(${-STICKY_W / 2 + 12},${STICKY_H / 2 - 16})`}>
          <rect
            x="0"
            y="0"
            width={STICKY_W - 24}
            height="5"
            rx="2.5"
            fill="#241C15"
            opacity="0.18"
          />
          <rect
            x="0"
            y="0"
            width={(STICKY_W - 24) * 0.4}
            height="5"
            rx="2.5"
            fill="#241C15"
            className="transition-all duration-700 ease-spring"
          />
          <text
            x={STICKY_W - 24}
            y="-2"
            textAnchor="end"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fontWeight="700"
            letterSpacing="0.5"
            fill="#241C15"
            opacity="0.65"
          >
            2 / 5
          </text>
        </g>

        {/* گوشه تاخورده پایین-راست · رنگ cream */}
        <g transform={`translate(${STICKY_W / 2 - 18},${STICKY_H / 2 - 18})`}>
          <path
            d="M 0 18 L 18 0 L 18 18 Z"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="2"
          />
          <line
            x1="2"
            y1="16"
            x2="16"
            y2="2"
            stroke="#241C15"
            strokeWidth="1.2"
            opacity="0.45"
          />
        </g>
      </g>

      {/* برچسب کوچک بالا · TODO */}
      <g transform="translate(160,14)">
        <rect
          x="-22"
          y="-6"
          width="44"
          height="14"
          rx="3"
          fill="#241C15"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.8"
          fill="#FBEFE3"
        >
          TODO
        </text>
      </g>
    </CoverShell>
  );
};

export default AgentTodoCover;
