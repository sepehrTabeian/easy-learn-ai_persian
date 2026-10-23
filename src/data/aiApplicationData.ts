/**
 * داده مجموعه آثار · Works
 *
 * ─────────────────────────────────────────────────────────────
 * مرجع سریع فیلدها (نوع‌های کامل در src/types/index.ts)
 * ─────────────────────────────────────────────────────────────
 * id          شناسه پایدار (برای URL و anchor)
 * title       نام اثر
 * description معرفی یک‌جمله‌ای (در کارت grid دو خط نمایش داده می‌شود)
 * category    دسته‌بندی (به ترتیب ظهور خودکار بین چهار رنگ butter / coral / teal / cream می‌چرخد)
 * imageUrl    اسکرین‌شات جلد (پیشنهاد 16:9)
 * tags        آرایه برچسب‌ها (در کارت grid نمایش داده می‌شود)
 * actions     ⭐ پیشنهادی: گروه دکمه‌های سفارشی
 *
 * ─────────────────────────────────────────────────────────────
 * نمونه نوشتن actions
 * ─────────────────────────────────────────────────────────────
 *
 *   actions: [
 *     // ۱. باز کردن درون سایت
 *     { label: "تجربه آنلاین", type: "embed",    url: "/translate/index.html" },
 *
 *     // ۲. رفتن به مستندات خارجی
 *     { label: "خواندن مستندات",   type: "external", url: "https://example.com/docs" },
 *
 *     // ۳. رفتن به GitHub
 *     { label: "کد منبع",     type: "external", url: "https://github.com/..." },
 *   ]
 *
 *   ❶ اگر actions نوشته نشود، خودکار از demoUrl / githubUrl زیر مشتق می‌شود (سازگاری با نسخه قبل)
 *   ❷ دکمه اول به‌طور پیش‌فرض دکمه اصلی coral است و دکمه‌های بعدی دکمه فرعی با پس‌زمینه سفید
 *   ❸ برای کنترل دستی می‌توان variant اضافه کرد: "primary" | "secondary"
 *   ❹ برای هر کارت ۱ تا ۳ دکمه پیشنهاد می‌شود، بیشتر از آن بصری شلوغ می‌شود
 */

import { AIApplicationItem } from "../types";

