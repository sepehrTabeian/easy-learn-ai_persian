/**
 * جلد Llama
 *
 * استعاره: ۴ نسخه Llama (1 / 2 / 3 / 4) به‌صورت چهار ticket در یک ردیف افقی،
 *   هر کدام با یک tone متفاوت، در بالا-چپ آویزان"open weights"مهر، در بالا-راست یک stamp با چهره ساده‌شده llama.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - بالا-چپ: coral "open weights" مهر کج
 *   - بالا-راست: stamp مستطیل گوشه‌گرد با نوشته بزرگ LLaMA + یک svg ساده‌شده گوش/چشم
 *   - مرکز: ۴ stamp ticket (version 1 ← 4)، هر sub-label یک واقعیت کلیدی را نشان می‌دهد
 *     · 1 dense / 2 commercial / 3 GQA / 4 MoE
 *   - ticketها با خط پیوسته مشکی 1.5 px + فلش مثلثی به هم وصل‌اند
 *   - در پایین یک محور زمانی نقطه‌چین ضخیم + درجه‌بندی سال‌های 2023/24/25
 *
 * رفتار hover:
 *   - ۴ ticket کمی بلند می‌شوند + سایه تیره‌تر می‌شود (با تأخیر به ترتیب)
 *   - "open weights" مهر کمی می‌چرخد
 *   - stamp با LLaMA در بالا-راست کمی بزرگ و کوچک می‌شود
 */
import React from "react";
import CoverShell from "./CoverShell";

type Ticket = {
  v: string;
  fact: string;
  fill: string;
  text: string;
};

const TICKETS: Ticket[] = [
  { v: "1", fact: "dense", fill: "#FFFFFF", text: "#241C15" },
  { v: "2", fact: "commercial", fill: "#F4D35E", text: "#241C15" },
  { v: "3", fact: "GQA · 128K", fill: "#1B4B5A", text: "#FBE891" },
  { v: "4", fact: "MoE · MM", fill: "#E07A5F", text: "#FBEFE3" },
];

const LlamaCover: React.FC = () => {
  /* چیدمان افقی ticketها */
  const X0 = 36;
  const STEP = 64;
  const Y_T = 80;
  const W = 50;
  const H = 56;

  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* بالا-چپ: مهر open weights (کج) */}
      <g
        transform="translate(40,30) rotate(-7)"
        className="origin-center transition-transform duration-500 ease-out group-hover:rotate-2 group-hover:scale-105"
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
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
          letterSpacing="0.5"
        >
          open weights
        </text>
      </g>

      {/* بالا-راست: stamp با نوشته LLaMA + چهره ساده‌شده llama */}
      <g
        transform="translate(280,30) rotate(6)"
        className="origin-center transition-transform duration-500 ease-out group-hover:rotate-[-3deg] group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-13"
          width="56"
          height="26"
          rx="6"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        {/* سر ساده‌شده llama: دو گوش بلند + صورت بیضی */}
        <g transform="translate(-15,0)" stroke="#FBE891" strokeWidth="1.5" fill="none">
          <ellipse cx="0" cy="2" rx="5" ry="6" fill="#FBE891" />
          {/* گوش چپ */}
          <path d="M -3 -3 L -4 -8" strokeLinecap="round" />
          {/* گوش راست */}
          <path d="M 3 -3 L 4 -8" strokeLinecap="round" />
          {/* چشم‌ها */}
          <circle cx="-1.5" cy="2" r="0.9" fill="#241C15" stroke="none" />
        </g>
        <text
          x="6"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#FBE891"
          letterSpacing="0.8"
        >
          LLaMA
        </text>
      </g>

      {/* ۴ ticket در یک ردیف افقی */}
      {TICKETS.map((t, i) => {
        const x = X0 + i * STEP;
        return (
          <g
            key={t.v}
            transform={`translate(${x},${Y_T})`}
            className="origin-center transition-transform duration-400 ease-out group-hover:-translate-y-1"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* ticket body */}
            <rect
              x="0"
              y="0"
              width={W}
              height={H}
              rx="6"
              fill={t.fill}
              stroke="#241C15"
              strokeWidth="1.8"
            />
            {/* شکاف پاره ticket (اشاره به V notch در دو طرف چپ و راست) */}
            <circle cx="0" cy={H / 2} r="2.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="0.8" />
            <circle cx={W} cy={H / 2} r="2.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="0.8" />

            {/* عدد بزرگ version */}
            <text
              x={W / 2}
              y="26"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="22"
              fontWeight="800"
              fill={t.text}
            >
              {t.v}
            </text>
            {/* خط افقی */}
            <line
              x1="9"
              y1="32"
              x2={W - 9}
              y2="32"
              stroke={t.text}
              strokeWidth="0.8"
              opacity="0.5"
            />
            {/* واقعیت کلیدی */}
            <text
              x={W / 2}
              y="46"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8"
              fontWeight="700"
              fill={t.text}
              letterSpacing="0.5"
            >
              {t.fact}
            </text>
          </g>
        );
      })}

      {/* سه فلش اتصال: ticket 1→2 / 2→3 / 3→4 */}
      <g stroke="#241C15" strokeWidth="1.4" fill="#241C15">
        {[0, 1, 2].map((i) => {
          const x1 = X0 + i * STEP + W + 3;
          const x2 = X0 + (i + 1) * STEP - 3;
          const y = Y_T + H / 2;
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2 - 4} y2={y} strokeLinecap="round" />
              <polygon points={`${x2 - 4},${y - 3} ${x2 + 1},${y} ${x2 - 4},${y + 3}`} />
            </g>
          );
        })}
      </g>

      {/* محور زمانی پایین */}
      <g>
        <line
          x1="30"
          y1="170"
          x2="290"
          y2="170"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          opacity="0.55"
        />
        {[
          { x: 50, label: "2023" },
          { x: 130, label: "2024" },
          { x: 210, label: "2025" },
          { x: 280, label: "2026" },
        ].map((m) => (
          <g key={m.label}>
            <line x1={m.x} y1="166" x2={m.x} y2="174" stroke="#241C15" strokeWidth="1.4" />
            <text
              x={m.x}
              y="184"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9"
              fontWeight="700"
              fill="#241C15"
              opacity="0.7"
              letterSpacing="0.5"
            >
              {m.label}
            </text>
          </g>
        ))}
      </g>

      {/* متن عنوان */}
      <text
        x="160"
        y="156"
        textAnchor="middle"
        fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
        fontSize="9.5"
        fontWeight="700"
        fill="#241C15"
        opacity="0.5"
        letterSpacing="0.6"
      >
        Meta · 4 generations
      </text>
    </CoverShell>
  );
};

export default LlamaCover;
