/**
 * انتخابگر گروه‌بندی بنچمارک · سبک Mailchimp-Freddie
 * به‌طور پیش‌فرض بر اساس سال (جدید ← قدیم) گروه‌بندی می‌شود، قابل تغییر به بدون گروه‌بندی
 */

import React from "react";
import { LayoutGrid } from "lucide-react";

export type BenchmarkGroupBy = "none" | "year" | "type";

interface GroupSelectorProps {
  value: BenchmarkGroupBy;
  onChange: (value: BenchmarkGroupBy) => void;
}

const groupOptions: { value: BenchmarkGroupBy; label: string }[] = [
  { value: "year", label: "گروه‌بندی بر اساس سال" },
  { value: "type", label: "گروه‌بندی بر اساس نوع" },
  { value: "none", label: "بدون گروه‌بندی" },
];

export const GroupSelector: React.FC<GroupSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 ps-4 pe-3 py-2.5 bg-white border-2 border-ink rounded-full shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
        <LayoutGrid className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BenchmarkGroupBy)}
          className="appearance-none bg-transparent font-sans text-[13px] font-semibold text-ink focus:outline-none cursor-pointer pe-2"
        >
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
