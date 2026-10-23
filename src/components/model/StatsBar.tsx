/**
 * نوار آمار کتابخانه مدل · سبک Mailchimp-Freddie (v2)
 *
 * بازسازی v2: مسئولیت"نمایش داده‌های اصلی"را که Hero واگذار کرده بر عهده می‌گیرد
 *   - نمایش اعداد چندبعدی: N مدل / M شرکت / X برچسب
 *   - هنگام اعمال فیلتر، با تأکید coral درج می‌شود"نتیجه فیلتر"مورد
 *   - کارت stamp با پس‌زمینه cream + عدد درشت display + برچسب کوچک mono
 */

import React from "react";
import { Database, Filter as FilterIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
}

interface StatsBarProps {
  /** تعداد کل (سازگار با فراخوانی‌های قدیمی) */
  totalCount: number;
  /** تعداد پس از فیلتر */
  filteredCount: number;
  /** آیا فیلتر فعال است */
  hasActiveFilters: boolean;
  /** آمار ابعاد اضافی (مثل تعداد شرکت / تعداد برچسب)، اختیاری */
  extras?: StatItem[];
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalCount,
  filteredCount,
  hasActiveFilters,
  extras = [],
}) => {
  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-6 lg:px-8 py-5">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {/* هسته: تعداد کل */}
        <StatItemView
          icon={<Database className="w-4 h-4" strokeWidth={2.5} />}
          label="مدل ثبت‌شده"
          value={totalCount}
          primary
        />

        {/* ابعاد اضافی */}
        {extras.map((item) => (
          <React.Fragment key={item.label}>
            <Divider />
            <StatItemView label={item.label} value={item.value} />
          </React.Fragment>
        ))}

        {/* نتیجه فیلتر (فقط در حالت فعال نمایش داده می‌شود، با تأکید coral) */}
        {hasActiveFilters && (
          <>
            <Divider />
            <StatItemView
              icon={<FilterIcon className="w-4 h-4" strokeWidth={2.5} />}
              label="نتیجه فیلتر"
              value={filteredCount}
              accent
            />
          </>
        )}

        {/* راست: وضعیت به‌روزرسانی (به منتهی‌الیه راست رانده می‌شود) */}
        <div className="ms-auto inline-flex items-baseline gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
            Updated
          </span>
          <span className="font-display font-extrabold text-[14px] text-ink">
            به‌روزرسانی هفتگی
          </span>
        </div>
      </div>
    </div>
  );
};

const Divider: React.FC = () => (
  <span
    className="w-px h-9 bg-ink/12 hidden md:inline-block"
    aria-hidden
  />
);

const StatItemView: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value: number | string;
  primary?: boolean;
  accent?: boolean;
}> = ({ icon, label, value, primary, accent }) => (
  <div className="inline-flex items-center gap-3">
    {icon && (
      <span className={accent ? "text-coral" : "text-ink/60"}>{icon}</span>
    )}
    <div className="inline-flex flex-col leading-tight">
      <span
        className={`font-display font-extrabold leading-none ${
          accent
            ? "text-coral text-[24px] lg:text-[28px]"
            : primary
              ? "text-ink text-[26px] lg:text-[32px]"
              : "text-ink text-[22px] lg:text-[26px]"
        }`}
      >
        {value}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
        {label}
      </span>
    </div>
  </div>
);
