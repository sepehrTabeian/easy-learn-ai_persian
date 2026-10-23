/**
 * ماژول ابزار درخواست API گزارش روزانه AI
 * مسئول تعامل داده با سرور CDN، شامل دریافت فهرست گزارش‌های روزانه و محتوای هر گزارش
 */

import { DailyListResponse } from "../types/daily";
import dailyData from "./dailyData.json";

export const dailyApiUtils = {
  // دریافت فهرست گزارش‌های روزانه
  async fetchDailyList(): Promise<DailyListResponse> {
    try {
      // const response = await fetch("../../public/data/daily/home.json", {
      //   method: "GET",
      //   mode: "cors",
      //   headers: {
      //     Accept: "application/json",
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error(
      //     `HTTP error! status: ${response.status} - ${response.statusText}`
      //   );
      // }

      // const data = await response.json();
      // console.log("Successfully fetched daily list:", data);
      return dailyData;
    } catch (error) {
      console.error("Error fetching daily list:", error);

      // ارائه اطلاعات خطای دقیق‌تر
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("اتصال شبکه ناموفق بود، لطفاً وضعیت شبکه را بررسی کنید یا بعداً دوباره امتحان کنید");
      } else if (error instanceof Error && error.message.includes("CORS")) {
        throw new Error("دسترسی بین‌دامنه‌ای مسدود شد، لطفاً با مدیر برای پیکربندی سرور تماس بگیرید");
      } else if (
        error instanceof Error &&
        error.message.includes("HTTP error")
      ) {
        throw new Error(`خطای پاسخ سرور: ${error.message}`);
      } else {
        throw new Error("دریافت فهرست گزارش‌های روزانه ناموفق بود، لطفاً بعداً دوباره امتحان کنید");
      }
    }
  },

  // دریافت محتوای یک گزارش روزانه
  async fetchDailyContent(date: string): Promise<string> {
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/ConardLi/easy-learn-ai@main/data/daily/md/${date}.md`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "text/plain",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }

      const content = await response.text();
      console.log(
        `Successfully fetched content for ${date}:`,
        content.substring(0, 100) + "..."
      );
      return content;
    } catch (error) {
      console.error(`Error fetching daily content for ${date}:`, error);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("اتصال شبکه ناموفق بود، لطفاً وضعیت شبکه را بررسی کنید یا بعداً دوباره امتحان کنید");
      } else if (
        error instanceof Error &&
        error.message.includes("HTTP error")
      ) {
        throw new Error(`خطای پاسخ سرور: ${error.message}`);
      } else {
        throw new Error("دریافت محتوای گزارش روزانه ناموفق بود، لطفاً بعداً دوباره امتحان کنید");
      }
    }
  },
};
