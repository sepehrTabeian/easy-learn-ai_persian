/**
 * جزئیات گزارش روزانه · صفحه‌آرایی article خبرنامه دیجیتال
 *
 * استعاره هم‌سو با صفحه فهرست: گزارش روزانه Easy AI = خبرنامه دیجیتالی که هر روز منتشر می‌شود
 *   ─ نوار ناوبری sticky بالا (بازگشت + اشتراک‌گذاری + پنجره جدید)
 *   ─ Detail Masthead: نوار شماره + عنوان درشت + زنجیره dot برچسب‌ها
 *   ─ Article: کامپوننت‌های کاملاً سفارشی ReactMarkdown، جایگزین github-markdown.css
 *   ─ Footer: کارت‌های prev-next شماره قبل / شماره بعد + بازگشت به archive
 *
 * نکات کلیدی طراحی:
 *   ─ بدون serif (هم‌سو با صفحه اصلی)، با سه خانواده فونت display + sans + mono و تقابل
 *     اندازه، weight و tracking صفحه‌آرایی نشریه ساخته می‌شود
 *   ─ بدنه در عرض خواندن max-w-[720px] (حدود 16em، راحت‌ترین برای خواندن طولانی تک‌ستونی)
 *   ─ لینک با زیرخط coral / بلوک نقل‌قول با خط کناری cream / بلوک کد با پس‌زمینه cream
 */

import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Share2, ExternalLink, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import { useDailyList, useDailyContent } from "../../hooks/useDailyData";
import { DailyReport } from "../../types/daily";

const WEEKDAYS = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"] as const;

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) throw new Error("invalid");
    return {
      ymd: `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
        2,
        "0",
      )}.${String(d.getDate()).padStart(2, "0")}`,
      weekday: `${WEEKDAYS[d.getDay()]}`,
    };
  } catch {
    return { ymd: dateStr, weekday: "—" };
  }
};

