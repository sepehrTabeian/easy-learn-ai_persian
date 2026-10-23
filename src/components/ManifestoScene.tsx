/**
 * بخش Manifesto"تئاتر رشد"کامپوننت انیمیشن
 *
 * یک چرخه ۸ ثانیه‌ای که یک داستان می‌گوید: دانه ← آبیاری ← جوانه زدن ← رشد ← تبدیل به درخت دانش
 *
 * فقط با اسکرول تا این‌جا شروع می‌شود: با IntersectionObserver گوش می‌دهد و پس از ورود به viewport لایه‌ها را mount می‌کند
 * این‌طور تضمین می‌شود که کاربر هر بار تئاتر کامل را از «دانه» ببیند، نه از یک فریم وسط
 *
 * منابع:
 *   x1 = دانه   x2 = جوانه   x3 = نهال بلند   x6 = درخت بزرگ
 *   x4 = آبپاش  x5 = قطره آب   x7 = صفحه تزئینی sparkle
 *
 * همه stageهای گیاه از transform-origin: 50% 100% مشترک استفاده می‌کنند (نقطه لنگر پایین)
 * این‌طور هنگام بزرگ‌نمایی ریشه ثابت می‌ماند و واقعاً به نظر می‌رسد"از خاک بیرون می‌روید"
 */

import React from "react";
import { useInView } from "../hooks/useInView";

interface LayerProps {
  src: string;
  alt?: string;
  pos: string;
  /** className کامل انیمیشن (باید literal باشد تا Tailwind بتواند اسکن کند) */
  anim: string;
  /** transform-origin */
  origin?: string;
  /** z-index */
  z?: number;
  /** استایل اضافی */
  style?: React.CSSProperties;
}

const Layer: React.FC<LayerProps> = ({
  src,
  alt = "",
  pos,
  anim,
  origin,
  z,
  style,
}) => (
  <img
    src={src}
    alt={alt}
    aria-hidden={!alt}
    draggable={false}
    className={`absolute ${pos} ${anim} object-contain select-none pointer-events-none`}
    style={{
      transformOrigin: origin,
      willChange: "transform, opacity",
      zIndex: z,
      ...style,
    }}
  />
);

const ManifestoScene: React.FC = () => {
  // تئاتر فقط با ورود به viewport شروع می‌شود تا از دانه اجرا شود
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[500px] mx-auto aspect-square"
    >
      {inView && (
        <>
          {/* ── صفحه تزئینی sparkle (وقتی رشد درخت بزرگ تمام شد منفجر می‌شود) ── */}
          <Layer
            src="/imgs/site/x7.png"
            pos="inset-0 w-full h-full"
            anim="animate-m-spark"
            z={1}
          />

          {/* ── دانه (شروع) ── */}
          <Layer
            src="/imgs/site/x1.png"
            pos="bottom-[5%] start-[25%] w-[50%]"
            anim="animate-m-seed"
            origin="50% 100%"
            z={5}
          />

          {/* ── جوانه (بیرون آمدن از خاک) ── */}
          <Layer
            src="/imgs/site/x2.png"
            pos="bottom-[5%] start-[28%] w-[44%]"
            anim="animate-m-sprout"
            origin="50% 100%"
            z={5}
          />

          {/* ── نهال بلند (قد کشیدن) ── */}
          <Layer
            src="/imgs/site/x3.png"
            pos="bottom-[5%] start-[28%] w-[44%]"
            anim="animate-m-young"
            origin="50% 100%"
            z={5}
          />

          {/* ── درخت بزرگ (حالت نهایی) ── */}
          <Layer
            src="/imgs/site/x6.png"
            pos="bottom-[2%] start-[14%] w-[72%]"
            anim="animate-m-tree"
            origin="50% 100%"
            z={5}
          />

          {/* ── آبپاش (از بالا-راست پرواز می‌کند و کج شده آب می‌ریزد) ── */}
          <Layer
            src="/imgs/site/x4.png"
            pos="top-[6%] end-[2%] w-[44%]"
            anim="animate-m-can"
            origin="60% 50%"
            z={10}
          />

          {/* ── قطره آب (از لوله آبپاش می‌افتد، هم‌تراز با موقعیت لوله پس از قرینه‌سازی ~left:50%, top:38%) ── */}
          <Layer
            src="/imgs/site/x5.png"
            pos="top-[34%] start-[42%] w-[28%]"
            anim="animate-m-drops"
            z={8}
          />
        </>
      )}
    </div>
  );
};

export default ManifestoScene;
