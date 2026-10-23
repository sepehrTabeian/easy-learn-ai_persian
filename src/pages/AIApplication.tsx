/**
 * کاربردهای AI ← مجموعه آثار Works
 *
 * استعاره: نمایشگاه بایگانی یک کارگاه شخصی (careers اولیه Mailchimp / صفحه نویسنده Stripe Press)
 *   ─ نویسنده کنار می‌رود و خود آثار نقش اصلی‌اند
 *   ─ Hero یک بیانیه + نوار ابزار است (chip دسته‌بندی + منوی کشویی فهرست آثار)
 *   ─ هر اثر یک"اثر قاب‌گرفته نمایشگاهی"است: کارت بزرگ stamp + اسکرین‌شات + عنوان درشت + actions سفارشی
 *
 * معماری اطلاعات:
 *   ۱. HERO        بیانیه + manifesto + فیلتر دسته‌بندی + فهرست آثار (پرش سریع)
 *   ۲. WORKS       کارت‌های بزرگ grid دوستونه
 *   ۳. COLOPHON    پایین"صفحه حقوق کارگاه"
 *
 * هنگام انتخاب demo: پیش‌نمایش تمام‌صفحه درون‌خطی Header + sub-nav سبک stamp حفظ می‌شود
 *
 * قابلیت‌های کلیدی:
 *   - WorkCard آرایه actions سفارشی را رندر می‌کند: هر اثر می‌تواند N دکمه داشته باشد،
 *     متن دکمه دلخواه است، نوع آن embed (iframe درون سایت) / external (پرش به پنجره جدید) است
 *   - داده قدیمی demoUrl / githubUrl خودکار به actions تبدیل (fallback) می‌شود
 *   - منوی کشویی فهرست آثار: جستجو + کلیک ← scroll به کارت + هایلایت چشمک‌زن coral به مدت 1.2s
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { aiApplicationData } from "../data/aiApplicationData";
import { AIApplicationItem, WorkAction } from "../types";
import { WorkFilter } from "../components/application/WorkFilter";

/* ──────────────────────────────────────────────────────────────
 * چرخه رنگ دسته‌بندی
 * ────────────────────────────────────────────────────────────── */
const CATEGORY_PALETTE = [
  { bg: "bg-butter", text: "text-ink", border: "border-ink" },
  { bg: "bg-coral", text: "text-white", border: "border-ink" },
  { bg: "bg-teal", text: "text-white", border: "border-ink" },
  { bg: "bg-cream", text: "text-ink", border: "border-ink" },
] as const;

const ALL_LABEL = "همه";

/* ──────────────────────────────────────────────────────────────
 * لایه سازگاری actions
 *
 * 1) actions صریح: مستقیم استفاده می‌شود
 * 2) داده قدیمی که فقط demoUrl/githubUrl دارد: خودکار تبدیل می‌شود به
 *      [ {label:"تجربه آنلاین", type:"embed", url:demoUrl},
 *        {label:"کد منبع",     type:"external", url:githubUrl} ]
 * ────────────────────────────────────────────────────────────── */
const normalizeActions = (item: AIApplicationItem): WorkAction[] => {
  if (item.actions && item.actions.length > 0) return item.actions;
  const acts: WorkAction[] = [];
  if (item.demoUrl) {
    acts.push({
      label: "تجربه آنلاین",
      type: "embed",
      url: item.demoUrl,
      variant: "primary",
    });
  }
  if (item.githubUrl) {
    acts.push({
      label: "کد منبع",
      type: "external",
      url: item.githubUrl,
      variant: "secondary",
    });
  }
  return acts;
};

/* اولویت بر اساس ترتیب آرایه خودکار تعیین می‌شود: اولی primary، بقیه secondary */
const resolveVariant = (
  action: WorkAction,
  index: number,
): "primary" | "secondary" =>
  action.variant ?? (index === 0 ? "primary" : "secondary");

