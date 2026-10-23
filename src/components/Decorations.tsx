/**
 * کتابخانه کامپوننت‌های SVG تزئینی به سبک Memphis
 * همه SVG دست‌نویس است، بدون وابستگی به تصویر.
 * کاربرد: در گوشه‌های Hero / Section پخش می‌شوند به‌عنوان"تزئین صمیمی"، جایگزین نقش شخصیت‌بخشی طلسم Freddie.
 */

import React from "react";

type DecorProps = React.SVGProps<SVGSVGElement> & { color?: string };

/* ─────────── درخشش ۴ پر (کوچک) ─────────── */
export const Sparkle4: React.FC<DecorProps> = ({
  color = "#241C15",
  ...props
}) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2 C12 8 14 10 22 12 C14 14 12 16 12 22 C12 16 10 14 2 12 C10 10 12 8 12 2 Z"
      fill={color}
    />
  </svg>
);

/* ─────────── ستاره ۵ پر (با حاشیه) ─────────── */
export const Star: React.FC<DecorProps & { filled?: boolean }> = ({
  color = "#241C15",
  filled = true,
  ...props
}) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2 L14.39 8.36 L21 8.96 L16 13.5 L17.5 20.4 L12 17.27 L6.5 20.4 L8 13.5 L3 8.96 L9.61 8.36 Z"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────── پرتوهای خورشید ─────────── */
export const SunBurst: React.FC<DecorProps> = ({
  color = "#241C15",
  ...props
}) => (
  <svg viewBox="0 0 60 60" fill="none" {...props}>
    <circle cx="30" cy="30" r="8" fill={color} />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      return (
        <line
          key={i}
          x1="30"
          y1="30"
          x2="30"
          y2="6"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 30 30)`}
        />
      );
    })}
  </svg>
);

/* ─────────── خط جداکننده موجی دست‌کشیده (افقی، می‌تواند تمام‌عرض باشد) ─────────── */
export const WavyDivider: React.FC<DecorProps> = ({
  color = "#241C15",
  ...props
}) => (
  <svg
    viewBox="0 0 1200 40"
    preserveAspectRatio="none"
    fill="none"
    {...props}
  >
    <path
      d="M0 20 Q 50 0 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ─────────── منحنی دست‌کشیده (تزئین کوتاه) ─────────── */
export const Squiggle: React.FC<DecorProps> = ({
  color = "#241C15",
  ...props
}) => (
  <svg viewBox="0 0 80 24" fill="none" {...props}>
    <path
      d="M2 12 Q 12 2 22 12 T 42 12 T 62 12 T 78 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ─────────── ماتریس نقطه‌ها ─────────── */
export const DotGrid: React.FC<DecorProps & { rows?: number; cols?: number }> = ({
  color = "#241C15",
  rows = 4,
  cols = 6,
  ...props
}) => (
  <svg viewBox={`0 0 ${cols * 12} ${rows * 12}`} fill="none" {...props}>
    {Array.from({ length: rows }).map((_, r) =>
      Array.from({ length: cols }).map((_, c) => (
        <circle
          key={`${r}-${c}`}
          cx={c * 12 + 6}
          cy={r * 12 + 6}
          r="2"
          fill={color}
        />
      ))
    )}
  </svg>
);

/* ─────────── فلش دست‌کشیده (خمیده، رو به پایین-راست) ─────────── */
export const HandArrow: React.FC<DecorProps> = ({
  color = "#241C15",
  ...props
}) => (
  <svg viewBox="0 0 80 80" fill="none" {...props}>
    <path
      d="M10 14 Q 20 50 50 56"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M40 50 L52 56 L46 68"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* ─────────── افکت دایره دست‌کشیده دور متن (برای تأکید روی متن) ─────────── */
export const CircleScribble: React.FC<DecorProps> = ({
  color = "#E07A5F",
  ...props
}) => (
  <svg
    viewBox="0 0 200 80"
    preserveAspectRatio="none"
    fill="none"
    {...props}
  >
    <path
      d="M 30 18 Q 10 22 8 40 Q 6 60 30 68 Q 100 78 170 66 Q 195 60 192 38 Q 188 18 160 14 Q 100 4 50 14 Q 25 18 22 22"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ─────────── زیرخط دست‌کشیده (دوخطی، نامنظم) ─────────── */
export const HandUnderline: React.FC<DecorProps> = ({
  color = "#E07A5F",
  ...props
}) => (
  <svg
    viewBox="0 0 200 16"
    preserveAspectRatio="none"
    fill="none"
    {...props}
  >
    <path
      d="M2 8 Q 50 2 100 6 T 198 8"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ─────────── حباب گفتگو ─────────── */
export const SpeechBubble: React.FC<DecorProps> = ({
  color = "#241C15",
  ...props
}) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path
      d="M8 8 L40 8 Q 44 8 44 12 L44 30 Q 44 34 40 34 L20 34 L12 42 L13 34 L8 34 Q 4 34 4 30 L4 12 Q 4 8 8 8 Z"
      stroke={color}
      strokeWidth="2"
      fill="white"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────── قلب (با حاشیه) ─────────── */
export const Heart: React.FC<DecorProps & { filled?: boolean }> = ({
  color = "#241C15",
  filled = false,
  ...props
}) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 21s-7-4.35-7-10.5C5 7 7 5 9.5 5c1.5 0 2.5 1 2.5 1s1-1 2.5-1C17 5 19 7 19 10.5 19 16.65 12 21 12 21z"
      stroke={color}
      strokeWidth="2"
      fill={filled ? color : "none"}
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────── حباب بزرگ / Blob (شکل ارگانیک) ─────────── */
export const Blob: React.FC<DecorProps> = ({
  color = "#E07A5F",
  ...props
}) => (
  <svg viewBox="0 0 200 200" fill={color} {...props}>
    <path d="M40 90 Q 30 40 80 28 Q 130 18 160 50 Q 190 80 180 130 Q 170 180 120 178 Q 70 178 48 140 Q 28 110 40 90 Z" />
  </svg>
);

/* ─────────── علامت + (تزئین کوچک) ─────────── */
export const Plus: React.FC<DecorProps> = ({
  color = "#241C15",
  ...props
}) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 4 V20 M4 12 H20"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* ─────────── مثلث (با حاشیه) ─────────── */
export const Triangle: React.FC<DecorProps & { filled?: boolean }> = ({
  color = "#241C15",
  filled = false,
  ...props
}) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 4 L21 20 L3 20 Z"
      stroke={color}
      strokeWidth="2"
      fill={filled ? color : "none"}
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
 * IllustrationSlot — جای‌نگهدار تصویرسازی (با فهرست نیازمندی‌ها)
 *
 * روش استفاده: این کامپوننت را جایی بگذارید که تصویرسازی لازم دارد.
 * - id: شماره کوتاه (مثلاً "HERO-01")، برای ارجاع راحت هنگام گفتگو
 * - aspect: نسبت ابعاد پیشنهادی (مثلاً "4/5", "1/1", "16/9")
 * - subject: توصیف محتوای اصلی
 * - style: راهنمای سبک
 * - palette: رنگ‌بندی پیشنهادی
 * - notes: توضیحات اضافی
 *
 * تکمیل بعدی: تصویر تولیدشده را در /public/illustrations/ بگذارید،
 * با <img src="/illustrations/xxx.png" /> این جای‌نگهدار را جایگزین کنید.
 * ───────────────────────────────────────────────────────────────── */
export interface IllustrationSlotProps {
  id: string;
  aspect?: string;
  subject: string;
  style?: string;
  palette?: string;
  notes?: string;
  className?: string;
}

export const IllustrationSlot: React.FC<IllustrationSlotProps> = ({
  id,
  aspect = "1/1",
  subject,
  style,
  palette,
  notes,
  className = "",
}) => (
  <div
    className={`relative w-full bg-cream/60 border-[2.5px] border-dashed border-ink/35 rounded-3xl flex flex-col p-6 ${className}`}
    style={{ aspectRatio: aspect }}
    data-illustration-slot={id}
  >
    {/* نوار کوچک بالا */}
    <div className="flex items-center justify-between mb-4">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-white rounded-full font-mono text-[10px] uppercase tracking-wider">
        <Sparkle4 className="w-3 h-3" color="#F4D35E" />
        Illustration · {id}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/55">
        {aspect}
      </span>
    </div>

    {/* توصیف اصلی */}
    <div className="flex-1 flex flex-col justify-center space-y-3">
      <p className="font-sans font-extrabold text-[15px] text-ink leading-snug">
        {subject}
      </p>
      {style && (
        <p className="font-sans text-[12px] text-ink-secondary leading-relaxed">
          <span className="font-semibold text-ink/70">سبک:</span>
          {style}
        </p>
      )}
      {palette && (
        <p className="font-sans text-[12px] text-ink-secondary leading-relaxed">
          <span className="font-semibold text-ink/70">رنگ‌بندی:</span>
          {palette}
        </p>
      )}
      {notes && (
        <p className="font-sans text-[12px] text-ink-tertiary leading-relaxed italic">
          {notes}
        </p>
      )}
    </div>

    {/* گوشه تزئینی */}
    <Plus
      className="absolute top-3 end-3 w-3 h-3 text-ink/30"
      color="#241C15"
    />
    <Plus
      className="absolute bottom-3 start-3 w-3 h-3 text-ink/30"
      color="#241C15"
    />
  </div>
);
