/**
 * مقالات AI · ستون سردبیری · سبک Mailchimp-Freddie
 *
 * معماری اطلاعات (عمداً متمایز از «دانش بصری»):
 *   ۱. HERO (cream · حس کاغذ سفید گرم) —— وسط‌چین تمام‌عرض: eyebrow + عنوان بزرگ + زیرعنوان + chipهای نوع
 *   ۲. TIMELINE (cream ← سفید) —— خط زمانی به سبک وبلاگ: گروه‌بندی بر اساس سال، هر مورد = ردیف metadata + عنوان بزرگ + Lead + برچسب
 *      ＊ بدون تصویر جلد، بدون سایه کارت —— "خود متن ارزش کلیک دارد"
 *   ۳. CTA (ink) —— «چه می‌خواهید بخوانید؟ یک Issue باز کنید و بگویید»
 *
 * توضیح تمایز طراحی:
 *   - دانش بصری «میز پرس‌وجوی کتابخانه» است —— کارت‌های مفهوم، مفهوم را از جلد تشخیص می‌دهید
 *   - مقالات «میز سردبیر» است —— مقاله‌های بلند، به ترتیب زمانی نزولی مرور می‌شوند، مبتنی بر metadata نه تصویر
 *   - هر دو پالت stamp / butter / coral / ink را به اشتراک می‌گذارند، اما شخصیت ستون و شکل فهرست کاملاً متفاوت است
 *
 * صفحه جزئیات (iframe) از AIArticleDetail.tsx مستقل استفاده می‌کند، با همان chrome جزئیات دانش بصری اما مستقل نگهداری می‌شود.
 */

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, ExternalLink } from "lucide-react";
import {
  aiArticleData,
  articleCategories,
  articleCategoryColor,
} from "../data/aiArticleData";
import { AIArticleItem } from "../types";
import {
  Sparkle4,
  Star,
  DotGrid,
  HandUnderline,
} from "../components/Decorations";
import { IllustrationImage } from "../components/IllustrationImage";

