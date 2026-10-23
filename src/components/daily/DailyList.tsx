/**
 * فهرست archive گزارش روزانه · سبک فهرست روزنامه
 *
 * استعاره: مجله / خبرنامه دیجیتال"فهرست شماره‌های گذشته"
 *
 * حالت رندر:
 *   - groups Map داده شود ← رندر گروه‌بندی بر اساس ماه/سال، هر گروه یک volume head با mono + ردیف‌های issue آن گروه
 *   - groups داده نشود ← رندر تخت
 *
 * عنوان گروه ماه با "Vol.MM / YYYY / M  ······  N ISSUES" سبک روزنامه
 *
 * issueNumberMap: لایه والد نگاشت date ← شماره № را می‌دهد
 *   (چون شماره باید بر اساس"ترتیب گزارش در کل مجموعه"باشد، نه ترتیب درون گروه، وگرنه با تغییر مرتب‌سازی به هم می‌ریزد)
 *
 * سه حالت: loading / error / empty همه با کانتینر سبک stamp
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { DailyReport } from "../../types/daily";
import { DailyCard } from "./DailyCard";

interface DailyListProps {
  dailyList: DailyReport[];
  groups?: Map<string, DailyReport[]>;
  loading: boolean;
  error: string | null;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  /** date ← شماره № در کل مجموعه */
  issueNumberMap?: Map<string, number>;
  /** رد شدن از تیتر اول (مورد اول)، برای جلوگیری از تکرار با TodayHero */
  skipDate?: string;
}

export const DailyList: React.FC<DailyListProps> = ({
  dailyList,
  groups,
  loading,
  error,
  hasActiveFilters,
  onClearFilters,
  issueNumberMap,
  skipDate,
}) => {
  const navigate = useNavigate();
  const handleDailyClick = (date: string) => {
    navigate(`/ai-daily/${date}`);
  };

  /* Loading */
  if (loading) {
    return (
      <div className="border border-ink/15 rounded-2xl px-10 py-16 text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
        <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
          در حال صحافی بایگانی امروز
        </h3>
        <p className="font-sans text-[14px] text-ink-secondary">
          در حال دریافت آخرین گزارش‌های روزانه…
        </p>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-10 py-12 text-center max-w-md mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-3">
          § Error
        </div>
        <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
          بایگانی باز نمی‌شود
        </h3>
        <p className="font-sans text-[14px] text-ink-secondary mb-6">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2 bg-ink text-cream font-sans font-bold text-[13px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
        >
          بارگذاری مجدد
        </button>
      </div>
    );
  }

  /* Empty */
  const totalAfterSkip = dailyList.filter((d) => d.date !== skipDate).length;
  if (totalAfterSkip === 0) {
    return (
      <div className="border border-dashed border-ink/20 rounded-2xl px-10 py-16 text-center max-w-md mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
          § Empty
        </div>
        <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
          {hasActiveFilters ? "گزارش روزانه مطابقی پیدا نشد" : "هنوز گزارش روزانه‌ای نیست"}
        </h3>
        <p className="font-sans text-[14px] text-ink-secondary mb-6">
          {hasActiveFilters
            ? "کلیدواژه دیگری امتحان کنید یا فیلترها را پاک کرده و دوباره ببینید."
            : "شماره جدید گزارش روزانه در حال ویرایش است، منتظر باشید."}
        </p>
        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="font-sans text-[13px] font-semibold text-ink underline underline-offset-4 decoration-2 decoration-coral hover:text-coral transition-colors"
          >
            پاک کردن فیلترها ←
          </button>
        )}
      </div>
    );
  }

  /* رندر گروه‌بندی‌شده */
  if (groups && groups.size > 0) {
    return (
      <div className="space-y-12 lg:space-y-14">
        {Array.from(groups.entries()).map(([groupKey, items]) => {
          const visibleItems = items.filter((d) => d.date !== skipDate);
          if (visibleItems.length === 0) return null;
          return (
            <section key={groupKey}>
              <VolumeHead label={groupKey} count={visibleItems.length} />
              <div>
                {visibleItems.map((daily) => (
                  <DailyCard
                    key={daily.date}
                    daily={daily}
                    issueNumber={issueNumberMap?.get(daily.date)}
                    onClick={handleDailyClick}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  /* رندر تخت */
  return (
    <div>
      {dailyList
        .filter((d) => d.date !== skipDate)
        .map((daily) => (
          <DailyCard
            key={daily.date}
            daily={daily}
            issueNumber={issueNumberMap?.get(daily.date)}
            onClick={handleDailyClick}
          />
        ))}
    </div>
  );
};

/* ──────────────────────────────────────────────
 * عنوان گروه —— سبک شماره و جلد روزنامه
 *   Vol.MM / YYYY / M  ··············  N ISSUES
 * ────────────────────────────────────────────── */
const VolumeHead: React.FC<{ label: string; count: number }> = ({
  label,
  count,
}) => {
  /* از "2026 / 5" / "سال 2026" شماره vol استخراج می‌شود (فقط برای تزئین، بدون اعتبارسنجی معنادار) */
  const monthMatch = label.match(/(\d{4})\s*\/\s*(\d{1,2})/);
  const yearMatch = label.match(/^سال\s*(\d{4})$/);
  const volTag = monthMatch
    ? `Vol.${String(monthMatch[2]).padStart(2, "0")}`
    : yearMatch
    ? `Year ${yearMatch[1]}`
    : "§";

  return (
    <div className="mb-5 lg:mb-6">
      <div className="flex items-baseline gap-3 lg:gap-4 mb-2.5">
        <span className="font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
          {volTag}
        </span>
        <h2 className="font-display font-extrabold text-[20px] lg:text-[24px] text-ink leading-none">
          {label}
        </h2>
        <span className="flex-1 mx-2 border-t border-dotted border-ink/25 translate-y-[-3px]" />
        <span className="font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45 tabular-nums">
          {count} ISSUES
        </span>
      </div>
    </div>
  );
};
