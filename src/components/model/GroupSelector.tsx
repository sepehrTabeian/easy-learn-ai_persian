/**
 * کامپوننت انتخابگر گروه‌بندی مدل
 */

import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { GroupByOption } from '../../types/model';

interface GroupSelectorProps {
  value: GroupByOption;
  onChange: (value: GroupByOption) => void;
}

const groupOptions: { value: GroupByOption; label: string }[] = [
  { value: 'none', label: 'بدون گروه‌بندی' },
  { value: 'company', label: 'گروه‌بندی بر اساس شرکت' },
  { value: 'openSourceStatus', label: 'گروه‌بندی بر اساس وضعیت متن‌باز' },
  { value: 'tag', label: 'گروه‌بندی بر اساس برچسب' },
];

export const GroupSelector: React.FC<GroupSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 ps-4 pe-3 py-2.5 bg-white border-2 border-ink rounded-full shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
        <LayoutGrid className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as GroupByOption)}
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