const AIArticles: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");

  /* داده: به ترتیب نزولی publishDate، فیلتر بر اساس نوع */
  const filteredArticles = useMemo(() => {
    const sorted = [...aiArticleData].sort((a, b) =>
      b.publishDate.localeCompare(a.publishDate),
    );
    return selectedCategory === "همه"
      ? sorted
      : sorted.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  /* گروه‌بندی بر اساس سال (حفظ ترتیب نزولی خط زمانی) */
  const groupedByYear = useMemo(() => {
    const map = new Map<string, AIArticleItem[]>();
    for (const item of filteredArticles) {
      const year = item.publishDate.slice(0, 4);
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(item);
    }
    return Array.from(map.entries());
  }, [filteredArticles]);

  /* شمارش chip (با آمار کل مجموعه، با فیلتر تغییر نمی‌کند؛ تا با انتخاب یک نوع، تعداد انواع دیگر هم دیده شود) */
  const categoriesWithCount = useMemo(
    () =>
      articleCategories.map((c) => ({
        id: c,
        count:
          c === "همه"
            ? aiArticleData.length
            : aiArticleData.filter((a) => a.category === c).length,
      })),
    [],
  );

  const handleArticleClick = (item: AIArticleItem) => {
    navigate(`/ai-article/${item.id}`, { state: { item } });
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════ HERO · حس کاغذ گرم cream ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <DotGrid
          className="absolute bottom-10 start-[10%] w-20 h-12 text-ink opacity-40 hidden md:block"
          color="#241C15"
          rows={3}
          cols={5}
        />
        <Sparkle4
          className="absolute top-16 start-[8%] w-7 h-7 text-ink hidden md:block"
          color="#241C15"
        />
        <Star
          className="absolute top-20 end-[7%] w-8 h-8 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[920px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-14 lg:pb-16 text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-8">
            <Star className="w-3.5 h-3.5" color="#E07A5F" filled />
            <span>§ ستون سردبیری · Editor&rsquo;s Desk</span>
          </div>

          {/* عنوان اصلی */}
          <h1 className="font-display font-extrabold text-display-xl text-ink">
            <span className="whitespace-nowrap">یک مقاله را</span>{" "}
            <span className="whitespace-nowrap">
              طوری ویرایش می‌کنیم
              <span className="relative inline-block ms-[0.05em]">
                <span className="relative z-10">که دلتان بخواهد تا آخر بخوانید</span>
                <HandUnderline
                  className="absolute -bottom-2 start-0 end-0 w-full h-3"
                  color="#E07A5F"
                />
              </span>
              .
            </span>
          </h1>

          <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[640px] mx-auto mt-7">
            {aiArticleData.length} مقاله بلند منتخب — با{" "}
            <a
              href="https://github.com/ConardLi/web-design-skill/tree/main/skills/beautiful-article"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-coral decoration-2 hover:text-coral transition-colors"
            >
              beautiful-article
            </a>{" "}
            صفحه‌آرایی شده، آفلاین قابل خواندن و قابل اشتراک‌گذاری.
          </p>

          {/* chipها —— فقط فیلتر نوع (بدون کادر جستجو، تعداد کم است) */}
          {categoriesWithCount.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 mt-10">
              {categoriesWithCount.map(({ id, count }) => {
                const active = selectedCategory === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className={`group inline-flex items-baseline gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-[13px] border-2 border-ink transition-all duration-250 ease-spring ${
                      active
                        ? "bg-ink text-white shadow-[3px_3px_0_0_#241C15]"
                        : "bg-white/70 text-ink hover:bg-white hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:4px_4px_0_0_#241C15]"
                    }`}
                  >
                    <span>{id}</span>
                    <span
                      className={`font-mono text-[10.5px] ${active ? "text-white/60" : "text-ink/45"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ TIMELINE · خط زمانی به سبک وبلاگ ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[860px] mx-auto px-6 lg:px-10 py-14 lg:py-18">
          {filteredArticles.length === 0 ? (
            <EmptyState
              category={selectedCategory}
              onClear={() => setSelectedCategory("همه")}
            />
          ) : (
            <div className="space-y-14 lg:space-y-18">
              {groupedByYear.map(([year, items]) => (
                <YearSection
                  key={year}
                  year={year}
                  items={items}
                  onSelect={handleArticleClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ CTA · متن چپ + تصویرسازی راست ═══════════════════ */}
      <section className="relative bg-ink border-b-2 border-ink overflow-hidden">
        <Sparkle4
          className="absolute top-12 start-[8%] w-7 h-7 text-butter hidden md:block"
          color="#F4D35E"
        />
        <Star
          className="absolute bottom-14 end-[8%] w-9 h-9 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-display-lg text-white">
                <span className="whitespace-nowrap">چه می‌خواهید بخوانید؟</span>{" "}
                <span className="whitespace-nowrap">
                  به ما بگویید،
                  <span className="text-butter">مقاله بعدی را همان می‌نویسیم.</span>
                </span>
              </h2>
              <p className="font-serif italic text-[17px] text-white/65 mt-6 max-w-xl">
                همه مقاله‌های این‌جا از خواندن / مرور / جمع‌بندی واقعی آمده‌اند. یک Issue ثبت کنید
                یا در سیاره دانش پیام بگذارید؛ همه با دقت خوانده می‌شوند.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-butter text-ink border-2 border-butter rounded-full font-sans font-extrabold text-[15px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
                >
                  <span>یک موضوع به ما پیشنهاد دهید</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <IllustrationImage
                src="/imgs/site/Illustration-AIK-01.png"
                alt="شخصیتی با ذره‌بین که پشت میز دنبال مقاله‌ای ارزشمند برای خواندن می‌گردد"
                animation="up"
                className="max-w-[400px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────── زیرکامپوننت‌ها ────────────── */

/**
 * YearSection — بخش خط زمانی یک سال
 *
 * heading یک سال درشت + خط افقی جداکننده است ("── 2026 ──" این حس ASCII).
 * items از قبل به ترتیب نزولی تاریخ داده شده‌اند، این کامپوننت دیگر مرتب نمی‌کند.
 */
const YearSection: React.FC<{
  year: string;
  items: AIArticleItem[];
  onSelect: (item: AIArticleItem) => void;
}> = ({ year, items, onSelect }) => (
  <section>
    {/* heading سال —— جداکننده دوخطی + عدد بزرگ mono */}
    <div className="flex items-center gap-4 mb-10">
      <div className="flex-1 h-0 border-t-2 border-ink/20 border-dashed" />
      <span className="font-mono font-bold text-[28px] md:text-[32px] text-ink leading-none tracking-tight tabular-nums">
        {year}
      </span>
      <div className="flex-1 h-0 border-t-2 border-ink/20 border-dashed" />
    </div>

    {/* فهرست موارد خط زمانی */}
    <ol className="space-y-10 lg:space-y-12">
      {items.map((item, idx) => (
        <TimelineEntry
          key={item.id}
          item={item}
          onSelect={onSelect}
          isLast={idx === items.length - 1}
        />
      ))}
    </ol>
  </section>
);

/**
 * TimelineEntry — مورد خط زمانی یک مقاله
 *
 * ساختار بصری:
 *   خط عمودی باریک چپ (ink/20) + نشانگر دایره‌ای marker (پر با رنگ نوع)
 *   ناحیه اصلی راست: ردیف metadata تاریخ/نوع/مدت/موضوع ← عنوان بزرگ ← Lead ← برچسب ← دکمه اقدام
 *
 * رفتار hover:
 *   - کل بلوک 2px کمی به چپ می‌رود (هم‌سو با «فشردن» در سبک stamp)
 *   - زیر عنوان زیرخط دست‌کشیده HandUnderline ظاهر می‌شود
 *   - نقطه marker بزرگ می‌شود + حاشیه ضخیم‌تر می‌شود
 */
const TimelineEntry: React.FC<{
  item: AIArticleItem;
  onSelect: (item: AIArticleItem) => void;
  isLast: boolean;
}> = ({ item, onSelect, isLast }) => {
  const dotColor = articleCategoryColor[item.category] ?? "#F4D35E";
  /* publishDate "YYYY-MM-DD" → "MM.DD" نمایش */
  const md = `${item.publishDate.slice(5, 7)}.${item.publishDate.slice(8, 10)}`;

  return (
    <li className="group relative ps-8 lg:ps-10">
      {/* خط عمودی چپ —— آخرین مورد تا انتها کشیده نمی‌شود تا خط زمانی طبیعی تمام شود */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute start-[7px] lg:start-[9px] top-7 bottom-[-2.5rem] lg:bottom-[-3rem] w-0 border-s-2 border-dashed border-ink/15"
        />
      )}

      {/* نقطه marker —— پر با رنگ نوع + حاشیه ink + سایه کوچک stamp */}
      <span
        aria-hidden
        className="absolute start-0 top-[7px] w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] rounded-full border-2 border-ink shadow-[2px_2px_0_0_#241C15] transition-all duration-250 ease-spring group-hover:scale-110 group-hover:shadow-[3px_3px_0_0_#241C15]"
        style={{ backgroundColor: dotColor }}
      />

      {/* ناحیه اصلی —— کل بلوک قابل کلیک */}
      <button
        onClick={() => onSelect(item)}
        className="block w-full text-start transition-transform duration-250 ease-spring group-hover:-translate-x-[2px]"
      >
        {/* ردیف metadata: MM.DD · نوع · مدت · موضوع */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3 font-mono text-[12px] text-ink/55">
          <span className="font-bold text-ink/80 tabular-nums">{md}</span>
          <span className="text-ink/25">·</span>
          <span
            className="inline-flex items-center px-2 py-0.5 border border-ink rounded-full font-sans font-bold text-[10.5px] text-ink"
            style={{ backgroundColor: dotColor + "55" }}
          >
            {item.category}
          </span>
          {item.readingMinutes && (
            <>
              <span className="text-ink/25">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={2.5} />
                {item.readingMinutes} min
              </span>
            </>
          )}
          {item.theme && (
            <>
              <span className="text-ink/25">·</span>
              <span className="uppercase tracking-[0.15em] text-ink/45">
                {item.theme}
              </span>
            </>
          )}
        </div>

        {/* عنوان —— در hover زیرخط دست‌کشیده زیرش ظاهر می‌شود */}
        <h3 className="relative font-display font-extrabold text-[24px] md:text-[28px] text-ink leading-[1.2] mb-3 inline-block">
          <span className="relative z-10 group-hover:text-coral transition-colors duration-250">
            {item.title}
          </span>
          <HandUnderline
            className="absolute -bottom-1.5 start-0 end-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
            color="#E07A5F"
          />
        </h3>

        {/* خلاصه Lead —— serif حس"خواندن طولانی"را می‌دهد */}
        <p className="font-serif text-[15.5px] md:text-[16.5px] text-ink-secondary leading-[1.7] max-w-[680px]">
          {item.lead}
        </p>

        {/* ردیف برچسب + دکمه اقدام */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mt-4">
          {item.tags && item.tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-ink/45">
              {item.tags.map((t) => (
                <span key={t} className="hover:text-ink/70 transition-colors">
                  #{t}
                </span>
              ))}
            </div>
          ) : (
            <span aria-hidden />
          )}

          <span className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] text-ink/65 group-hover:text-ink transition-colors">
            <span>باز کردن و خواندن</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </span>
        </div>
      </button>

      {/* کوچک در گوشه بالا-راست"باز کردن در پنجره جدید"دکمه —— مزاحم ناحیه کلیک اصلی نمی‌شود */}
      <a
        href={item.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        title="باز کردن در پنجره جدید"
        aria-label="باز کردن در پنجره جدید"
        className="absolute top-1 end-0 w-8 h-8 hidden md:flex items-center justify-center rounded-full text-ink/40 hover:text-ink hover:bg-white border-2 border-transparent hover:border-ink hover:shadow-stamp transition-all duration-200 ease-spring"
      >
        <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
      </a>
    </li>
  );
};

const EmptyState: React.FC<{ category: string; onClear: () => void }> = ({
  category,
  onClear,
}) => (
  <div className="bg-white border-2 border-dashed border-ink/30 rounded-3xl p-16 text-center">
    <Sparkle4
      className="w-10 h-10 mx-auto text-ink/40 mb-6"
      color="#241C15"
    />
    <h3 className="font-display font-extrabold text-[24px] text-ink mb-3">
      هنوز مقاله‌ای از نوع «{category}» وجود ندارد
    </h3>
    <p className="font-sans text-[15px] text-ink-secondary mb-8 max-w-md mx-auto">
      می‌توانید اول انواع دیگر را ببینید، یا به ما بگویید که می‌خواهید این نوع را بخوانید.
    </p>
    <button
      onClick={onClear}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[14px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
    >
      مشاهده همه مقالات
    </button>
  </div>
);

export default AIArticles;
