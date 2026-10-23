/**
 * کارت مدل · سبک Mailchimp-Freddie
 *
 * نکات طراحی:
 * - سبک stamp: پس‌زمینه سفید + حاشیه 2px با ink + سایه offset، در hover به بالا-چپ جابه‌جا می‌شود
 * - strip بالا از چرخه رنگ برند استفاده می‌کند (دیگر typeColorMap گرادیان رنگین‌کمانی نیست)
 * - بلوک‌های داده (context / output / resolution) به cream کرمی کم‌رنگ + حاشیه ink تغییر کرده، بدون گرادیان
 * - chipهای برچسب تک‌رنگ + حاشیه باریک ink
 * - سلسله‌مراتب اطلاعات: شرکت+کشور ← نام مدل ← زمان/متن‌باز ← خانه‌های داده ← برچسب ← توضیح
 */

import React, { useState } from "react";
import { Calendar, Lock, Unlock, Tag } from "lucide-react";
import { AIModel } from "../../types/model";
import { ModelDetailModal } from "./ModelDetailModal";

interface ModelCardProps {
  model: AIModel;
}

/** شرکت ← strip رنگ برند (چرخه ۵ رنگ، برای جلوگیری از شلوغی) */
const companyAccent = (company: string): string => {
  const palette = [
    "bg-butter", // زرد
    "bg-coral", // مرجانی
    "bg-teal", // teal تیره
    "bg-pop", // صورتی
    "bg-butter-deep", // زرد تیره
  ];
  /* تخصیص با هش، تضمین می‌کند یک شرکت همیشه یک رنگ داشته باشد */
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
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return dateStr;
  }
};

/** قالب‌بندی اعداد بزرگ: 1024 ← 1M، 128 ← 128K، 0 / null ← N/A */
const formatTokenSize = (n: number | undefined): string => {
  if (!n || n <= 0) return "N/A";
  if (n >= 1000) {
    const m = n / 1000;
    return Number.isInteger(m) ? `${m}M` : `${m.toFixed(1)}M`;
  }
  return `${n}K`;
};

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accent = companyAccent(model.company);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer flex flex-col bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden"
      >
        {/* strip بالا —— رنگ برند، نشان‌دهنده شرکت مالک */}
        <div
          className={`h-2 ${accent} border-b-2 border-ink`}
          aria-hidden
        />

        <div className="p-5">
          {/* سربرگ: آیکون شرکت + نام مدل + metadata */}
          <div className="flex items-start gap-3.5 mb-4">
            <div className="flex-shrink-0">
              <img
                src={`/imgs/${model.company}.png`}
                alt={model.company}
                className="w-12 h-12 rounded-xl object-cover border-2 border-ink/15"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-extrabold text-[17px] text-ink leading-tight mb-1.5 truncate group-hover:text-ink/85 transition-colors">
                {model.modelName}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] text-ink-secondary">
                <span className="inline-flex items-center gap-1">
                  <span className="font-semibold text-ink">
                    {model.company}
                  </span>
                  <span className="text-[14px] leading-none">
                    {countryFlag(model.country)}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" strokeWidth={2.5} />
                  {formatDate(model.releaseDate)}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-semibold ${model.openSourceStatus === "متن‌باز" ? "text-teal" : "text-ink-tertiary"}`}
                >
                  {model.openSourceStatus === "متن‌باز" ? (
                    <Unlock className="w-3 h-3" strokeWidth={2.5} />
                  ) : (
                    <Lock className="w-3 h-3" strokeWidth={2.5} />
                  )}
                  {model.openSourceStatus}
                </span>
              </div>
            </div>
          </div>

          {/* خانه‌های داده —— سه ستون context / output / resolution، پس‌زمینه کم‌رنگ cream + حاشیه ink */}
          {(!!model.contextWindow ||
            !!model.maxGenerationTokenLength ||
            !!model.maxOutputResolution) && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {!!model.contextWindow && (
                <DataCell
                  label="طول context"
                  value={formatTokenSize(model.contextWindow)}
                />
              )}
              {!!model.maxGenerationTokenLength && (
                <DataCell
                  label="حداکثر خروجی"
                  value={formatTokenSize(model.maxGenerationTokenLength)}
                />
              )}
              {!!model.maxOutputResolution && (
                <DataCell
                  label="حداکثر وضوح"
                  value={model.maxOutputResolution}
                  full={!model.contextWindow || !model.maxGenerationTokenLength}
                />
              )}
            </div>
          )}

          {/* chipهای برچسب —— سبک stamp تک‌رنگ */}
          {model.modelTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {model.modelTags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
                >
                  <Tag className="w-2.5 h-2.5" strokeWidth={2.5} />
                  {tag}
                </span>
              ))}
              {model.modelTags.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 bg-white border border-ink/10 rounded-md font-mono text-[11px] text-ink-tertiary">
                  +{model.modelTags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* توضیح */}
          <p className="font-sans text-[13px] text-ink-secondary leading-[1.6] line-clamp-2">
            {model.description}
          </p>
        </div>
      </div>

      <ModelDetailModal
        model={model}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

/** کامپوننت کوچک خانه داده —— پس‌زمینه کم‌رنگ cream + حاشیه ink + برچسب بالا / عدد پایین */
const DataCell: React.FC<{ label: string; value: string; full?: boolean }> = ({
  label,
  value,
  full,
}) => (
  <div
    className={`bg-cream border border-ink/12 rounded-lg px-3 py-2 ${full ? "col-span-2" : ""}`}
  >
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50 mb-0.5">
      {label}
    </div>
    <div className="font-display font-extrabold text-[15px] text-ink leading-tight">
      {value}
    </div>
  </div>
);
