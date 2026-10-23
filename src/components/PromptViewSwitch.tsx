/**
 * PromptViewSwitch —— تعویض‌کننده نمای ماژول پرامپت
 *
 * در ناحیه برجسته Hero دو صفحه قرار می‌گیرد:
 *   - /ai-prompts            فهرست پرامپت‌ها (تفکیک متن اصلی / ترجمه / تحلیل)
 *   - /ai-prompts/methodology روش‌شناسی طراحی (۱۲ قاعده)
 *
 * هدف طراحی: این‌که «این یک کلید دوحالته قابل تعویض است» در یک نگاه دیده شود ——
 *   لایه بیرونی برچسب «تغییر نما» دارد + هر دو بخش هم‌زمان دیده می‌شوند و هر کدام رنگ زمینه دارند،
 *   بخش فعلی با ink پر شده و برچسب «فعلی» دارد، بخش دیگر حالت قابل‌کلیک cream دارد.
 */

import React from "react";
import { Link } from "react-router-dom";
import { Layers, Compass } from "lucide-react";

export type PromptView = "catalog" | "methodology";

const options: {
  key: PromptView;
  to: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "catalog",
    to: "/ai-prompts",
    label: "یادگیری پرامپت‌های Agent برتر",
    hint: "تحلیل نمونه‌های واقعی",
    icon: <Layers className="w-[18px] h-[18px]" strokeWidth={2.5} />,
  },
  {
    key: "methodology",
    to: "/ai-prompts/methodology",
    label: "بهترین شیوه‌های طراحی پرامپت",
    hint: "۱۲ قاعده اصلی",
    icon: <Compass className="w-[18px] h-[18px]" strokeWidth={2.5} />,
  },
];

const PromptViewSwitch: React.FC<{ active: PromptView; className?: string }> = ({
  active,
  className = "",
}) => {
  return (
    <div className={`inline-block ${className}`}>
      <div className="flex items-center gap-2 mb-2 ps-1">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55">
          تغییر نما
        </span>
        <span className="font-sans text-[11px] text-ink/40">
          Catalog ⇆ Methodology
        </span>
      </div>

      <div
        className="inline-flex items-stretch gap-1.5 p-1.5 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg"
        role="tablist"
        aria-label="تغییر نمای پرامپت"
      >
        {options.map((option) => {
          const isActive = option.key === active;
          return (
            <Link
              key={option.key}
              to={option.to}
              role="tab"
              aria-selected={isActive}
              className={`group relative inline-flex items-center gap-2.5 ps-3 pe-4 py-2.5 rounded-xl font-sans transition-all duration-250 ease-spring ${
                isActive
                  ? "bg-ink text-white shadow-stamp"
                  : "bg-cream text-ink border border-ink/12 hover:bg-butter hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15]"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${
                  isActive
                    ? "bg-white/15 border-white/25 text-white"
                    : "bg-white border-ink/15 text-ink"
                }`}
              >
                {option.icon}
              </span>
              <span className="text-start leading-tight">
                <span className="flex items-center gap-1.5 font-extrabold text-[14px]">
                  {option.label}
                  {isActive && (
                    <span className="inline-flex items-center px-1.5 py-px rounded-full bg-butter text-ink font-sans font-bold text-[9px] uppercase tracking-wide">
                      فعلی
                    </span>
                  )}
                </span>
                <span
                  className={`block text-[11px] font-medium ${
                    isActive ? "text-white/60" : "text-ink/50"
                  }`}
                >
                  {option.hint}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PromptViewSwitch;
