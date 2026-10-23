/**
 * گزارش روزانه AI · سبک خبرنامه دیجیتال / archive مجله
 *
 * استعاره: گزارش روزانه Easy AI = خبرنامه دیجیتالی که هر روز منتشر می‌شود (زبان Stratechery / Stripe Press / archive در Substack)
 *   ─ خود Mailchimp از محصول newsletter آمده، این طبیعی‌ترین سناریوی کاربرد زبان بصری آن است
 *
 * معماری اطلاعات:
 *   ۱. MASTHEAD    سرلوحه: نام نشریه درشت + شعار + meta شماره و جلد + خط 1px ink
 *   ۲. TODAY       شماره امروز: کارت تیتر اول صفحه اول جدا برای جدیدترین شماره (تنها کارت بزرگ stamp باقی‌مانده)
 *   ۳. ARCHIVE     فهرست شماره‌های گذشته: نوار ابزار سبک + موارد ردیفی با hr گروه‌بندی‌شده بر اساس ماه
 *
 * تفاوت کلیدی (در مقایسه با قالب سربرگ ابزاری AIBenchmark):
 *   ─ نقش اصلی"نشریه"است، نه"ابزار مدیریت بایگانی"
 *   ─ تقابل نمایشی اندازه فونت حس نشریه را می‌سازد (بدون serif، با display + metadata با mono)
 *   ─ حذف دایره‌های تزئینی بزرگ / بلوک‌های رنگی بزرگ butter-tint
 *   ─ نوار ابزار به داخل بخش archive منتقل شده، جدیدترین شماره اول دیده می‌شود
 *   ─ موارد archive ردیف‌های جداشده با hr هستند (نه کارت stamp)، تراکم بالا، تزئین کم
 *
 * داده: ۱۱۷ گزارش روزانه، ۳۲۰ برچسب ← پیش‌فرض گروه‌بندی بر اساس ماه
 *   key گروه از Map استفاده می‌کند (تا V8 "2024" "2025" کلیدهای عددی را خودکار صعودی نکند)
 */

import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { useDailyList } from "../hooks/useDailyData";
import { useSearch } from "../hooks/useSearch";
import { useTagFilter } from "../hooks/useTagFilter";
import { DailyList } from "../components/daily/DailyList";
import { SearchBar } from "../components/daily/SearchBar";
import { TagFilter } from "../components/daily/TagFilter";
import { SortSelector, DailySortOption } from "../components/daily/SortSelector";
import {
  GroupSelector,
  DailyGroupBy,
} from "../components/daily/GroupSelector";
import { DailyReport } from "../types/daily";

const WEEKDAYS = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"] as const;

