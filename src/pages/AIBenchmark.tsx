/**
 * ارزیابی AI · سبک Mailchimp-Freddie (v2)
 *
 * بازسازی v2 (پس از خودارزیابی v1):
 *   - Hero از "صحنه بازاریابی تیره" → "به سربرگ ابزاری کرمی کم‌رنگ تغییر کرد"
 *   - کارت stats بزرگ Hero حذف شد (اعداد به StatsBar پایین سپرده شد تا تکرار نشود)
 *   - تزئین‌ها از ۶ به ۲ کاهش یافت + نامتقارن (لنگر راست / نقطه پایین-چپ)
 *   - زیرعنوان ۱ خط؛ ارتفاع ~520 ← ~320px؛ عنوان چپ‌چین
 *
 * تمایز بصری (متفاوت با Hero صفحات دیگر):
 *   مدل‌های AI = butter-tint کرمی بسیار کم‌رنگ + در راست لنگر "مهر بایگانی" (دایره بزرگ butter)
 *   ←← این صفحه = cream کرمی خنثی + در راست لنگر "نشان ارزیابی" (دایره بزرگ teal)
 *
 * معماری اطلاعات:
 *   ۱. HERO (cream · کوتاه · سربرگ ابزاری)
 *   ۲. WORKBAR (butter-tint) —— StatsBar + نوار ابزار
 *   ۳. CONTENT (پس‌زمینه سفید) —— شبکه کارت‌ها
 */

