/**
 * مورد گزارش روزانه · "ردیف فهرست Archive"
 *
 * استعاره: مجله کاغذی / خبرنامه دیجیتال"فهرست شماره‌های گذشته"
 *   ─ نه کارت stamp، نه بلوک بزرگ SaaS
 *   ─ یک ردیف است: №شماره / تاریخ / عنوان / برچسب / arrow
 *   ─ فقط یک خط افقی 1px با ink/10 در پایین، در hover کل ردیف کمی رنگ cream می‌گیرد
 *
 * نکات کلیدی بصری:
 *   ─ وزن بصری بسیار کم (تا کاربر بتواند"روان"بیش از ۱۱۷ شماره را مرور کند)
 *   ─ عنوان با display و weight 800 حس نشریه را می‌سازد
 *   ─ اطلاعات متا با Geist Mono، تا"صفحه‌آرایی فهرست"یک نشریه چاپی ساخته شود
 *   ─ زنجیره برچسب: متن درون‌خطی جداشده با dot (نه chip)، بیشتر شبیه برچسب ستون روزنامه
 */

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { DailyReport } from "../../types/daily";

interface DailyCardProps {
  daily: DailyReport;
  issueNumber?: number;
  onClick: (date: string) => void;
}

const WEEKDAYS = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"] as const;

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) throw new Error("invalid");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const w = `${WEEKDAYS[d.getDay()]}`;
    return { mmdd: `${mm}—${dd}`, weekday: w };
  } catch {
    return { mmdd: "—", weekday: "—" };
  }
};

export const DailyCard: React.FC<DailyCardProps> = ({
  daily,
  issueNumber,
  onClick,
}) => {
  const { mmdd, weekday } = formatDate(daily.date);
  const tagsToShow = (daily.tags || []).slice(0, 3);
  const overflowCount = (daily.tags?.length || 0) - tagsToShow.length;

  return (
    <button
      type="button"
      onClick={() => onClick(daily.date)}
      className="group w-full grid items-center gap-x-5 lg:gap-x-7 py-4 lg:py-5 px-3 lg:px-4 -mx-3 lg:-mx-4 rounded-md border-b border-ink/10 transition-colors duration-200 hover:bg-cream/50 text-start"
      style={{
        gridTemplateColumns:
          "minmax(48px, auto) minmax(86px, auto) minmax(0, 1fr) auto auto",
      }}
    >
      {/* شماره № */}
      <span className="font-mono text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.06em] text-ink/40 tabular-nums">
        {issueNumber != null
          ? `№ ${String(issueNumber).padStart(3, "0")}`
          : "— —"}
      </span>

      {/* تاریخ + روز هفته —— کمی روشن‌تر از شماره №، به‌عنوان"نهاد فرعی" */}
      <span className="font-mono text-[12px] lg:text-[13px] font-semibold text-ink/85 tabular-nums whitespace-nowrap">
        {mmdd}
        <span className="font-normal text-ink/45 ms-1.5">{weekday}</span>
      </span>

      {/* عنوان */}
      <h3 className="font-display font-extrabold text-[15px] lg:text-[17px] text-ink leading-[1.45] line-clamp-2 group-hover:text-coral transition-colors min-w-0">
        {daily.title}
      </h3>

      {/* زنجیره برچسب —— متن درون‌خطی، جداشده با dot، hidden on mobile */}
      {tagsToShow.length > 0 && (
        <div className="hidden lg:flex items-center font-mono text-[11px] text-ink/45 whitespace-nowrap">
          {tagsToShow.map((tag, i) => (
            <span key={tag} className="inline-flex items-center">
              {i > 0 && <span className="mx-1.5 text-ink/25">·</span>}
              <span className="max-w-[120px] truncate">{tag}</span>
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="ms-1.5 text-ink/30">+{overflowCount}</span>
          )}
        </div>
      )}

      {/* arrow */}
      <span
        className="inline-flex items-center justify-center w-6 h-6 text-ink/35 transition-all duration-200 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      >
        <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2} />
      </span>
    </button>
  );
};