const AIDaily: React.FC = () => {
  const navigate = useNavigate();
  const { dailyList, loading, error } = useDailyList();

  const {
    selectedTags,
    allTags,
    filteredByTags,
    hasTagFilter,
    toggleTag,
    clearTags,
  } = useTagFilter(dailyList);
  const { searchTerm, setSearchTerm, filteredList, hasSearch } =
    useSearch(filteredByTags);

  const [sortOption, setSortOption] = useState<DailySortOption>("date-desc");
  const [groupBy, setGroupBy] = useState<DailyGroupBy>("month");

  const archiveRef = useRef<HTMLElement>(null);

  /* نگاشت شماره № کل مجموعه: جدیدترین شماره = بزرگ‌ترین № = totalCount */
  const issueNumberMap = useMemo<Map<string, number>>(() => {
    const map = new Map<string, number>();
    const byDateDesc = [...dailyList].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const total = byDateDesc.length;
    byDateDesc.forEach((d, i) => {
      map.set(d.date, total - i);
    });
    return map;
  }, [dailyList]);

  /* تیتر امروز: جدیدترین مورد در داده اصلی (تحت تأثیر فیلتر/مرتب‌سازی نیست) */
  const todayIssue = useMemo<DailyReport | undefined>(() => {
    if (dailyList.length === 0) return undefined;
    return [...dailyList].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0];
  }, [dailyList]);

  /* فهرست archive پس از مرتب‌سازی */
  const sortedList = useMemo<DailyReport[]>(() => {
    const arr = [...filteredList];
    arr.sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      return sortOption === "date-asc" ? ta - tb : tb - ta;
    });
    return arr;
  }, [filteredList, sortOption]);

  /* گروه‌بندی —— Map ترتیب درج را حفظ می‌کند */
  const grouped = useMemo<Map<string, DailyReport[]> | undefined>(() => {
    if (groupBy === "none") return undefined;
    const map = new Map<string, DailyReport[]>();
    sortedList.forEach((d) => {
      const dateObj = new Date(d.date);
      const valid = !Number.isNaN(dateObj.getTime());
      const year = valid ? dateObj.getFullYear() : "نامشخص";
      const month = valid ? dateObj.getMonth() + 1 : "—";
      const key =
        groupBy === "year" ? `سال ${year}` : `${year} / ${month}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    });
    return map;
  }, [sortedList, groupBy]);

  /* meta سرلوحه: تعداد کل شماره‌ها / تاریخ شروع و پایان جلد */
  const masthead = useMemo(() => {
    if (dailyList.length === 0)
      return { total: 0, firstDate: "—", lastDate: "—" };
    const dates = dailyList
      .map((d) => new Date(d.date).getTime())
      .filter((t) => !Number.isNaN(t));
    if (dates.length === 0)
      return { total: dailyList.length, firstDate: "—", lastDate: "—" };
    const fmt = (t: number) => {
      const d = new Date(t);
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
        2,
        "0",
      )}`;
    };
    return {
      total: dailyList.length,
      firstDate: fmt(Math.min(...dates)),
      lastDate: fmt(Math.max(...dates)),
    };
  }, [dailyList]);

  const hasActiveFilters = hasSearch || hasTagFilter;
  const clearAll = () => {
    setSearchTerm("");
    clearTags();
  };

  const scrollToArchive = () => {
    archiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative bg-white">
      {/* ═══════════════════════════════════════════════════════════════
       * MASTHEAD · سرلوحه
       *
       * طراحی: بسیار مینیمال، فضای خالی غالب. خط 1px بالا و پایین نوار سرلوحه را دربرمی‌گیرد.
       * حروف درشت "گزارش روزانه Easy AI" + شعار، اطلاعات meta در یک خط mono.
       * هیچ شکل تزئینی گذاشته نمی‌شود —— اعتبار بصری نشریه از خود صفحه‌آرایی می‌آید.
       * ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-ink">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-10 lg:pb-12">
          {/* خط بالا + eyebrow با § */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              § Easy AI · Daily Brief
            </span>
            <span className="flex-1 border-t border-ink/15" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55 tabular-nums">
              EST. {masthead.firstDate}
            </span>
          </div>

          {/* نام نشریه درشت */}
          <h1 className="font-display font-extrabold text-ink mb-5 leading-[1.02] tracking-[-0.02em]">
            <span className="block text-[clamp(2.8rem,7vw,5.5rem)]">
              Easy AI{" "}
              <span className="relative inline-block">
                اخبار روزانه
                <span
                  className="absolute -bottom-2 lg:-bottom-3 start-0 end-0 h-[10px] lg:h-[14px] bg-butter -z-0 rounded-sm"
                  aria-hidden
                />
              </span>
            </span>
          </h1>

          {/* شعار */}
          <p className="font-sans text-[16px] lg:text-[17px] text-ink-secondary leading-[1.6] max-w-2xl mb-7">
            هر روز جدیدترین تحولات صنعت AI را برایتان صحافی می‌کنیم ——
            شرکت‌ها، مدل‌ها، Agentها، زیرساخت،
            <span className="whitespace-nowrap">در یک خبرنامه.</span>
          </p>

          {/* ردیف meta —— در مجموع N شماره · شروع و پایان جلد · ناشر */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] lg:text-[12px] text-ink/55 tabular-nums">
            <span>
              در مجموع{" "}
              <span className="font-bold text-ink">{masthead.total}</span> شماره
            </span>
            <span className="text-ink/25">·</span>
            <span>
              {masthead.firstDate} —— {masthead.lastDate}
            </span>
            <span className="text-ink/25">·</span>
            <span>{allTags.length} بعد برچسب</span>
            <span className="text-ink/25">·</span>
            <span>در حال به‌روزرسانی مداوم</span>
            <button
              onClick={scrollToArchive}
              className="ms-auto inline-flex items-center gap-1 font-sans font-semibold text-[12px] text-ink hover:text-coral transition-colors group"
            >
              مرور بایگانی شماره‌های گذشته
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * TODAY · شماره امروز (تیتر اول صفحه اول)
       *
       * این CTA در Hero است: کاربر به محض ورود جدیدترین شماره را ببیند / کلیک کند.
       * تنها کارت بزرگ stamp باقی‌مانده، برای تقویت جایگاه"صفحه اول".
       * صفحه‌آرایی روزنامه‌ای: نشان mono در بالا + عنوان درشت + زنجیره dot برچسب‌ها + CTA اصلی coral.
       * ═══════════════════════════════════════════════════════════════ */}
      {todayIssue && !loading && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
            <TodayHero
              daily={todayIssue}
              issueNumber={issueNumberMap.get(todayIssue.date) ?? 0}
              onOpen={() => navigate(`/ai-daily/${todayIssue.date}`)}
            />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
       * ARCHIVE · فهرست شماره‌های گذشته
       *
       * نوار ابزار این‌جا ظاهر می‌شود (نه در بالاترین نقطه).
       * وزن بصری از"شماره امروز"کمتر است ── با نوار پس‌زمینه بسیار کم‌رنگ cream + جداکننده بالای 1px با ink/15.
       * موارد archive ردیف‌های جداشده با hr هستند، با تراکم بالا.
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={archiveRef}
        className="relative z-20 bg-white border-t border-ink"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 lg:pt-14 pb-16 lg:pb-20">
          {/* archive head */}
          <div className="flex items-center gap-3 mb-8 lg:mb-10">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              § Archive · فهرست شماره‌های گذشته
            </span>
            <span className="flex-1 border-t border-ink/15" />
            <span className="font-mono text-[11px] font-semibold text-ink/55 tabular-nums">
              {hasActiveFilters
                ? `${sortedList.length} / ${masthead.total}`
                : `${masthead.total} ISSUES`}
            </span>
          </div>

          {/* نوار ابزار —— inline سبک، دیگر داخل white card stamp نیست */}
          <div className="mb-10 lg:mb-12">
            <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <TagFilter
                allTags={allTags}
                selectedTags={selectedTags}
                onTagToggle={toggleTag}
                onClearTags={clearTags}
              />
              <SortSelector value={sortOption} onChange={setSortOption} />
              <GroupSelector value={groupBy} onChange={setGroupBy} />
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 me-1">
                  Active
                </span>
                {hasSearch && (
                  <ActiveChip
                    label={`جستجو ${searchTerm}`}
                    onClose={() => setSearchTerm("")}
                  />
                )}
                {selectedTags.map((tag) => (
                  <ActiveChip
                    key={tag}
                    label={tag}
                    onClose={() => toggleTag(tag)}
                  />
                ))}
                <button
                  onClick={clearAll}
                  className="font-sans text-[12px] font-semibold text-ink-tertiary hover:text-coral underline underline-offset-2 ms-1"
                >
                  پاک کردن همه
                </button>
              </div>
            )}
          </div>

          {/* فهرست archive */}
          <DailyList
            dailyList={sortedList}
            groups={grouped}
            loading={loading}
            error={error}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearAll}
            issueNumberMap={issueNumberMap}
            /* تیتر امروز در archive تکرار نمی‌شود */
            skipDate={
              !hasActiveFilters && sortOption === "date-desc"
                ? todayIssue?.date
                : undefined
            }
          />
        </div>
      </section>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#241C15",
            color: "#F4ECD8",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            borderRadius: "12px",
            border: "2px solid #241C15",
          },
        }}
      />
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * TodayHero · تیتر اول صفحه اول شماره امروز
 * ──────────────────────────────────────────────────────────────────── */

