/**
 * دانش بصری AI · سبک Mailchimp-Freddie
 *
 * معماری اطلاعات:
 *   ۱. HERO (زرد butter ·"میز پرس‌وجوی کتابخانه"）
 *      —— وسط‌چین تمام‌عرض: عنوان بزرگ + کادر جستجوی بزرگ + فیلتر هم‌ردیف [TypeSegmented | chipهای دسته‌بندی]
 *   ۲. CATALOG (cream) —— بر اساس type رندر متفاوت:
 *        • توضیح مفاهیم = شبکه کارت گروه‌بندی‌شده (پیش‌فرض) / تخت (هنگام فیلتر/جستجو)
 *        • توضیح ویدئویی = کارت‌های افقی یکی در هر ردیف (جلد ویدئو در چپ + پیش‌نمایش وب‌سایت PPT در راست)
 *   ۳. CTA (ink تیره · دوستونه) —— متن چپ + جای تصویرسازی AIK-01 در راست
 *
 * توضیح تغییر حالت:
 *   - دو حالت کاملاً مستقل‌اند —— حالت"همه با هم"وجود ندارد
 *   - پیش‌فرض ورود به توضیح مفاهیم
 *   - حالت توضیح ویدئویی: بدون دسته‌بندی، بدون گروه‌بندی، بدون جستجو (تعداد سایت‌های ویدئویی کم است + خود شکل به اندازه کافی روشن است)
 *   - جلد / پرش به Bilibili / نشان مدت زمان در حالت ویدئویی همه روی «کارت فهرست» نمایش داده می‌شوند
 *   - صفحه جزئیات (وب‌سایت PPT) دیگر عنصر ویدئو درج نمی‌کند تا خواندن غوطه‌ور PPT حفظ شود
 */

import React, {
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  LayoutGrid,
  Network,
  Play,
  PlayCircle,
  Search,
  X,
} from "lucide-react";
import {
  aiKnowledgeConceptData,
  categoryColors,
  LEARNING_LINES,
  lineById,
} from "../data/aiKnowledgeConceptData";
import ConceptMap from "../components/ConceptMap";
import { aiKnowledgeVideoData } from "../data/aiKnowledgeVideoData";
import {
  AIKnowledgeConceptItem,
  AIKnowledgeVideoItem,
  KnowledgeType,
} from "../types";
import {
  Sparkle4,
  Star,
  DotGrid,
  HandUnderline,
} from "../components/Decorations";
import { IllustrationImage } from "../components/IllustrationImage";
import { COVER_MAP } from "../components/KnowledgeCovers";

/** نمای حالت مفهومی: کارت‌های فهرست / نقشه کلی */
type ConceptView = "catalog" | "map";

