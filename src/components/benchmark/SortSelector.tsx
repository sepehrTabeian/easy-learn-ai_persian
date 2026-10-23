/**
 * کامپوننت انتخابگر مرتب‌سازی بنچمارک
 */

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { BenchmarkSortOption } from "../../types/benchmark";

interface SortSelectorProps {
  value: BenchmarkSortOption;
  onChange: (value: BenchmarkSortOption) => void;
}

const sortOptions: { value: BenchmarkSortOption; label: string }[] = [
  { value: "year-desc", label: "سال (جدید ← قدیم)" },
  { value: "year-asc", label: "سال (قدیم ← جدید)" },
  { value: "examples-desc", label: "تعداد نمونه (زیاد ← کم)" },
  { value: "examples-asc", label: "تعداد نمونه (کم ← زیاد)" },
  { value: "name-asc", label: "نام (A→Z)" },
  { value: "name-desc", label: "نام (Z→A)" },
];

export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 ps-4 pe-3 py-2.5 bg-white border-2 border-ink rounded-full shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
        <ArrowUpDown className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as BenchmarkSortOption)}
          className="appearance-none bg-transparent font-sans text-[13px] font-semibold text-ink focus:outline-none cursor-pointer pe-2"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
