/**
 * کامپوننت صحنه تصویر اصلی Hero
 * - ۱۱ تصویر جداشده، هر عنصر = wrapper بیرونی (انیمیشن ورود یک‌باره) + img درونی (انیمیشن چرخه‌ای بی‌پایان)
 * - انیمیشن‌های ورود با فاصله زمانی ظاهر می‌شوند (۰ms ← ۱۳۰۰ms) تا کاربر به محض ورود به صفحه جذب"روییدن تصویر"شود
 * - پس از پایان ورود، بی‌وقفه به چرخه نفس کشیدن/چرخش/شناوری/چشمک می‌رسد
 *
 * منابع از public/imgs/site/
 *   hero-base / hero-bulb / hero-gear / hero-leaf
 *   hero-pot-left / hero-pot-right / hero-book-bl / hero-book-br
 *   hero-code-tr / hero-code-mr / hero-sparkles
 *
 * برای تنظیم:
 *   - موقعیت / اندازه: prop با نام pos در Layer را تغییر دهید
 *   - نوع ورود: enter.anim را تغییر دهید (enter-pop / enter-up / enter-down / enter-spin / enter-fade)
 *   - زودی/دیری ورود: enter.delay را تغییر دهید (میلی‌ثانیه)
 *   - انیمیشن چرخه‌ای: loop را تغییر دهید (animate-pulse-bulb / animate-spin-slow / animate-float-y ...)
 */

import React from "react";

/**
 * ⚠️ باید از رشته کامل literal برای className استفاده شود
 * اسکن ایستای Tailwind تشخیص نمی‌دهد `animate-${var}` این نوع ساخت پویا
 * همه کلاس‌های animate-* باید به شکل کامل در سورس بیایند تا در CSS تولید شوند
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
  /** className موقعیت + اندازه، مثلاً "top-[2%] start-[20%] w-[18%]" */
  pos: string;
  /** انیمیشن ورود: anim و تأخیر (ms) */
  enter: {
    anim: EnterKind;
    delay?: number;
  };
  /** className انیمیشن چرخه‌ای (مثل "animate-pulse-bulb"، باید literal کامل باشد) */
  loop?: string;
  /** تأخیر انیمیشن چرخه‌ای (ms) */
  loopDelay?: number;
  /** transform-origin (عناصر تاب‌خورنده/نفس‌کشنده لازم دارند) */
  origin?: string;
  /** z-index */
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

const HeroScene: React.FC = () => {
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square">
      {/* ── اول شخصیت اصلی وارد می‌شود (از پایین بالا می‌پرد) ── */}
      <Layer
        src="/imgs/site/hero-base.png"
        alt="خواننده کوچکی با کلاه حصیری و عینک که کتابی با نوشته AI را در دست گرفته و با دقت می‌خواند"
        pos="top-[18%] start-[18%] w-[64%]"
        enter={{ anim: "up", delay: 0 }}
        loop="animate-breath"
        origin="50% 95%"
        z={10}
      />

      {/* ── لامپ از بالا می‌افتد (با برگشت spring) + درخشش pulse مداوم ── */}
      <Layer
        src="/imgs/site/hero-bulb.png"
        pos="top-[1%] start-[22%] w-[19%]"
        enter={{ anim: "down", delay: 250 }}
        loop="animate-pulse-bulb"
        loopDelay={1100}
        origin="50% 70%"
      />

      {/* ── چرخ‌دنده چرخان وارد می‌شود + spin مداوم ── */}
      <Layer
        src="/imgs/site/hero-gear.png"
        pos="top-[3%] end-[6%] w-[17%]"
        enter={{ anim: "spin", delay: 400 }}
        loop="animate-spin-slow"
        loopDelay={1300}
      />

      {/* ── برگ شناور pop in + sway ── */}
      <Layer
        src="/imgs/site/hero-leaf.png"
        pos="top-[3%] start-[46%] w-[8%]"
        enter={{ anim: "pop", delay: 550 }}
        loop="animate-sway-leaf"
        loopDelay={1100}
        origin="50% 100%"
      />

      {/* ── سمت چپ {} گلدان pop in + شناور ── */}
      <Layer
        src="/imgs/site/hero-pot-left.png"
        pos="top-[32%] start-[0%] w-[23%]"
        enter={{ anim: "pop", delay: 600 }}
        loop="animate-float-y"
        loopDelay={1300}
      />

      {/* ── بالا-راست </> گیاه pop in + شناور ── */}
      <Layer
        src="/imgs/site/hero-code-tr.png"
        pos="top-[16%] end-[0%] w-[19%]"
        enter={{ anim: "pop", delay: 700 }}
        loop="animate-float-y-md"
        loopDelay={1500}
      />

      {/* ── دایره وسط-راست </> گیاه pop in + شناور ── */}
      <Layer
        src="/imgs/site/hero-code-mr.png"
        pos="top-[42%] end-[1%] w-[20%]"
        enter={{ anim: "pop", delay: 800 }}
        loop="animate-float-y-sm"
        loopDelay={1600}
      />

      {/* ── پایین-چپ </> کتاب کوچک pop in + شناوری ملایم ── */}
      <Layer
        src="/imgs/site/hero-book-bl.png"
        pos="bottom-[2%] start-[4%] w-[23%]"
        enter={{ anim: "pop", delay: 900 }}
        loop="animate-float-y-sm"
        loopDelay={1500}
      />

      {/* ── دو کتاب پایین-راست pop in + شناور ── */}
      <Layer
        src="/imgs/site/hero-book-br.png"
        pos="bottom-[2%] end-[2%] w-[27%]"
        enter={{ anim: "pop", delay: 1000 }}
        loop="animate-float-y-md"
        loopDelay={1800}
      />

      {/* ── نهال کوچک وسط پایین pop in + شناوری ملایم ── */}
      <Layer
        src="/imgs/site/hero-pot-right.png"
        pos="bottom-[1%] start-[46%] w-[14%]"
        enter={{ anim: "pop", delay: 1100 }}
        loop="animate-float-y-sm"
        loopDelay={1700}
      />

      {/* ── sparkles در آخر کم‌کم ظاهر می‌شوند + چشمک مداوم ── */}
      <Layer
        src="/imgs/site/hero-sparkles.png"
        pos="top-[10%] start-0 w-full"
        enter={{ anim: "fade", delay: 1300 }}
        loop="animate-twinkle"
        loopDelay={1800}
      />
    </div>
  );
};

export default HeroScene;