const AIApplication: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_LABEL);
  const [selectedDemo, setSelectedDemo] = useState<AIApplicationItem | null>(
    null,
  );
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const highlightTimerRef = useRef<number | null>(null);

  /* ── مشتق‌سازی داده ───────────────────────────────────── */
  const orderedCategories = useMemo(() => {
    const unique: string[] = [];
    aiApplicationData.forEach((item) => {
      if (!unique.includes(item.category)) unique.push(item.category);
    });
    return [ALL_LABEL, ...unique];
  }, []);

  const countByCategory = useMemo(() => {
    const map = new Map<string, number>();
    aiApplicationData.forEach((item) => {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    });
    return map;
  }, []);

  const filteredData = useMemo(
    () =>
      selectedCategory === ALL_LABEL
        ? aiApplicationData
        : aiApplicationData.filter(
            (item) => item.category === selectedCategory,
          ),
    [selectedCategory],
  );

  const numberMap = useMemo<Map<string, number>>(() => {
    const m = new Map<string, number>();
    aiApplicationData.forEach((item, i) => m.set(item.id, i + 1));
    return m;
  }, []);

  const colorForCategory = (cat: string) => {
    const idx = orderedCategories.indexOf(cat) - 1;
    if (idx < 0) return null;
    return CATEGORY_PALETTE[idx % CATEGORY_PALETTE.length];
  };

  /* ── پرش به کارت اثر + هایلایت چشمک‌زن ───────────────────── */
  const handleJumpTo = useCallback(
    (workId: string) => {
      const work = aiApplicationData.find((w) => w.id === workId);
      if (!work) return;
      /* اگر این کارت در فیلتر دسته‌بندی فعلی نیست، اول به همه برگردید تا کارت رندر شود */
      if (
        selectedCategory !== ALL_LABEL &&
        work.category !== selectedCategory
      ) {
        setSelectedCategory(ALL_LABEL);
      }
      /* یک فریم صبر کنید تا DOM به‌روز شود و بعد اسکرول کنید */
      requestAnimationFrame(() => {
        const el = document.getElementById(`work-${workId}`);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedId(workId);
        if (highlightTimerRef.current) {
          window.clearTimeout(highlightTimerRef.current);
        }
        highlightTimerRef.current = window.setTimeout(() => {
          setHighlightedId(null);
          highlightTimerRef.current = null;
        }, 1400);
      });
    },
    [selectedCategory],
  );

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  /* ── مسیریابی: ورود / خروج از iframe demo ───────────────── */
  useEffect(() => {
    if (id) {
      const app = aiApplicationData.find((item) => item.id === id);
      if (!app) {
        navigate("/ai-application", { replace: true });
        return;
      }
      const allActions = normalizeActions(app);
      const firstEmbed = allActions.find((a) => a.type === "embed");
      if (!firstEmbed) {
        navigate("/ai-application", { replace: true });
        return;
      }
      setSelectedDemo(app);
      setEmbedUrl(firstEmbed.url);
      setIsLoading(true);
    } else {
      setSelectedDemo(null);
      setEmbedUrl(null);
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!selectedDemo) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") navigate("/ai-application");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedDemo, navigate]);

  /* ════════════════════════════════════════════════
   * حالت پیش‌نمایش IFRAME · راهکار Floating Toolbar غوطه‌ورکننده
   *
   * نکات طراحی:
   *   ─ پوشش تمام‌صفحه fixed inset-0 (z-999 روی Header کل سایت)، demo 100% دید را می‌گیرد
   *   ─ بالا-چپ"دکمه بازگشت ترکیبی برند"= لوگوی E با butter + ← بازگشت + نام پروژه، سه در یک
   *     • لوگوی E هویت برند Easy AI را می‌دهد (کاملاً یکسان با لوگوی Header)
   *     • فلش بازگشت + متن کارکرد را فراهم می‌کند
   *     • زیرعنوان mono نام پروژه پاسخ می‌دهد"دارم چه چیزی را می‌بینم"طول context
   *   ─ دکمه لینک بیرونی بالا-راست (فقط وقتی demo دارای external action باشد نمایش داده می‌شود)
   *   ─ دیگر هیچ نوار chrome وجود ندارد، زبان طراحی demo صحنه را به تنهایی در اختیار دارد
   * ════════════════════════════════════════════════ */
  if (selectedDemo && embedUrl) {
    /* جمع‌آوری همه actionهای نوع external —— کد منبع / دانلود / مستندات و غیره ممکن است هم‌زمان باشند */
    const externalActs = normalizeActions(selectedDemo).filter(
      (a) => a.type === "external",
    );

    return (
      <div className="fixed inset-0 z-[999] bg-white overflow-hidden">
        {/* بالا-چپ · دکمه بازگشت ترکیبی برند */}
        <button
          onClick={() => navigate("/ai-application")}
          aria-label="بازگشت به مجموعه آثار"
          className="group fixed top-4 start-4 z-[1001] flex items-stretch bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] max-w-[calc(100vw-32px)] sm:max-w-[360px]"
        >
          {/* نیمه چپ: لوگوی E با butter (هم‌شکل لوگوی Header) */}
          <div className="flex-shrink-0 flex items-center justify-center w-11 bg-butter border-e-2 border-ink rounded-s-[14px]">
            <span className="font-sans font-extrabold text-[18px] text-ink leading-none">
              E
            </span>
          </div>

          {/* نیمه راست: متن دوخطی */}
          <div className="flex flex-col items-start justify-center px-3.5 py-1.5 min-w-0">
            <span className="inline-flex items-center gap-1 font-sans font-bold text-[13px] text-ink leading-tight group-hover:text-coral transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 -ms-0.5" strokeWidth={2.5} />
              بازگشت به Easy AI - مجموعه آثار
            </span>
            <span className="font-mono text-[10px] text-ink/55 leading-tight mt-1 truncate max-w-full">
              {selectedDemo.title}
            </span>
          </div>
        </button>

        {/* بالا-راست · گروه دکمه‌های لینک بیرونی (کارت stamp بخش‌بندی‌شده، پشتیبانی از ۱ تا N عدد)*/}
        {externalActs.length > 0 && (
          <div className="fixed top-4 end-4 z-[1001] flex items-stretch bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden divide-x-2 divide-ink max-w-[calc(100vw-32px)]">
            {externalActs.map((act, i) => (
              <a
                key={`${act.label}-${i}`}
                href={act.url}
                target="_blank"
                rel="noopener noreferrer"
                title={act.label}
                className="group/btn inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 font-sans font-bold text-[13px] text-ink hover:bg-butter transition-colors duration-200"
              >
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-[1px] group-hover/btn:-translate-y-[1px]"
                  strokeWidth={2.5}
                />
                <span className="hidden sm:inline truncate max-w-[140px]">
                  {act.label}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* حالت Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/95 backdrop-blur z-[1000]">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-8 py-6 text-center min-w-[260px]">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
              <div className="font-display font-extrabold text-[16px] text-ink mb-1">
                در حال باز کردن Demo
              </div>
              <div className="font-mono text-[11px] text-ink/55 truncate max-w-[240px] mx-auto">
                {selectedDemo.title}
              </div>
            </div>
          </div>
        )}

        {/* iframe تمام‌صفحه */}
        <iframe
          src={embedUrl}
          className="w-full h-full block border-0"
          title={selectedDemo.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  /* ════════════════════════════════════════════════
   * صفحه فهرست
   * ════════════════════════════════════════════════ */
  const totalCount = aiApplicationData.length;

  return (
    <div className="relative bg-white">
      {/* ═════════ HERO · سرسرای کارگاه cream ═════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        {/* بالا-راست"کارت قاب‌گرفته"گروه تزئینی */}
        <div className="absolute top-8 lg:top-10 end-4 lg:end-8 hidden md:block pointer-events-none">
          <div className="relative w-[170px] h-[120px]">
            <div className="absolute top-2 -start-3 w-[150px] h-[100px] bg-coral border-2 border-ink rounded-xl shadow-stamp rotate-[-6deg]" />
            <div className="absolute -top-3 start-6 w-[150px] h-[100px] bg-butter border-2 border-ink rounded-xl shadow-stamp rotate-[7deg]" />
            <div className="absolute top-1 start-1 w-[150px] h-[100px] bg-white border-2 border-ink rounded-xl shadow-stamp rotate-[1deg] flex flex-col items-center justify-center">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-ink/45 mb-1">
                § Works
              </span>
              <span className="font-display font-extrabold text-[32px] text-ink leading-none tabular-nums">
                {String(totalCount).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 lg:pt-20 pb-12 lg:pb-16">
          <div className="max-w-[680px]">
            <div className="flex items-center gap-3 mb-6 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              <span>§ Works · نمایش آثار</span>
              <span className="hidden sm:inline-block flex-1 max-w-[120px] border-t border-ink/15" />
            </div>

            <h1 className="font-display font-extrabold text-ink leading-[1.05] tracking-[-0.02em] mb-7">
              <span
                className="block"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                چیزهایی که
                <span className="relative inline-block ms-[0.1em]">
                  <span className="relative z-10">ساخته‌ام</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 start-0 end-0 h-3 lg:h-4 bg-butter -z-0 rounded-sm"
                  />
                </span>
                。
              </span>
            </h1>

            <p className="font-sans text-[16px] lg:text-[17px] text-ink-secondary leading-[1.65] max-w-xl mb-8">
              Agentها، Skillها و ابزارهای متن‌بازی که معلم «باغ» ساخته، همه این‌جاست.
            </p>

            <div className="flex items-center gap-3 mb-5 font-mono text-[11px] lg:text-[12px] text-ink/55 tabular-nums">
              <span>
                در مجموع <span className="font-bold text-ink">{totalCount}</span> اثر
              </span>
              <span className="text-ink/25">·</span>
              <span>همچنان در حال ساخت</span>
              {selectedCategory !== ALL_LABEL && (
                <>
                  <span className="text-ink/25">·</span>
                  <span>
                    نمایش فعلی{" "}
                    <span className="font-bold text-ink">
                      {filteredData.length}
                    </span>{" "}
                    مورد
                  </span>
                </>
              )}
            </div>

            {/* نوار ابزار: ردیف chip فیلتر دسته‌بندی + منوی کشویی فهرست آثار */}
            <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
              {orderedCategories.map((cat) => {
                const active = selectedCategory === cat;
                const count =
                  cat === ALL_LABEL
                    ? totalCount
                    : countByCategory.get(cat) ?? 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-2 ps-4 pe-3 py-2 rounded-full border-2 border-ink font-sans font-bold text-[13px] transition-all duration-250 ease-spring ${
                      active
                        ? "bg-ink text-cream shadow-stamp"
                        : "bg-white text-ink shadow-[2px_2px_0_0_#241C15] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:4px_4px_0_0_#241C15]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full font-mono font-bold text-[10px] tabular-nums ${
                        active
                          ? "bg-butter text-ink"
                          : "bg-cream text-ink-secondary"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {/* نقطه جداکننده */}
              <span className="hidden sm:inline-block w-px h-6 bg-ink/15 mx-1" />

              {/* منوی کشویی فهرست آثار */}
              <WorkFilter
                works={aiApplicationData}
                numberMap={numberMap}
                onJump={handleJumpTo}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ WORKS · grid کارت‌های بزرگ دوستونه ═════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredData.map((item) => (
                <WorkCard
                  key={item.id}
                  item={item}
                  issueNumber={numberMap.get(item.id) ?? 0}
                  colorForCategory={colorForCategory}
                  isHighlighted={highlightedId === item.id}
                  onEmbed={() => navigate(`/ai-application/${item.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-ink/20 rounded-2xl px-10 py-16 text-center max-w-md mx-auto">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-3">
                § Empty
              </div>
              <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
                هنوز اثری در این دسته‌بندی نیست
              </h3>
              <p className="font-sans text-[14px] text-ink-secondary mb-6">
                می‌توانید دسته‌بندی دیگری انتخاب کنید یا همه آثار را ببینید.
              </p>
              <button
                onClick={() => setSelectedCategory(ALL_LABEL)}
                className="inline-flex items-center gap-2 px-5 py-2 bg-ink text-cream border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
              >
                مشاهده همه آثار
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═════════ COLOPHON · صفحه حقوق کارگاه ═════════ */}
      <section className="bg-cream border-t-2 border-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-8 lg:px-12 py-10 lg:py-12 text-center max-w-2xl mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55 mb-3">
              § Colophon · صفحه حقوق کارگاه
            </div>
            <h2 className="font-display font-extrabold text-[24px] lg:text-[30px] text-ink leading-[1.2] mb-3 tracking-[-0.005em]">
              همه آثار بالا{" "}
              <span className="relative inline-block">
                <span className="relative z-10">100% متن‌باز</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 start-0 end-0 h-2.5 lg:h-3 bg-coral/40 -z-0 rounded-sm"
                />
              </span>
              。
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary mb-7 leading-[1.65] max-w-md mx-auto">
              می‌خواهید همکاری کنید، باگ گزارش دهید، پیشنهاد بدهید یا فقط گپ بزنید؟
              <br className="hidden sm:inline" />
              به GitHub Issues سر بزنید یا در حساب رسمی پیام بگذارید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/ConardLi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
              >
                <Github className="w-4 h-4" strokeWidth={2.5} />
                GitHub Profile
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* keyframe انیمیشن هایلایت چشمک‌زن (تزریق محلی، برای جلوگیری از آلوده کردن سراسری) */}
      <style>{`
        @keyframes workFlash {
          0%   { box-shadow: 4px 4px 0 0 #241C15, 0 0 0 0 rgba(224, 122, 95, 0.85); }
          25%  { box-shadow: 4px 4px 0 0 #241C15, 0 0 0 8px rgba(224, 122, 95, 0.4); }
          100% { box-shadow: 4px 4px 0 0 #241C15, 0 0 0 0 rgba(224, 122, 95, 0); }
        }
        .work-flash { animation: workFlash 1.4s ease-out 1; }
      `}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * WorkCard · کارت بزرگ اثر
 *
 * تغییر کلیدی: بخش CTA دیگر دو دکمه را hardcode نمی‌کند، بلکه آرایه actions را رندر می‌کند.
 *   - دکمه embed با onClick ← ورود به مسیر iframe (onEmbed لایه والد)
 *   - دکمه external مستقیم window.open
 *   - icon بر اساس type خودکار انتخاب می‌شود
 *   - اولویت variant خودکار تعیین می‌شود
 * ──────────────────────────────────────────────────────────────────── */

interface WorkCardProps {
  item: AIApplicationItem;
  issueNumber: number;
  colorForCategory: (cat: string) => {
    bg: string;
    text: string;
    border: string;
  } | null;
  isHighlighted: boolean;
  onEmbed: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({
  item,
  issueNumber,
  colorForCategory,
  isHighlighted,
  onEmbed,
}) => {
  const catColor = colorForCategory(item.category);
  const actions = normalizeActions(item);

  return (
    <article
      id={`work-${item.id}`}
      className={`group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp overflow-hidden transition-all duration-300 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:8px_8px_0_0_#241C15] scroll-mt-24 ${
        isHighlighted ? "work-flash" : ""
      }`}
    >
      <div className="relative aspect-[20/9] bg-cream overflow-hidden border-b-2 border-ink">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="block w-full h-full object-cover transition-transform duration-[600ms] ease-spring group-hover:scale-[1.04]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        {catColor && (
          <div
            className={`absolute top-3 end-3 inline-flex items-center px-2.5 py-1 ${catColor.bg} ${catColor.text} border-2 ${catColor.border} rounded-full font-sans font-bold text-[11px] shadow-[2px_2px_0_0_#241C15]`}
          >
            {item.category}
          </div>
        )}

        <div className="absolute bottom-3 start-3 inline-flex items-center px-2.5 py-1 bg-ink/85 text-cream backdrop-blur rounded-full font-mono font-bold text-[10px] uppercase tracking-[0.18em] tabular-nums">
          № {String(issueNumber).padStart(2, "0")}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5 lg:p-6">
        <h3 className="font-display font-extrabold text-[20px] lg:text-[22px] text-ink leading-[1.25] mb-2.5 tracking-[-0.005em] group-hover:text-coral transition-colors">
          {item.title}
        </h3>

        <p className="font-sans text-[14.5px] lg:text-[15px] text-ink-secondary leading-[1.6] mb-4 line-clamp-2">
          {item.description}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-mono font-semibold text-[11px] text-ink-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA · actions سفارشی */}
        <div className="flex items-stretch flex-wrap gap-2.5 mt-auto">
          {actions.length > 0 ? (
            actions.map((act, idx) => (
              <ActionButton
                key={`${act.type}-${idx}-${act.url}`}
                action={act}
                variant={resolveVariant(act, idx)}
                isOnlyOne={actions.length === 1}
                onEmbedClick={onEmbed}
              />
            ))
          ) : (
            <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cream text-ink-tertiary border-2 border-dashed border-ink/25 rounded-full font-sans font-bold text-[13px]">
              هنوز لینک قابل دسترسی وجود ندارد
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * ActionButton · یک دکمه CTA
 *
 * variant وزن بصری را تعیین می‌کند؛ type آیکون و رفتار کلیک را تعیین می‌کند.
 *   - primary   coral توپر + flex-1 (اگر تنها دکمه باشد هم flex-1 پر می‌کند)
 *   - secondary پس‌زمینه سفید با حاشیه ink
 * ──────────────────────────────────────────────────────────────────── */

interface ActionButtonProps {
  action: WorkAction;
  variant: "primary" | "secondary";
  isOnlyOne: boolean;
  onEmbedClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  variant,
  isOnlyOne,
  onEmbedClick,
}) => {
  /* انتخاب icon بر اساس type: embed از ExternalLink استفاده می‌کند (باز کردن demo)،
     external از ArrowUpRight (پرش به بیرون)؛ برچسب github از brand icon استفاده می‌کند */
  const isGithubLabel = /github|کد منبع|مخزن|repo/i.test(action.label);
  const Icon = isGithubLabel
    ? Github
    : action.type === "embed"
    ? ExternalLink
    : ArrowUpRight;

  const className =
    variant === "primary"
      ? `${
          isOnlyOne ? "flex-1" : "flex-1"
        } inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-coral text-white border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-[3px_3px_0_0_#241C15] transition-all duration-250 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:5px_5px_0_0_#241C15]`
      : `inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-ink border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-[3px_3px_0_0_#241C15] transition-all duration-250 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:5px_5px_0_0_#241C15] hover:bg-ink hover:text-cream`;

  if (action.type === "embed") {
    return (
      <button onClick={onEmbedClick} className={className}>
        <Icon className="w-4 h-4" strokeWidth={2.5} />
        {action.label}
      </button>
    );
  }

  return (
    <a
      href={action.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Icon className="w-4 h-4" strokeWidth={2.5} />
      {action.label}
    </a>
  );
};

export default AIApplication;
