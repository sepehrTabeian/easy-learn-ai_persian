/**
 * کارت بنچمارک · سبک Mailchimp-Freddie
 *
 * توضیح بازسازی:
 * - نگاشت گرادیان رنگین‌کمانی ۲۵+ نوع قبلی حذف و به چرخه ۵ رنگ تم تقلیل یافت (رنگ بر اساس هش نوع)
 * - همه backdrop-blur / glass effect حذف شد
 * - سبک stamp: پس‌زمینه سفید + حاشیه 2px با ink + سایه offset
 * - سلسله‌مراتب اطلاعات: strip بالا ← نام ← ردیف metadata ← chipهای نوع ← توضیح ← لینک‌های پایین
 */

import React from "react";
import {
  Github,
  Database,
  FileText,
  Hash,
  Scale,
  Calendar,
} from "lucide-react";
import { Benchmark } from "../../types/benchmark";

interface BenchmarkCardProps {
  benchmark: Benchmark;
}

/** تخصیص strip رنگ برند بر اساس هش نوع */
const typeAccent = (type: string): string => {
  const palette = [
    "bg-butter",
    "bg-coral",
    "bg-teal",
    "bg-pop",
    "bg-butter-deep",
  ];
  let hash = 0;
  for (let i = 0; i < type.length; i++) {
    hash = (hash * 31 + type.charCodeAt(i)) % 1000;
  }
  return palette[hash % palette.length];
};

const formatNumber = (num: number | string): string => {
  if (num === "n/a") return "—";
  if (typeof num === "string") return num;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

const isValidUrl = (url: string): boolean => {
  return (
    !!url &&
    url !== "n/a" &&
    url !== "see repo" &&
    url !== "see dataset page" &&
    url.startsWith("http")
  );
};

export const BenchmarkCard: React.FC<BenchmarkCardProps> = ({ benchmark }) => {
  const primaryType = benchmark.type[0] || "other";
  const accent = typeAccent(primaryType);

  const hasPaper = isValidUrl(benchmark.benchmarkPaper);
  const hasCode = isValidUrl(benchmark.codeRepository);
  const hasDataset = isValidUrl(benchmark.dataset);
  const hasAnyLink = hasPaper || hasCode || hasDataset;

  return (
    <article className="group flex flex-col bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden">
      {/* strip بالا —— رنگ نوع اصلی */}
      <div className={`h-2 ${accent} border-b-2 border-ink`} aria-hidden />

      <div className="p-5 flex flex-col flex-1">
        {/* نام */}
        <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight mb-3 line-clamp-1 group-hover:text-ink/85 transition-colors">
          {benchmark.name}
        </h3>

        {/* ردیف metadata: نمونه / مجوز / سال */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 font-sans text-[12px] text-ink-secondary">
          <span className="inline-flex items-center gap-1.5" title="تعداد نمونه">
            <Hash className="w-3.5 h-3.5 text-ink/55" strokeWidth={2.5} />
            <span className="font-bold text-ink">
              {benchmark.numberOfExamples &&
              benchmark.numberOfExamples !== "n/a"
                ? formatNumber(benchmark.numberOfExamples)
                : "—"}
            </span>
            <span className="text-ink-tertiary">نمونه</span>
          </span>

          <span className="inline-flex items-center gap-1.5" title="مجوز">
            <Scale className="w-3.5 h-3.5 text-ink/55" strokeWidth={2.5} />
            <span className="font-semibold text-ink max-w-[120px] truncate">
              {benchmark.license && benchmark.license !== "see dataset page"
                ? benchmark.license
                : "Unknown"}
            </span>
          </span>

          {benchmark.year && benchmark.year !== "n/a" && (
            <span
              className="inline-flex items-center gap-1.5"
              title="سال انتشار"
            >
              <Calendar
                className="w-3.5 h-3.5 text-ink/55"
                strokeWidth={2.5}
              />
              <span className="font-semibold text-ink">{benchmark.year}</span>
            </span>
          )}
        </div>

        {/* chipهای نوع —— cream + حاشیه ink */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {benchmark.type.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
            >
              #{tag}
            </span>
          ))}
          {benchmark.type.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 bg-white border border-ink/10 rounded-md font-mono text-[11px] text-ink-tertiary">
              +{benchmark.type.length - 4}
            </span>
          )}
        </div>

        {/* توضیح */}
        <p className="font-sans text-[13px] text-ink-secondary leading-[1.7] line-clamp-3 flex-1 mb-4">
          {benchmark.description}
        </p>

        {/* ردیف لینک‌های پایین —— فقط وقتی لینک باشد نمایش داده می‌شود، پس‌زمینه کم‌رنگ cream با حاشیه بالای ink */}
        {hasAnyLink && (
          <div className="flex items-center gap-1 -mx-5 -mb-5 px-5 py-3 bg-cream border-t-2 border-ink/15">
            {hasPaper && (
              <LinkBtn
                href={benchmark.benchmarkPaper}
                icon={<FileText className="w-3.5 h-3.5" strokeWidth={2.5} />}
                label="مقاله"
              />
            )}
            {hasCode && (
              <LinkBtn
                href={benchmark.codeRepository}
                icon={<Github className="w-3.5 h-3.5" strokeWidth={2.5} />}
                label="کد"
              />
            )}
            {hasDataset && (
              <LinkBtn
                href={benchmark.dataset}
                icon={<Database className="w-3.5 h-3.5" strokeWidth={2.5} />}
                label="مجموعه‌داده"
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
};

/** دکمه کوچک لینک پایین */
const LinkBtn: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans font-semibold text-[12px] text-ink-secondary hover:text-ink hover:bg-white transition-colors"
  >
    {icon}
    {label}
  </a>
);
