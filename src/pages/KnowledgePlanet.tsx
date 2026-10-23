/**
 * سیاره دانش · سبک Mailchimp-Freddie
 *
 * معماری اطلاعات:
 *   ۱. HERO (زرد butter ·"نوار دعوت") —— وسط‌چین تمام‌عرض: عنوان بزرگ + ردیف افقی stats + دو CTA
 *   ۲. FEATURES (cream · دوستونه)     —— تصویرسازی PLANET-A در چپ + section head در راست + ۴ کارت perks در پایین
 *   ۳. CURRICULUM (butter-tint)  —— Bento با ۱۲ بخش بزرگ + نمای کلی ۱۷۶ مطلب (از پوستر ۱)
 *   ۴. TRACKS (cream)            —— کارت‌های بزرگ ۵ مسیر یادگیری اصلی (از پوسترهای ۲-۶)
 *   ۵. TEACHER (پس‌زمینه سفید)            —— تصویرسازی آواتار PLANET-B + معرفی معلم + chipهای نقش
 *   ۶. JOIN (ink تیره)           —— تصویر تخفیف + کد QR (تقابل کارت سفید stamp با پس‌زمینه تیره)
 *
 * زبان بصری (متفاوت با صفحه اصلی / Hero دانش بصری AI):
 *   Hero صفحه اصلی    = دوستونه + تصویرسازی متحرک بزرگ
 *   Hero دانش بصری AI = وسط‌چین تمام‌عرض + تمرکز بر جستجوی بزرگ (ابزار)
 *   Hero سیاره    = وسط‌چین تمام‌عرض + stats بزرگ + تمرکز بر CTA (دعوت)
 */

