/**
 * Hook سفارشی قابلیت فیلتر برچسب
 * قابلیت فیلتر برچسب را فراهم می‌کند، با پشتیبانی از انتخاب چند برچسب
 */

import { useState, useMemo } from 'react';
import { DailyReport } from '../types/daily';

export const useTagFilter = (dailyList: DailyReport[]) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // دریافت همه برچسب‌های موجود (حذف تکراری و مرتب‌سازی)
  const allTags = useMemo(() => {
    const tagMap = new Map<string, string>();
    dailyList.forEach(item => {
      item.tags.forEach(tag => {
        const trimmedTag = tag.trim();
        if (trimmedTag !== '') {
          // حذف تکراری با key استانداردشده (حذف فاصله، تبدیل به حروف کوچک)
          const normalizedKey = trimmedTag.replace(/\s+/g, '').toLowerCase();
          // اگر این برچسب هنوز نیست، یا برچسب فعلی استانداردتر است (فاصله اضافه ندارد)، از برچسب فعلی استفاده می‌شود
          if (!tagMap.has(normalizedKey) || trimmedTag.length < tagMap.get(normalizedKey)!.length) {
            tagMap.set(normalizedKey, trimmedTag);
          }
        }
      });
    });
    return Array.from(tagMap.values()).sort();
  }, [dailyList]);

  // فیلتر گزارش‌های روزانه بر اساس برچسب‌های انتخاب‌شده
  const filteredByTags = useMemo(() => {
    if (selectedTags.length === 0) {
      return dailyList;
    }

    return dailyList.filter(item => 
      selectedTags.some(selectedTag => 
        item.tags.includes(selectedTag)
      )
    );
  }, [dailyList, selectedTags]);

  // افزودن برچسب به فهرست فیلتر
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  // حذف برچسب از فهرست فیلتر
  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  // تغییر وضعیت انتخاب برچسب
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

  // پاک کردن همه برچسب‌های انتخاب‌شده
  const clearTags = () => {
    setSelectedTags([]);
  };

  const hasTagFilter = selectedTags.length > 0;

  return {
    selectedTags,
    allTags,
    filteredByTags,
    hasTagFilter,
    addTag,
    removeTag,
    toggleTag,
    clearTags,
    setSelectedTags
  };
};