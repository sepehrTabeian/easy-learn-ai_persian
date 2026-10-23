/**
 * فیلتر برچسب گزارش روزانه · سبک stamp در Mailchimp-Freddie
 *
 * نکات طراحی:
 * - دکمه فعال‌ساز: شکل capsule، حالت فعال با پس‌زمینه توپر ink؛ غیرفعال با پس‌زمینه سفید.
 * - ۳۲۰ برچسب زیاد است، پنل کشویی جستجوی داخلی + فهرست اسکرول‌شونده دارد.
 * - پنل با createPortal رندر می‌شود تا با overflow / z-index کانتینر والد بریده نشود.
 * - پنل سبک stamp دارد: خط ink + سایه قوی + سربرگ cream.
 */

import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Tag, ChevronDown, Search, Check, X } from "lucide-react";

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  allTags,
  selectedTags,
  onTagToggle,
  onClearTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredTags = useMemo(() => {
    if (!searchTerm) return allTags;
    const q = searchTerm.toLowerCase();
    return allTags.filter((t) => t.toLowerCase().includes(q));
  }, [allTags, searchTerm]);

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const panelWidth = 320;
    /* پنل از position: fixed استفاده می‌کند، top/left باید مختصات viewport باشند؛
       نسخه‌های اولیه window.scrollY را اضافه کرده بودند و پس از اسکرول صفحه، پنل خارج از صفحه محاسبه می‌شد ← به نظر می‌رسید"واکنشی ندارد"。 */
    const left = Math.max(
      8,
      Math.min(rect.right - panelWidth, window.innerWidth - panelWidth - 8),
    );
    setPos({
      top: rect.bottom + 10,
      left,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      )
        return;
      setIsOpen(false);
      setSearchTerm("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  if (allTags.length === 0) return null;

  const hasActive = selectedTags.length > 0;

  const handleToggle = () => {
    if (!isOpen) {
      updatePosition();
      setSearchTerm("");
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 ps-4 pe-3 py-2.5 rounded-full border-2 border-ink shadow-stamp font-sans font-semibold text-[13px] transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] ${
          hasActive ? "bg-ink text-cream" : "bg-white text-ink"
        }`}
      >
        <Tag className="w-4 h-4" strokeWidth={2.5} />
        <span>فیلتر برچسب</span>
        {hasActive && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-butter text-ink border-2 border-ink rounded-full font-mono font-bold text-[11px]">
            {selectedTags.length}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2.5}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed bg-white border-2 border-ink rounded-2xl shadow-stamp-xl overflow-hidden w-[320px] flex flex-col"
            style={{
              top: pos.top,
              left: pos.left,
              zIndex: 999999,
              maxHeight: "min(420px, calc(100vh - 100px))",
            }}
          >
            {/* سربرگ —— پس‌زمینه cream */}
            <div className="px-4 py-3 border-b-2 border-ink/10 bg-cream">
              <div className="flex items-center justify-between mb-2.5">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/65">
                  § انتخاب برچسب
                </div>
                {hasActive && (
                  <button
                    onClick={() => {
                      onClearTags();
                    }}
                    className="font-sans text-[11px] font-semibold text-ink-tertiary hover:text-ink underline underline-offset-2"
                  >
                    پاک کردن همه
                  </button>
                )}
              </div>
              <div className="relative">
                <Search
                  className="absolute start-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-ink/55"
                  strokeWidth={2.5}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="جستجوی برچسب…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full ps-9 pe-3 py-2 bg-white border-2 border-ink/15 rounded-full font-sans text-[13px] text-ink placeholder:text-ink/40 outline-none focus:border-ink transition-colors"
                />
              </div>
            </div>

            {/* فهرست برچسب‌ها */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredTags.length === 0 ? (
                <div className="px-4 py-8 text-center font-sans text-[13px] text-ink/55">
                  {searchTerm ? "برچسب مطابقی پیدا نشد" : "هنوز برچسبی نیست"}
                </div>
              ) : (
                filteredTags.map((tag) => {
                  const selected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => onTagToggle(tag)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-start font-sans text-[13px] transition-colors ${
                        selected
                          ? "bg-coral text-white font-semibold"
                          : "text-ink hover:bg-cream"
                      }`}
                    >
                      <span className="truncate pe-2">{tag}</span>
                      {selected && (
                        <Check
                          className="w-4 h-4 flex-shrink-0"
                          strokeWidth={3}
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* پایین */}
            <div className="px-4 py-3 border-t-2 border-ink/10 bg-cream flex items-center justify-between">
              <span className="font-mono text-[11px] text-ink/55">
                {filteredTags.length} / {allTags.length}
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="inline-flex items-center gap-1 px-4 py-1.5 bg-ink text-cream border-2 border-ink rounded-full font-sans font-bold text-[12px] shadow-[3px_3px_0_0_#241C15] transition-all duration-250 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:4px_4px_0_0_#241C15]"
              >
                انجام شد
                <X className="w-3 h-3" strokeWidth={3} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