import React from "react";
import {
  BookOpen,
  FileText,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  ArrowDown,
  Rocket,
  Wrench,
  Bot,
  Workflow,
  Database,
  Sparkles,
  Brain,
  Package,
  Layers,
  Compass,
  BarChart3,
  PenTool,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import {
  Sparkle4,
  Star,
  DotGrid,
  CircleScribble,
  HandUnderline,
} from "../components/Decorations";
import { IllustrationImage } from "../components/IllustrationImage";

/**
 * اسکرول نرم به section با id مشخص.
 * پروژه از HashRouter استفاده می‌کند، hash در URL توسط مسیریابی اشغال شده،
 * نمی‌توان از <a href="#id"> پرش anchor بومی مرورگر استفاده کرد، باید با برنامه اسکرول کرد.
 */
const scrollToSection = (id: string): void => {
  const target = document.getElementById(id);
  if (!target) return;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
};

/* ════════════════════════════════════════════════════════════════════
 * DATA · ۴ ماژول بزرگ / ۱۲ بخش / ۵ مسیر اصلی
 * ──────────────────────────────────────────────────────────────────── */

interface PerkItem {
  num: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  accent: "butter" | "coral" | "teal" | "cream";
}

const perks: PerkItem[] = [
  {
    num: "i.",
    Icon: BookOpen,
    title: "نسخه کامل آموزش‌های AI",
    description:
      "اسلایدهای اصلی که در ویدئوها دیده‌اید، به‌علاوه کد، داده و فرایند عملی غیرعمومی.",
    detail: "۱۷۶ فصل · به‌روزرسانی مداوم",
    accent: "butter",
  },
  {
    num: "ii.",
    Icon: FileText,
    title: "جدیدترین منابع آموزشی",
    description: "مقالات، وبلاگ‌های فنی و راهنماهای عملی گردآوری‌شده از منابع دست اول، تا اشتباهات تکراری نکنید.",
    detail: "گردآوری مداوم · به‌روزرسانی هفتگی",
    accent: "coral",
  },
  {
    num: "iii.",
    Icon: TrendingUp,
    title: "گزارش‌های صنعت",
    description: "گزارش‌ها و بهترین شیوه‌های صنعت AI از نهادهای معتبر، تا مسیر صنعت را زودتر ببینید.",
    detail: "نمونه‌های AI در صنایع مختلف",
    accent: "teal",
  },
  {
    num: "iv.",
    Icon: MessageSquare,
    title: "پرسش و پاسخ تخصصی",
    description: "توسط خود معلم «باغ» گردآوری و پاسخ داده می‌شود، با فرصت‌های بیشتر برای تبادل عمیق یک‌به‌یک.",
    detail: "پرسش و پاسخ در گروه · پرسش در پیام خصوصی",
    accent: "cream",
  },
];

/* ── پوستر ۱ · ۱۲ بخش بزرگ (CURRICULUM Bento grid) ───────────────────── */
interface CurriculumTile {
  name: string;
  desc: string;
  Icon: LucideIcon;
}

const curriculum: CurriculumTile[] = [
  { name: "تکامل و اکوسیستم AI", desc: "مسیر اصلی Transformer ← Agent", Icon: Compass },
  { name: "مبانی نظری AI", desc: "مکانیزم توجه · توانایی‌های نوظهور", Icon: BookOpen },
  { name: "استقرار مدل", desc: "Ollama / vLLM · دقت کوانتیزه‌سازی", Icon: Package },
  { name: "تنظیم دقیق مدل", desc: "LoRA · LLaMA Factory", Icon: Wrench },
  { name: "ارزیابی مدل", desc: "MMLU · SWE-bench · LM Arena", Icon: BarChart3 },
  { name: "عامل‌های هوشمند AI", desc: "Agent Loop · MCP · Skills", Icon: Bot },
  { name: "Agent سازمانی", desc: "از صفر تا تولید · عمل در ۶ مرحله", Icon: Workflow },
  { name: "ویژه OpenClaw", desc: "باغ عامل هوشمند خودتان", Icon: Sparkles },
  { name: "پایگاه دانش AI", desc: "RAG · بازیابی تقویت‌شده · پایگاه برداری", Icon: Database },
  { name: "مهندسی پرامپت", desc: "پرامپت ← context ← Harness", Icon: PenTool },
  { name: "چندوجهی AI", desc: "تولید تصویر · صدا · ویدئو", Icon: Layers },
  { name: "بینش روندها", desc: "تحولات پیشرو · خلاصه سریع مقالات", Icon: Lightbulb },
];

/* ── پوسترهای ۲-۶ · ۵ مسیر یادگیری اصلی ───────────────────────────────────────── */

type AccentKey =
  | "butter"
  | "coral"
  | "teal"
  | "pop"
  | "butter-deep";

interface TrackStage {
  /** شماره مرحله یا نام رمز ("01" / "❶" / "Ch.0-4" و غیره به‌صورت رشته ساده نمایش داده می‌شوند) */
  badge: string;
  title: string;
  /** توضیح یک‌خطی (اختیاری) */
  caption?: string;
  /** chipهای کلیدواژه */
  topics: string[];
}

interface Track {
  id: string;
  /** icon کوچک وسط placeholder، همچنین به‌عنوان لنگر بصری وقتی تصویر هنوز تکمیل نشده */
  Icon: LucideIcon;
  /** روی پوستر"نمای کلی تعداد مطالب"عدد */
  count: number;
  /** "۲۰ مطلب" آن اسم بعدی */
  countSuffix: string;
  /** برچسب کوچک eyebrow */
  eyebrow: string;
  title: string;
  /** کلمه برجسته در عنوان (افکت زیرخط butter) */
  titleAccent?: string;
  /** توضیح یک‌جمله‌ای فرعی */
  description: string;
  /** فهرست ۵ تا ۷ خطی مراحل */
  stages: TrackStage[];
  accent: AccentKey;
  /** آیا"اختصاصی"برچسب */
  exclusive?: boolean;
  /** ID جای‌نگهدار تصویرسازی —— قرارداد نام‌گذاری برای تصاویر در انتظار: /imgs/site/Illustration-TRACK-XX.png */
  illustrationId: string;
  /** موضوع یک‌جمله‌ای که روی placeholder نمایش داده می‌شود (پس از جایگزینی تصویر هم می‌تواند alt باشد) */
  illustrationCaption: string;
}

const tracks: Track[] = [
  /* ── پوستر ۲: بخش نظری AI ───────────────────── */
  {
    id: "theory",
    Icon: Brain,
    count: 20,
    countSuffix: "مطلب · کل بخش نظری",
    eyebrow: "Track 01 · یک مسیر شناختی",
    title: "بخش نظری AI",
    titleAccent: "همه در یک‌جا",
    description: "از صنعت تا اصول، از مکانیزم تا کاربرد، در یک مسیر بخوانید.",
    accent: "butter",
    illustrationId: "TRACK-01",
    illustrationCaption: "کتاب باز + طرح اولیه Transformer + کارت نمایه",
    stages: [
      {
        badge: "01",
        title: "بستر تاریخی",
        caption: "ریشه‌ها و مسیر AI را روشن کنید",
        topics: [
          "مسیر اصلی تکامل AI",
          "Transformer → Agent",
          "DeepSeek",
          "OpenAI",
          "Anthropic",
          "Google",
          "xAI",
          "Kimi",
        ],
      },
      {
        badge: "02",
        title: "خود مدل",
        caption: "بفهمید خود مدل چیست",
        topics: [
          "توجه در Transformer",
          "توانایی‌های نوظهور LLM",
          "Token و توکن‌سازی BPE",
          "الگوی فراخوانی LLM API",
        ],
      },
      {
        badge: "03",
        title: "مکانیزم تکامل",
        caption: "بفهمید توانایی چگونه \"رشد\"می‌کند",
        topics: [
          "تنظیم دقیق مدل",
          "RLHF و هم‌ترازی",
          "فعال‌سازی پراکنده MoE",
          "Flash Attention",
          "استدلال CoT",
        ],
      },
      {
        badge: "04",
        title: "الگوی کاربرد",
        caption: "بدانید مدل چگونه به محصول تبدیل می‌شود",
        topics: [
          "پرامپت / پرامپت سیستمی",
          "طراحی محدودیت‌های رفتاری",
          "بازیابی تقویت‌شده RAG",
          "چهار ستون اصلی Agent",
        ],
      },
    ],
  },

  /* ── پوستر ۳: استقرار / تنظیم دقیق / ارزیابی مدل ───────── */
  {
    id: "engineering",
    Icon: Wrench,
    count: 47,
    countSuffix: "مطلب عملی مهندسی",
    eyebrow: "Track 02 · تمرین عملی با نمونه‌های واقعی سازمانی",
    title: "استقرار · تنظیم دقیق · ارزیابی مدل",
    titleAccent: "اتصال کامل زنجیره",
    description: "از آموزش تا استقرار و ارزیابی، هر گام زنجیره مهندسی را طی کنید.",
    accent: "coral",
    illustrationId: "TRACK-02",
    illustrationCaption: "جعبه‌ابزار باز + خط‌کش دقت کوانتیزه‌سازی + لوله آزمایش",
    stages: [
      {
        badge: "۶ مطلب",
        title: "استقرار مدل",
        topics: [
          "نسخه کامل در برابر نسخه تقطیرشده",
          "نیازمندی‌های سخت‌افزاری",
          "Ollama سبک و آماده",
          "vLLM با توان عملیاتی بالا",
          "کوانتیزه‌سازی FP32 / FP16 / INT8 / INT4",
          "استقرار محلی DeepSeek",
        ],
      },
      {
        badge: "۲۸ مطلب",
        title: "تنظیم دقیق مدل",
        topics: [
          "Unsloth",
          "تنظیم دقیق R1 تقطیرشده در Colab",
          "LLaMA Factory با Web UI بدون کد",
          "ترکیب داده با Easy Dataset",
          "LoRA / تمام‌پارامتر / کوانتیزه / GGUF",
          "تخمین حافظه گرافیکی · تشخیص برازش",
          "پایش با SwanLab",
        ],
      },
      {
        badge: "۱۳ مطلب",
        title: "ارزیابی مدل",
        topics: [
          "MMLU",
          "GPQA",
          "HLE",
          "ARC-AGI",
          "SWE-bench",
          "τ²-bench",
          "MCP-Atlas",
          "ترجیح انسانی LM Arena",
          "ارزیابی حوزه‌های تخصصی",
          "آزمون کور",
        ],
      },
    ],
  },

  /* ── پوستر ۴: راهنمای کامل AI Agent ─────────────── */
  {
    id: "agent-guide",
    Icon: Bot,
    count: 27,
    countSuffix: "مطلب عمیق درباره Agent",
    eyebrow: "Track 03 · کامل‌ترین مسیر یادگیری در اینترنت",
    title: "راهنمای کامل AI Agent",
    titleAccent: "تسلط کامل",
    description: "از مفاهیم پایه تا عمل با فریم‌ورک‌ها، کاربرد و توسعه عامل‌های هوشمند را یک‌جا کامل بفهمید.",
    accent: "teal",
    illustrationId: "TRACK-03",
    illustrationCaption: "نقشه ستاره‌ای دانش متشکل از ۷ ماژول عامل هوشمند",
    stages: [
      {
        badge: "[مفاهیم پایه]",
        title: "مفاهیم پایه",
        topics: [
          "Function Calling",
          "Agent Loop",
          "سیستم حافظه",
          "مدیریت context",
        ],
      },
      {
        badge: "[مکانیزم اجرا]",
        title: "مکانیزم اجرا",
        topics: [
          "حالت‌های Plan / Default / Auto",
          "TodoWrite",
          "مکانیزم Sandbox",
        ],
      },
      {
        badge: "[معماری همکاری]",
        title: "معماری همکاری",
        topics: ["SubAgent", "Agent Teams", "ایزوله‌سازی Worktree"],
      },
      {
        badge: "[اکوسیستم MCP]",
        title: "اکوسیستم MCP",
        topics: [
          "تحلیل پروتکل",
          "توسعه Server",
          "تحلیل بسته‌های شبکه",
          "ریسک‌های امنیتی",
        ],
      },
      {
        badge: "[Skills]",
        title: "سیستم Skills",
        topics: [
          "افشای تدریجی",
          "Skill Creator",
          "Skill بازیابی دانش",
        ],
      },
      {
        badge: "[عمل با فریم‌ورک]",
        title: "عمل با فریم‌ورک",
        topics: [
          "LangChain v1",
          "LangGraph Multi-Agent",
          "MCP Scanner",
        ],
      },
      {
        badge: "[Harness]",
        title: "مهندسی سه‌مرحله‌ای Harness",
        topics: ["پرامپت ← context ← Harness"],
      },
    ],
  },

  /* ── پوستر ۵: ساخت Agent سازمانی از صفر ─────────── */
  {
    id: "enterprise-agent",
    Icon: Rocket,
    count: 31,
    countSuffix: "مطلب · اتصال کامل ۶ مرحله",
    eyebrow: "Track 04 · عملی و قدم‌به‌قدم · تکامل مهندسی در ۶ مرحله",
    title: "ساخت Agent سازمانی از صفر",
    description:
      "از راه‌اندازی پروژه تا بسته‌بندی و انتشار، هر فصل کد قابل اجرا و ملاحظات طراحی دارد.",
    accent: "pop",
    exclusive: true,
    illustrationId: "TRACK-04",
    illustrationCaption: "console.log به ۶ پله تبدیل می‌شود + یک موشک کوچک به آسمان می‌رود",
    stages: [
      {
        badge: "Ch. 0-4 · ۵ مطلب",
        title: "راه‌اندازی کوچک‌ترین حلقه بسته",
        caption: "از راه‌اندازی پروژه تا حلقه بسته تک‌دور Agent",
        topics: [
          "داربست پروژه",
          "ارتباط جریانی LLM",
          "تعامل ترمینال",
          "رابط Tool",
          "Agentic Loop",
        ],
      },
      {
        badge: "Ch. 5-8 · ۴ مطلب",
        title: "تبدیل به یک CLI Agent قابل استفاده",
        caption: "تکمیل توانایی اجرای محلی و پایه‌های گفتگوی چنددوره‌ای",
        topics: [
          "مجموعه ابزارهای اصلی",
          "System Prompt",
          "مدل دسترسی سه‌سطحی",
          "QueryEngine",
        ],
      },
      {
        badge: "Ch. 9-13 · ۵ مطلب",
        title: "حل مسئله گفتگوهای طولانی",
        caption: "سیستم بتواند به‌طور مداوم کار کند و برنامه‌ریزی کند",
        topics: [
          "ماندگاری نشست",
          "حافظه پروژه",
          "فشرده‌سازی context",
          "بودجه Token",
          "Plan Mode",
        ],
      },
      {
        badge: "Ch. 14-21 · ۸ مطلب",
        title: "گسترش توانایی در کارهای پیچیده",
        caption: "مدیریت کارها، اتصال به اکوسیستم، همکاری",
        topics: [
          "TodoWrite",
          "گراف وظایف Task",
          "MCP",
          "Skills",
          "Sandbox",
          "SubAgent",
          "Worktree",
          "Agent Teams",
        ],
      },
      {
        badge: "Ch. 22-26 · ۵ مطلب",
        title: "تکمیل توانایی محصول‌سازی",
        caption: "بهبود توسعه‌پذیری، تجربه تعامل و تاب‌آوری سیستم",
        topics: [
          "Hooks",
          "ارتقای UI",
          "سیستم پیکربندی",
          "تاریخچه فایل",
          "مدیریت خطا",
        ],
      },
      {
        badge: "Ch. 27-30 · ۴ مطلب",
        title: "به سوی تحویل و خودکارسازی",
        caption: "پشتیبانی از خودکارسازی، چندمدلی و انتشار و توزیع",
        topics: [
          "حالت pipeline",
          "Auto Mode",
          "چند Provider",
          "بسته‌بندی و انتشار",
        ],
      },
    ],
  },

  /* ── پوستر ۶: ویژه OpenClaw ──────────────────── */
  {
    id: "openclaw",
    Icon: Sparkles,
    count: 25,
    countSuffix: "مطلب اختصاصی OpenClaw",
    eyebrow: "Track 05 · محتوایی که جای دیگری نمی‌بینید",
    title: "ویژه OpenClaw",
    titleAccent: "باغ عامل هوشمند AI خودتان",
    description: "با دست خودتان یک سیستم عامل هوشمند متعلق به خودتان بسازید، از صفر.",
    accent: "butter-deep",
    exclusive: true,
    illustrationId: "TRACK-05",
    illustrationCaption: "باغ کوچک + ۷ گلدان ربات کوچک با تقسیم کار",
    stages: [
      {
        badge: "جوانه",
        title: "مقدماتی",
        topics: ["راه‌اندازی محیط", "دستیار پیکربندی", "اتصال به Feishu"],
      },
      {
        badge: "نقاب",
        title: "شخصیت",
        topics: ["هویت چهارلایه", "امنیت SOUL", "تنظیم پرسونا"],
      },
      {
        badge: "حافظه",
        title: "سیستم حافظه",
        topics: ["ذخیره‌سازی دولایه", "نوشتن و بازیابی", "عیب‌یابی عملی"],
      },
      {
        badge: "مهارت",
        title: "سیستم مهارت",
        topics: ["ClawHub", "تکامل چهارمرحله‌ای"],
      },
      {
        badge: "زمان‌بندی",
        title: "موتور زمان‌بندی",
        topics: ["کارهای زمان‌بندی‌شده", "اجرای زنجیره‌ای", "ترفندهای Cron"],
      },
      {
        badge: "افزونه",
        title: "گسترش با افزونه",
        topics: ["پنج نوع گسترش", "استانداردهای توسعه"],
      },
      {
        badge: "آرایه",
        title: "آرایه چندعاملی",
        topics: [
          "دستیار تولید تصویر",
          "دستیار سرمایه‌گذاری",
          "دستیار نویسندگی",
          "دستیار جامعه",
          "دستیار اخبار",
          "دستیار توسعه",
          "دستیار همکاری",
        ],
      },
      {
        badge: "پیوست",
        title: "مرجع سریع و راهنما",
        topics: ["مرجع سریع دستورات", "مرجع سریع پیکربندی", "راهنمای امنیت"],
      },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════
 * نگاشت رنگ · برای رنگ برند Track
 * ──────────────────────────────────────────────────────────────────── */

const accentStripBg: Record<AccentKey, string> = {
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  pop: "bg-pop",
  "butter-deep": "bg-butter-deep",
};

const accentTextOnSurface: Record<AccentKey, string> = {
  butter: "text-ink",
  coral: "text-coral",
  teal: "text-teal",
  pop: "text-pop",
  "butter-deep": "text-ink",
};

const accentBadgeBg: Record<AccentKey, string> = {
  butter: "bg-butter text-ink",
  coral: "bg-coral text-white",
  teal: "bg-teal text-white",
  pop: "bg-pop text-white",
  "butter-deep": "bg-butter-deep text-ink",
};

/* ════════════════════════════════════════════════════════════════════
 * صفحه اصلی
 * ──────────────────────────────────────────────────────────────────── */

const KnowledgePlanet: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════ HERO · نوار دعوت وسط‌چین تمام‌عرض ═══════════════════ */}
      <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
        <DotGrid
          className="absolute bottom-10 start-[10%] w-20 h-12 text-ink opacity-40 hidden md:block"
          color="#241C15"
          rows={3}
          cols={5}
        />
        <Sparkle4
          className="absolute top-16 start-[8%] w-7 h-7 text-ink hidden md:block"
          color="#241C15"
        />
        <Star
          className="absolute top-20 end-[7%] w-8 h-8 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[860px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-16 lg:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-8">
            <Star className="w-3.5 h-3.5" color="#E07A5F" filled />
            <span>§ سیاره دانش</span>
          </div>

          <h1 className="font-display font-extrabold text-display-xl text-ink">
            <span className="whitespace-nowrap">کنجکاوی را</span>{" "}
            <span className="whitespace-nowrap">
              به
              <span className="relative inline-block mx-[0.1em]">
                <span className="relative z-10">مسیر یادگیری</span>
                <CircleScribble
                  className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] z-0"
                  color="#E07A5F"
                />
              </span>
              بلندمدت تبدیل کنید.
            </span>
          </h1>

          <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[600px] mx-auto mt-7">
            جامعه عمیق پولی، که معلم «باغ» به‌طور مستقل نگهداری می‌کند.
            آموزش‌ها، منابع، گزارش‌های صنعت، پرسش و پاسخ تخصصی ——
            <span className="font-bold">همه در یک‌جا</span>。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <button
              type="button"
              onClick={() => scrollToSection("join")}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-ink text-butter border-2 border-ink rounded-full font-sans font-extrabold text-[16px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
            >
              <span>اسکن برای عضویت</span>
              <ArrowDown
                className="w-5 h-5 transition-transform duration-250 group-hover:translate-y-1"
                strokeWidth={2.5}
              />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("curriculum")}
              className="group inline-flex items-center gap-2 px-6 py-4 text-ink font-sans font-semibold text-[15px] hover:underline underline-offset-4 transition-colors"
            >
              <span>اول نقشه دوره را ببینید</span>
              <ArrowDown
                className="w-4 h-4 transition-transform duration-250 group-hover:translate-y-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Stats —— اعداد از مجموع پوستر ۱ و ۶ پوستر آمده‌اند */}
          <div className="mt-14 pt-10 border-t-2 border-ink/15">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <StatItem value="176" label="سند عمیق" />
              <span className="w-px h-10 bg-ink/20 hidden md:inline-block" />
              <StatItem value="5" label="مسیر یادگیری" />
              <span className="w-px h-10 bg-ink/20 hidden md:inline-block" />
              <StatItem value="۱۰ سال" label="به‌روزرسانی مداوم" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES · ۴ کارت ارزش ═══════════════════ */}
      <section
        id="perks"
        className="relative bg-cream border-b-2 border-ink overflow-hidden scroll-mt-20"
      >
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-start">
              <IllustrationImage
                src="/imgs/site/Illustration-PLANET-A.png"
                alt="شخصیتی که پشت میز نشسته و با تمرکز درس می‌خواند، ستاره‌های کوچک دورش شناورند، نماد همراهی جامعه"
                animation="up"
                className="max-w-[400px]"
              />
            </div>

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-5">
                <span>§ ارزش</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">در سیاره،</span>{" "}
                <span className="whitespace-nowrap">
                  چیزهایی که
                  <span className="relative inline-block mx-[0.1em]">
                    <span className="relative z-10">واقعاً به دست می‌آورید</span>
                    <HandUnderline
                      className="absolute -bottom-2 start-0 end-0 w-full h-3"
                      color="#F4D35E"
                    />
                  </span>
                  
                </span>
              </h2>
              <p className="font-sans text-[17px] text-ink-secondary leading-[1.7] mt-6 max-w-xl">
                نسخه کامل آموزش‌ها، منابع دست اول، گزارش‌های AI صنایع مختلف
                و پرسش و پاسخ با خود معلم —— هر چهار مورد در یک بسته، که خرید جداگانه هر کدام بیش از این قیمت است.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {perks.map((p) => (
              <PerkCard key={p.num} perk={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CURRICULUM · Bento با ۱۲ بخش بزرگ ═══════════════════ */}
      <section
        id="curriculum"
        className="relative bg-butter-tint border-b-2 border-ink overflow-hidden scroll-mt-20"
      >
        <Sparkle4
          className="absolute top-14 end-[6%] w-6 h-6 text-coral hidden md:block"
          color="#E07A5F"
        />
        <DotGrid
          className="absolute bottom-14 start-[4%] w-20 h-10 text-ink opacity-25 hidden md:block"
          color="#241C15"
          rows={3}
          cols={6}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          {/* Section head —— دوستونه: عنوان چپ + تعداد کل راست */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
                <span className="inline-block w-6 h-px bg-ink/45" />
                <span>§ نقشه دوره</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1]">
                یک{" "}
                <span className="relative inline-block mx-[0.05em]">
                  <span className="relative z-10">آموزش جامع AI</span>
                  <HandUnderline
                    className="absolute -bottom-2 start-0 end-0 w-full h-3"
                    color="#E07A5F"
                  />
                </span>
                ، ۱۳ بخش بزرگ · همه در یک‌جا.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:text-end">
              <div className="inline-flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[64px] lg:text-[80px] text-ink leading-none">
                  176
                </span>
                <span className="font-display font-extrabold text-[20px] text-ink leading-tight">
                  سند عمیق
                </span>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-1">
                Theory · Engineering · Agent · Exclusive
              </div>
            </div>
          </div>

          {/* Bento grid با ۱۲ بخش —— چرخه نوار رنگی ۴ رنگ (butter/coral/teal/pop)، شماره‌گذاری به سبک بایگانی */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3.5">
            {curriculum.map((tile, i) => (
              <CurriculumTileCard key={tile.name} tile={tile} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRACKS · کارت‌های بزرگ ۵ مسیر اصلی ═══════════════════ */}
      <section
        id="tracks"
        className="relative bg-cream border-b-2 border-ink overflow-hidden scroll-mt-20"
      >
        <Star
          className="absolute top-16 end-[8%] w-8 h-8 rotate-12 text-butter hidden md:block"
          color="#F4D35E"
          filled
        />
        <div
          className="absolute bottom-20 start-[3%] w-32 h-32 rounded-full bg-coral/15 hidden md:block"
          aria-hidden
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          {/* Section head */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
              <span className="inline-block w-6 h-px bg-ink/45" />
              <span>§ ۵ مسیر یادگیری اصلی</span>
            </div>
            <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1]">
              از{" "}
              <span className="text-coral">نظری</span>
              <ArrowRight className="inline w-7 h-7 mx-1 -mt-1 text-ink/60" strokeWidth={2.5} />{" "}
              <span className="text-teal">مهندسی</span>
              <ArrowRight className="inline w-7 h-7 mx-1 -mt-1 text-ink/60" strokeWidth={2.5} />{" "}
              <span className="text-pop">Agent</span>
              <ArrowRight className="inline w-7 h-7 mx-1 -mt-1 text-ink/60" strokeWidth={2.5} />{" "}
              <span className="bg-butter px-2 py-0.5 border-2 border-ink rounded-md">
                موضوع اختصاصی
              </span>
              。
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary leading-[1.7] mt-5">
              هر مسیر اصلی کد قابل اجرا، منابع قابل دانلود و گام‌های عملی دارد. به ترتیب یادگیری پیش بروید، از «فهمیدن» تا «توانستن».
            </p>
          </div>

          {/* ۵ کارت عمودی روی هم */}
          <div className="space-y-8 lg:space-y-10">
            {tracks.map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TEACHER ═══════════════════════ */}
      <section className="relative bg-white border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-4 flex items-center justify-center">
              <IllustrationImage
                src="/imgs/site/Illustration-PLANET-B.png"
                alt="آواتار کارتونی معلم «باغ» · ConardLi"
                animation="pop"
                className="max-w-[320px]"
              />
            </div>

            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-5">
                <span>§ درباره نویسنده</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">
                  نویسنده‌ای که پیوسته
                  <span className="relative inline-block mx-[0.1em]">
                    <span className="relative z-10">۱۰ سال</span>
                    <HandUnderline
                      className="absolute -bottom-2 start-0 end-0 w-full h-3"
                      color="#E07A5F"
                    />
                  </span>
                </span>{" "}
                <span className="whitespace-nowrap">محتوا به‌روز می‌کند.</span>
              </h2>
              <p className="font-sans text-[17px] text-ink-secondary leading-[1.75] mt-6 max-w-2xl">
                <span className="font-bold text-ink">
                  معلم «باغ» · ConardLi
                </span>{" "}
                ، متمرکز بر اشتراک‌گذاری فناوری AI، و متعهد به این‌که مفاهیم پیچیده را
                طوری توضیح دهد که «واقعاً قابل فهم باشد». همه محتوا را خودش ویرایش می‌کند، خودش می‌کشد و خودش می‌نویسد ——
                آهسته است، اما صداقت در هر مطلب دیده می‌شود.
              </p>

              <div className="flex flex-wrap gap-2.5 mt-8">
                <RoleChip label="متخصص فناوری AI" />
                <RoleChip label="سازنده محتوا در Bilibili" />
                <RoleChip label="تولیدکننده محتوا" />
                <RoleChip label="نگهداری مستقل" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ JOIN (CTA) ═══════════════════════ */}
      <section
        id="join"
        className="relative bg-ink overflow-hidden scroll-mt-20"
      >
        <Sparkle4
          className="absolute top-12 start-[8%] w-7 h-7 text-butter hidden md:block"
          color="#F4D35E"
        />
        <Star
          className="absolute top-16 end-[10%] w-9 h-9 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border-2 border-white/30 rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-white mb-5">
              <span>§ آماده‌اید</span>
            </div>
            <h2 className="font-display font-extrabold text-display-lg text-white">
              <span className="whitespace-nowrap">اول کوپن تخفیف بگیرید،</span>{" "}
              <span className="whitespace-nowrap">
                سپس عضو{" "}
                <span className="text-butter">باغ مخفی AI</span>。
              </span>
            </h2>
            <p className="font-serif italic text-[17px] text-white/65 mt-6">
              جامعه پولی سیاره دانش · یک بار عضویت، به‌روزرسانی بلندمدت؛ اعضای جدید می‌توانند کوپن ۲۰ یوانی تخفیف بگیرند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <JoinCard title="تخفیف محدود" caption="ویژه اعضای جدید، هر که زودتر بیاید">
              <img
                src="/imgs/yh.jpg"
                alt="کوپن تخفیف محدود سیاره دانش"
                className="w-full h-auto max-w-[360px] mx-auto"
                loading="lazy"
              />
            </JoinCard>
            <JoinCard title="کد QR عضویت" caption="برای درخواست عضویت اسکن کنید">
              <img
                src="/imgs/qr.png"
                alt="کد QR عضویت در سیاره دانش"
                className="w-full h-auto max-w-[360px] mx-auto"
                loading="lazy"
              />
            </JoinCard>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * زیرکامپوننت‌ها
 * ──────────────────────────────────────────────────────────────────── */

const StatItem: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div>
    <div className="font-display font-extrabold text-[28px] text-ink leading-none">
      {value}
    </div>
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-1.5">
      {label}
    </div>
  </div>
);

const PerkCard: React.FC<{ perk: PerkItem }> = ({ perk }) => {
  const { num, Icon, title, description, detail, accent } = perk;
  const accentBg = {
    butter: "bg-butter",
    coral: "bg-coral",
    teal: "bg-teal",
    cream: "bg-cream",
  }[accent];
  const accentText =
    accent === "coral" || accent === "teal" ? "text-white" : "text-ink";

  return (
    <article className="group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp-lg transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15] overflow-hidden">
      <div
        className={`${accentBg} ${accentText} border-b-2 border-ink px-6 py-5 flex items-center justify-between`}
      >
        <span className="font-serif italic text-[20px]">{num}</span>
        <Icon className="w-7 h-7" strokeWidth={2} />
      </div>
      <div className="flex flex-col flex-1 p-6 lg:p-7">
        <h3 className="font-display font-extrabold text-[20px] text-ink leading-snug mb-3">
          {title}
        </h3>
        <p className="font-sans text-[15px] text-ink-secondary leading-[1.7] mb-5 flex-1">
          {description}
        </p>
        <div className="inline-flex items-center self-start gap-1.5 px-3 py-1 bg-cream border border-ink/15 rounded-full font-sans font-semibold text-[12px] text-ink">
          <Sparkle4 className="w-2.5 h-2.5" color="#E07A5F" />
          <span>{detail}</span>
        </div>
      </div>
    </article>
  );
};

const RoleChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-3 py-1.5 bg-cream border-2 border-ink/15 rounded-full font-sans font-semibold text-[13px] text-ink-secondary">
    {label}
  </span>
);

const JoinCard: React.FC<{
  title: string;
  caption: string;
  children: React.ReactNode;
}> = ({ title, caption, children }) => (
  <div className="bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0_0_#F4D35E] p-8 lg:p-10">
    <div className="text-center mb-6">
      <h3 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
        {title}
      </h3>
      <p className="font-serif italic text-[14px] text-ink/55">{caption}</p>
    </div>
    <div className="flex items-center justify-center">{children}</div>
  </div>
);

/* ── کارت‌های کوچک ۱۲ بخش بزرگ (CURRICULUM) ─────────────────────────────────── */
/* نوار رنگی چرخه ۴ رنگ —— به ترتیب grid به ۱۲ کارت ریتم گروهی می‌دهد، تا کل صفحه پر از بلوک زرد نشود */
const TILE_COLOR_BARS = [
  "bg-butter",
  "bg-coral",
  "bg-teal",
  "bg-pop",
] as const;

const CurriculumTileCard: React.FC<{
  tile: CurriculumTile;
  index: number;
}> = ({ tile, index }) => {
  const { name, desc, Icon } = tile;
  const colorBar = TILE_COLOR_BARS[index % TILE_COLOR_BARS.length];

  return (
    <article className="group flex items-stretch bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
      {/* نوار رنگی عمودی چپ —— تنها لنگر رنگی */}
      <div
        className={`flex-shrink-0 w-1.5 ${colorBar} border-e-2 border-ink`}
        aria-hidden
      />
      {/* بدنه اصلی */}
      <div className="flex-1 min-w-0 px-4 py-4 lg:px-5 lg:py-[18px]">
        {/* بالا: شماره + icon کوچک بالا-راست */}
        <div className="flex items-start justify-between mb-2.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45 leading-none mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Icon
            className="w-[18px] h-[18px] text-ink/40 flex-shrink-0"
            strokeWidth={2}
          />
        </div>
        <h3 className="font-display font-extrabold text-[15px] text-ink leading-tight mb-1">
          {name}
        </h3>
        <p className="font-sans text-[11.5px] text-ink-tertiary leading-[1.5]">
          {desc}
        </p>
      </div>
    </article>
  );
};

/* ── TrackCard · کارت‌های بزرگ ۵ مسیر اصلی ───────────────────────────────────── */
const TrackCard: React.FC<{ track: Track; index: number }> = ({
  track,
  index,
}) => {
  const {
    count,
    countSuffix,
    eyebrow,
    title,
    titleAccent,
    stages,
    accent,
    illustrationId,
    illustrationCaption,
  } = track;

  return (
    <article className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15]">
      {/* strip بالا —— رنگ برند */}
      <div className={`h-2.5 ${accentStripBg[accent]} border-b-2 border-ink`} />

      {/* بدنه: دوستونه ۵ چپ / ۷ راست */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* ── چپ: جلد مینیمال —— صفحه‌آرایی وسط‌چین ──
             توضیح و chip اختصاصی حذف شد، فقط باقی ماند: تصویرسازی + عنوان + زیرعنوان + عدد درشت تعداد مطالب
             همه متن‌ها text-center وسط‌چین، گروه جلد در فضای باقی‌مانده vertically center */}
        <div className="lg:col-span-5 px-6 lg:px-8 py-7 lg:py-8 border-b-2 lg:border-b-0 lg:border-e-2 border-ink/10 bg-cream/35 flex flex-col text-center">
          {/* eyebrow + شماره —— هم‌ترازی چپ و راست برای حفظ حس بایگانی، در وسط‌چینی شرکت نمی‌کند */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
              {eyebrow}
            </span>
            <span className="font-display font-extrabold text-[22px] text-ink/25 leading-none">
              0{index + 1}
            </span>
          </div>

          {/* گروه جلد —— فشرده، وسط‌چین */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            {/* تصویرسازی */}
            <IllustrationImage
              src={`/imgs/site/Illustration-${illustrationId}.png`}
              alt={illustrationCaption}
              animation="up"
              className="!w-auto"
              imgClassName="!w-auto max-h-[200px] max-w-[260px] object-contain"
            />

            {/* عنوان + زیرعنوان چسبیده به هم در یک گروه */}
            <div>
              <h3 className="font-display font-extrabold text-[26px] lg:text-[30px] text-ink leading-[1.1]">
                {title}
              </h3>
              {titleAccent && (
                <p
                  className={`font-display font-extrabold text-[14px] lg:text-[15px] leading-tight mt-1.5 ${accentTextOnSurface[accent]}`}
                >
                  「{titleAccent}」
                </p>
              )}
            </div>

            {/* تعداد مطالب —— عدد بزرگ + برچسب کوچک در خط بعد */}
            <div>
              <div className="font-display font-extrabold text-[44px] lg:text-[52px] text-ink leading-none">
                {count}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-2">
                {countSuffix}
              </div>
            </div>
          </div>
        </div>

        {/* ── راست: فهرست مراحل/ماژول‌ها ─────────────────────── */}
        <div className="lg:col-span-7 px-6 lg:px-8 py-7 lg:py-9">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 mb-5">
            § جزئیات محتوا
          </div>
          <ul className="space-y-4 lg:space-y-5">
            {stages.map((stage) => (
              <li key={stage.badge + stage.title} className="flex gap-3">
                {/* badge */}
                <span
                  className={`flex-shrink-0 inline-flex items-center justify-center self-start min-w-[58px] h-6 px-2 ${accentBadgeBg[accent]} border-2 border-ink rounded-full font-mono text-[10px] font-bold whitespace-nowrap`}
                >
                  {stage.badge}
                </span>
                {/* content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h4 className="font-display font-extrabold text-[15px] text-ink leading-snug">
                      {stage.title}
                    </h4>
                    {stage.caption && (
                      <span className="font-serif italic text-[12px] text-ink-tertiary">
                        — {stage.caption}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {stage.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default KnowledgePlanet;
