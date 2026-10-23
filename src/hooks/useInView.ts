/**
 * useInView
 * - بررسی این‌که آیا عنصر وارد viewport شده است
 * - عمدتاً برای"فقط با اسکرول تا این‌جا اجرا شود"انیمیشن‌های ورود (CTAScene / ManifestoScene و غیره)
 *
 * Usage:
 *   const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
 *   return <div ref={ref}>{inView && <AnimatedContent />}</div>;
 *
 * Options:
 *   - threshold: آستانه نسبت دیده‌شدن عنصر (۰ تا ۱)، پیش‌فرض ۰٫۲
 *   - rootMargin: حاشیه برای اجرای زودتر/دیرتر، پیش‌فرض "0px"
 *   - once: آیا فقط یک بار اجرا شود (مناسب انیمیشن ورود)، پیش‌فرض true
 */

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {},
): [RefObject<T>, boolean] {
  const { threshold = 0.2, rootMargin = "0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // کاهش سطح برای SSR / مرورگرهای قدیمی: مستقیم دیده‌شده فرض می‌شود تا انیمیشن هرگز بی‌اجرا نماند
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
