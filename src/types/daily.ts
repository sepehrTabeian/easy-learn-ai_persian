/**
 * تعریف نوع‌های مرتبط با گزارش روزانه AI
 */

export interface DailyReport {
  date: string;
  title: string;
  tags: string[];
}

export interface DailyListResponse extends Array<DailyReport> {}
