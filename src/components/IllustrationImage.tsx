/**
 * IllustrationImage
 *
 * کامپوننت جای‌نگهدار تصویر واقعی —— برای جایگزینی کارت جای‌نگهدار IllustrationSlot.
 * انیمیشن ورود فقط با رسیدن به ناحیه قابل‌مشاهده اجرا می‌شود (تا همه تصاویر هم‌زمان با باز شدن صفحه پخش نشوند).
 *
 * Usage:
 *   <IllustrationImage
 *     src="/imgs/site/Illustration-AIK-01.png"
 *     alt="شخصیتی با ذره‌بین که جلوی قفسه کتاب دنبال مفاهیم می‌گردد"
 *     animation="up"
 *   />
 */

import React from "react";
import { useInView } from "../hooks/useInView";

type AnimationKind = "up" | "pop" | "fade" | "down" | "spin";

interface IllustrationImageProps {
  src: string;
  alt: string;
  /** پیش‌فرض "up"(شناور به بالا) */
  animation?: AnimationKind;
  /** تأخیر انیمیشن (ms) */
  delay?: number;
  /** آستانه اجرا ۰ تا ۱، پیش‌فرض ۰٫۲۵ */
  threshold?: number;
  /** className اضافی (برای محدودیت‌های اندازه/aspect کانتینر) */
  className?: string;
  /** className اضافی برای تگ img */
  imgClassName?: string;
}

const animClassMap: Record<AnimationKind, string> = {
  up: "animate-enter-up",
  pop: "animate-enter-pop",
  fade: "animate-enter-fade",
  down: "animate-enter-down",
  spin: "animate-enter-spin",
};

export const IllustrationImage: React.FC<IllustrationImageProps> = ({
  src,
  alt,
  animation = "up",
  delay = 0,
  threshold = 0.25,
  className = "",
  imgClassName = "",
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold });

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`block w-full h-auto select-none ${
          inView ? animClassMap[animation] : "opacity-0"
        } ${imgClassName}`}
        style={delay ? { animationDelay: `${delay}ms` } : undefined}
      />
    </div>
  );
};
