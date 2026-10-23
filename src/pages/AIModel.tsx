/**
 * مدل‌های AI · سبک Mailchimp-Freddie (v2)
 *
 * بازسازی v2 (پس از خودارزیابی v1):
 *   - Hero از "صحنه بازاریابی تیره" → "به سربرگ ابزاری کرمی کم‌رنگ تغییر کرد"(بدون دزدیدن صحنه)
 *   - حذف کارت stats بزرگ Hero —— اعداد به StatsBar پایین سپرده شد تا 229 دو بار ظاهر نشود
 *   - تزئین‌ها از ۶ به ۲ + توزیع نامتقارن (لنگر راست / نقطه پایین-چپ)
 *   - زیرعنوان ۱ خط شد؛ ارتفاع Hero از ~520px به ~320px کاهش یافت
 *   - عنوان چپ‌چین، حال‌وهوای صفحه ابزار (نه وسط‌چین صفحه بازاریابی)
 *
 * تمایز بصری (متفاوت با Hero صفحات دیگر):
 *   صفحه اصلی = تصویرسازی متحرک بزرگ
 *   دانش بصری AI = زرد butter + کادر جستجوی بزرگ وسط‌چین
 *   سیاره دانش = زرد butter + CTA بزرگ وسط‌چین
 *   ←← این صفحه = butter-tint کرمی بسیار کم‌رنگ + چپ‌چین + در راست "مهر بایگانی" لنگر
 *
 * معماری اطلاعات:
 *   ۱. HERO (butter-tint کرمی بسیار کم‌رنگ · کوتاه · سربرگ ابزاری)
 *   ۲. WORKBAR (پس‌زمینه کرمی کم‌رنگ cream) —— داده اصلی StatsBar + نوار ابزار
 *   ۳. CONTENT (پس‌زمینه سفید) —— کارت / فهرست درختی
 */

