/**
 * جلد ONNX
 *
 * استعاره: یک گراف محاسباتی (گره + خطوط اتصال) که از یک فریم‌ورک export شده و بدون تغییر در چند محیط اجرا کار می‌کند.
 *
 * ترکیب‌بندی بصری (viewBox 320×200):
 *   - مرکز: یک گراف محاسباتی input ← MatMul ← Relu ← output (گره‌های دایره‌ای + فلش‌های اتصال)
 *   - بالا-راست: stamp با .onnx
 *   - پایین: سه نشان محیط اجرا (CPU / GPU / NPU)، یعنی «همه‌جا اجرا می‌شود»
 */
import React from "react";
import CoverShell from "./CoverShell";

const NODES = [
  { x: 50, label: "in", fill: "#FBEFE3" },
  { x: 120, label: "×", fill: "#FF4D74" },
  { x: 190, label: "+", fill: "#FF4D74" },
  { x: 260, label: "out", fill: "#F4D35E" },
];

const OnnxCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-pop/10" dotOpacity={0.07}>
      {/* خطوط اتصال گراف محاسباتی */}
      <g stroke="#241C15" strokeWidth="2" fill="none" className="transition-opacity duration-500">
        <line x1="64" y1="80" x2="106" y2="80" />
        <line x1="134" y1="80" x2="176" y2="80" />
        <line x1="204" y1="80" x2="246" y2="80" />
      </g>
      {/* مثلث کوچک فلش */}
      <g fill="#241C15">
        <polygon points="106,76 106,84 113,80" />
        <polygon points="176,76 176,84 183,80" />
        <polygon points="246,76 246,84 253,80" />
      </g>

      {/* گره */}
      {NODES.map((n, i) => (
        <g key={i} transform={`translate(${n.x},80)`} className="origin-center transition-transform duration-500 group-hover:scale-110">
          <circle r="14" fill={n.fill} stroke="#241C15" strokeWidth="2.4" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill="#241C15"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* بالا-راست: stamp با .onnx */}
      <g transform="translate(280,30) rotate(-8)" className="origin-center transition-transform duration-500 group-hover:rotate-0">
        <rect x="-26" y="-12" width="52" height="24" rx="5" fill="#FF4D74" stroke="#241C15" strokeWidth="1.8" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          fill="#FBEFE3"
        >
          .onnx
        </text>
      </g>

      {/* پایین: سه نشان محیط اجرا */}
      <g transform="translate(0,150)">
        {[
          { x: 80, label: "CPU" },
          { x: 160, label: "GPU" },
          { x: 240, label: "NPU" },
        ].map((b, i) => (
          <g key={i} transform={`translate(${b.x},0)`}>
            <rect x="-26" y="-12" width="52" height="24" rx="12" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9.5"
              fontWeight="700"
              fill="#241C15"
            >
              {b.label}
            </text>
            {/* خطوط نقطه‌چین از گره output به هر محیط */}
            <line x1="0" y1="-12" x2={260 - b.x} y2="-58" stroke="#241C15" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
          </g>
        ))}
      </g>
    </CoverShell>
  );
};

export default OnnxCover;
