/**
 * دانش بصری AI · صفحه جزئیات (قاب chrome با cream · جمع/باز در یک موقعیت)
 *
 * نکات طراحی:
 *   ─ نوار chrome: پس‌زمینه کرم cream + خط جداکننده زیرین 2px با ink (زبان stamp یکپارچه در کل سایت، بدون ناهماهنگی)
 *   ─ دکمه جمع / باز همیشه در"همان موقعیت بالا-چپ"：
 *     • حالت باز: کارت سه‌بخشی درون chrome در چپ = [butter E | ← متن بازگشت | ⌃ جمع کردن]
 *     • حالت جمع: کپسول دوبخشی شناور در همان موقعیت = [butter E | ⌄ باز کردن]
 *     • تغییر بین دو حالت = تغییر شکل در همان موقعیت، حافظه عضلانی کاربر یکسان می‌ماند
 *   ─ حالت جمع فقط یک کپسول دارد (دکمه پنجره جدید دیگر نگه داشته نمی‌شود، طبق درخواست کاربر بسیار مینیمال)
 *   ─ "باز کردن در پنجره جدید"فقط در سمت راست chrome در حالت باز ظاهر می‌شود (در صورت نیاز باز کنید)
 *   ─ کلید Esc همیشه با یک ضربه به فهرست دانش بصری برمی‌گردد
 *   ─ حالت 404 / خالی با کارت stamp سبک Mailchimp-Freddie
 *
 * توضیح حالت ویدئو:
 *   توضیح ویدئویی (type === "video") جلد Bilibili + دکمه پرش فقط روی «کارت فهرست» ظاهر می‌شوند،
 *   خود صفحه جزئیات خواندن غوطه‌ور PPT را حفظ می‌کند و دیگر عنصر ویدئو درج نمی‌کند —— کاربر وقتی وارد صفحه جزئیات می‌شود
 *   می‌خواهد با تمرکز PPT را ببیند و نیازی نیست با ورودی ویدئو مزاحمش شویم.
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { AIKnowledgeItem } from "../types";
import { findKnowledgeItemById } from "../data/knowledgeLookup";

const AIKnowledgeDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* اولویت با item در location.state است، اگر نبود با id جستجو می‌شود */
  let item: AIKnowledgeItem | undefined = location.state?.item;
  if (!item && id) {
    item = findKnowledgeItemById(id);
  }

  /* کلید Esc بازگشت به فهرست */
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/ai-knowledge");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [item, navigate]);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 404 · محتوا وجود ندارد
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (!item) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-10 py-10 text-center max-w-md">
          <AlertCircle
            className="w-10 h-10 text-coral mx-auto mb-4"
            strokeWidth={2.5}
          />
          <div className="font-display font-extrabold text-[22px] text-ink mb-2">
            محتوا وجود ندارد
          </div>
          <p className="font-sans text-[13px] text-ink/55 mb-6">
            این محتوا ممکن است حذف شده یا لینک آن منقضی شده باشد
          </p>
          <button
            onClick={() => navigate("/ai-knowledge")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-ink text-cream border-2 border-ink rounded-2xl font-sans font-bold text-[13px] shadow-stamp transition-all duration-200 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            بازگشت به دانش بصری
          </button>
        </div>
      </div>
    );
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * حالت خالی · محتوا در حال آماده‌سازی است (بدون htmlUrl)
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (!item.htmlUrl) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-10 py-10 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-butter border-2 border-ink rounded-full">
            <BookOpen className="w-6 h-6 text-ink" strokeWidth={2.2} />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral mb-2">
            COMING SOON
          </div>
          <div className="font-display font-extrabold text-[22px] text-ink mb-3">
            {item.title}
          </div>
          <p className="font-sans text-[13px] text-ink/65 mb-6 leading-relaxed">
            {item.description}
          </p>
          <button
            onClick={() => navigate("/ai-knowledge")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-ink border-2 border-ink rounded-2xl font-sans font-bold text-[13px] shadow-stamp transition-all duration-200 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] hover:bg-butter"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            بازگشت به دانش بصری
          </button>
        </div>
      </div>
    );
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * عادی · iframe + نوار Chrome جمع‌شدنی
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  return (
    <div className="fixed inset-0 z-[999] bg-white overflow-hidden flex flex-col">
      {/* ━━━ ناحیه Chrome بالا ━━━ */}
      <div
        className={`flex-shrink-0 bg-cream overflow-hidden transition-[height,border-bottom-width] duration-300 ease-spring ${
          isCollapsed ? "h-0 border-b-0" : "h-14 border-b-2 border-ink"
        }`}
        aria-hidden={isCollapsed}
      >
        <div className="h-14 flex items-center gap-3 px-3 lg:px-4">
          {/* ━━ ناحیه کنترل اصلی چپ (کارت stamp سه‌بخشی) ━━
              موقعیت = همان موقعیتی که کپسول E پس از جمع شدن ظاهر می‌شود = بالا-چپ */}
          <div className="flex items-stretch bg-white border-2 border-ink rounded-xl shadow-stamp overflow-hidden min-w-0 max-w-[min(calc(100%-160px),400px)]">
            {/* بخش ۱+۲: butter E + متن بازگشت (با هم به‌عنوان دکمه بازگشت) */}
            <button
              onClick={() => navigate("/ai-knowledge")}
              aria-label="بازگشت به دانش بصری AI"
              className="group flex items-stretch hover:bg-cream/60 transition-colors min-w-0"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-9 bg-butter border-e-2 border-ink">
                <span className="font-sans font-extrabold text-[15px] text-ink leading-none">
                  E
                </span>
              </div>
              <div className="flex flex-col items-start justify-center px-3 py-1 min-w-0">
                <span className="inline-flex items-center gap-1 font-sans font-bold text-[12px] text-ink leading-tight group-hover:text-coral transition-colors">
                  <ArrowLeft
                    className="w-3 h-3 -ms-0.5"
                    strokeWidth={2.5}
                  />
                  بازگشت به Easy AI · دانش بصری AI
                </span>
                <span className="font-mono text-[10px] text-ink/55 leading-tight mt-0.5 truncate max-w-full">
                  {item.title}
                </span>
              </div>
            </button>

            {/* بخش ۳: دکمه جمع کردن (کانتینر stamp مشترک با دکمه بازگشت، به‌طور فیزیکی چسبیده در بالا-چپ) */}
            <button
              onClick={() => setIsCollapsed(true)}
              title="جمع کردن نوار ناوبری (برای باز کردن دوباره روی کپسول E بالا-چپ کلیک کنید)"
              aria-label="جمع کردن نوار ناوبری"
              className="flex items-center justify-center px-2.5 border-s-2 border-ink hover:bg-cream/60 text-ink/60 hover:text-ink transition-colors"
            >
              <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1" />

          {/* راست: دکمه باز کردن در پنجره جدید */}
          <a
            href={item.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="باز کردن در پنجره جدید (خواندن تمام‌صفحه بدون قاب)"
            className="group/btn inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-ink border-2 border-ink rounded-xl font-sans font-bold text-[12px] shadow-[2px_2px_0_0_#241C15] transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15] hover:bg-butter flex-shrink-0"
          >
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-[1px] group-hover/btn:-translate-y-[1px]"
              strokeWidth={2.5}
            />
            <span className="hidden sm:inline">باز کردن در پنجره جدید</span>
          </a>
        </div>
      </div>

      {/* ━━━ کانتینر iframe (ارتفاع باقی‌مانده تطبیقی) ━━━ */}
      <div className="flex-1 relative">
        {/* کپسول شناور در حالت جمع (موقعیت = موقعیت شروع دکمه ترکیبی درون chrome در حالت باز) */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            aria-label="باز کردن نوار ناوبری"
            title="باز کردن ناوبری · Easy AI"
            className="group fixed top-3 start-3 z-[1001] flex items-stretch bg-white border-2 border-ink rounded-xl shadow-stamp overflow-hidden transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:5px_5px_0_0_#241C15]"
          >
            {/* چپ: لوگوی E با butter (لنگر برند، کاملاً هم‌شکل حالت باز) */}
            <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-e-2 border-ink">
              <span className="font-sans font-extrabold text-[15px] text-ink leading-none">
                E
              </span>
            </div>
            {/* راست: آیکون باز کردن */}
            <div className="flex items-center justify-center w-9 h-9 text-ink/70 group-hover:text-ink group-hover:bg-cream/60 transition-colors">
              <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </button>
        )}

        {/* حالت Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/95 backdrop-blur z-[1000]">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-8 py-6 text-center min-w-[260px]">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
              <div className="font-display font-extrabold text-[16px] text-ink mb-1">
                در حال باز کردن محتوا
              </div>
              <div className="font-mono text-[11px] text-ink/55 truncate max-w-[240px] mx-auto">
                {item.title}
              </div>
            </div>
          </div>
        )}

        <iframe
          src={item.htmlUrl}
          className="w-full h-full block border-0"
          title={item.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default AIKnowledgeDetail;