interface TodayHeroProps {
  daily: DailyReport;
  issueNumber: number;
  onOpen: () => void;
}

const TodayHero: React.FC<TodayHeroProps> = ({
  daily,
  issueNumber,
  onOpen,
}) => {
  const dateObj = new Date(daily.date);
  const valid = !Number.isNaN(dateObj.getTime());
  const formattedDate = valid
    ? `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
        2,
        "0",
      )}.${String(dateObj.getDate()).padStart(2, "0")}`
    : daily.date;
  const weekday = valid ? `${WEEKDAYS[dateObj.getDay()]}` : "—";

  return (
    <article
      className="group relative bg-white border-2 border-ink rounded-3xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:8px_8px_0_0_#241C15] cursor-pointer overflow-hidden"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {/* بالا"نوار شماره" —— metadata با mono + مهر LATEST به رنگ coral */}
      <div className="flex items-center justify-between gap-4 px-6 lg:px-10 pt-6 lg:pt-7 pb-4 border-b border-dotted border-ink/25">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/65 tabular-nums">
          <span>§ Latest Issue</span>
          <span className="text-ink/25">·</span>
          <span>№ {String(issueNumber).padStart(3, "0")}</span>
          <span className="text-ink/25">·</span>
          <span>{formattedDate}</span>
          <span className="text-ink/25">·</span>
          <span>{weekday}</span>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 bg-coral text-white border-2 border-ink rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0_0_#241C15]">
          Latest
        </span>
      </div>

      {/* عنوان درشت صفحه اول */}
      <div className="px-6 lg:px-10 pt-8 lg:pt-10 pb-7">
        <h2 className="font-display font-extrabold text-ink leading-[1.18] tracking-[-0.01em] text-[clamp(1.6rem,3.2vw,2.4rem)] mb-6 lg:mb-7 group-hover:text-coral transition-colors duration-300">
          {daily.title}
        </h2>

        {/* زنجیره برچسب —— جداشده با dot، سبک ستون روزنامه */}
        {daily.tags && daily.tags.length > 0 && (
          <div className="flex flex-wrap items-center font-mono text-[12px] text-ink/55 mb-7 lg:mb-8">
            {daily.tags.slice(0, 6).map((tag, i) => (
              <span key={tag} className="inline-flex items-center">
                {i > 0 && <span className="mx-2 text-ink/25">·</span>}
                <span className="font-semibold text-ink-secondary">{tag}</span>
              </span>
            ))}
            {daily.tags.length > 6 && (
              <span className="ms-2 text-ink/35">+{daily.tags.length - 6}</span>
            )}
          </div>
        )}

        {/* CTA + راهنما */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-coral text-white border-2 border-ink rounded-full font-sans font-bold text-[14px] shadow-stamp transition-all duration-250 ease-spring group-hover:bg-ink hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            خواندن جدیدترین شماره
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-[11px] text-ink/40 italic">
            "جدیدترین شماره رسید · برای باز کردن کلیک کنید"
          </span>
        </div>
      </div>
    </article>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * chip شرایط انتخاب‌شده · بسیار سبک
 * ──────────────────────────────────────────────────────────────────── */

const ActiveChip: React.FC<{ label: string; onClose: () => void }> = ({
  label,
  onClose,
}) => (
  <span className="inline-flex items-center gap-1.5 ps-3 pe-1.5 py-0.5 bg-cream border border-ink/15 rounded-full font-sans font-semibold text-[12px] text-ink">
    <span className="max-w-[180px] truncate">{label}</span>
    <button
      onClick={onClose}
      aria-label={`حذف ${label}`}
      className="inline-flex items-center justify-center w-4 h-4 rounded-full text-ink/55 hover:bg-ink/10 hover:text-ink transition-colors"
    >
      <span className="text-[14px] leading-none -mt-px">×</span>
    </button>
  </span>
);

export default AIDaily;
