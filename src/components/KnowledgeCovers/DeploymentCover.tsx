/**
 * جلد Deployment
 *
 * استعاره: یک جعبه مدل ← ۴ آیکون تابلوی موتور استنتاج ← حباب درخواست کاربر
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - چپ: جعبه وزن‌های مدل (نمایش Llama / Qwen به انتخاب)
 *   - وسط: ۴ مربع موتور استنتاج (vLLM / SGLang / Ollama / llama.cpp)
 *   - راست: حباب درخواست کاربر + عدد tokens/sec
 *   - بالا: تزئین marquee روان tok/s
 *
 * hover: ۴ مربع موتور به خط وسط نزدیک می‌شوند، حباب درخواست بزرگ می‌شود.
 */
import React from "react";
import CoverShell from "./CoverShell";

const ENGINES = [
  { y: 50, color: "#FF4D74", label: "SGLang", num: "16k" },
  { y: 88, color: "#1B4B5A", label: "vLLM", num: "12k" },
  { y: 126, color: "#E5BD3A", label: "llama.cpp", num: "GGUF" },
  { y: 164, color: "#E07A5F", label: "Ollama", num: "ollama run" },
];

const DeploymentCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter-tint" dotOpacity={0.07}>
      {/* چپ: جعبه مدل */}
      <g
        transform="translate(34, 100)"
        className="origin-center transition-transform duration-500 group-hover:-translate-x-0.5"
      >
        <rect
          x="-22"
          y="-32"
          width="44"
          height="64"
          rx="6"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2"
        />
        <rect x="-16" y="-24" width="32" height="6" rx="1.5" fill="#E07A5F" stroke="#241C15" strokeWidth="1" />
        <rect x="-16" y="-14" width="32" height="6" rx="1.5" fill="#1B4B5A" stroke="#241C15" strokeWidth="1" />
        <rect x="-16" y="-4" width="32" height="6" rx="1.5" fill="#E5BD3A" stroke="#241C15" strokeWidth="1" />
        <rect x="-16" y="6" width="32" height="6" rx="1.5" fill="#FF4D74" stroke="#241C15" strokeWidth="1" />
        <rect x="-16" y="16" width="32" height="6" rx="1.5" fill="#E07A5F" stroke="#241C15" strokeWidth="1" opacity="0.6" />
        <text
          x="0"
          y="-40"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="10"
          fontWeight="800"
          fill="#241C15"
        >
          70B weights
        </text>
      </g>

      {/* وسط: ۴ مربع موتور */}
      <g>
        {ENGINES.map((e, i) => (
          <g
            key={e.label}
            transform={`translate(146, ${e.y})`}
            className="origin-center transition-transform duration-500"
            style={{
              transitionDelay: `${i * 60}ms`,
            }}
          >
            <rect
              x="-32"
              y="-12"
              width="64"
              height="24"
              rx="5"
              fill={e.color}
              stroke="#241C15"
              strokeWidth="1.8"
            />
            <text
              x="-8"
              y="2"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="10"
              fontWeight="800"
              fill="#FBEFE3"
            >
              {e.label}
            </text>
            <text
              x="20"
              y="2"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="7.5"
              fontWeight="700"
              fill="#FBEFE3"
              opacity="0.75"
            >
              {e.num}
            </text>
          </g>
        ))}
      </g>

      {/* خط اتصال چپ ← وسط (dashed) */}
      <g stroke="#241C15" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" fill="none">
        {ENGINES.map((e, i) => (
          <line key={i} x1="58" y1="100" x2="114" y2={e.y} />
        ))}
      </g>

      {/* خط اتصال وسط ← راست */}
      <g stroke="#241C15" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" fill="none">
        {ENGINES.map((e, i) => (
          <line key={i} x1="178" y1={e.y} x2="244" y2="100" />
        ))}
      </g>

      {/* راست: حباب کاربر + عدد */}
      <g
        transform="translate(272, 100)"
        className="origin-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:scale-105"
      >
        <circle r="28" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
        <text
          y="-2"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#FBEFE3"
        >
          tok/s
        </text>
        <text
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="600"
          fill="#FBEFE3"
          opacity="0.7"
        >
          streaming
        </text>
        <text
          y="48"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#241C15"
        >
          user
        </text>
      </g>

      {/* بالا-راست: stamp با H100 */}
      <g
        transform="translate(286, 28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-22"
          y="-11"
          width="44"
          height="22"
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
        >
          H100
        </text>
      </g>

      {/* پایین-چپ: caption با فونت mono */}
      <g transform="translate(28, 178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="78"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="36"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          weights → API
        </text>
      </g>
    </CoverShell>
  );
};

export default DeploymentCover;
