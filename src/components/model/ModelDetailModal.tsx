/**
 * پنجره جزئیات مدل · سبک Mailchimp-Freddie
 *
 * نکات بازسازی:
 *   - حذف گرادیان بنفش-آبی-صورتی خانه‌های داده ← cream + حاشیه ink/12
 *   - حذف backdrop-blur-sm ← پوشش توپر ink/45
 *   - حذف برچسب‌های گرادیان blue/purple ← chip با cream + حاشیه ink/15
 *   - حذف shadow-2xl ← shadow-stamp-lg (سایه offset)
 *   - strip بالا از همان رنگ هش شرکت در ModelCard استفاده می‌کند
 *   - دکمه بستن، لینک‌ها و عنوان بخش‌ها فونت و رنگ یکسان دارند
 */

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, Lock, Unlock, Tag, ArrowUpRight } from "lucide-react";
import { AIModel } from "../../types/model";

interface ModelDetailModalProps {
  model: AIModel;
  isOpen: boolean;
  onClose: () => void;
}

/** شرکت ← strip رنگ برند (هم‌سو با ModelCard) */
const companyAccent = (company: string): string => {
  const palette = [
    "bg-butter",
    "bg-coral",
    "bg-teal",
    "bg-pop",
    "bg-butter-deep",
  ];
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = (hash * 31 + company.charCodeAt(i)) % 1000;
  }
  return palette[hash % palette.length];
};

const countryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    آمریکا: "🇺🇸",
    چین: "🇨🇳",
    انگلیس: "🇬🇧",
    آلمان: "🇩🇪",
    فرانسه: "🇫🇷",
    کانادا: "🇨🇦",
    ژاپن: "🇯🇵",
  };
  return flags[country] || "🌍";
};

const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const formatTokenSize = (n: number | undefined): string => {
  if (!n || n <= 0) return "موجود نیست";
  if (n >= 1000) {
    const m = n / 1000;
    return Number.isInteger(m) ? `${m}M` : `${m.toFixed(1)}M`;
  }
  return `${n}K`;
};

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const accent = companyAccent(model.company);

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-[enterFade_0.18s_ease-out_both]">
      {/* پوشش توپر —— بدون blur */}
      <div className="absolute inset-0 bg-ink/45" onClick={onClose} />

      {/* Modal shell */}
      <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl max-w-3xl w-full max-h-[88vh] overflow-hidden flex flex-col animate-[enterPop_0.32s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        {/* strip بالا —— رنگ هش شرکت (هم‌سو با ModelCard) */}
        <div className={`h-2 ${accent} border-b-2 border-ink`} aria-hidden />

        {/* سربرگ */}
        <div className="flex items-start justify-between px-6 lg:px-8 pt-6 pb-5 border-b-2 border-ink/10">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <img
                src={`/imgs/${model.company}.png`}
                alt={model.company}
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl object-cover border-2 border-ink/15"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-display font-extrabold text-[24px] lg:text-[28px] text-ink leading-tight mb-2">
                {model.modelName}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-sans text-[13px] text-ink-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-semibold text-ink">
                    {model.company}
                  </span>
                  <span className="text-[16px] leading-none">
                    {countryFlag(model.country)}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {formatDate(model.releaseDate)}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-semibold ${model.openSourceStatus === "متن‌باز" ? "text-teal" : "text-ink-tertiary"}`}
                >
                  {model.openSourceStatus === "متن‌باز" ? (
                    <Unlock className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : (
                    <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
                  )}
                  {model.openSourceStatus}
                </span>
              </div>
            </div>
          </div>

          {/* دکمه بستن —— stamp mini */}
          <button
            onClick={onClose}
            aria-label="بستن"
            className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 ms-3 bg-white border-2 border-ink rounded-full shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <X className="w-4 h-4 text-ink" strokeWidth={2.5} />
          </button>
        </div>

        {/* ناحیه محتوا */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-7 space-y-7 bg-white">
          {/* پارامترهای اصلی */}
          <section>
            <SectionTitle>پارامترهای اصلی</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ParamCell
                label="پنجره context"
                value={formatTokenSize(model.contextWindow)}
              />
              <ParamCell
                label="حداکثر خروجی"
                value={formatTokenSize(model.maxGenerationTokenLength)}
              />
              {model.maxOutputResolution && (
                <ParamCell
                  label="حداکثر وضوح خروجی"
                  value={model.maxOutputResolution}
                />
              )}
            </div>
          </section>

          {/* برچسب‌های قابلیت */}
          {model.modelTags.length > 0 && (
            <section>
              <SectionTitle>برچسب‌های قابلیت</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {model.modelTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cream border-2 border-ink/15 rounded-full font-sans font-semibold text-[12px] text-ink-secondary"
                  >
                    <Tag className="w-3 h-3" strokeWidth={2.5} />
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* معرفی مدل */}
          <section>
            <SectionTitle>معرفی مدل</SectionTitle>
            <p className="font-sans text-[14px] lg:text-[15px] text-ink-secondary leading-[1.75]">
              {model.description}
            </p>
          </section>

          {/* منابع مرتبط */}
          {model.relatedLinks.length > 0 && (
            <section>
              <SectionTitle>منابع مرتبط</SectionTitle>
              <div className="space-y-2">
                {model.relatedLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 px-4 py-3 bg-cream border-2 border-ink/10 rounded-xl hover:border-ink hover:bg-butter-tint transition-colors"
                  >
                    <span className="font-sans text-[14px] font-semibold text-ink flex-1 truncate">
                      {link.title}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-ink/55 group-hover:text-ink flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

/** عنوان Section: فونت display + خط افقی ink */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-baseline gap-3 mb-4">
    <h3 className="font-display font-extrabold text-[17px] lg:text-[19px] text-ink leading-none">
      {children}
    </h3>
    <span className="flex-1 h-px bg-ink/12" aria-hidden />
  </div>
);

/** خانه پارامتر: پس‌زمینه cream + حاشیه ink/12 + برچسب بالا عدد پایین */
const ParamCell: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-cream border-2 border-ink/12 rounded-xl px-4 py-3">
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
      {label}
    </div>
    <div className="font-display font-extrabold text-[22px] text-ink leading-none">
      {value}
    </div>
  </div>
);