export const aiApplicationData: AIApplicationItem[] = [
  {
    id: "easy-dataset",
    title: "Easy Dataset",
    description: "ابزار تولید و مدیریت مجموعه‌داده، با قابلیت‌های تجزیه اسناد، تقسیم هوشمند، پاک‌سازی، ترکیب و تقویت داده.",
    category: "ترکیب داده",
    imageUrl: "/imgs/easy-dataset.png",
    tags: ["LLM", "ترکیب داده", "تنظیم دقیق مدل", "RAG"],
    actions: [
      {
        label: "مشاهده مستندات",
        type: "external",
        url: "https://docs.easy-dataset.com/",
      },
      {
        label: "آموزش ویدئویی",
        type: "external",
        url: "https://space.bilibili.com/474921808/search?keyword=Easy+Dataset",
      },
      {
        label: "کد منبع",
        type: "external",
        url: "https://github.com/ConardLi/easy-learn-ai/tree/main/ai-app/translate",
      },
    ],
  },
  {
    id: "easy-agent ",
    title: "Easy Agent",
    description: "یک Agent ترمینال محلی متن‌باز که تجربه Claude Code را کامل بازسازی می‌کند.",
    category: "Agent",
    imageUrl: "/imgs/easy-agent.jpeg",
    tags: ["LLM", "Agent", "CLI"],
    actions: [
      {
        label: "آموزش توسعه",
        type: "external",
        url: "https://mmh1.top/#/knowledge-planet",
      },
      {
        label: "کد منبع",
        type: "external",
        url: "https://github.com/ConardLi/easy-agent",
      },
    ],
  },
  {
    id: "web-video-presentation",
    title: "Web Video Presentation Skill",
    description: "یک Skill: به AI کمک می‌کند مقالات، دوره‌ها، دموی محصول و talkها را به ویدئو (شبیه‌سازی وب) تبدیل کند.",
    category: "Skills",
    imageUrl: "/imgs/web-video-presentation.png",
    tags: ["Agent", "Skill", "ساخت ویدئو"],
    actions: [
      {
        label: "مشاهده ویدئوی ساخته‌شده با Skill",
        type: "embed",
        url: "/web-video-presentation/index.html",
      },
      {
        label: "دانلود Skill",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills#web-video-presentation",
      },
      {
        label: "کد منبع",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills",
      },
    ],
  },
  {
    id: "web-design-engineer",
    title: "Web Design Engineer Skill",
    description: "یک Skill: AI را راهنمایی می‌کند تا جلوه‌های وب خیره‌کننده بسازد و از طراحی‌های تکراری و کلیشه‌ای AI دوری کند.",
    category: "Skills",
    imageUrl: "/imgs/web-design-skill.png",
    tags: ["Agent", "Skill", "Web Design"],
    actions: [
      {
        label: "مشاهده صفحه وب ساخته‌شده با Skill",
        type: "embed",
        url: "/web-design-engineer/index.html",
      },
      {
        label: "دانلود Skill",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills#web-design-engineer",
      },
      {
        label: "کد منبع",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills",
      },
    ],
  },
  {
    id: "beautiful-article",
    title: "Beautiful Article Skill",
    description: "یک Skill: هر محتوایی را به یک مقاله زیبا تبدیل می‌کند.",
    category: "Skills",
    imageUrl: "/imgs/beautiful-article-skill.webp",
    tags: ["Agent", "Skill", "Article"],
    actions: [
      {
        label: "مشاهده مقاله ساخته‌شده با Skill",
        type: "external",
        url: "https://mmh1.top/#/ai-article",
      },
      {
        label: "دانلود Skill",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills#beautiful-article",
      },
      {
        label: "ReArticle",
        type: "external",
        url: "https://rearticle.mmh1.top/#/",
      },
    ],
  },
  {
    id: "gpt-image-2",
    title: "GPT Image 2 Skill",
    description: "یک Skill: به شما کمک می‌کند با GPT Image 2 سبک‌های رایج تولید تصویر را سریع بازسازی کنید.",
    category: "Skills",
    imageUrl: "/imgs/gpt-image-2.webp",
    tags: ["Agent", "Skill", "Image Generation"],
    actions: [
      {
        label: "مشاهده سبک‌های تولید تصویر GPT Image2",
        type: "external",
        url: "https://gpt-image2.mmh1.top/",
      },
      {
        label: "دانلود Skill",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills#gpt-image-2",
      },
      {
        label: "کد منبع",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills",
      },
    ],
  },
  {
    id: "easy-llm-cli",
    title: "Easy LLM CLI",
    description: "نسخه سازگارشده Gemini CLI با چند مدل LLM (نگهداری آن متوقف شده، لطفاً به Easy Agent مهاجرت کنید)",
    category: "Agent",
    imageUrl: "/imgs/easy-llm-cli.png",
    tags: ["LLM", "Agent", "CLI"],
    actions: [
      {
        label: "مشاهده مخزن",
        type: "external",
        url: "https://github.com/ConardLi/easy-llm-cli",
      },
    ],
  },
  {
    id: "translate-agent",
    title: "Agent ترجمه حرفه‌ای",
    description: "Agent ترجمه حرفه‌ای، با پشتیبانی از چند زبان و ترجمه هوشمند در سبک‌های مختلف",
    category: "Agent",
    imageUrl: "/imgs/translate.png",
    tags: ["LLM", "ترجمه", "Agent"],
    actions: [
      {
        label: "تجربه آنلاین",
        type: "embed",
        url: "/translate/index.html",
      },
      {
        label: "کد منبع",
        type: "external",
        url: "https://github.com/ConardLi/easy-learn-ai/tree/main/ai-app/translate",
      },
    ],
  },

];

/**
 * @deprecated پالت رنگ گرادیان آبی-بنفش SaaS، که با چرخه رنگ Mailchimp-Freddie در کامپوننت‌های جدید
 * (butter / coral / teal / cream) جایگزین شده، فقط برای جلوگیری از شکست import در کدهای قدیمی دیگر
 * نگه داشته شده. در پاک‌سازی بعدی می‌توان با خیال راحت حذف کرد.
 */
export const applicationCategoryColors: Record<string, string> = {};