const AIKnowledge: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<KnowledgeType>("concept");
  /* دو نمای حالت مفهومی: کارت‌های فهرست catalog / نقشه کلی map (حالت ویدئویی تحت تأثیر نیست) */
  const [conceptView, setConceptView] = useState<ConceptView>("catalog");

  /* کادر جستجو searchQuery را فوراً نمایش می‌دهد؛ فیلتر / تغییر نما از مقدار deferred استفاده می‌کند،
     تا هنگام تایپ سریع ورودی روان بماند و کار سنگین (رندر مجدد شبکه کارت‌ها) با اولویت پایین‌تر به تعویق بیفتد.
     فقط بهینه‌سازی کارایی، نتیجه نهایی نمایش را تغییر نمی‌دهد. */
  const deferredQuery = useDeferredValue(searchQuery);

  /* دو نوع منبع داده مستقل نگهداری می‌شوند، شمارش مستقیم از طول آرایه */
  const typeCounts = useMemo(
    () => ({
      concept: aiKnowledgeConceptData.length,
      video: aiKnowledgeVideoData.length,
    }),
    [],
  );

  /* تعویض منبع داده بر اساس حالت مرور —— دیگر از یک آرایه واحد type فیلتر نمی‌شود */
  const dataByType = useMemo(() => {
    return selectedType === "concept"
      ? aiKnowledgeConceptData
      : aiKnowledgeVideoData;
  }, [selectedType]);

  /* فهرست مسیرهای یادگیری + شمارش هر کدام (فقط در حالت مفهومی، به ترتیب LEARNING_LINES)
     id = شناسه مسیر یادگیری ("همه" نگهبان انتخاب همه است)؛ name = برچسب کوتاه، برای نمایش chip */
  const categoriesWithCount = useMemo(() => {
    if (selectedType !== "concept") return [];
    const counts = new Map<string, number>();
    dataByType.forEach((i) => {
      const line = (i as AIKnowledgeConceptItem).line;
      counts.set(line, (counts.get(line) || 0) + 1);
    });
    return [
      { id: "همه", name: "همه", count: dataByType.length },
      ...LEARNING_LINES.filter((l) => counts.has(l.id)).map((l) => ({
        id: l.id,
        name: l.tag,
        count: counts.get(l.id) || 0,
      })),
    ];
  }, [dataByType, selectedType]);

  /* هنگام تعویض تب type فیلتر بازنشانی می‌شود (حالت ویدئویی مفهوم مسیر یادگیری ندارد) */
  React.useEffect(() => {
    setSelectedCategory("همه");
  }, [selectedType]);

  /* فیلتر نهایی (فقط در حالت مفهومی؛ حالت ویدئویی مستقیم از dataByType)
     selectedCategory شناسه مسیر یادگیری را ذخیره می‌کند،"همه" یعنی بدون فیلتر */
  const filteredData = useMemo(() => {
    if (selectedType !== "concept") return dataByType;
    const q = deferredQuery.trim().toLowerCase();
    return (dataByType as AIKnowledgeConceptItem[]).filter((item) => {
      const inLine = selectedCategory === "همه" || item.line === selectedCategory;
      const match =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return inLine && match;
    });
  }, [dataByType, selectedCategory, deferredQuery, selectedType]);

  const isConcept = selectedType === "concept";
  const isMapView = isConcept && conceptView === "map";

  const handleConceptClick = useCallback(
    (item: AIKnowledgeConceptItem) => {
      navigate(`/ai-knowledge/${item.id}`, {
        state: { item, type: "concept" },
      });
    },
    [navigate],
  );

  /* کلیک روی گره نقشه کلی ← مفهوم را با id پیدا کرده و وارد سایت آن می‌شود */
  const handleConceptById = (id: string) => {
    const item = aiKnowledgeConceptData.find((i) => i.id === id);
    if (item) handleConceptClick(item);
  };

  const handleVideoClick = (item: AIKnowledgeVideoItem) => {
    navigate(`/ai-knowledge/${item.id}`, { state: { item, type: "video" } });
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════ HERO · حس ابزاری وسط‌چین تمام‌عرض ═══════════════════ */}
      <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
        {/* "دیوار کارت‌ها"تزئین پس‌زمینه —— اشاره به این‌که این‌جا ورودی کتابخانه/فهرست است */}
        <BgStampCards />

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

        <div className="relative max-w-[920px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-16 lg:pb-20 text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-8">
            <Star className="w-3.5 h-3.5" color="#E07A5F" filled />
            <span>§ فهرست دانش بصری</span>
          </div>

          {/* عنوان اصلی */}
          <h1 className="font-display font-extrabold text-display-xl text-ink">
            <span className="whitespace-nowrap">هر مفهوم AI را</span>{" "}
            <span className="whitespace-nowrap">
              طوری توضیح می‌دهیم که
              <span className="relative inline-block ms-[0.05em]">
                <span className="relative z-10">بفهمید</span>
                <HandUnderline
                  className="absolute -bottom-2 start-0 end-0 w-full h-3"
                  color="#E07A5F"
                />
              </span>
              。
            </span>
          </h1>

          {/* زیرعنوان —— عدد با تغییر type عوض می‌شود */}
          <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[640px] mx-auto mt-7">
            {isConcept ? (
              <>
                {typeCounts.concept} توضیح مفهوم — هر تصویر بارها اصلاح شده تا &ldquo;
                <span className="font-bold">واقعاً قابل فهم باشد</span>&rdquo;.
              </>
            ) : (
              <>
                {typeCounts.video} توضیح ویدئویی — ویدئوی Bilibili را ببینید و هم‌زمان با PPT
                وب‌سایت مقایسه کنید.
              </>
            )}
          </p>

          {/* کادر جستجوی بزرگ —— فقط در نمای مفهوم·فهرست نمایش داده می‌شود (نمای ویدئو/کلی جستجو لازم ندارد) */}
          {isConcept && conceptView === "catalog" && (
            <div className="relative mt-10 max-w-[640px] mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="مفهومی را که می‌خواهید یاد بگیرید جستجو کنید، مثلاً RAG / Agent / تنظیم دقیق…"
                className="w-full ps-14 pe-14 py-5 bg-white border-2 border-ink rounded-full font-sans text-[16px] text-ink placeholder:text-ink/40 shadow-stamp-lg transition-all duration-250 ease-spring focus:outline-none focus:-translate-x-[3px] focus:-translate-y-[3px] focus:[box-shadow:9px_9px_0_0_#241C15]"
              />
              <Search
                className="absolute start-5 top-1/2 -translate-y-1/2 w-6 h-6 text-ink/55"
                strokeWidth={2.5}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="پاک کردن جستجو"
                  className="absolute end-4 top-1/2 -translate-y-1/2 p-2 hover:bg-ink/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-ink/60" strokeWidth={2.5} />
                </button>
              )}
            </div>
          )}

          {/* ───── ناحیه کنترل (دو ردیف) ─────
              ردیف اول: تغییر حالت (concept ↔ video) + تغییر نما (فهرست ↔ کلی)
              ردیف دوم: chipهای دسته‌بندی (فقط نمای مفهوم·فهرست) */}
          <div className={`flex flex-col items-center gap-4 ${isConcept ? "mt-8" : "mt-10"}`}>
            {/* ردیف اول: تعویض‌کننده */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TypeSegmented active={selectedType} onChange={setSelectedType} />
              {isConcept && (
                <ViewSegmented active={conceptView} onChange={setConceptView} />
              )}
            </div>

            {/* ردیف دوم: chipهای دسته‌بندی */}
            {isConcept &&
              conceptView === "catalog" &&
              categoriesWithCount.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
                  {categoriesWithCount.map(({ id, name, count }) => {
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
                        <span>{name}</span>
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
        </div>
      </section>

      {/* ═══════════════════ CATALOG · رندر بر اساس حالت ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-14 lg:py-18">
          {isMapView ? (
            /* مفهوم·نمای کلی: نقشه دانش بصری (خطوط مترو + برجسته‌سازی ارتباط‌ها) */
            <ConceptMap onSelectConcept={handleConceptById} />
          ) : isConcept ? (
            /* مفهوم·نمای فهرست: پیش‌فرض رندر گروه‌بندی‌شده، هنگام فیلتر / جستجو تخت می‌شود */
            selectedCategory === "همه" && !deferredQuery.trim() ? (
              <GroupedCatalog
                data={dataByType as AIKnowledgeConceptItem[]}
                lineIds={categoriesWithCount
                  .filter((c) => c.id !== "همه")
                  .map((c) => c.id)}
                onJumpCategory={setSelectedCategory}
                onCardClick={handleConceptClick}
              />
            ) : (
              <FlatCatalog
                data={filteredData as AIKnowledgeConceptItem[]}
                categoryLabel={lineById[selectedCategory]?.name ?? selectedCategory}
                searchQuery={deferredQuery}
                total={dataByType.length}
                onClear={() => {
                  setSelectedCategory("همه");
                  setSearchQuery("");
                }}
                onCardClick={handleConceptClick}
              />
            )
          ) : (
            /* حالت ویدئو: کارت‌های افقی یکی در هر ردیف، بدون دسته‌بندی و جستجو */
            <VideoRowList
              data={filteredData as AIKnowledgeVideoItem[]}
              onCardClick={handleVideoClick}
            />
          )}
        </div>
      </section>

      {/* ═══════════════════ CTA · متن چپ + تصویرسازی AIK-01 راست ═══════════════════ */}
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
            {/* چپ: متن + CTA */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-display-lg text-white">
                <span className="whitespace-nowrap">چیزی را که می‌خواستید نیافتید؟</span>{" "}
                <span className="whitespace-nowrap">
                  به ما بگویید،
                  <span className="text-butter">مورد بعدی را همان می‌نویسیم.</span>
                </span>
              </h2>
              <p className="font-serif italic text-[17px] text-white/65 mt-6 max-w-xl">
                همه مفاهیم این‌جا از نیازهای واقعی یادگیری آمده‌اند. یک Issue ثبت کنید
                یا در سیاره دانش پیام بگذارید؛ همه با دقت خوانده می‌شوند.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-butter text-ink border-2 border-butter rounded-full font-sans font-extrabold text-[15px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
                >
                  <span>یک مفهوم به ما پیشنهاد دهید</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </a>
              </div>
            </div>

            {/* راست: تصویرسازی AIK-01 —— شخصیتی با ذره‌بین جلوی قفسه کتاب دنبال مفاهیم می‌گردد */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <IllustrationImage
                src="/imgs/site/Illustration-AIK-01.png"
                alt="شخصیتی با ذره‌بین که جلوی قفسه کتاب دنبال مفاهیم جدید AI می‌گردد"
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
 * GroupedCatalog — نمای گروه‌بندی‌شده در حالت"همه"پیش‌فرض
 *
 * بر اساس category رندر گروه‌بندی‌شده، هر گروه یک section (heading + شبکه).
 *
 * داده توسط کامپوننت والد داده می‌شود (منبع داده مفاهیم)، دیگر مستقیم aiKnowledgeConceptData خوانده نمی‌شود.
 * ترتیب دسته‌بندی‌ها توسط والد داده می‌شود (از قبل به ترتیب نزولی تعداد مرتب شده).
 * روی heading دکمه"مشاهده بخش ←"با یک کلیک به نمای تخت آن دسته‌بندی می‌رود.
 */
const GroupedCatalog: React.FC<{
  data: AIKnowledgeConceptItem[];
  lineIds: string[];
  onJumpCategory: (lineId: string) => void;
  onCardClick: (item: AIKnowledgeConceptItem) => void;
}> = ({ data, lineIds, onJumpCategory, onCardClick }) => {
  /* پیش‌برش بر اساس مسیر یادگیری، تا هر group یک بار filter اجرا نکند */
  const groups = useMemo(() => {
    const map = new Map<string, AIKnowledgeConceptItem[]>();
    data.forEach((item) => {
      if (!map.has(item.line)) map.set(item.line, []);
      map.get(item.line)!.push(item);
    });
    return lineIds.map((id) => ({
      id,
      items: map.get(id) || [],
    }));
  }, [data, lineIds]);

  return (
    <div className="space-y-16 lg:space-y-20">
      {groups.map(({ id, items }) => (
        <CategoryGroup
          key={id}
          lineId={id}
          items={items}
          onJump={() => onJumpCategory(id)}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

/**
 * CategoryGroup — section یک مسیر یادگیری
 *
 * heading از بلوک رنگی رنگ اصلی مسیر یادگیری به‌عنوان لنگر بصری استفاده می‌کند (تشخیص در یک نگاه)،
 * راست"فقط…"به نمای تخت آن مسیر می‌رود (برای تمرکز روی خواندن یک مسیر).
 */
const CategoryGroup: React.FC<{
  lineId: string;
  items: AIKnowledgeConceptItem[];
  onJump: () => void;
  onCardClick: (item: AIKnowledgeConceptItem) => void;
}> = ({ lineId, items, onJump, onCardClick }) => {
  const meta = lineById[lineId];
  const color = meta?.color ?? "#241C15";

  return (
    <section>
      {/* heading: بلوک رنگی + نام بزرگ مسیر + شمارش + در راست"فقط" */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 lg:mb-8 pb-5 border-b-2 border-ink">
        <div className="flex items-center gap-4">
          {/* نشان بلوک رنگی —— با رنگ اصلی مسیر یادگیری مشخص می‌شود */}
          <span
            className="inline-flex items-center justify-center w-10 h-10 border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_#241C15] text-white"
            style={{ backgroundColor: color }}
            aria-hidden
          >
            <Sparkle4 className="w-4 h-4" color="currentColor" />
          </span>
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/50">
              {meta?.startHint ?? "Topic"}
            </div>
            <h3 className="font-display font-extrabold text-[26px] md:text-[30px] text-ink leading-[1.1] mt-0.5">
              {meta?.name ?? lineId}
              <span className="font-mono text-[14px] text-ink/45 ms-3 align-middle">
                {items.length}
              </span>
            </h3>
          </div>
        </div>

        {/* فقط —— رفتن به نمای تخت آن مسیر */}
        {items.length > 1 && (
          <button
            onClick={onJump}
            className="group inline-flex items-center gap-1.5 px-4 py-2 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <span>فقط «{meta?.tag ?? lineId}」</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </button>
        )}
      </div>

      {/* شبکه کارت‌ها —— حداکثر ۳ ستون، تا کارت‌ها پهن‌تر باشند */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {items.map((item) => (
          <KnowCard key={item.id} item={item} onSelect={onCardClick} />
        ))}
      </div>
    </section>
  );
};

/**
 * FlatCatalog — نمای تخت هنگام انتخاب دسته‌بندی مشخص / جستجو
 *
 * یک فهرست نتیجه واحد + یک"خلاصه نتیجه + پاک کردن"ساده.
 * total تعداد کل در type فعلی است (نه کل سایت)، برای "N/M" نمایش استفاده می‌شود.
 */
const FlatCatalog: React.FC<{
  data: AIKnowledgeConceptItem[];
  categoryLabel: string;
  searchQuery: string;
  total: number;
  onClear: () => void;
  onCardClick: (item: AIKnowledgeConceptItem) => void;
}> = ({
  data,
  categoryLabel,
  searchQuery,
  total,
  onClear,
  onCardClick,
}) => {
  const isSearching = !!searchQuery.trim();
  return (
    <>
      {/* خلاصه نتیجه */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-8 pb-6 border-b-2 border-ink/15">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
            {isSearching ? "Search results" : "Browsing"}
          </div>
          <h2 className="font-display font-extrabold text-[22px] md:text-[28px] text-ink leading-tight">
            {isSearching ? (
              <>
                کلیدواژه «
                <span className="text-coral">{searchQuery}</span>」
              </>
            ) : (
              categoryLabel
            )}
            <span className="font-mono text-[14px] text-ink/55 ms-3 align-middle">
              {data.length} / {total}
            </span>
          </h2>
        </div>
        <button
          onClick={onClear}
          className="font-sans text-[13px] text-ink/60 hover:text-ink underline underline-offset-4 transition-colors"
        >
          پاک کردن فیلتر / مشاهده همه
        </button>
      </div>

      {/* شبکه کارت‌ها یا حالت خالی */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {data.map((item) => (
            <KnowCard key={item.id} item={item} onSelect={onCardClick} />
          ))}
        </div>
      ) : (
        <EmptyState query={searchQuery} onClear={onClear} />
      )}
    </>
  );
};

/**
 * TypeSegmented — تغییر حالت توضیح مفاهیم / توضیح ویدئویی (نسخه inline فشرده)
 *
 * هم‌ردیف با chipهای دسته‌بندی، به‌عنوان اولین کنترل ناحیه فیلتر. segmented control دوبخشی:
 *   📖 توضیح مفاهیم   ▶ توضیح ویدئویی
 *
 * بصری: pill دوبخشی stamp؛ بخش انتخاب‌شده پس‌زمینه تیره و متن سفید، بخش انتخاب‌نشده پس‌زمینه سفید و متن تیره، در hover بالا می‌رود.
 * مفهوم "همه" کاملاً وجود ندارد —— دو حالت کاملاً مستقل‌اند.
 */
const TypeSegmented: React.FC<{
  active: KnowledgeType;
  onChange: (t: KnowledgeType) => void;
}> = ({ active, onChange }) => {
  const options: {
    id: KnowledgeType;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "concept", label: "توضیح مفاهیم", icon: BookOpen },
    { id: "video", label: "توضیح ویدئویی", icon: Play },
  ];

  return (
    <div className="inline-flex items-stretch bg-white border-2 border-ink rounded-full shadow-stamp p-1">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
              isActive
                ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                : "text-ink/65 hover:text-ink"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${isActive && opt.id === "video" ? "fill-cream" : ""}`}
              strokeWidth={2.5}
            />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/**
 * ViewSegmented — تغییر نمای «فهرست / کلی» در حالت مفهومی
 *
 * هم‌سبک با pill‌های stamp در TypeSegmented، فقط در حالت مفهومی ظاهر می‌شود.
 * فهرست = شبکه کارت‌های فعلی؛ کلی = نقشه دانش بصری (خطوط مترو + برجسته‌سازی ارتباط‌ها).
 */
const ViewSegmented: React.FC<{
  active: ConceptView;
  onChange: (v: ConceptView) => void;
}> = ({ active, onChange }) => {
  const options: {
    id: ConceptView;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "catalog", label: "نمای فهرست", icon: LayoutGrid },
    { id: "map", label: "نمای کلی", icon: Network },
  ];

  return (
    <div className="inline-flex items-stretch bg-white border-2 border-ink rounded-full shadow-stamp p-1">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
              isActive
                ? "bg-coral text-white shadow-[2px_2px_0_0_#241C15]"
                : "text-ink/65 hover:text-ink"
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/**
 * VideoRowList — فهرست مخصوص توضیح ویدئویی (کارت افقی یکی در هر ردیف)
 *
 * با"شبکه کارت‌ها"در حالت مفهومی شکل کاملاً متفاوتی دارد:
 *   هر ردیف یک کارت خیلی پهن، داخل آن «چپ: جلد ویدئوی Bilibili + ▶» «راست: پیش‌نمایش وب‌سایت PPT + ↗» «پایین: عنوان/توضیح/CTA»
 *
 * هدف طراحی:
 *   تعداد توضیح‌های ویدئویی خودش کم است (۴-۵ عدد)، با شبکه خالی به نظر می‌رسد؛
 *   یکی در هر ردیف + ویدئو/وب‌سایت کنار هم، صریحاً نشان می‌دهد که دو مسیر یادگیری هم‌زمان در دسترس‌اند.
 */
const VideoRowList: React.FC<{
  data: AIKnowledgeVideoItem[];
  onCardClick: (item: AIKnowledgeVideoItem) => void;
}> = ({ data, onCardClick }) => {
  if (data.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-ink/30 rounded-3xl p-16 text-center">
        <Play className="w-10 h-10 mx-auto text-ink/40 mb-6" strokeWidth={2} />
        <h3 className="font-display font-extrabold text-[24px] text-ink mb-3">
          توضیح ویدئویی در حال ضبط است
        </h3>
        <p className="font-sans text-[15px] text-ink-secondary max-w-md mx-auto">
          هر قسمت با یک وب‌سایت PPT همراه است. ویدئوهای جدید پس از انتشار این‌جا ظاهر می‌شوند.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7 lg:space-y-8">
      {data.map((item) => (
        <VideoRowCard
          key={item.id}
          item={item}
          onClick={() => onCardClick(item)}
        />
      ))}
    </div>
  );
};

/**
 * VideoRowCard — کارت تک‌ردیفی توضیح ویدئویی
 *
 * چیدمان (lg+):
 *   ستون چپ 60%  ← پیش‌نمایش دوگانه: بندانگشتی ویدئو | بندانگشتی وب‌سایت PPT، هر دو مستقل قابل کلیک
 *   ستون راست 40%  ← عنوان / توضیح / دو CTA (تماشا در Bilibili + باز کردن PPT)
 *
 * واکنش‌گرا:
 *   زیر md پیش‌نمایش دوگانه عمودی روی هم + ستون راست در پایین
 */
const VideoRowCard: React.FC<{
  item: AIKnowledgeVideoItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const tagClass = categoryColors[item.category] || "bg-cream text-ink";
  const easyPrefix = "درک آسان";
  const isEasy = item.title.startsWith(easyPrefix);
  const coreName = isEasy
    ? item.title.slice(easyPrefix.length).trim()
    : item.title;

  const Cover = COVER_MAP[item.id];
  const hasBilibili = !!item.bilibiliUrl;

  const openBilibili = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasBilibili) window.open(item.bilibiliUrl, "_blank", "noopener");
  };

  return (
    <article className="group bg-white border-2 border-ink rounded-3xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ───── پیش‌نمایش دوگانه (چپ 7/12) ───── */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-b-2 lg:border-b-0 lg:border-e-2 border-ink">
          {/* جلد ویدئو —— در sm چپ / در موبایل بالا */}
          <button
            onClick={openBilibili}
            disabled={!hasBilibili}
            className="relative group/v bg-ink/95 aspect-[16/10] sm:aspect-auto sm:min-h-[220px] border-b-2 sm:border-b-0 sm:border-e-2 border-ink overflow-hidden disabled:cursor-not-allowed"
            title={hasBilibili ? "تماشا در Bilibili" : "ویدئو در راه است"}
          >
            {item.videoCoverUrl ? (
              <img
                src={item.videoCoverUrl}
                alt={`${item.title} · جلد Bilibili`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 ease-spring group-hover/v:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play
                    className="w-12 h-12 mx-auto text-cream/40 mb-2"
                    strokeWidth={2}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">
                    Cover Coming
                  </span>
                </div>
              </div>
            )}

            {/* برچسب بالا */}
            <span className="absolute top-3 start-3 inline-flex items-center gap-1 px-2 py-0.5 bg-pop text-white border-2 border-ink rounded-full font-mono text-[10px] font-bold shadow-[2px_2px_0_0_#241C15]">
              <Play className="w-2.5 h-2.5 fill-white" strokeWidth={3} />
              ویدئوی Bilibili
            </span>

            {/* ▶ بزرگ در مرکز */}
            {hasBilibili && (
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-16 h-16 flex items-center justify-center bg-pop/95 border-[3px] border-white rounded-full shadow-[4px_4px_0_0_#241C15] transition-transform duration-300 ease-spring group-hover/v:scale-110">
                  <PlayCircle
                    className="w-9 h-9 text-white"
                    strokeWidth={2.5}
                  />
                </span>
              </span>
            )}

            {/* مدت / وضعیت */}
            {hasBilibili ? (
              item.duration && (
                <span className="absolute bottom-3 end-3 inline-flex items-center px-2 py-0.5 bg-ink/85 text-white rounded-md font-mono text-[10.5px] font-bold">
                  {item.duration}
                </span>
              )
            ) : (
              <span className="absolute bottom-3 end-3 inline-flex items-center px-2 py-0.5 bg-cream/15 text-cream/70 border border-cream/30 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider">
                Coming Soon
              </span>
            )}
          </button>

          {/* جلد وب‌سایت PPT —— در sm راست / در موبایل پایین */}
          <button
            onClick={onClick}
            className="relative group/p bg-cream aspect-[16/10] sm:aspect-auto sm:min-h-[220px] overflow-hidden"
            title="باز کردن وب‌سایت PPT"
          >
            {Cover ? (
              <div className="absolute inset-0">
                <Cover />
              </div>
            ) : (
              <img
                src={item.imageUrl}
                alt={`${item.title} · PPT همراه`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-spring group-hover/p:scale-105"
              />
            )}

            <span className="absolute top-3 start-3 inline-flex items-center gap-1 px-2 py-0.5 bg-white text-ink border-2 border-ink rounded-full font-mono text-[10px] font-bold shadow-[2px_2px_0_0_#241C15]">
              <BookOpen className="w-2.5 h-2.5" strokeWidth={3} />
              PPT همراه
            </span>

            <span className="absolute bottom-3 end-3 inline-flex items-center gap-1 px-2.5 py-1 bg-ink text-white rounded-full font-sans font-semibold text-[11px] opacity-0 group-hover/p:opacity-100 transition-opacity duration-250">
              <ArrowUpRight className="w-3 h-3" strokeWidth={3} />
              باز کردن
            </span>
          </button>
        </div>

        {/* ───── ستون راست: محتوا + CTA (راست 5/12) ───── */}
        <div className="lg:col-span-5 flex flex-col p-6 lg:p-7">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-2 py-0.5 border border-ink rounded-full font-sans font-bold text-[11px] shadow-[1.5px_1.5px_0_0_#241C15] ${tagClass}`}
            >
              {item.category}
            </span>
            {isEasy && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                درک آسان
              </span>
            )}
          </div>

          <h3 className="font-display font-extrabold text-[22px] md:text-[24px] text-ink leading-[1.2] mb-3">
            {coreName}
          </h3>

          <p className="font-sans text-[14px] text-ink-secondary leading-[1.65] flex-1">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-5 border-t-2 border-ink/10">
            <button
              onClick={openBilibili}
              disabled={!hasBilibili}
              className={`group/b inline-flex items-center gap-1.5 px-4 py-2 border-2 border-ink rounded-full font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
                hasBilibili
                  ? "bg-pop text-white shadow-stamp hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:5px_5px_0_0_#241C15]"
                  : "bg-cream text-ink/40 border-ink/30 cursor-not-allowed"
              }`}
            >
              <Play
                className={`w-3.5 h-3.5 ${hasBilibili ? "fill-white" : ""}`}
                strokeWidth={2.5}
              />
              <span>{hasBilibili ? "تماشا در Bilibili" : "ویدئو هنوز منتشر نشده"}</span>
              {hasBilibili && (
                <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
              )}
            </button>

            <button
              onClick={onClick}
              className="group/p inline-flex items-center gap-1.5 px-4 py-2 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:5px_5px_0_0_#241C15]"
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>باز کردن مواد ویدئویی همراه</span>
              <ArrowUpRight
                className="w-3 h-3 transition-transform duration-250 group-hover/p:translate-x-0.5 group-hover/p:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

/**
 * KnowCard — کارت توضیح مفهوم (فقط در حالت مفهومی استفاده می‌شود)
 *
 * توضیح ویدئویی از VideoRowCard مستقل استفاده می‌کند و این کامپوننت را دوباره به کار نمی‌برد.
 *
 * طراحی: جلد 16:10 + عنوان لایه‌بندی‌شده + توضیح. در hover کل کارت بالا می‌رود + فلش تیره در پایین-راست ظاهر می‌شود.
 */
const KnowCard = React.memo<{
  item: AIKnowledgeConceptItem;
  onSelect: (item: AIKnowledgeConceptItem) => void;
}>(({ item, onSelect }) => {
  const lineMeta = lineById[item.line];
  const easyPrefix = "درک آسان";
  const isEasy = item.title.startsWith(easyPrefix);
  const coreName = isEasy
    ? item.title.slice(easyPrefix.length).trim()
    : item.title;

  /* اگر کامپوننت جلد اختصاصی پیدا شود جلد SVG استفاده می‌شود، در غیر این صورت به اسکرین‌شات fall back می‌کند */
  const Cover = COVER_MAP[item.id];

  return (
    <button
      onClick={() => onSelect(item)}
      /* content-visibility:auto باعث می‌شود مرورگر رندر/نقاشی کارت‌های بیرون viewport را رد کند (جلدها SVG با ده‌ها گره‌اند،
         mount کردن ۴۰+ عدد یک‌جا سنگین است)؛ contain-intrinsic-size ارتفاع جای‌نگهدار می‌دهد تا نوار اسکرول نپرد.
         box-shadow مال خود عنصر است و با paint containment بریده نمی‌شود، ظاهر کاملاً بدون تغییر است. */
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 340px" }}
      className="group relative text-start flex flex-col bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden"
    >
      <div className="relative bg-cream border-b-2 border-ink aspect-[16/10] overflow-hidden">
        {Cover ? (
          <Cover />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
          />
        )}

        <span
          className="absolute top-2.5 start-2.5 inline-flex items-center px-2 py-0.5 border border-ink rounded-full font-sans font-bold text-[10.5px] shadow-[1.5px_1.5px_0_0_#241C15] text-white"
          style={{ backgroundColor: lineMeta?.color ?? "#241C15" }}
        >
          {lineMeta?.tag ?? item.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4 lg:p-[18px]">
        {isEasy && (
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1">
            درک آسان
          </div>
        )}
        <h3 className="font-display font-extrabold text-[17px] md:text-[18px] text-ink leading-[1.25] mb-2 line-clamp-2">
          {coreName}
        </h3>
        <p className="font-sans text-[13px] text-ink-secondary leading-[1.6] line-clamp-2 flex-1">
          {item.description}
        </p>
      </div>

      <span className="absolute bottom-3.5 end-3.5 w-8 h-8 flex items-center justify-center bg-ink text-white rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ease-spring">
        <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
      </span>
    </button>
  );
});
KnowCard.displayName = "KnowCard";

/**
 * BgStampCards — پس‌زمینه Hero"دیوار کارت‌ها"تزئین
 *
 * حس «کتابخانه/فهرست» را القا می‌کند. ۳ کارت کوچک نیمه‌شفاف سبک stamp با چرخش تصادفی پخش شده‌اند،
 * در صفحه بزرگ دیده می‌شوند و در موبایل برای جلوگیری از شلوغی بصری پنهان‌اند.
 */
const BgStampCards: React.FC = () => (
  <>
    <div
      className="hidden lg:block absolute top-[18%] end-[8%] w-[120px] h-[80px] bg-white/30 border-2 border-ink/25 rounded-2xl"
      style={{ transform: "rotate(8deg)" }}
      aria-hidden
    />
    <div
      className="hidden lg:block absolute bottom-[22%] start-[6%] w-[100px] h-[70px] bg-white/25 border-2 border-ink/20 rounded-2xl"
      style={{ transform: "rotate(-7deg)" }}
      aria-hidden
    />
    <div
      className="hidden lg:block absolute top-[58%] end-[5%] w-[90px] h-[60px] bg-white/20 border-2 border-ink/20 rounded-2xl"
      style={{ transform: "rotate(14deg)" }}
      aria-hidden
    />
  </>
);

const EmptyState: React.FC<{ query: string; onClear: () => void }> = ({
  query,
  onClear,
}) => (
  <div className="bg-white border-2 border-dashed border-ink/30 rounded-3xl p-16 text-center">
    <Sparkle4
      className="w-10 h-10 mx-auto text-ink/40 mb-6"
      color="#241C15"
    />
    <h3 className="font-display font-extrabold text-[24px] text-ink mb-3">
      محتوای مرتبطی پیدا نشد
    </h3>
    <p className="font-sans text-[15px] text-ink-secondary mb-8 max-w-md mx-auto">
      {query
        ? `「${query}» هنوز نوشته نشده؛ کلیدواژه دیگری امتحان کنید، یا به ما بگویید که می‌خواهید این مفهوم را بخوانید.`
        : "این دسته‌بندی فعلاً محتوایی ندارد، می‌توانید اول دسته‌بندی دیگری را ببینید."}
    </p>
    <button
      onClick={onClear}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[14px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
    >
      <X className="w-4 h-4" strokeWidth={2.5} />
      پاک کردن فیلتر
    </button>
  </div>
);

export default AIKnowledge;