export const DailyDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { content, loading, error } = useDailyContent(date || "");
  const { dailyList } = useDailyList();

  useEffect(() => {
    if (!date) navigate("/ai-daily");
  }, [date, navigate]);

  /* شماره فعلی + دو شماره قبل و بعد (به ترتیب نزولی تاریخ: prev = شماره قدیمی‌تر، next = شماره جدیدتر) */
  const { current, prev, next, issueNumber } = useMemo<{
    current?: DailyReport;
    prev?: DailyReport;
    next?: DailyReport;
    issueNumber?: number;
  }>(() => {
    if (!dailyList.length || !date) return {};
    const sorted = [...dailyList].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const idx = sorted.findIndex((d) => d.date === date);
    if (idx < 0) return {};
    return {
      current: sorted[idx],
      /* prev: از نظر بصری"شماره قبل"متناظر با"شماره قدیمی‌تر"(بر حسب زمان، نگاه به عقب) */
      prev: sorted[idx + 1],
      next: sorted[idx - 1],
      issueNumber: sorted.length - idx,
    };
  }, [dailyList, date]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: current?.title || `گزارش روزانه Easy AI · ${date}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("لینک در کلیپ‌بورد کپی شد");
      }
    } catch {
      /* لغو اشتراک‌گذاری توسط کاربر خطا محسوب نمی‌شود */
    }
  };

  /* ─── Loading ─────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <DetailNav onBack={() => navigate("/ai-daily")} />
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-20 pb-20 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
          <h2 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
            در حال باز کردن گزارش این شماره
          </h2>
          <p className="font-sans text-[14px] text-ink-secondary">
            در حال بارگذاری متن…
          </p>
        </div>
      </div>
    );
  }

  /* ─── Error ───────────────────────────────────────────── */
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <DetailNav onBack={() => navigate("/ai-daily")} />
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-16 pb-20">
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral mb-3">
              § Error
            </div>
            <h2 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
              گزارش این شماره باز نمی‌شود
            </h2>
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
        </div>
      </div>
    );
  }

  /* ─── Empty content ───────────────────────────────────── */
  if (!content) {
    return (
      <div className="min-h-screen bg-white">
        <DetailNav onBack={() => navigate("/ai-daily")} />
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-20 pb-20 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-3">
            § Not Found
          </div>
          <h2 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
            این شماره از گزارش روزانه پیدا نشد
          </h2>
          <p className="font-sans text-[14px] text-ink-secondary mb-6">
            شاید لینک منقضی شده یا این شماره هنوز منتشر نشده است.
          </p>
          <Link
            to="/ai-daily"
            className="inline-flex items-center gap-2 px-5 py-2 bg-ink text-cream font-sans font-bold text-[13px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            بازگشت به فهرست شماره‌های گذشته
          </Link>
        </div>
      </div>
    );
  }

  const dateInfo = formatDate(date || "");
  const tags = current?.tags || [];

  return (
    <div className="min-h-screen bg-white">
      {/* ═════════ نوار ناوبری sticky بالا ═════════ */}
      <DetailNav onBack={() => navigate("/ai-daily")} onShare={handleShare} />

      {/* ═════════ Detail Masthead ═════════ */}
      {/* title حذف شد (عنوان گزارش روزانه خیلی طولانی است و درشت کردنش خیلی زشت می‌شود).
         پس از حذف title، شماره № نقش اصلی بصری سربرگ را می‌گیرد،
         و بخش دسته‌بندی بزرگ شده و بدنه Masthead می‌شود. */}
      <header className="bg-white border-b border-ink/10">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-12 lg:pt-16 pb-10 lg:pb-12">
          {/* eyebrow rule */}
          <div className="flex items-center gap-3 mb-7 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/55">
            <span>§ Latest Issue · گزارش این شماره</span>
            <span className="flex-1 border-t border-dotted border-ink/20" />
            <span className="text-ink/45 hidden sm:inline">
              Easy AI Daily
            </span>
          </div>

          {/* شماره № درشت + هم‌ترازی baseline با تاریخ —— جایگزین عنوان حذف‌شده و نقش اصلی بصری */}
          <div className="flex items-end gap-5 lg:gap-7 mb-12 lg:mb-14 flex-wrap">
            {issueNumber != null && (
              <div
                className="font-display font-extrabold text-ink leading-none tracking-[-0.02em] tabular-nums"
                style={{ fontSize: "clamp(3.5rem, 8vw, 5.75rem)" }}
              >
                № {String(issueNumber).padStart(3, "0")}
              </div>
            )}
            <div className="pb-2 lg:pb-3 font-mono tabular-nums flex flex-col gap-1">
              <span className="font-bold text-ink text-[16px] lg:text-[18px]">
                {dateInfo.ymd}
              </span>
              <span className="text-ink/55 text-[12px] lg:text-[13px]">
                منتشرشده در · {dateInfo.weekday}
              </span>
            </div>
          </div>

          {/* ─── filed under · بخش دسته‌بندی ─── تأکید دوم Masthead */}
          {tags.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/55">
                <span>¶ Filed Under · دسته‌بندی‌های این شماره</span>
                <span className="flex-1 border-t border-ink/15" />
                <span className="text-ink/45 tabular-nums">
                  {String(tags.length).padStart(2, "0")} مورد
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 lg:gap-3">
                {tags.map((tag) => (
                  <TagChip key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ═════════ Article ═════════ */}
      <article className="bg-white">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-10 lg:pt-12 pb-16 lg:pb-20">
          <div className="daily-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mdComponents}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* ═════════ Footer · شماره قبل / شماره بعد ═════════ */}
      <footer className="bg-white border-t border-ink">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-7 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
            <span>§ More Issues</span>
            <span className="flex-1 border-t border-ink/15" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-5 mb-8">
            <PrevNextCard
              direction="prev"
              daily={prev}
              issueNumber={
                issueNumber != null && prev ? issueNumber - 1 : undefined
              }
              onClick={(d) => navigate(`/ai-daily/${d.date}`)}
            />
            <PrevNextCard
              direction="next"
              daily={next}
              issueNumber={
                issueNumber != null && next ? issueNumber + 1 : undefined
              }
              onClick={(d) => navigate(`/ai-daily/${d.date}`)}
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/ai-daily"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-ink border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              بازگشت به فهرست شماره‌های گذشته
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
            >
              <Share2 className="w-4 h-4" strokeWidth={2.5} />
              اشتراک‌گذاری این شماره
            </button>
          </div>
        </div>
      </footer>

      {/* ═════════ استایل prose سفارشی Article ═════════ */}
      <style>{articleStyles}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * TagChip · "مهر پستی دسته‌بندی"
 *
 * طراحی: همه chipها پس‌زمینه butter + حاشیه ink + سایه stamp کوچک دارند.
 *   - هم‌رنگی باعث می‌شود"دسته‌بندی‌های این شماره"یک بلوک بصری یکپارچه و قابل‌تشخیص شوند
 *   - سایه stamp آن را واقعاً شبیه مهر پستی کوچکی روی پاکت بایگانی می‌کند
 *   - hover کمی بالا می‌پرد: جابه‌جایی 1px + سایه تیره‌تر
 *   - کلیک به archive می‌رود و آن برچسب دسته‌بندی را از پیش انتخاب می‌کند
 * ──────────────────────────────────────────────────────────────────── */

const TagChip: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Link
      to={`/ai-daily?tag=${encodeURIComponent(label)}`}
      onClick={(e) => {
        /* HashRouter از query پشتیبانی نمی‌کند، مستقیم به صفحه فهرست می‌رود (archive فیلترها را پاک می‌کند).
           href برای کپی لینک با کلیک راست حفظ شده، اما در عمل فقط به فهرست برمی‌گردد. */
        e.preventDefault();
        window.location.hash = `#/ai-daily`;
      }}
      className="inline-flex items-center px-3.5 py-1.5 bg-butter text-ink border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-[2px_2px_0_0_#241C15] transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15]"
    >
      {label}
    </Link>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * نوار ناوبری sticky بالا
 * ──────────────────────────────────────────────────────────────────── */

