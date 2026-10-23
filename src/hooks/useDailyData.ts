/**
 * Hook سفارشی مدیریت داده گزارش روزانه
 * منطق دریافت داده فهرست و جزئیات گزارش روزانه را کپسوله می‌کند و وضعیت بارگذاری و خطا را مدیریت می‌کند
 */

import { useState, useEffect } from 'react';
import { DailyReport } from '../types/daily';
import { dailyApiUtils } from '../utils/dailyApi';
import toast from 'react-hot-toast';

export const useDailyList = () => {
  const [dailyList, setDailyList] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDailyList = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('شروع دریافت فهرست گزارش روزانه...');
        
        const data = await dailyApiUtils.fetchDailyList();
        console.log('داده گزارش روزانه دریافت شد:', data);
        
        setDailyList(data);
        // حذف پنجره اعلان موفقیت
        // toast.success('فهرست گزارش روزانه با موفقیت بارگذاری شد!');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'خطای ناشناخته';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Failed to load daily list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDailyList();
  }, []);

  return { dailyList, loading, error };
};

export const useDailyContent = (date: string) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    const loadDailyContent = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`شروع دریافت محتوای گزارش روزانه: ${date}...`);
        
        const content = await dailyApiUtils.fetchDailyContent(date);
        console.log(`محتوای گزارش روزانه دریافت شد ${date}:`, content.substring(0, 100) + '...');
        
        setContent(content);
        toast.success('محتوای گزارش روزانه با موفقیت بارگذاری شد!');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'خطای ناشناخته';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error(`Failed to load daily content for ${date}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadDailyContent();
  }, [date]);

  return { content, loading, error };
};