import React, { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { useBenchmarkData } from "../hooks/useBenchmarkData";
import { SearchBar } from "../components/benchmark/SearchBar";
import { FilterPanel } from "../components/benchmark/FilterPanel";
import { BenchmarkList } from "../components/benchmark/BenchmarkList";
import { StatsBar } from "../components/benchmark/StatsBar";
import { SortSelector } from "../components/benchmark/SortSelector";
import {
  GroupSelector,
  BenchmarkGroupBy,
} from "../components/benchmark/GroupSelector";
import { Star, DotGrid } from "../components/Decorations";
import { Benchmark } from "../types/benchmark";

const AIBenchmark: React.FC = () => {
  const {
    benchmarks,
    totalCount,
    loading,
    error,
    filters,
    sortOption,
    allTypes,
    allYears,
    allLicenses,
    updateFilters,
    clearFilters,
    setSortOption,
    hasActiveFilters,
  } = useBenchmarkData();

  /* گروه‌بندی: پیش‌فرض بر اساس سال (جدید ← قدیم)."none" تخت است. */
  const [groupBy, setGroupBy] = useState<BenchmarkGroupBy>("year");

  /**
   * benchmarks فیلتر و مرتب‌شده را بر اساس groupBy گروه‌بندی می‌کند.
   *
   * ⚠️ مهم: Map برگردانید نه Record / plain object!
   * چون موتور V8 کلیدهای رشته‌ای عددی plain object را ("2024" "2025"）
   * خودکار به ترتیب صعودی عددی مرتب می‌کند، که باعث می‌شود"سال desc"گروه‌بندی کاملاً بی‌اثر شود (همیشه صعودی می‌شود).
   * Map ترتیب درج را دقیقاً حفظ می‌کند و تنها کانتینر درست برای این سناریو است.
   */
  const groupedBenchmarks = useMemo<
    Map<string, Benchmark[]> | undefined
  >(() => {
    if (groupBy === "none") return undefined;

    const map = new Map<string, Benchmark[]>();
    benchmarks.forEach((b) => {
      let key: string;
      if (groupBy === "year") {
        const y = b.year;
        key = y && y !== "n/a" ? String(y) : "سال نامشخص";
      } else {
        /* گروه‌بندی type: از اولین نوع استفاده می‌شود */
        key = b.type[0] || "دسته‌بندی‌نشده";
      }
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    });

    /**
     * مرتب‌سازی key گروه:
     * - groupBy="year" وقتی"مرتب‌سازی بر اساس سال"گزینه (year-desc / year-asc) برای تنظیم جهت ترتیب گروه‌ها استفاده می‌شود
     *   پیش‌فرض year-desc ← جدید ← قدیم؛ انتخاب year-asc ← قدیم ← جدید
     *   انتخاب مرتب‌سازی دیگر (examples / name) ← ترتیب گروه‌ها پیش‌فرض desc می‌ماند و درون گروه بر اساس انتخاب مرتب می‌شود
     * - groupBy="type" ، key گروه به ترتیب الفبایی است
     */
    const entries = Array.from(map.entries());
    if (groupBy === "year") {
      const ascending = sortOption === "year-asc";
      entries.sort(([a], [b]) => {
        const na = Number(a);
        const nb = Number(b);
        const aValid = Number.isFinite(na);
        const bValid = Number.isFinite(nb);
        if (aValid && bValid) return ascending ? na - nb : nb - na;
        if (aValid) return -1;
        if (bValid) return 1;
        return 0;
      });
    } else {
      entries.sort(([a], [b]) => a.localeCompare(b));
    }
    /* از Map به‌جای Object.fromEntries استفاده می‌شود تا کلیدهای عددی خودکار صعودی نشوند */
    return new Map(entries);
  }, [benchmarks, groupBy, sortOption]);

  /* حالت Loading */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            در حال باز کردن بایگانی ارزیابی
          </h2>
          <p className="font-sans text-ink-secondary">
            در حال دریافت آخرین بنچمارک‌ها…
          </p>
        </div>
      </div>
    );
  }

  /* حالت Error */
  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-coral border-2 border-ink rounded-full text-3xl">
            😕
          </div>
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            بایگانی باز نمی‌شود
          </h2>
          <p className="font-sans text-ink-secondary mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-cream font-sans font-bold text-[14px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            بارگذاری مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white">
      {/* ═══════════════════ HERO v2 · «سربرگ ابزاری» کرمی خنثی cream ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        {/* راست "نشان ارزیابی" لنگر —— دایره بزرگ teal + Star روی هم، توزیع نامتقارن */}
        <div
          className="absolute -top-12 -end-12 lg:-end-6 w-[260px] h-[260px] rounded-full bg-teal border-2 border-ink hidden md:block"
          aria-hidden
        >
          <Star
            className="absolute top-[42%] start-[26%] w-12 h-12 text-butter"
            color="#F2D047"
            filled
          />
        </div>
        {/* نقطه تزئینی DotGrid پایین-چپ */}
        <DotGrid
          className="absolute bottom-6 start-[3%] w-24 h-10 text-ink opacity-25 hidden md:block"
          color="#241C15"
          rows={3}
          cols={6}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 lg:pt-16 pb-12 lg:pb-14">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
              <span className="inline-block w-6 h-px bg-ink/45" />
              <span>§ Benchmarks · بایگانی ارزیابی</span>
            </div>

            <h1 className="font-display font-extrabold text-display-lg text-ink mb-4 leading-[1.1]">
              برای سنجش توانایی مدل،
              <span className="whitespace-nowrap">اول معیارهای ارزیابی را بشناسید.</span>
            </h1>

            <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary leading-[1.65]">
              بنچمارک‌های اصلی دانشگاهی و صنعتی را جمع‌آوری کرده و بر اساس حوزه / سال فیلتر چندبعدی می‌کند،
              با یک کلیک به مقاله، کد و مجموعه‌داده می‌رسید.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WORKBAR · میز کار cream ═══════════════════ */}
      {/* توجه: نباید overflow-hidden داشته باشد + z-20 باید بالاتر از content section باشد، وگرنه پنل کشویی بریده/زیر کارت‌ها پنهان می‌شود */}
      <section className="relative z-20 bg-cream border-b-2 border-ink">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-8">
          {/* نوار آمار —— نمایش داده اصلی (مسئولیتی را که Hero واگذار کرده بر عهده می‌گیرد) */}
          <div className="mb-6">
            <StatsBar
              totalCount={totalCount}
              filteredCount={benchmarks.length}
              hasActiveFilters={hasActiveFilters}
              extras={[
                { label: "حوزه‌های پوشش‌داده‌شده", value: allTypes.length },
                { label: "بازه سال‌ها", value: allYears.length },
              ]}
            />
          </div>

          <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <SearchBar
                value={filters.searchQuery}
                onChange={(value) => updateFilters({ searchQuery: value })}
              />
              <FilterPanel
                filters={filters}
                allTypes={allTypes}
                allYears={allYears}
                allLicenses={allLicenses}
                onFilterChange={updateFilters}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                totalCount={totalCount}
                filteredCount={benchmarks.length}
              />
              <SortSelector value={sortOption} onChange={setSortOption} />
              <GroupSelector value={groupBy} onChange={setGroupBy} />
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t-2 border-ink/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 me-1">
                    شرایط انتخاب‌شده
                  </span>
                  {filters.selectedTypes.map((type) => (
                    <ActiveChip
                      key={type}
                      label={type}
                      color="butter"
                      onClose={() =>
                        updateFilters({
                          selectedTypes: filters.selectedTypes.filter(
                            (t) => t !== type,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedYears.map((year) => (
                    <ActiveChip
                      key={year}
                      label={year}
                      color="coral"
                      onClose={() =>
                        updateFilters({
                          selectedYears: filters.selectedYears.filter(
                            (y) => y !== year,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedLicenses.map((license) => (
                    <ActiveChip
                      key={license}
                      label={license}
                      color="teal"
                      onClose={() =>
                        updateFilters({
                          selectedLicenses: filters.selectedLicenses.filter(
                            (l) => l !== license,
                          ),
                        })
                      }
                    />
                  ))}
                  <button
                    onClick={clearFilters}
                    className="font-sans text-[12px] font-semibold text-ink-tertiary hover:text-ink underline underline-offset-2 ms-1"
                  >
                    پاک کردن همه
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTENT · شبکه کارت با پس‌زمینه سفید (پشتیبانی از رندر گروه‌بندی) ═══════════════════ */}
      <section className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <BenchmarkList
            benchmarks={benchmarks}
            groups={groupedBenchmarks as Map<string, Benchmark[]> | undefined}
            loading={loading}
            error={error}
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

/** chip شرایط انتخاب‌شده */
const ActiveChip: React.FC<{
  label: string;
  color: "butter" | "coral" | "teal";
  onClose: () => void;
}> = ({ label, color, onClose }) => {
  const bg = {
    butter: "bg-butter text-ink",
    coral: "bg-coral text-white",
    teal: "bg-teal text-white",
  }[color];
  const closeHover = {
    butter: "hover:bg-ink/10",
    coral: "hover:bg-white/20",
    teal: "hover:bg-white/20",
  }[color];
  return (
    <span
      className={`inline-flex items-center gap-1.5 ps-3 pe-1.5 py-1 rounded-full border-2 border-ink font-sans font-semibold text-[12px] ${bg}`}
    >
      {label}
      <button
        onClick={onClose}
        aria-label={`حذف ${label}`}
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors ${closeHover}`}
      >
        <span className="text-[14px] leading-none -mt-px">×</span>
      </button>
    </span>
  );
};

export default AIBenchmark;
