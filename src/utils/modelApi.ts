/**
 * ماژول ابزار درخواست API مدل AI
 * مسئول بارگذاری و پردازش داده مدل
 */

import { AIModel } from "../types/model";

/**
 * همه فایل‌های JSON تأمین‌کنندگان در پوشه src/data/models/ را خودکار بارگذاری و ادغام می‌کند.
 * برای افزودن تأمین‌کننده جدید فقط یک <provider>فایل .json در این پوشه اضافه کنید، نیازی به تغییر این کد نیست.
 */
function loadAllModels(): AIModel[] {
  const context = import.meta.webpackContext("../data/models", {
    recursive: false,
    regExp: /\.json$/,
  });

  const models: AIModel[] = [];
  for (const key of context.keys()) {
    const mod = context(key) as AIModel[] | { default: AIModel[] };
    const list = Array.isArray(mod) ? mod : mod.default;
    models.push(...list);
  }
  return models;
}

export const modelApiUtils = {
  /**
   * دریافت فهرست مدل‌ها
   */
  async fetchModelList(): Promise<AIModel[]> {
    try {
      return loadAllModels();
    } catch (error) {
      console.error("Error fetching model list:", error);
      throw new Error("دریافت فهرست مدل‌ها ناموفق بود، لطفاً بعداً دوباره امتحان کنید");
    }
  },
};
