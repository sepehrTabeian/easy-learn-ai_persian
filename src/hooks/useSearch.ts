/**
 * Hook سفارشی قابلیت جستجو
 * قابلیت جستجوی گزارش روزانه را فراهم می‌کند، با پشتیبانی از جستجوی عنوان و برچسب
 * پشتیبانی از جستجو روی داده‌های از قبل فیلترشده
 */

import { useState, useMemo } from 'react';
import { DailyReport } from '../types/daily';

export const useSearch = (dailyList: DailyReport[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) {
      return dailyList;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return dailyList.filter(item => 
      item.title.toLowerCase().includes(lowerSearchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }, [dailyList, searchTerm]);

  const hasSearch = Boolean(searchTerm.trim());

  return {
    searchTerm,
    setSearchTerm,
    filteredList,
    hasSearch
  };
};
