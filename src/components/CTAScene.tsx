/**
 * CTA-01 کامپوننت صحنه جشن
 * - شخصیت اصلی = خواننده کوچکی با کلاه حصیری و عینک که ستاره بزرگِ خندانی را در آغوش گرفته + لایک + چشمک با چشم راست
 * - ۶ عنصر تزئینی دور شخصیت اصلی پخش شده‌اند و «لحظه جشنِ گرفتن ستاره» را می‌سازند
 * - فقط وقتی تا این‌جا اسکرول شود اجرا می‌شود: با IntersectionObserver گوش می‌دهد و پس از ورود به viewport لایه‌ها را mount می‌کند
 *   اول شخصیت اصلی pop می‌شود ← عناصر تزئینی با فاصله burst می‌شوند ← کل ورود حدود ۱٫۵ ثانیه
 * - پس از ورود، بی‌وقفه به انیمیشن چرخه‌ای می‌رسد (شخصیت گاهی دست تکان می‌دهد، ستاره نفس می‌کشد و چشمک می‌زند، خطوط نور شناورند، برگ‌ها تاب می‌خورند)
 *
 * منابع از public/imgs/site/
 *   cat-main         تصویر اصلی (شخصیت + ستاره + لایک)
 *   cat-star-lg      ستاره زرد بزرگ
 *   cat-star-sm      ستاره زرد کوچک
 *   cat-rays-yellow  ۳ خط نور زرد
 *   cat-rays-orange  ۳ خط نور نارنجی
 *   cat-leaf         یک جفت برگ سبز
 *   cat-dot-green    نقطه سبز
 *
 * تفاوت با HeroScene:
 *   - ورود تنبل (lazy) اجرا می‌شود (HeroScene مستقیم در صفحه اول پخش می‌شود)
 *   - ورود شخصیت اصلی با enter-pop (بزرگ‌شدن از مرکز) است نه up (مرکز بصری بخش CTA پایدارتر است)
 *   - ورود ستاره بزرگ با enter-spin (حس"جشن"）
 *   - loop شخصیت اصلی wave است (۹۰٪ ثابت، گاهی دست تکان می‌دهد)، نه wiggle مداوم
 */

import React from "react";
import { useInView } from "../hooks/useInView";

/**
 * ⚠️ باید از رشته کامل literal برای className استفاده شود
 * اسکن ایستای Tailwind کلاس‌های animate-* که پویا ساخته شوند را تشخیص نمی‌دهد
 */
const ENTER_CLASS = {
  pop: "animate-enter-pop",
  up: "animate-enter-up",
  down: "animate-enter-down",
  spin: "animate-enter-spin",
  fade: "animate-enter-fade",
} as const;

type EnterKind = keyof typeof ENTER_CLASS;

interface LayerProps {
  src: string;
  alt?: string;
  pos: string;
  enter: {
    anim: EnterKind;
    delay?: number;
  };
  loop?: string;
  loopDelay?: number;
  origin?: string;
  z?: number;
}

const Layer: React.FC<LayerProps> = ({
  src,
  alt = "",
  pos,
  enter,
  loop,
  loopDelay,
  origin,
  z,
}) => (
  <div
    className={`absolute ${pos} ${ENTER_CLASS[enter.anim]}`}
    style={{
      animationDelay: enter.delay ? `${enter.delay}ms` : undefined,
      zIndex: z,
    }}
  >
    <img
      src={src}
      alt={alt}
      aria-hidden={!alt}
      draggable={false}
      className={`w-full h-full object-contain select-none pointer-events-none ${loop || ""}`}
      style={{
        transformOrigin: origin,
        willChange: "transform",
        animationDelay: loopDelay ? `${loopDelay}ms` : undefined,
      }}
    />
  </div>
);

const CTAScene: React.FC = () => {
  // انیمیشن ورود فقط با ورود به viewport اجرا می‌شود (threshold 0.25 = با ۲۵٪ دیده‌شدن پخش می‌شود)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[520px] mx-auto aspect-square"
    >
      {inView && (
        <>
          {/* ── اول شخصیت اصلی وارد می‌شود، pop از مرکز + گاهی دست تکان دادن ── */}
          <Layer
            src="/imgs/site/cat-main.png"
            alt="خواننده کوچکی با کلاه حصیری و عینک که ستاره بزرگِ خندانی را در آغوش دارد، با یک دست لایک می‌دهد و با چشم راست چشمک می‌زند"
            pos="top-[6%] start-[10%] w-[82%]"
            enter={{ anim: "pop", delay: 0 }}
            loop="animate-wave"
            origin="60% 70%"
            z={10}
          />

          {/* ── ستاره بزرگ: چرخان وارد می‌شود + نفس کشیدن و تاب خوردن (هسته جشن) ── */}
          <Layer
            src="/imgs/site/cat-star-lg.png"
            pos="top-[2%] end-[2%] w-[19%]"
            enter={{ anim: "spin", delay: 350 }}
            loop="animate-star-pulse"
            loopDelay={1100}
            origin="50% 50%"
            z={6}
          />

          {/* ── خطوط نور زرد: pop در بالا-چپ + شناور بالا و پایین ── */}
          <Layer
            src="/imgs/site/cat-rays-yellow.png"
            pos="top-[8%] start-[20%] w-[14%]"
            enter={{ anim: "pop", delay: 450 }}
            loop="animate-float-y"
            loopDelay={1200}
            z={5}
          />

          {/* ── خطوط نور نارنجی: pop در وسط-راست + شناور (با فاصله زمانی) ── */}
          <Layer
            src="/imgs/site/cat-rays-orange.png"
            pos="top-[44%] end-[1%] w-[16%]"
            enter={{ anim: "pop", delay: 550 }}
            loop="animate-float-y-md"
            loopDelay={1500}
            z={5}
          />

          {/* ── ستاره کوچک: pop در وسط-چپ + چشمک ── */}
          <Layer
            src="/imgs/site/cat-star-sm.png"
            pos="top-[22%] start-[2%] w-[11%]"
            enter={{ anim: "pop", delay: 650 }}
            loop="animate-twinkle"
            loopDelay={1300}
            origin="50% 50%"
            z={5}
          />

          {/* ── برگ کوچک: pop در پایین-چپ + تاب خوردن ── */}
          <Layer
            src="/imgs/site/cat-leaf.png"
            pos="bottom-[4%] start-[26%] w-[12%]"
            enter={{ anim: "pop", delay: 750 }}
            loop="animate-sway-leaf"
            loopDelay={1400}
            origin="50% 100%"
            z={4}
          />

          {/* ── نقطه سبز: pop در گوشه پایین-چپ + pulse ("روی من کلیک کن"راهنمای کوچک) ── */}
          <Layer
            src="/imgs/site/cat-dot-green.png"
            pos="bottom-[20%] start-[4%] w-[7%]"
            enter={{ anim: "pop", delay: 850 }}
            loop="animate-dot-pulse"
            loopDelay={1500}
            origin="50% 50%"
            z={5}
          />
        </>
      )}
    </div>
  );
};

export default CTAScene;
