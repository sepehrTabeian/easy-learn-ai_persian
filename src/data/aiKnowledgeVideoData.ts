/**
 * دانش بصری AI · داده توضیح ویدئویی
 *
 * وب‌سایت‌های PPT همراه ویدئوهای Bilibili. کاملاً مستقل از پیکربندی توضیح مفاهیم، نگاه کنید به aiKnowledgeConceptData.ts
 *
 * فیلدهای در انتظار تکمیل:
 *   - bilibiliUrl    آدرس ویدئو در Bilibili
 *   - videoCoverUrl  تصویر جلد ویدئو (اگر خالی باشد صفحه فهرست جای‌نگهدار نمایش می‌دهد)
 *   - duration       نشان مدت زمان، مثل "23:45"
 */

import { AIKnowledgeVideoItem } from "../types";

export const aiKnowledgeVideoData: AIKnowledgeVideoItem[] = [
  {
    id: "harness",
    title: "درک آسان Harness",
    description: "Agent شما را برای کار پایدارتر و مداوم‌تر به حرکت درمی‌آورد.",
    category: "Agent",
    imageUrl: "/imgs/harness.png",
    htmlUrl: "/harness/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Zk9FBwELs",
    videoCoverUrl: "/imgs/harness.png",
    duration: "18:31",
  },
  {
    id: "evaluation",
    title: "درک آسان ارزیابی مدل",
    description: "ارزیابی مدل یکی از مهم‌ترین و ضروری‌ترین فرایندهای مدل‌های بزرگ است.",
    category: "ارزیابی مدل",
    imageUrl: "/imgs/evaluation.png",
    htmlUrl: "/evaluation/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1HnB7BjEAN/",
    videoCoverUrl: "/imgs/evaluation.png",
    duration: "40:11",
  },
  {
    id: "skills",
    title: "درک آسان Skills",
    description:
      "استاندارد گسترش توانایی‌های بیرونی عمومی و فرایندهای Agent.",
    category: "Agent",
    imageUrl: "/imgs/skill.png",
    htmlUrl: "/skills/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1GXzaByEEo/",
    videoCoverUrl: "/imgs/skill.png",
    duration: "13:31",
  },
  {
    id: "prompt-cache",
    title: "درک آسان Prompt Cache",
    description:
      "با کش کردن نتایج محاسبه میانی prompt، هزینه استنتاج و تأخیر پاسخ مدل بزرگ را کاهش می‌دهد.",
    category: "پرامپت‌ها",
    imageUrl: "/imgs/prompt-cache.png",
    htmlUrl: "/prompt-cache/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1dRRyBREPM/",
    videoCoverUrl: "/imgs/prompt-cache.png",
    duration: "12:18",
  },
];
