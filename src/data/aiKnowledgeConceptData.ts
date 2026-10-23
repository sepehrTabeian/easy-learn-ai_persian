/**
 * دانش بصری AI · داده توضیح مفاهیم (منبع واحد داده / Single Source of Truth)
 *
 * این‌جا همه اطلاعات «یک مفهوم» است: فیلدهای پایه + مسیر یادگیری مربوطه (line) + نام کوتاه (short).
 * نمای فهرست بر اساس line گروه‌بندی می‌شود، نمای کلی (نقشه دانش بصری) هم خطوط مترو را بر اساس line می‌چیند —— معیار دسته‌بندی کاملاً یکسان است.
 * «یال‌های ارتباط» بین مفاهیم جداگانه در conceptGraphData.ts نگهداری می‌شوند.
 *
 * ⚠️ برای افزودن یک مفهوم جدید، فقط یک مورد (شامل line) در این فایل اضافه کنید و سپس در conceptGraphData.ts یال‌های ارتباط آن را تکمیل کنید:
 *    - دسته‌بندی / نام کوتاه / مختصات نمای کلی / اندازه hub همه خودکار مشتق می‌شوند
 *    - اگر line فراموش شود یا یال به id ناموجود ارجاع دهد، در حالت توسعه در کنسول هشدار داده می‌شود
 *
 * ترتیب آرایه = ترتیب یادگیری درون یک خط (بر اساس ترتیب LEARNING_LINES دسته‌بندی شده).
 */

import { AIKnowledgeConceptItem, LearningLine } from "../types";

/* ════════════════════════════════════════════════════════════════════
 * مسیرهای یادگیری (سیستم دسته‌بندی یکپارچه) · ترتیب همان ترتیب پیشنهادی یادگیری است
 * ════════════════════════════════════════════════════════════════════ */
export const LEARNING_LINES: LearningLine[] = [
  {
    id: "foundation",
    name: "مسیر مبانی مقدماتی",
    tag: "مبانی مقدماتی",
    blurb: "بفهمید مدل بزرگ واقعاً چیست، متن را چطور می‌خواند و معماری زیرینش چه شکلی دارد",
    color: "#2A9D8F",
    startHint: "همه از این‌جا شروع می‌کنند",
  },
  {
    id: "prompt",
    name: "مسیر مهندسی پرامپت",
    tag: "پرامپت‌ها",
    blurb: "یاد بگیرید حرفتان را واضح بزنید تا مدل بفهمد دقیقاً چه می‌خواهید",
    color: "#7A28CB",
    startHint: "اگر با ChatGPT کار کرده‌اید می‌توانید یاد بگیرید",
  },
  {
    id: "arch",
    name: "مسیر خانواده معماری‌ها",
    tag: "خانواده معماری‌ها",
    blurb: "چند شاخه اصلی مدل که از Transformer مشتق شده‌اند؛ یکی را انتخاب و عمیق شوید",
    color: "#6D597A",
    startHint: "بعد از فهم Transformer بیایید",
  },
  {
    id: "train",
    name: "مسیر آموزش و هم‌ترازی",
    tag: "آموزش و هم‌ترازی",
    blurb: "کل فرایند یک مدل از خوردن داده تا یادگیری فرمان‌برداری و استدلال",
    color: "#3D8B40",
    startHint: "می‌خواهید بدانید مدل چگونه آموزش داده می‌شود",
  },
  {
    id: "finetune",
    name: "مسیر تنظیم دقیق و پارامترها",
    tag: "تنظیم دقیق و پارامترها",
    blurb: "تبدیل مدل آماده به شکلی که می‌خواهید، و چند پیچ تنظیم کلیدی",
    color: "#E8A33D",
    startHint: "مدل دارید و می‌خواهید آن را تغییر دهید",
  },
  {
    id: "deploy",
    name: "مسیر فشرده‌سازی و استقرار",
    tag: "فشرده‌سازی و استقرار",
    blurb: "کوچک کردن مدل بزرگ، بسته‌بندی و واقعاً اجرا کردن آن",
    color: "#C44536",
    startHint: "مدل آموزش دیده، حالا چطور از آن استفاده کنیم",
  },
  {
    id: "agent",
    name: "مسیر کاربردهای Agent",
    tag: "Agent",
    blurb: "مدل فقط به سؤال جواب ندهد، بلکه ابزار صدا بزند و کارها را گام‌به‌گام انجام دهد",
    color: "#E07A5F",
    startHint: "می‌خواهید AI واقعاً کار انجام دهد",
  },
  {
    id: "rag",
    name: "مسیر بازیابی تقویت‌شده",
    tag: "بازیابی تقویت‌شده",
    blurb: "به مدل یک کتابخانه بیرونی وصل کنید تا عادت «نمی‌دانم ولی وانمود می‌کنم» را درمان کنید",
    color: "#2A6F97",
    startHint: "از چرندگویی مدل / دانش قدیمی آن خسته‌اید",
  },
  {
    id: "safety",
    name: "مسیر امنیت AI",
    tag: "امنیت AI",
    blurb: "بفهمید مدل چگونه منحرف می‌شود و سپس برای ورودی، دسترسی‌ها و خروجی خط دفاعی بگذارید",
    color: "#FF4D74",
    startHint: "وقتی AI شروع به خواندن منابع و صدا زدن ابزار می‌کند",
  },
];

