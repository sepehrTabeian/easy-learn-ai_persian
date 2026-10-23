/**
 * مقالات AI · داده ستون سردبیری
 *
 * همه مقالات HTML تک‌فایلی هستند که با skill به نام beautiful-article تولید شده‌اند،
 * در `public/article/` پوشه قرار دارند:
 *   - نوع تک‌فایلی: public/article/<id>.html         → htmlUrl: "/article/<id>.html"
 *   - نوع چندمنبعی: public/article/<id>/index.html   → htmlUrl: "/article/<id>/index.html"
 *
 * صفحه فهرست به ترتیب نزولی publishDate نمایش می‌دهد و خودکار بر اساس سال گروه‌بندی می‌کند.
 * برای category جدید کافی است مقدار جدید بنویسید، UI بر اساس"ترتیب ظهور"خودکار آن‌ها را به chip جمع می‌کند.
 */

import { AIArticleItem } from "../types";

export const aiArticleData: AIArticleItem[] = [
  {
    id: "agent-framework",
    title: "طراحی و تفکر Agent Framework",
    lead: "مسئله این نیست که یک سیستم Agent حساب می‌شود یا نه، بلکه این است که آیا فریم‌ورک به شما اجازه می‌دهد بر context هر گامی که وارد LLM می‌شود کنترل داشته باشید.",
    category: "مقاله بلند",
    publishDate: "2025-04-20",
    readingMinutes: 23,
    theme: "Freddie",
    tags: ["Agent", "Framework", "Langchain"],
    htmlUrl: "/article/agent-framework.html",
  },
  {
    id: "codex-sandbox",
    title: "طراحی و پیاده‌سازی Codex Sandbox",
    lead: "Agent باید مثل یک توسعه‌دهنده روی ماشین محلی فایل بخواند، تست اجرا کند و کد تغییر دهد، اما نباید به همین دلیل دسترسی نامحدود محلی بگیرد.",
    category: "مقاله بلند",
    publishDate: "2026-05-13",
    readingMinutes: 23,
    theme: "Press",
    tags: ["Agent", "Sandbox", "Codex"],
    htmlUrl: "/article/codex-sandbox.html",
  },
  {
    id: "long-task-harness",
    title: "طراحی Harness برای سناریوهای کار طولانی",
    lead: "وقتی مدل کدنویسی بلد باشد، هماهنگ‌سازی بیرونی تعیین می‌کند که آیا می‌تواند یک برنامه پیچیده را کامل، درست و با سلیقه بسازد.",
    category: "مقاله بلند",
    publishDate: "2026-03-24",
    readingMinutes: 19,
    theme: "Press",
    tags: ["Agent", "Harness", "Claude"],
    htmlUrl: "/article/long-task-harness.html",
  },
  {
    id: "code-agent",
    title: "طراحی مخزن کد سازگار با Agent",
    lead: "تیم OpenAI با Codex یک محصول داخلی ساخت که هیچ کدی در آن دستی نوشته نشده است.",
    category: "مقاله بلند",
    publishDate: "2026-02-11",
    readingMinutes: 20,
    theme: "Press",
    tags: ["Agent", "Code", "OpenAI"],
    htmlUrl: "/article/code-agent.html",
  },
  {
    id: "research",
    title: "استفاده از چند Agent برای پژوهش عمیق",
    lead: "معماری، پرامپت‌ها، ارزیابی و درس‌های مهندسی پشت Claude Research.",
    category: "گزارش",
    publishDate: "2025-06-31",
    readingMinutes: 18,
    theme: "Tufte",
    tags: ["Agent", "Research", "Claude"],
    htmlUrl: "/article/research.html",
  },
  {
    id: "tools",
    title: "بهترین شیوه‌های طراحی Agent Tools",
    lead: "پنج اصل تیم مهندسی Anthropic درباره Tools، همراه با یک روش مبتنی بر ارزیابی.",
    category: "مقاله بلند",
    publishDate: "2025-09-11",
    readingMinutes: 21,
    theme: "Freddie",
    tags: ["Agent", "Tools", "Anthropic"],
    htmlUrl: "/article/tools.html",
  },
  {
    id: "skill",
    title: "Agent Skill چگونه تکامل می‌یابد؟",
    lead: "سند Skill را به‌عنوان چیزی که آموزش می‌بیند در نظر بگیرید، نه prompt که کپی و پیست می‌شود.",
    category: "مقاله توضیحی",
    publishDate: "2026-05-28",
    readingMinutes: 8,
    theme: "Freddie",
    tags: ["Agent", "Skill", "Microsoft"],
    htmlUrl: "/article/skill.html",
  },
  {
    id: "harness",
    title: "کالبدشکافی Agent Harness",
    lead: "هوش درون مدل است؛ آن‌چه هوش را مفید می‌کند، سیستمی است که دور آن قرار دارد.",
    category: "مقاله بلند",
    publishDate: "2026-03-10",
    readingMinutes: 12,
    theme: "Vignelli",
    tags: ["Agent", "Harness", "Langchain"],
    htmlUrl: "/article/harness.html",
  },
  {
    id: "prompt-cache",
    title: "کش پرامپت برای Agent چقدر مهم است؟",
    lead: "نرخ برخورد کش SLO یک Agent است؛ تجربه‌های خلاف شهود تیم Claude Code.",
    category: "مقاله بلند",
    publishDate: "2026-04-30",
    readingMinutes: 15,
    theme: "Bayer",
    tags: ["Agent", "Prompt Cache", "Anthropic"],
    htmlUrl: "/article/prompt-cache.html",
  },
  {
    id: "context",
    title: "مهندسی context کارآمد برای Agentها",
    lead: "این مقاله بررسی می‌کند چگونه context که AI Agent را به کار می‌اندازد کارآمد انتخاب و مدیریت کنیم.",
    category: "مقاله بلند",
    publishDate: "2025-09-29",
    readingMinutes: 16,
    theme: "Tufte",
    tags: ["Agent", "Context", "Anthropic"],
    htmlUrl: "/article/context.html",
  },
  {
    id: "transformer",
    title: "Attention Is All You Need",
    lead: "مقاله‌ای که AI مدرن را از نو شکل داد، لایه‌به‌لایه برایتان تشریح می‌شود.",
    category: "مقاله بلند",
    publishDate: "2017-06-12",
    readingMinutes: 30,
    theme: "Tufte",
    tags: ["Transformer", "Attention", "AI", "مقاله"],
    htmlUrl: "/article/tansformer.html",
  },
  {
    id: "agent-eval",
    title: "ارزیابی AI Agentها به زبان روشن",
    lead: "همان توانایی‌هایی که Agent را مفید می‌کنند، ارزیابی آن را دشوار می‌کنند — راهنمایی از Anthropic.",
    category: "مقاله بلند",
    publishDate: "2026-01-09",
    readingMinutes: 25,
    theme: "Tufte",
    tags: ["Agent", "ارزیابی", "Anthropic", "Claude"],
    htmlUrl: "/article/agent-eval.html",
  },
  {
    id: "agent-loop-codex",
    title: "Agent Loop در Codex چگونه کار می‌کند؟",
    lead: "اشتراک رسمی Open AI: روی Responses API، یک گفتگو چگونه بارها و بارها «باز» می‌شود.",
    category: "مقاله بلند",
    publishDate: "2026-01-23",
    readingMinutes: 18,
    theme: "Sottsass",
    tags: ["Agent", "Codex", "OpenAI", "Agent Loop"],
    htmlUrl: "/article/agent-loop-codex.html",
  },
];

/** chip فیلتر صفحه فهرست: به ترتیب ظهور داده جمع می‌شود + "همه" نگهبان در ابتدا */
export const articleCategories = (() => {
  const seen: string[] = [];
  for (const item of aiArticleData) {
    if (!seen.includes(item.category)) seen.push(item.category);
  }
  return ["همه", ...seen];
})();

/** نوع ← رنگ برچسب گوشه (هم‌سو با پالت stamp کل سایت؛ در صورت عدم تطابق از cream/ink استفاده می‌شود) */
export const articleCategoryColor: Record<string, string> = {
  "توضیح": "#F4D35E",   // butter
  "مرور": "#E07A5F",     // coral
  "مقاله بلند": "#1B4B5A",     // teal
  "آموزش": "#FBE891",     // butter-soft
  "نقد": "#241C15",     // ink
  "مصاحبه": "#FBEFE3",     // cream
  "گزارش": "#FF4D74",   // pop
};

/** یافتن مقاله با id (برای پشتیبان 404 صفحه جزئیات) */
export const findArticleById = (id: string): AIArticleItem | undefined =>
  aiArticleData.find((a) => a.id === id);