const DetailNav: React.FC<{
  onBack: () => void;
  onShare?: () => void;
}> = ({ onBack, onShare }) => {
  const handleOpenNewTab = () => window.open(window.location.href, "_blank");

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-[920px] mx-auto px-6 lg:px-10 h-12 lg:h-14 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans font-semibold text-[13px] text-ink-secondary hover:text-ink hover:bg-cream transition-colors -ms-2.5"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          فهرست شماره‌های گذشته
        </button>
        <div className="flex items-center gap-1">
          {onShare && (
            <button
              onClick={onShare}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-ink-secondary hover:text-ink hover:bg-cream transition-colors"
              aria-label="اشتراک‌گذاری"
            >
              <Share2 className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          )}
          <button
            onClick={handleOpenNewTab}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-ink-secondary hover:text-ink hover:bg-cream transition-colors"
            aria-label="باز کردن در پنجره جدید"
          >
            <ExternalLink className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * کارت شماره قبل / شماره بعد
 * ──────────────────────────────────────────────────────────────────── */

const PrevNextCard: React.FC<{
  direction: "prev" | "next";
  daily?: DailyReport;
  issueNumber?: number;
  onClick: (d: DailyReport) => void;
}> = ({ direction, daily, issueNumber, onClick }) => {
  const isPrev = direction === "prev";

  if (!daily) {
    return (
      <div className="border border-dashed border-ink/20 rounded-2xl p-5 lg:p-6 flex items-center justify-center min-h-[120px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/35">
          § {isPrev ? "No Older Issue" : "Already Latest"}
        </span>
      </div>
    );
  }

  const dateInfo = formatDate(daily.date);

  return (
    <button
      type="button"
      onClick={() => onClick(daily)}
      className="group bg-white border-2 border-ink rounded-2xl p-5 lg:p-6 shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] text-start flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
        {isPrev ? (
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
        ) : null}
        <span>{isPrev ? "Previous · شماره قبل" : "Next · شماره بعد"}</span>
        {!isPrev ? (
          <ArrowRight className="w-3.5 h-3.5 ms-auto" strokeWidth={2.5} />
        ) : null}
      </div>

      <div className="font-mono text-[11px] text-ink/55 tabular-nums">
        {issueNumber != null && (
          <>
            <span className="font-semibold text-ink/80">
              № {String(issueNumber).padStart(3, "0")}
            </span>
            <span className="mx-1.5 text-ink/25">·</span>
          </>
        )}
        <span>{dateInfo.ymd}</span>
        <span className="ms-1 text-ink/35">{dateInfo.weekday}</span>
      </div>

      <h4 className="font-display font-extrabold text-[15px] lg:text-[16px] text-ink leading-[1.4] line-clamp-2 group-hover:text-coral transition-colors">
        {daily.title}
      </h4>
    </button>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * بازنویسی components در ReactMarkdown
 *
 * کلیدی: جایگزینی استایل پیش‌فرض github-markdown.css تا متن با سبک Mailchimp-Freddie
 * هم‌سو باشد. همه عناصر از design tokens استفاده می‌کنند (font-display / font-sans /
 * font-mono / text-ink / coral / cream / butter）。
 * ──────────────────────────────────────────────────────────────────── */

/* توجه: چون نوع props زیرکامپوننت‌ها در react-markdown بسیار آزاد است، این‌جا برای پرکاربردترین عناصر
 * سفارشی‌سازی شده؛ عناصر فهرست‌نشده از استایل CSS سراسری daily-article استفاده می‌کنند. */
type MdProps = {
  children?: React.ReactNode;
  href?: string;
  src?: string;
  alt?: string;
  inline?: boolean;
  className?: string;
  node?: unknown;
};

const mdComponents = {
  /* h1 ← به‌ندرت استفاده می‌شود؛ برای عنوان درشت رزرو شده */
  h1: ({ children }: MdProps) => (
    <h2 className="font-display font-extrabold text-[26px] lg:text-[30px] text-ink leading-[1.2] mt-12 mb-5 tracking-[-0.01em]">
      {children}
    </h2>
  ),
  /* h2 ← عنوان بخش، با پیشوند dot به رنگ coral */
  h2: ({ children }: MdProps) => (
    <h3 className="font-display font-extrabold text-[20px] lg:text-[24px] text-ink leading-[1.25] mt-12 mb-5 tracking-[-0.01em]">
      <span className="inline-block w-2 h-2 rounded-full bg-coral me-3 align-middle -translate-y-1" />
      {children}
    </h3>
  ),
  /* h3 ← سطح سوم؛ رزرو */
  h3: ({ children }: MdProps) => (
    <h4 className="font-display font-extrabold text-[18px] lg:text-[20px] text-ink leading-[1.35] mt-10 mb-4 tracking-[-0.005em]">
      {children}
    </h4>
  ),
  /* ★ h4 ← گزارش روزانه"دسته‌بندی ستون"(نشانه راه کلیدی) ★
     در عمل markdown گزارش روزانه از #### برای دسته‌بندی ستون‌های بزرگ استفاده می‌کند ("پژوهش و روش" / "Agent و زنجیره ابزار" / "مدل و توانایی" و غیره).
     باید برجسته‌ترین نشانه بصری مقاله باشد و در متن غرق نشود.
     طراحی: فاصله بالا + eyebrow با § به رنگ coral + متن درشت display + زیرخط ضخیم ink. */
  h4: ({ children }: MdProps) => (
    <div className="mt-16 lg:mt-20 mb-7 first:mt-3">
      <div className="flex items-center gap-2.5 mb-3 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.3em] text-coral">
        <span className="text-[14px] leading-none">§</span>
        <span>Section · ستون این شماره</span>
        <span className="flex-1 border-t border-dotted border-ink/20" />
      </div>
      <h2 className="font-display font-extrabold text-[24px] lg:text-[28px] text-ink leading-[1.2] tracking-[-0.01em] pb-3 border-b-[3px] border-ink">
        {children}
      </h2>
    </div>
  ),
  /* ★ h5 ← گزارش روزانه"عنوان مورد خبری" ★
     markdown گزارش روزانه از ##### برای عنوان هر خبر استفاده می‌کند.
     یک درجه ضعیف‌تر از h4 (دسته‌بندی ستون)، اما برجسته‌تر از متن. */
  h5: ({ children }: MdProps) => (
    <h3 className="font-display font-extrabold text-[17px] lg:text-[19px] text-ink leading-[1.4] mt-9 mb-3 tracking-[-0.005em]">
      {children}
    </h3>
  ),
  /* h6 ← پشتیبان */
  h6: ({ children }: MdProps) => (
    <h4 className="font-display font-bold text-[15px] lg:text-[16px] text-ink-secondary leading-[1.45] mt-7 mb-2.5">
      {children}
    </h4>
  ),
  p: ({ children }: MdProps) => (
    <p className="font-sans text-[15.5px] lg:text-[16.5px] text-ink leading-[1.85] mb-5">
      {children}
    </p>
  ),
  a: ({ children, href }: MdProps) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-ink font-semibold underline decoration-coral decoration-2 underline-offset-[3px] hover:text-coral transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }: MdProps) => (
    <ul className="font-sans text-[15.5px] lg:text-[16.5px] text-ink leading-[1.85] mb-5 space-y-2 ps-0 list-none">
      {children}
    </ul>
  ),
  ol: ({ children }: MdProps) => (
    <ol className="font-sans text-[15.5px] lg:text-[16.5px] text-ink leading-[1.85] mb-5 space-y-2 ps-0 list-none counter-reset-[md-li]">
      {children}
    </ol>
  ),
  li: ({ children }: MdProps) => (
    <li className="relative ps-5 before:content-['—'] before:absolute before:start-0 before:top-0 before:text-coral before:font-bold">
      {children}
    </li>
  ),
  /* blockquote ← در گزارش روزانه معمولاً برای"لینک‌های مرتبط"بلوک پانویس استفاده می‌شود.
     italic استفاده نمی‌شود (کج کردن اجباری حروف غیرلاتین تار می‌شود)؛ با پس‌زمینه cream + نوار کناری coral + اندازه فونت کمی کوچک‌تر سلسله‌مراتب مشخص می‌شود. */
  blockquote: ({ children }: MdProps) => (
    <blockquote className="my-5 ps-4 pe-4 py-3 bg-cream/60 border-s-[3px] border-coral rounded-e-lg font-sans text-[13.5px] lg:text-[14px] text-ink-secondary leading-[1.7]">
      {children}
    </blockquote>
  ),
  code: ({ inline, children, className }: MdProps) => {
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 mx-0.5 bg-cream border border-ink/10 rounded font-mono text-[0.88em] text-ink-secondary">
          {children}
        </code>
      );
    }
    return (
      <code className={`${className || ""} font-mono text-[13px] leading-[1.7]`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: MdProps) => (
    <pre className="my-6 px-5 py-4 bg-cream border-2 border-ink rounded-xl shadow-stamp overflow-x-auto font-mono text-[13px] leading-[1.7] text-ink">
      {children}
    </pre>
  ),
  hr: () => (
    <div className="my-10 flex items-center gap-3" aria-hidden>
      <span className="flex-1 border-t border-ink/15" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/35">
        §
      </span>
      <span className="flex-1 border-t border-ink/15" />
    </div>
  ),
  img: ({ src, alt }: MdProps) => (
    <span className="block my-7">
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="block w-full h-auto rounded-2xl border-2 border-ink shadow-stamp"
      />
      {alt && (
        <span className="block text-center font-mono text-[11px] text-ink/55 mt-2.5">
          {alt}
        </span>
      )}
    </span>
  ),
  strong: ({ children }: MdProps) => (
    <strong className="font-bold text-ink">{children}</strong>
  ),
  em: ({ children }: MdProps) => (
    <em className="italic text-ink-secondary">{children}</em>
  ),
  table: ({ children }: MdProps) => (
    <div className="my-6 overflow-x-auto border-2 border-ink rounded-xl shadow-stamp">
      <table className="w-full font-sans text-[14px] border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: MdProps) => (
    <thead className="bg-cream border-b-2 border-ink">{children}</thead>
  ),
  th: ({ children }: MdProps) => (
    <th className="px-4 py-2.5 text-start font-mono font-semibold text-[12px] uppercase tracking-[0.08em] text-ink/75">
      {children}
    </th>
  ),
  td: ({ children }: MdProps) => (
    <td className="px-4 py-2.5 border-t border-ink/10 text-ink">{children}</td>
  ),
};

/* پشتیبان سراسری daily-article (caseهایی که components پوشش نداده‌اند) */
const articleStyles = `
  .daily-article > :first-child { margin-top: 0 !important; }
  .daily-article > :last-child { margin-bottom: 0 !important; }
  .daily-article ul ul, .daily-article ol ol,
  .daily-article ul ol, .daily-article ol ul {
    margin-top: 0.5rem;
    margin-bottom: 0;
    padding-left: 0;
  }
`;
