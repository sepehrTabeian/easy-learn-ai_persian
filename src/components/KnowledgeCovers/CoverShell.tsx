/**
 * KnowledgeCovers · پوسته عمومی
 *
 * برای هر جلد فراهم می‌کند:
 *   - نسبت 16:10 که والد را به‌طور تطبیقی پر می‌کند
 *   - طرح زمینه نقطه‌شبکه‌ای یکسان
 *   - hook میکروانیمیشن که با groupHover فعال می‌شود (KnowCard والد خودش کانتینر group/peer است)
 *
 * هر جلد فقط به"SVG شکل اصلی"خودش اهمیت می‌دهد و ترکیب‌بندی این‌جا یکسان می‌شود.
 */
import React from "react";

type CoverShellProps = {
  /** رنگ پس‌زمینه یکدست (کلاس Tailwind)، مثل bg-butter / bg-teal/10 */
  bgClassName: string;
  /** رنگ نقاط شبکه (hex) */
  dotColor?: string;
  /** شفافیت نقاط شبکه (۰ تا ۱) */
  dotOpacity?: number;
  /** محتوای SVG داخلی، viewBox 320×200 */
  children: React.ReactNode;
};

const CoverShell: React.FC<CoverShellProps> = ({
  bgClassName,
  dotColor = "#241C15",
  dotOpacity = 0.08,
  children,
}) => {
  return (
    <div className={`absolute inset-0 ${bgClassName}`}>
      {/* طرح زمینه نقطه‌شبکه‌ای */}
      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="cover-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill={dotColor} opacity={dotOpacity} />
          </pattern>
        </defs>
        <rect width="320" height="200" fill="url(#cover-dots)" />
      </svg>

      {/* شکل اصلی */}
      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {children}
      </svg>
    </div>
  );
};

export default CoverShell;
