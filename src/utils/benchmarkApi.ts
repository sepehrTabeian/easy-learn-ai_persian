/**
 * ماژول ابزار API بنچمارک AI
 * مسئول بارگذاری و پردازش داده بنچمارک
 */

import { Benchmark } from "../types/benchmark";
import benchmarkData from "./bench/bentch.json";

export const benchmarkApiUtils = {
  /**
   * دریافت فهرست بنچمارک‌ها
   */
  async fetchBenchmarkList(): Promise<Benchmark[]> {
    try {
      return benchmarkData as Benchmark[];
    } catch (error) {
      console.error("Error fetching benchmark list:", error);
      throw new Error("دریافت فهرست بنچمارک‌ها ناموفق بود، لطفاً بعداً دوباره امتحان کنید");
    }
  },

  /**
   * دریافت همه برچسب‌های نوع
   */
  getAllTypes(benchmarks: Benchmark[]): string[] {
    const types = new Set<string>();
    benchmarks.forEach((b) => {
      b.type.forEach((t) => types.add(t));
    });
    return Array.from(types).sort();
  },

  /**
   * دریافت همه سال‌ها
   */
  getAllYears(benchmarks: Benchmark[]): string[] {
    const years = new Set<string>();
    benchmarks.forEach((b) => {
      if (b.year && b.year !== "n/a") {
        years.add(String(b.year));
      }
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  },

  /**
   * دریافت همه مجوزها
   */
  getAllLicenses(benchmarks: Benchmark[]): string[] {
    const licenses = new Set<string>();
    benchmarks.forEach((b) => {
      if (b.license && b.license !== "see dataset page") {
        licenses.add(b.license);
      }
    });
    return Array.from(licenses).sort();
  },
};