import React, { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { ArrowUpRight, KeyRound } from "lucide-react";
import {
  useModelList,
  useModelFilters,
  useModelSort,
  useModelGroup,
} from "../hooks/useModelData";
import { SearchBar } from "../components/model/SearchBar";
import { FilterPanel } from "../components/model/FilterPanel";
import { SortSelector } from "../components/model/SortSelector";
import { GroupSelector } from "../components/model/GroupSelector";
import { ModelList } from "../components/model/ModelList";
import { ModelTreeView } from "../components/model/ModelTreeView";
import { ViewToggle, ViewMode } from "../components/model/ViewToggle";
import { StatsBar } from "../components/model/StatsBar";
import { GroupByOption } from "../types/model";
import { Sparkle4, DotGrid } from "../components/Decorations";

const AIModel: React.FC = () => {
  const { modelList, loading, error } = useModelList();
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [groupBy, setGroupBy] = useState<GroupByOption>("none");

  const {
    filters,
    filteredModels,
    allCompanies,
    allTags,
    allOpenSourceStatuses,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  } = useModelFilters(modelList);

  const { sortOption, setSortOption, sortedModels } =
    useModelSort(filteredModels);
  const groupedModels = useModelGroup(sortedModels, groupBy);

  /* داده چندبعدی StatsBar: تعداد شرکت / تعداد برچسب (نمایش داده‌ای را که Hero واگذار کرده بر عهده می‌گیرد) */
  const statsExtras = useMemo(() => {
    if (!modelList?.length) return [];
    const companies = new Set<string>();
    const tags = new Set<string>();
    modelList.forEach((m) => {
      companies.add(m.company);
      m.modelTags.forEach((t) => tags.add(t));
    });
    return [
      { label: "تأمین‌کننده", value: companies.size },
      { label: "برچسب قابلیت", value: tags.size },
    ];
  }, [modelList]);

  /* حالت Loading —— سبک stamp */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            در حال باز کردن کمد بایگانی مدل‌ها
          </h2>
          <p className="font-sans text-ink-secondary">
            در حال دریافت آخرین اطلاعات مدل‌ها…
          </p>
        </div>
      </div>
    );
  }

  /* حالت Error —— سبک stamp */
  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-coral border-2 border-ink rounded-full text-3xl">
            😕
          </div>
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            کمد بایگانی باز نمی‌شود
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
      {/* ═══════════════════ HERO v2 · «سربرگ ابزاری» کرمی کم‌رنگ butter-tint ═══════════════════ */}
      <section className="relative bg-butter-tint border-b-2 border-ink overflow-hidden">
        {/* راست "مهر بایگانی" لنگر —— دایره بزرگ butter + Sparkle روی هم، توزیع نامتقارن */}
        <div
          className="absolute -top-10 -end-14 lg:-end-8 w-[260px] h-[260px] rounded-full bg-butter border-2 border-ink hidden md:block"
          aria-hidden
        >
          <Sparkle4
            className="absolute top-[44%] start-[24%] w-10 h-10 text-ink"
            color="#241C15"
          />
        </div>
        {/* نقطه تزئینی DotGrid پایین-چپ —— تقابل ریتم */}
        <DotGrid
          className="absolute bottom-6 start-[3%] w-24 h-10 text-ink opacity-25 hidden md:block"
          color="#241C15"
          rows={3}
          cols={6}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 lg:pt-16 pb-12 lg:pb-14">
          <div className="grid lg:grid-cols-[minmax(0,640px)_minmax(320px,430px)] gap-8 lg:gap-16 items-center">
            <div>
              {/* eyebrow —— کوچک و خوددار */}
              <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
                <span className="inline-block w-6 h-px bg-ink/45" />
                <span>§ کمد بایگانی مدل‌ها</span>
              </div>

              {/* عنوان اصلی —— display-lg (نه display-xl)، یک درجه کوچک‌تر */}
              <h1 className="font-display font-extrabold text-display-lg text-ink mb-4 leading-[1.1]">
                مدل‌های بزرگ اصلی AI را جمع کرده‌ایم،
                <span className="whitespace-nowrap">تا در یک‌جا مقایسه کنید.</span>
              </h1>

              {/* زیرعنوان —— ۱ خط */}
              <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary leading-[1.65]">
                فیلتر چندبعدی بر اساس شرکت / وضعیت متن‌باز / برچسب مدل، با پشتیبانی از مرور کارتی و نمای درختی شجره‌نامه.
              </p>
            </div>

            <TokenPromoCard />
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
              totalCount={modelList.length}
              filteredCount={filteredModels.length}
              hasActiveFilters={hasActiveFilters}
              extras={statsExtras}
            />
          </div>

          {/* کانتینر نوار ابزار —— کارت stamp با پس‌زمینه سفید */}
          <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <ViewToggle mode={viewMode} onChange={setViewMode} />
              <SearchBar
                value={filters.searchQuery}
                onChange={(value) => updateFilters({ searchQuery: value })}
              />
              <FilterPanel
                filters={filters}
                allCompanies={allCompanies}
                allTags={allTags}
                allOpenSourceStatuses={allOpenSourceStatuses}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                totalCount={modelList.length}
                filteredCount={filteredModels.length}
              />
              {viewMode === "card" && (
                <>
                  <SortSelector value={sortOption} onChange={setSortOption} />
                  <GroupSelector value={groupBy} onChange={setGroupBy} />
                </>
              )}
            </div>

            {/* شرایط فیلتر انتخاب‌شده —— chip سبک stamp */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t-2 border-ink/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 me-1">
                    شرایط انتخاب‌شده
                  </span>
                  {filters.selectedCompanies.map((company) => (
                    <ActiveChip
                      key={company}
                      label={company}
                      color="butter"
                      onClose={() =>
                        updateFilters({
                          selectedCompanies: filters.selectedCompanies.filter(
                            (c) => c !== company,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedTags.map((tag) => (
                    <ActiveChip
                      key={tag}
                      label={tag}
                      color="coral"
                      onClose={() =>
                        updateFilters({
                          selectedTags: filters.selectedTags.filter(
                            (t) => t !== tag,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedOpenSourceStatus.map((status) => (
                    <ActiveChip
                      key={status}
                      label={status}
                      color="teal"
                      onClose={() =>
                        updateFilters({
                          selectedOpenSourceStatus:
                            filters.selectedOpenSourceStatus.filter(
                              (s) => s !== status,
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

      {/* ═══════════════════ CONTENT · فهرست با پس‌زمینه سفید ═══════════════════ */}
      <section className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {viewMode === "card" ? (
            <ModelList
              models={groupedModels}
              showGroupHeaders={groupBy !== "none"}
            />
          ) : (
            <ModelTreeView models={sortedModels} />
          )}
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

/** کارت تبلیغ سمت راست Hero —— ورودی ایستگاه رله API */
const TokenPromoCard: React.FC = () => {
  const promoUrl =
    "https://token.mmh1.top/?utm_source=easy-ai&utm_medium=model_hero&utm_campaign=api_gateway";

  return (
    <aside className="relative z-10 w-full max-w-[430px] lg:justify-self-end">
      <a
        href={promoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 lg:p-6 transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15]"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-butter border-2 border-ink rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
            <KeyRound className="w-3.5 h-3.5" strokeWidth={2.5} />
            ابزار توسعه‌دهنده
          </div>
          <span className="inline-flex items-center justify-center w-9 h-9 bg-cream border-2 border-ink rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4 text-ink" strokeWidth={2.5} />
          </span>
        </div>

        <h2 className="font-display font-extrabold text-[24px] lg:text-[28px] text-ink leading-tight mb-2">
          باغ مخفی Token
        </h2>
        <p className="font-sans text-[15px] font-bold text-ink mb-2">
          اتصال مستقیم داخلی (چین)، فراخوانی کم‌هزینه مدل‌های پیشرو AI
        </p>
        <p className="font-sans text-[13px] lg:text-[14px] text-ink-secondary leading-[1.65] mb-4">
          سازگار با پروتکل‌های اصلی API، پشتیبانی از مدل‌های متن، تصویر و چندوجهی، مناسب برای تست توسعه و اعتبارسنجی نمونه اولیه AI.
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {["GPT 5.5", "GPT Image 2", "Claude Opus 4.8", "Gemini 3.5"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-cream border-2 border-ink rounded-full font-sans text-[13px] font-bold transition-colors group-hover:bg-coral">
          همین حالا امتحان کنید
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </div>
      </a>
    </aside>
  );
};

/** chip شرایط انتخاب‌شده —— سبک stamp قابل بستن */
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

export default AIModel;