/** جدول مرجع سریع مسیرهای یادگیری: id ← metadata */
export const lineById: Record<string, LearningLine> = LEARNING_LINES.reduce(
  (acc, l) => {
    acc[l.id] = l;
    return acc;
  },
  {} as Record<string, LearningLine>,
);

/** نام کوتاه مفهوم: اولویت با short، در غیر این صورت پیشوند «درک آسان» خودکار حذف می‌شود */
export const conceptShortLabel = (item: {
  title: string;
  short?: string;
}): string => item.short ?? item.title.replace(/^درک آسان\s*/, "").trim();

/* ════════════════════════════════════════════════════════════════════
 * فهرست مفاهیم (بر اساس مسیر یادگیری دسته‌بندی شده؛ ترتیب آرایه = ترتیب یادگیری درون مسیر)
 * ════════════════════════════════════════════════════════════════════ */
export const aiKnowledgeConceptData: AIKnowledgeConceptItem[] = [
  /* ── مسیر مبانی مقدماتی ── */
  {
    id: "nlp",
    title: "درک آسان NLP",
    description: "NLP مخفف پردازش زبان طبیعی است و یکی از شاخه‌های مهم حوزه هوش مصنوعی است",
    category: "تنظیم دقیق مدل",
    line: "foundation",
    imageUrl: "/imgs/nlp.png",
    htmlUrl: "/nlp/index.html",
  },
  {
    id: "token",
    title: "درک آسان Token",
    description:
      "Token کوچک‌ترین واحدی است که مدل هنگام تولید متن استفاده می‌کند؛ هر Token نماینده یک کلمه یا بخشی از یک کلمه است.",
    category: "مبانی مدل",
    line: "foundation",
    imageUrl: "/imgs/token.png",
    htmlUrl: "/token/index.html",
  },
  {
    id: "llm",
    title: "درک آسان LLM",
    description:
      "LLM یک فناوری انقلابی هوش مصنوعی است که توانایی ماشین در فهم و تولید زبان طبیعی را از نو تعریف می‌کند.",
    category: "مبانی مدل",
    line: "foundation",
    imageUrl: "/imgs/llm.png",
    htmlUrl: "/llm/index.html",
  },
  {
    id: "transformer",
    title: "درک آسان Transformer",
    description:
      "Transformer یک فناوری انقلابی هوش مصنوعی است که توانایی ماشین در فهم و تولید زبان طبیعی را از نو تعریف می‌کند.",
    category: "مبانی مدل",
    line: "foundation",
    imageUrl: "/imgs/transformer.png",
    htmlUrl: "/transformer/index.html",
  },
  {
    id: "attention",
    title: "درک آسان مکانیزم توجه",
    description:
      "مکانیزم توجه به مدل اجازه می‌دهد برای محتوای فعلی موقعیت‌های مرتبط را انتخاب کند و اطلاعات لازم را بر اساس وزن بازیابی کند.",
    category: "مبانی مدل",
    line: "foundation",
    short: "توجه",
    imageUrl: "/imgs/attention.png",
    htmlUrl: "/attention/index.html",
  },
  {
    id: "multi-head-attention",
    title: "درک آسان Multi-Head Attention",
    description:
      "توجه چندسر چند گروه توجه را موازی اجرا می‌کند تا مدل هم‌زمان روابط مختلف در متن را ببیند.",
    category: "مبانی مدل",
    line: "foundation",
    short: "توجه چندسر",
    imageUrl: "/imgs/multi-head-attention.png",
    htmlUrl: "/multi-head-attention/index.html",
  },
  {
    id: "multi-query-attention",
    title: "درک آسان Multi-Query Attention",
    description:
      "Multi-Query Attention چند سرِ query را نگه می‌دارد و هم‌زمان اجازه می‌دهد همه یک مجموعه key و value مشترک داشته باشند.",
    category: "مبانی مدل",
    line: "foundation",
    short: "MQA",
    imageUrl: "/imgs/multi-query-attention.png",
    htmlUrl: "/multi-query-attention/index.html",
  },

  /* ── مسیر مهندسی پرامپت ── */
  {
    id: "prompt",
    title: "درک آسان Prompt",
    description:
      "Prompt همان متن دستوری است که برای مدل می‌فرستید و به آن می‌گویید چه کاری انجام دهد؛ اولین درگاه استفاده از مدل‌های بزرگ است.",
    category: "پرامپت‌ها",
    line: "prompt",
    imageUrl: "/imgs/prompt.png",
    htmlUrl: "/prompt/index.html",
  },
  {
    id: "system-prompt",
    title: "درک آسان System Prompt",
    description:
      "System Prompt دستوری است که از پیش در ابتدای گفتگو تنظیم می‌شود تا نقش، مرزها، لحن و قالب خروجی مدل را تعیین کند.",
    category: "پرامپت‌ها",
    line: "prompt",
    short: "System Prompt",
    imageUrl: "/imgs/system-prompt.png",
    htmlUrl: "/system-prompt/index.html",
  },
  {
    id: "few-shot",
    title: "درک آسان Few-shot",
    description:
      "Few-shot یعنی در prompt چند نمونه به مدل بدهید تا با الگو گرفتن از قالب و طرز فکر آن‌ها کار جدید را انجام دهد، بدون آموزش مجدد.",
    category: "پرامپت‌ها",
    line: "prompt",
    short: "Few-shot",
    imageUrl: "/imgs/few-shot.png",
    htmlUrl: "/few-shot/index.html",
  },
  {
    id: "chain-of-thought",
    title: "درک آسان Chain of Thought",
    description:
      "Chain of Thought باعث می‌شود مدل اول فرایند استدلال را گام‌به‌گام بنویسد و بعد پاسخ دهد؛ نرخ درستی در مسائل پیچیده به‌طور محسوسی بالاتر می‌رود.",
    category: "پرامپت‌ها",
    line: "prompt",
    short: "CoT",
    imageUrl: "/imgs/chain-of-thought.png",
    htmlUrl: "/chain-of-thought/index.html",
  },

  /* ── مسیر خانواده معماری‌ها ── */
  {
    id: "bert",
    title: "درک آسان BERT",
    description:
      "BERT (مبتنی بر معماری Encoder-Only) یک مدل زبانی پیش‌آموزش‌دیده است که Google در سال ۲۰۱۸ منتشر کرد.",
    category: "مبانی مدل",
    line: "arch",
    imageUrl: "/imgs/bert.png",
    htmlUrl: "/bert/index.html",
  },
  {
    id: "gpt",
    title: "درک آسان GPT",
    description:
      "GPT (مبتنی بر معماری Decoder-Only PLM) یک مدل زبانی پیش‌آموزش‌دیده است که OpenAI در سال ۲۰۲۲ منتشر کرد.",
    category: "مبانی مدل",
    line: "arch",
    imageUrl: "/imgs/gpt.png",
    htmlUrl: "/gpt/index.html",
  },
  {
    id: "llama",
    title: "درک آسان Llama",
    description:
      "LLama (مبتنی بر معماری Decoder-Only) یک مدل زبانی پیش‌آموزش‌دیده است که Meta در سال ۲۰۲۳ منتشر کرد.",
    category: "مبانی مدل",
    line: "arch",
    imageUrl: "/imgs/llama.png",
    htmlUrl: "/llama/index.html",
  },
  {
    id: "t5",
    title: "درک آسان T5",
    description:
      "T5 (مبتنی بر معماری Encoder-Decoder) یک مدل زبانی پیش‌آموزش‌دیده است که Google ارائه کرد.",
    category: "مبانی مدل",
    line: "arch",
    imageUrl: "/imgs/t5.png",
    htmlUrl: "/t5/index.html",
  },
  {
    id: "moe",
    title: "درک آسان MoE",
    description: "یک معماری مدل مبتنی بر مسیریابی متخصص‌ها که می‌تواند کارهای مختلف را موازی پردازش کند.",
    category: "مبانی مدل",
    line: "arch",
    imageUrl: "/imgs/moe.png",
    htmlUrl: "/moe/index.html",
  },
  {
    id: "multimodality",
    title: "درک آسان چندوجهی",
    description: "AI را قادر می‌سازد داده‌هایی از وجه‌های مختلف مثل تصویر، ویدئو و صدا را بفهمد و تولید کند",
    category: "مبانی مدل",
    line: "arch",
    imageUrl: "/imgs/multimodality.png",
    htmlUrl: "/multimodality/index.html",
  },
  {
    id: "modality-encoding",
    title: "درک آسان کدگذاری وجه",
    description: "کدگذاری وجه تصویر و صدا را به قطعه‌هایی تقسیم می‌کند و سپس به اعدادی تبدیل می‌کند که مدل بتواند روی آن‌ها محاسبه کند.",
    category: "مبانی مدل",
    line: "arch",
    short: "کدگذاری وجه",
    imageUrl: "/imgs/modality-encoding.png",
    htmlUrl: "/modality-encoding/index.html",
  },
  {
    id: "representation-space",
    title: "درک آسان فضای بازنمایی",
    description: "فضای بازنمایی ویژگی‌های محتوا را با موقعیت و جهت عددی ذخیره می‌کند تا مدل بتواند معانی را مقایسه، ترکیب و به‌روزرسانی کند.",
    category: "مبانی مدل",
    line: "arch",
    short: "فضای بازنمایی",
    imageUrl: "/imgs/representation-space.png",
    htmlUrl: "/representation-space/index.html",
  },
  {
    id: "deepseek-r1",
    title: "درک آسان DeepSeek R1",
    description: "DeepSeek R1 با الگوریتم‌های نوآورانه به مدل زبانی بزرگ توانایی استدلال قوی می‌دهد.",
    category: "مبانی مدل",
    line: "arch",
    imageUrl: "/imgs/deepseek-r1.png",
    htmlUrl: "/deepseek-r1/index.html",
  },

  /* ── مسیر آموزش و هم‌ترازی ── */
  {
    id: "training-dataset",
    title: "درک آسان مجموعه‌داده آموزشی",
    description:
      "مجموعه‌داده آموزشی همان حجم زیاد موادی است که برای یادگیری به مدل داده می‌شود؛ کیفیت، پوشش و میزان پاک‌سازی آن تا حد زیادی توانایی مدل را تعیین می‌کند.",
    category: "داده آموزشی",
    line: "train",
    short: "مجموعه‌داده آموزشی",
    imageUrl: "/imgs/training-dataset.png",
    htmlUrl: "/training-dataset/index.html",
  },
  {
    id: "data-cleaning",
    title: "درک آسان پاک‌سازی داده",
    description:
      "پاک‌سازی داده یعنی داده خام کثیف و درهم را یک بار غربال کنیم: حذف تکراری‌ها، حذف نویز، فیلتر محتوای کم‌کیفیت و مضر، یکسان‌سازی قالب، تا مدل فقط داده تمیز بخواند.",
    category: "داده آموزشی",
    line: "train",
    short: "پاک‌سازی داده",
    imageUrl: "/imgs/data-cleaning.png",
    htmlUrl: "/data-cleaning/index.html",
  },
  {
    id: "data-annotation",
    title: "درک آسان برچسب‌گذاری داده",
    description:
      "برچسب‌گذاری داده یعنی چسباندن «پاسخ درست» یا برچسب به داده خام، برای تنظیم دقیق نظارت‌شده، ارزیابی نتیجه و یادگیری ترجیح؛ می‌تواند انسانی یا نیمه‌خودکار انجام شود.",
    category: "داده آموزشی",
    line: "train",
    short: "برچسب‌گذاری داده",
    imageUrl: "/imgs/data-annotation.png",
    htmlUrl: "/data-annotation/index.html",
  },
  {
    id: "dataset-construction",
    title: "درک آسان ساخت مجموعه‌داده",
    description:
      "ساخت مجموعه‌داده یعنی با ابزارهایی مثل Easy Dataset اسناد را خودکار به داده پرسش و پاسخی تبدیل کنیم که مدل مستقیم بتواند یاد بگیرد، و پاک‌سازی، تولید و خروجی گرفتن را انجام دهیم.",
    category: "داده آموزشی",
    line: "train",
    short: "ساخت مجموعه‌داده",
    imageUrl: "/imgs/dataset-construction.png",
    htmlUrl: "/dataset-construction/index.html",
  },
  {
    id: "mga",
    title: "درک آسان MGA",
    description:
      "MGA یک روش نوآورانه تقویت داده است که با یک چارچوب سبک، پیکره موجود را به‌طور نظام‌مند به گونه‌های متنوع بازسازی می‌کند.",
    category: "ترکیب داده",
    line: "train",
    imageUrl: "/imgs/mga.png",
    htmlUrl: "/mga/index.html",
  },
  {
    id: "pretrain",
    title: "درک آسان پیش‌آموزش",
    description: "پیش‌آموزش نخستین مرحله آموزش مدل زبانی بزرگ است",
    category: "آموزش مدل",
    line: "train",
    imageUrl: "/imgs/pretrain.png",
    htmlUrl: "/pretrain/index.html",
  },
  {
    id: "sft",
    title: "درک آسان SFT",
    description: "SFT گام کلیدی تبدیل مدل پیش‌آموزش‌دیده به دستیار کاربردی AI است",
    category: "تنظیم دقیق مدل",
    line: "train",
    imageUrl: "/imgs/sft.png",
    htmlUrl: "/sft/index.html",
  },
  {
    id: "rlhf",
    title: "درک آسان RLHF",
    description: "با یادگیری تقویتی، ترجیحات ذهنی انسان را به هدف بهینه‌سازی عینی مدل تبدیل می‌کند.",
    category: "تنظیم دقیق مدل",
    line: "train",
    imageUrl: "/imgs/rlhf.png",
    htmlUrl: "/rlhf/index.html",
  },
  {
    id: "reward-model",
    title: "درک آسان مدل پاداش",
    description: "مدل پاداش ترجیح انسان نسبت به پاسخ‌ها را یاد می‌گیرد و به خروجی‌های جدید مدل امتیاز نسبی می‌دهد.",
    category: "تنظیم دقیق مدل",
    line: "train",
    short: "مدل پاداش",
    imageUrl: "/imgs/reward-model.png",
    htmlUrl: "/reward-model/index.html",
  },
  {
    id: "dpo",
    title: "درک آسان DPO",
    description: "DPO مستقیماً با داده ترجیح پاسخ‌ها مدل را تنظیم می‌کند و مدل پاداش مستقل و یادگیری تقویتی را حذف می‌کند.",
    category: "تنظیم دقیق مدل",
    line: "train",
    short: "DPO",
    imageUrl: "/imgs/dpo.png",
    htmlUrl: "/dpo/index.html",
  },
  /* ── مسیر تنظیم دقیق و پارامترها ── */
  {
    id: "whyfinetune",
    title: "درک آسان چرا تنظیم دقیق",
    description: "مقایسه متن طولانی، پایگاه دانش و تنظیم دقیق",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    short: "چرا تنظیم دقیق",
    imageUrl: "/imgs/whyfinetune.png",
    htmlUrl: "/whyfinetune/index.html",
  },
  {
    id: "finetune",
    title: "درک آسان روش‌های تنظیم دقیق مدل",
    description: "مقایسه روش‌های مختلف تنظیم دقیق: تنظیم دقیق تمام‌پارامتر، تنظیم دقیق LoRA و تنظیم دقیق منجمد",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    short: "روش‌های تنظیم دقیق",
    imageUrl: "/imgs/finetune.png",
    htmlUrl: "/finetune/index.html",
  },
  {
    id: "lora",
    title: "درک آسان LoRA",
    description: "LoRA یکی از محبوب‌ترین روش‌های کارآمد تنظیم دقیق مدل‌های بزرگ در حال حاضر است",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    imageUrl: "/imgs/lora.png",
    htmlUrl: "/lora/index.html",
  },
  {
    id: "lora-rank",
    title: "درک آسان پارامتر تنظیم دقیق: رتبه LoRA",
    description: "LoRA Rank توان بیان مدل را هنگام تنظیم دقیق تعیین می‌کند",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    short: "رتبه LoRA",
    imageUrl: "/imgs/lora-rank.png",
    htmlUrl: "/lora-rank/index.html",
  },
  {
    id: "lr",
    title: "درک آسان پارامتر تنظیم دقیق: نرخ یادگیری",
    description: "نرخ یادگیری میزان تغییر پارامترها در هر به‌روزرسانی مدل را تعیین می‌کند.",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    short: "نرخ یادگیری",
    imageUrl: "/imgs/lr.png",
    htmlUrl: "/learning-rate/index.html",
  },
  {
    id: "epochs",
    title: "درک آسان پارامتر تنظیم دقیق: تعداد دوره‌ها",
    description: "یک Epoch یعنی مدل یک بار به‌طور کامل کل مجموعه‌داده آموزشی را پیمایش کند.",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    short: "تعداد دوره‌ها",
    imageUrl: "/imgs/epochs.png",
    htmlUrl: "/epochs/index.html",
  },
  {
    id: "bs",
    title: "درک آسان پارامتر تنظیم دقیق: اندازه دسته",
    description:
      "اندازه دسته یعنی تعداد نمونه‌هایی که در فرایند آموزش در هر بار به‌روزرسانی پارامترهای مدل استفاده می‌شود.",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    short: "اندازه دسته",
    imageUrl: "/imgs/bs.png",
    htmlUrl: "/batch-size/index.html",
  },
  {
    id: "loss",
    title: "درک آسان Loss",
    description: "Loss معیاری است که مدل در فرایند آموزش برای سنجش اختلاف مقدار پیش‌بینی و مقدار واقعی استفاده می‌کند",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    imageUrl: "/imgs/loss.png",
    htmlUrl: "/loss/index.html",
  },
  {
    id: "deepspeed",
    title: "درک آسان DeepSpeed",
    description: "یک کتابخانه بهینه‌سازی یادگیری عمیق که هدفش ساده کردن فرایند آموزش و استنتاج توزیع‌شده است",
    category: "تنظیم دقیق مدل",
    line: "finetune",
    imageUrl: "/imgs/deepspeed.png",
    htmlUrl: "/deepspeed/index.html",
  },

  /* ── مسیر فشرده‌سازی و استقرار ── */
  {
    id: "distill",
    title: "درک آسان تقطیر مدل",
    description: "تقطیر مدل فناوری فشرده کردن دانش یک مدل بزرگ پیچیده در یک مدل کوچک سبک است.",
    category: "مبانی مدل",
    line: "deploy",
    imageUrl: "/imgs/distill.png",
    htmlUrl: "/distill/index.html",
  },
  {
    id: "quantization",
    title: "درک آسان کوانتیزه‌سازی مدل",
    description: "کوانتیزه‌سازی مدل فناوری تبدیل وزن‌های مدل به نمایش با دقت پایین‌تر است.",
    category: "مبانی مدل",
    line: "deploy",
    imageUrl: "/imgs/quantization.png",
    htmlUrl: "/quantization/index.html",
  },
  {
    id: "gguf",
    title: "درک آسان GGUF",
    description: "GGUF قالبی برای ذخیره، بارگذاری و استقرار کارآمدتر مدل است",
    category: "استقرار مدل",
    line: "deploy",
    imageUrl: "/imgs/gguf.png",
    htmlUrl: "/gguf/index.html",
  },
  {
    id: "deployment",
    title: "درک آسان استقرار مدل",
    description: "مقایسه Ollama و VLLM، دو راهکار اصلی استقرار محلی",
    category: "استقرار مدل",
    line: "deploy",
    imageUrl: "/imgs/deployment.png",
    htmlUrl: "/deploy/index.html",
  },
  {
    id: "model-inference",
    title: "درک آسان استنتاج مدل",
    description:
      "استنتاج مدل فرایند اجرایی است که ورودی را به مدل آموزش‌دیده می‌دهد تا گام‌به‌گام محاسبه کند و پاسخ تولید کند.",
    category: "استقرار مدل",
    line: "deploy",
    short: "استنتاج مدل",
    imageUrl: "/imgs/model-inference.png",
    htmlUrl: "/model-inference/index.html",
  },
  {
    id: "kv-cache",
    title: "درک آسان KV Cache",
    description:
      "KV Cache محتوای تاریخچه‌ای که در فرایند تولید محاسبه شده را ذخیره می‌کند تا Tokenهای بعدی مجبور نباشند متن قبلی را دوباره محاسبه کنند.",
    category: "استقرار مدل",
    line: "deploy",
    short: "KV Cache",
    imageUrl: "/imgs/kv-cache.png",
    htmlUrl: "/kv-cache/index.html",
  },
  {
    id: "continuous-batching",
    title: "درک آسان Continuous Batching",
    description:
      "Continuous Batching پس از هر دور تولید درخواست‌های جدید را پویا اضافه می‌کند تا کارت گرافیک کمتر بیکار بماند و توان عملیاتی استنتاج بالا برود.",
    category: "استقرار مدل",
    line: "deploy",
    short: "دسته‌بندی پیوسته",
    imageUrl: "/imgs/continuous-batching.png",
    htmlUrl: "/continuous-batching/index.html",
  },
  {
    id: "speculative-decoding",
    title: "درک آسان رمزگشایی گمانه‌ای",
    description:
      "رمزگشایی گمانه‌ای اجازه می‌دهد یک دستیار سریع‌تر اول پیش‌نویس بنویسد و سپس مدل اصلی آن را دسته‌ای تأیید کند تا دورهای تولید مدل اصلی کم شود.",
    category: "استقرار مدل",
    line: "deploy",
    short: "رمزگشایی گمانه‌ای",
    imageUrl: "/imgs/speculative-decoding.png",
    htmlUrl: "/speculative-decoding/index.html",
  },
  {
    id: "structured-output",
    title: "درک آسان خروجی ساختاریافته",
    description:
      "خروجی ساختاریافته نتیجه را بر اساس فیلدها و نوع‌های از پیش تعیین‌شده تولید می‌کند تا برنامه بتواند قالب‌های ثابتی مثل JSON را پایدار بخواند.",
    category: "استقرار مدل",
    line: "deploy",
    short: "خروجی ساختاریافته",
    imageUrl: "/imgs/structured-output.png",
    htmlUrl: "/structured-output/index.html",
  },
  {
    id: "safetensors",
    title: "درک آسان Safetensors",
    description:
      "Safetensors یک قالب فایل است که فقط اعداد وزن مدل را ذخیره می‌کند و هنگام بارگذاری هیچ کدی اجرا نمی‌کند؛ امن و سریع.",
    category: "استقرار مدل",
    line: "deploy",
    short: "Safetensors",
    imageUrl: "/imgs/safetensors.png",
    htmlUrl: "/safetensors/index.html",
  },
  {
    id: "onnx",
    title: "درک آسان ONNX",
    description:
      "ONNX کل گراف محاسباتی مدل را در یک قالب عمومی ذخیره می‌کند تا مدل بتواند بین فریم‌ورک‌ها و دستگاه‌ها بدون تغییر اجرا شود.",
    category: "استقرار مدل",
    line: "deploy",
    short: "ONNX",
    imageUrl: "/imgs/onnx.png",
    htmlUrl: "/onnx/index.html",
  },
  {
    id: "precision-formats",
    title: "درک آسان فرمت‌های دقت مدل بزرگ",
    description:
      "فرمت دقت یعنی هر عدد در مدل با چند بیت ذخیره و چگونه تقسیم شود: FP32، BF16، FP16، FP8.",
    category: "استقرار مدل",
    line: "deploy",
    short: "فرمت دقت",
    imageUrl: "/imgs/precision-formats.png",
    htmlUrl: "/precision-formats/index.html",
  },

  /* ── مسیر کاربردهای Agent ── */
  {
    id: "agent",
    title: "درک آسان Agent",
    description: "AI نه فقط ماشین پاسخ‌گویی، بلکه عاملی هوشمند که کار انجام می‌دهد",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/agent.png",
    htmlUrl: "/agent/index.html",
  },
  {
    id: "agent-loop",
    title: "درک آسان Agent Loop",
    description:
      "چرخه اجرای تکراری Agent: LLM در یک حلقه بارها استدلال می‌کند، ابزار صدا می‌زند و نتیجه را می‌بیند تا کار تمام شود.",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/agent-loop.png",
    htmlUrl: "/agent-loop/index.html",
  },
  {
    id: "function-calling",
    title: "درک آسان Function Calling",
    description:
      "Function Calling روش مهم تعامل مدل‌های زبانی بزرگ با منابع داده و ابزارهای بیرونی است.",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/function-calling.png",
    htmlUrl: "/function-calling/index.html",
  },
  {
    id: "mcp",
    title: "درک آسان MCP",
    description:
      "یک پروتکل استاندارد باز که هدفش حل مشکل تعامل مدل‌های AI با منابع داده و ابزارهای بیرونی است.",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/mcp.png",
    htmlUrl: "/mcp/index.html",
  },
  {
    id: "sub-agent",
    title: "درک آسان SubAgent",
    description:
      "کارهای اکتشافی که context اصلی را آلوده می‌کنند به یک فضای مستقل فرستاده می‌شوند و فقط عصاره آن به گفتگوی اصلی برمی‌گردد.",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/sub-agent.png",
    htmlUrl: "/sub-agent/index.html",
  },
  {
    id: "agent-todo",
    title: "درک آسان Agent TodoList",
    description:
      "مکانیزم Checklist در Agent: جلوگیری از فراموشی، نمایش پیشرفت به کاربر و پشتیبانی از هماهنگ‌سازی پیچیده.",
    category: "Agent",
    line: "agent",
    short: "TodoList",
    imageUrl: "/imgs/agent-todo.png",
    htmlUrl: "/agent-todo/index.html",
  },
  {
    id: "agent-modes",
    title: "درک آسان حالت‌های اجرای Agent",
    description: "سه حالت Plan / Default / Auto: یافتن نقطه تعادل بین خودمختاری و امنیت.",
    category: "Agent",
    line: "agent",
    short: "حالت‌های اجرا",
    imageUrl: "/imgs/agent-modes.png",
    htmlUrl: "/agent-modes/index.html",
  },
  {
    id: "agent-sandbox",
    title: "درک آسان Sandbox در Agent",
    description:
      "یک حصار امن برای Agent: دو خط ایزوله‌سازی فایل‌سیستم + شبکه، که در سطح OS اجباری می‌شود.",
    category: "Agent",
    line: "agent",
    short: "Sandbox",
    imageUrl: "/imgs/agent-sandbox.png",
    htmlUrl: "/agent-sandbox/index.html",
  },
  {
    id: "agent-memory",
    title: "درک آسان حافظه Agent",
    description:
      "Agent اطلاعات را بیرون از context window نگه می‌دارد: ترجیحات، تنظیمات و اشتباهات گذشته را بین گفتگوها به خاطر می‌سپارد.",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/agent-memory.png",
    htmlUrl: "/agent-memory/index.html",
  },
  {
    id: "context-window",
    title: "درک آسان Context Window",
    description:
      "کل «حافظه کاری» LLM: همان متنی که در هر درخواست به آن داده می‌شود، موقت و محدود.",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/context-window.png",
    htmlUrl: "/context-window/index.html",
  },
  {
    id: "multi-agent",
    title: "درک آسان Multi Agent",
    description:
      "یک کار بزرگ را بین چند Agent که هر کدام مسئول بخشی‌اند تقسیم کنید: برنامه‌ریزی، اجرا، بازبینی و جمع‌بندی، با تقسیم کار و همکاری.",
    category: "Agent",
    line: "agent",
    short: "چندعاملی",
    imageUrl: "/imgs/multi-agent.png",
    htmlUrl: "/multi-agent/index.html",
  },
  {
    id: "context-engineering",
    title: "درک آسان Context Engineering",
    description:
      "مدیریت اطلاعاتی که مدل در هر بار کار می‌بیند: کدام‌ها را داخل بگذاریم، چطور فشرده کنیم، چطور جدا قرار دهیم.",
    category: "Agent",
    line: "agent",
    short: "مهندسی context",
    imageUrl: "/imgs/context-engineering.png",
    htmlUrl: "/context-engineering/index.html",
  },

  /* ── مسیر بازیابی تقویت‌شده ── */
  {
    id: "rag",
    title: "درک آسان RAG",
    description:
      "RAG یعنی فناوری تولید تقویت‌شده با بازیابی، راهکاری مهم در حوزه مدل‌های زبانی بزرگ برای حل مسائل واقعیت‌محور.",
    category: "RAG",
    line: "rag",
    imageUrl: "/imgs/rag.png",
    htmlUrl: "/rag/index.html",
  },
  {
    id: "embedding",
    title: "درک آسان Embedding",
    description:
      "Embedding محتوایی مثل متن و تصویر را به بردار تبدیل می‌کند تا ماشین بتواند بر اساس شباهت معنایی جستجو و مقایسه کند.",
    category: "RAG",
    line: "rag",
    imageUrl: "/imgs/embedding.png",
    htmlUrl: "/embedding/index.html",
  },
  {
    id: "chunk",
    title: "درک آسان Chunk",
    description: "Chunk یعنی تقسیم منابع طولانی به قطعه‌های کوچک تا RAG بتواند بر اساس سؤال محتوای دقیقاً کافی را بازیابی کند.",
    category: "RAG",
    line: "rag",
    imageUrl: "/imgs/chunk.png",
    htmlUrl: "/chunk/index.html",
  },
  {
    id: "vector-database",
    title: "درک آسان پایگاه داده برداری",
    description:
      "پایگاه داده برداری مسئول ذخیره بردارها و بازیابی بر اساس شباهت است و شرایط دسترسی و منبع را هم با هم مدیریت می‌کند.",
    category: "RAG",
    line: "rag",
    imageUrl: "/imgs/vector-database.png",
    htmlUrl: "/vector-database/index.html",
  },
  {
    id: "recall-rerank",
    title: "درک آسان بازیابی و رتبه‌بندی مجدد",
    description:
      "بازیابی اول منابع کاندید را پیدا می‌کند، سپس رتبه‌بندی مجدد قطعه‌هایی را که بهتر از پاسخ پشتیبانی می‌کنند جلو می‌آورد.",
    category: "RAG",
    line: "rag",
    imageUrl: "/imgs/recall-rerank.png",
    htmlUrl: "/recall-rerank/index.html",
  },
  {
    id: "knowledge-graph",
    title: "درک آسان گراف دانش",
    description:
      "گراف دانش افراد، مکان‌ها و چیزها را به هم وصل می‌کند و روابط بینشان را روشن می‌نویسد.",
    category: "RAG",
    line: "rag",
    short: "گراف دانش",
    imageUrl: "/imgs/knowledge-graph.png",
    htmlUrl: "/knowledge-graph/index.html",
  },
  {
    id: "graphrag",
    title: "درک آسان GraphRAG",
    description:
      "GraphRAG در امتداد روابط بین چیزها منابع را پیدا می‌کند و سپس محتوای یافته‌شده را برای پاسخ به AI می‌دهد.",
    category: "RAG",
    line: "rag",
    short: "GraphRAG",
    imageUrl: "/imgs/graphrag.png",
    htmlUrl: "/graphrag/index.html",
  },
  {
    id: "illusion",
    title: "درک آسان توهم مدل",
    description: "توهم مدل پدیده‌ای غیرواقعی و نامعقول است که هنگام تولید متن توسط مدل رخ می‌دهد.",
    category: "مبانی مدل",
    line: "rag",
    imageUrl: "/imgs/illusion.png",
    htmlUrl: "/illusion/index.html",
  },

  /* ── مسیر امنیت AI ── */
  {
    id: "prompt-injection",
    title: "درک آسان Prompt Injection",
    description:
      "Prompt Injection متن غیرقابل‌اعتماد را وارد کار می‌کند تا AI به مجموعه دستور دیگری گوش دهد.",
    category: "امنیت AI",
    line: "safety",
    short: "Prompt Injection",
    imageUrl: "/imgs/prompt-injection.png",
    htmlUrl: "/prompt-injection/index.html",
  },
  {
    id: "jailbreak",
    title: "درک آسان جیلبریک مدل",
    description:
      "جیلبریک مدل با عبارت‌های خاص محدودیت‌های ایمنی محتوا را دور می‌زند و مدل را به پاسخ دادن به درخواست‌هایی که معمولاً رد می‌کند وادار می‌کند.",
    category: "امنیت AI",
    line: "safety",
    short: "جیلبریک مدل",
    imageUrl: "/imgs/jailbreak.png",
    htmlUrl: "/jailbreak/index.html",
  },
  {
    id: "ai-guardrails",
    title: "درک آسان AI Guardrails",
    description:
      "AI Guardrails در اطراف ورودی، اقدام و خروجی بررسی، دسترسی و تأیید انسانی قرار می‌دهد.",
    category: "امنیت AI",
    line: "safety",
    short: "AI Guardrails",
    imageUrl: "/imgs/ai-guardrails.png",
    htmlUrl: "/ai-guardrails/index.html",
  },
];

/**
 * پالت رنگ دسته‌بندی توضیح مفاهیم (رنگ‌های تم Mailchimp-Freddie)
 *
 * گروه‌بندی نمای مفاهیم به مسیرهای یادگیری یکپارچه شده (رنگ از LEARNING_LINES.color گرفته می‌شود)، این جدول برای استفاده مجدد در نمای توضیح ویدئویی نگه داشته شده است.
 */
export const categoryColors: Record<string, string> = {
  "مبانی مدل": "bg-butter text-ink",
  "تنظیم دقیق مدل": "bg-butter-soft text-ink",
  "استقرار مدل": "bg-butter-tint text-ink",
  "آموزش مدل": "bg-cream text-ink",
  "ارزیابی مدل": "bg-cream text-ink",
  "تقویت داده": "bg-cream text-ink",
  "ترکیب داده": "bg-cream text-ink",
  Agent: "bg-coral text-white",
  RAG: "bg-teal text-white",
  "پرامپت‌ها": "bg-pop text-white",
  "امنیت AI": "bg-pop text-white",
};
