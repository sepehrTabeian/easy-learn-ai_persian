/**
 * صفحه اصلی · سبک Mailchimp-Freddie
 *
 * سه صحنه انیمیشن تصویرسازی اصلی:
 *   - HeroScene      —— تصویر اصلی سمت راست Hero (۱۱ تصویر لایه‌ای، ورود + چرخه)
 *   - ManifestoScene —— § چند اصل، تئاتر رشد ۸ ثانیه‌ای (دانه ← درخت بزرگ ← آبیاری ← درخشش)
 *   - CTAScene       —— لحظه جشن در بخش BIG CTA (در آغوش گرفتن ستاره + لایک + burst تزئینی)
 *
 * سبک تزئین: SVG ساده‌شده (Decorations.tsx)، در هر بخش ۲-۴ عدد، جلوه تصویر اصلی را نمی‌دزدد.
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Newspaper,
  GraduationCap,
  Users,
  ArrowUpRight,
  Zap,
  Award,
  Github,
  Cpu,
  ArrowRight,
  Star as LucideStar,
  KeyRound,
} from "lucide-react";
import {
  Sparkle4,
  Star,
  DotGrid,
  HandArrow,
  CircleScribble,
  HandUnderline,
  Heart,
} from "../components/Decorations";
import HeroScene from "../components/HeroScene";
import ManifestoScene from "../components/ManifestoScene";
import CTAScene from "../components/CTAScene";

interface Chapter {
  serial: string;
  title: string;
  enTitle: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  meta: string;
  bgColor: string;
  iconColor: string;
  invertText?: boolean;
}

const chapters: Chapter[] = [
  {
    serial: "01",
    title: "دانش بصری AI",
    enTitle: "Concepts, made readable",
    description: "مفاهیم انتزاعی AI را به تصویر و متن تفکیک می‌کنیم تا با یک نگاه اصل آن را بفهمید.",
    icon: <Brain strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-knowledge",
    meta: "۴۰+ مفهوم",
    bgColor: "bg-butter",
    iconColor: "text-ink",
  },
  {
    serial: "02",
    title: "کاربردهای AI",
    enTitle: "From idea to agent",
    description: "کاربردهای منتخب و قابل استفاده AI، از نمونه اولیه تا پیاده‌سازی.",
    icon: <Zap strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-application",
    meta: "به‌روزرسانی مداوم",
    bgColor: "bg-coral",
    iconColor: "text-ink",
  },
  {
    serial: "03",
    title: "مدل‌های AI",
    enTitle: "The model almanac",
    description: "نگاهی به مدل‌های بزرگ اصلی جهان؛ مقایسه افقی پارامترها و توانایی‌ها در یک نگاه.",
    icon: <Cpu strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-model",
    meta: "۱۰۰+ مدل",
    bgColor: "bg-cream",
    iconColor: "text-ink",
  },
  {
    serial: "04",
    title: "ارزیابی AI",
    enTitle: "Benchmarks & truths",
    description: "بنچمارک‌های اصلی را جمع‌آوری می‌کند تا توانایی واقعی مدل‌ها را منطقی ارزیابی کنید.",
    icon: <Award strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-benchmark",
    meta: "۳۰+ بنچمارک",
    bgColor: "bg-teal",
    iconColor: "text-white",
    invertText: true,
  },
  {
    serial: "05",
    title: "گزارش روزانه AI",
    enTitle: "Today, in AI",
    description: "تحولات منتخب روزانه صنعت، چکیده خواندنی‌ترین خبرهای هر روز.",
    icon: <Newspaper strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-daily",
    meta: "Daily",
    bgColor: "bg-butter-soft",
    iconColor: "text-ink",
  },
  {
    serial: "06",
    title: "آموزش‌های AI",
    enTitle: "Long-form lessons",
    description: "آموزش‌های نظام‌مند از مقدماتی تا پیشرفته، همراه با تمرین عملی از ساده به عمیق.",
    icon: <GraduationCap strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-tutorial",
    meta: "۲۰+ فصل",
    bgColor: "bg-coral",
    iconColor: "text-ink",
  },
  {
    serial: "07",
    title: "پرامپت‌های AI",
    enTitle: "Prompt anatomy",
    description: "تحلیل پرامپت‌های سیستمی عالی، و یادگیری طراحی هویت، ابزارها و مرزهای Agent.",
    icon: <KeyRound strokeWidth={2} className="w-12 h-12" />,
    path: "/ai-prompts",
    meta: "در حال گردآوری مداوم",
    bgColor: "bg-ink",
    iconColor: "text-butter",
    invertText: true,
  },
  {
    serial: "08",
    title: "سیاره دانش",
    enTitle: "The reading circle",
    description: "جامعه عمیق پولی، تا با هم‌علاقه‌ها مفاهیم را تا ته بشکافید و پروژه‌ها را تا آخر ببرید.",
    icon: <Users strokeWidth={2} className="w-12 h-12" />,
    path: "/knowledge-planet",
    meta: "دعوت به عضویت",
    bgColor: "bg-butter",
    iconColor: "text-ink",
  },
];

const Home: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
        {/* تزئین به ۱ مورد کاهش یافت —— چون خود تصویرسازی پر از عناصر تزئینی است */}
        <DotGrid
          className="absolute bottom-10 start-8 w-20 h-12 text-ink opacity-50 hidden md:block"
          color="#241C15"
          rows={3}
          cols={5}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-20 lg:pb-24">
          {/* grid دوستونه */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* چپ: عنوان + CTA */}
            <div className="lg:col-span-7">
              {/* eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-10">
                <Heart className="w-3.5 h-3.5" color="#E07A5F" filled />
                ساخته‌شده برای شمایی که عاشق یادگیری هستید
              </div>

              {/* عنوان اصلی
                  - font-display = Smiley Sans (CJK) + Vazirmatn (فارسی) + Plus Jakarta (لاتین)
                  - whitespace-nowrap دور عبارت‌های کلیدی، تا به‌طور زشتی شکسته نشوند
                  - با text-wrap: balance در لایه base تعداد کلمات هر خط خودکار متعادل می‌شود */}
              <h1 className="font-display font-extrabold text-display-2xl text-ink">
                <span className="whitespace-nowrap">یادگیری AI را</span>{" "}
                <span className="whitespace-nowrap">
                  واقعاً
                  <span className="relative inline-block ms-[0.05em]">
                    <span className="relative z-10">ساده می‌کنیم.</span>
                    <CircleScribble
                      className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] z-0"
                      color="#E07A5F"
                    />
                  </span>
                </span>
              </h1>

              {/* زیرعنوان —— text-pretty خودکار از کلمات یتیم جلوگیری می‌کند */}
              <p className="font-sans font-medium text-[18px] md:text-[20px] leading-[1.6] text-ink/85 max-w-[560px] mt-8">
                مفاهیم پیچیده AI، مدل‌ها، ارزیابی‌ها، ابزارها و خبرهای روزانه با دقت گردآوری شده‌اند تا
                <span className="bg-white px-2 mx-0.5 font-bold border-b-[3px] border-ink/85 whitespace-nowrap">
                  به‌راحتی بفهمید
                </span>
                .
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <Link
                  to="/ai-knowledge"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white border-2 border-ink rounded-full font-sans font-semibold text-[15px] shadow-stamp-lg transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#241C15] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0_0_0_0_#241C15]"
                >
                  <span>شروع به خواندن</span>
                  <ArrowUpRight
                    className="w-5 h-5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <a
                  href="https://github.com/ConardLi/easy-learn-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[15px] shadow-stamp-lg transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#241C15] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0_0_0_0_#241C15]"
                >
                  <Github className="w-5 h-5" strokeWidth={2} />
                  <span>GitHub</span>
                  <LucideStar className="w-4 h-4 fill-ink" strokeWidth={0} />
                </a>
              </div>

              {/* فلش کوچک دست‌کشیده + متن کوچک */}
              <div className="relative ps-12 mt-8 hidden md:flex items-center">
                <HandArrow
                  className="absolute start-0 top-1/2 -translate-y-1/2 w-12 h-12 -rotate-12 text-ink"
                  color="#241C15"
                />
                <span className="font-serif italic text-[15px] text-ink/70">
                  رایگان، بدون گرفتن ایمیل، بدون پاپ‌آپ
                </span>
              </div>
            </div>

            {/* راست: تصویر اصلی HERO — ۱۱ تصویر جداشده با انیمیشن مستقل */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <HeroScene />
            </div>
          </div>

          {/* metadata strip */}
          <div className="mt-16 lg:mt-20 pt-6 border-t-2 border-ink/15">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6">
              <MetaItem label="فصل‌ها" value="۸ ماژول" />
              <MetaItem label="به‌روزرسانی" value="هر روز مطلب تازه" />
              <MetaItem label="تولید" value="ConardLi · باغ مخفی" />
              <MetaItem label="هزینه" value="۰ تومان · برای همیشه" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MODULES ═══════════════════════════ */}
      <section className="relative bg-white border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-28">
          {/* Section head */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-5">
                <span>§ فهرست</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">از کدام فصل می‌خواهید</span>{" "}
                <span className="whitespace-nowrap">
                  <span className="relative inline-block">
                    <span className="relative z-10">شروع کنید</span>
                    <HandUnderline
                      className="absolute -bottom-2 start-0 end-0 w-full h-3"
                      color="#F4D35E"
                    />
                  </span>
                  ？
                </span>
              </h2>
            </div>
            <p className="font-serif italic text-[18px] text-ink-secondary md:text-end max-w-sm">
              هر فصل را می‌توان مستقل خواند؛ کافی است به ترتیب کنجکاوی‌تان پیش بروید.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {chapters.map((ch) => (
              <ChapterCard key={ch.serial} chapter={ch} />
            ))}
            <TokenGatewayCard />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MANIFESTO ═══════════════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* چپ: انیمیشن تئاتر رشد */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <ManifestoScene />
            </div>

            {/* راست: عنوان + نقل‌قول + سه ستون */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-6">
                <span>§ چند اصل</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">
                  برای ما مهم‌تر است که
                  <span className="relative inline-block ms-[0.05em]">
                    <span className="relative z-10">روشن بگوییم</span>
                    <HandUnderline
                      className="absolute -bottom-2 start-0 end-0 w-full h-3"
                      color="#E07A5F"
                    />
                  </span>
                  ，
                </span>
                <span className="whitespace-nowrap">نه این‌که زیاد بگوییم.</span>
              </h2>

              <blockquote className="font-serif italic text-[26px] md:text-[30px] leading-[1.4] text-ink mt-10">
                &ldquo;ایده‌های پیچیده سزاوار آن‌اند که
                <span className="not-italic font-sans font-extrabold bg-butter px-2 mx-0.5">
                  با حوصله
                </span>
                توضیح داده شوند.&rdquo;
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-10 border-t-2 border-ink/15">
                <Reason
                  num="i."
                  title="اولویت با تصویرسازی"
                  body="مفاهیم پیچیده با تصویر و تعامل باز می‌شوند و متن فقط نقش تکمیلی دارد."
                />
                <Reason
                  num="ii."
                  title="هر روز مطلب تازه"
                  body="برایتان غربال کرده‌ایم —— فقط چیزهایی که واقعاً ارزش ده دقیقه وقت دارند."
                />
                <Reason
                  num="iii."
                  title="گزینش، نه انباشت"
                  body="هر فصل دستی ویرایش شده؛ ترجیح می‌دهیم چند مطلب کمتر باشد تا این‌که مطلب بی‌ارزش اضافه کنیم."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ BIG CTA ═══════════════════════════ */}
      <section className="relative bg-ink border-b-2 border-ink overflow-hidden">
        {/* فقط ۲ تزئین */}
        <Sparkle4
          className="absolute top-12 start-[8%] w-7 h-7 text-butter hidden md:block"
          color="#F4D35E"
        />
        <Star
          className="absolute top-16 end-[10%] w-9 h-9 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* چپ: متن + CTA */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-display-xl text-white">
                <span className="whitespace-nowrap">برایتان مفید بود؟</span>{" "}
                <span className="whitespace-nowrap">
                  به
                  <span className="relative inline-block mx-[0.1em] align-baseline">
                    <span className="relative z-10 text-butter">GitHub</span>
                    <CircleScribble
                      className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)]"
                      color="#F4D35E"
                    />
                  </span>
                  بروید و یک ستاره بدهید.
                </span>
              </h2>
              <p className="font-serif italic text-[18px] text-white/65 mt-7 max-w-xl">
                این تنها راه جبران برای محتوای رایگان است و دلیل ما برای ادامه به‌روزرسانی.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-butter text-ink border-2 border-butter rounded-full font-sans font-extrabold text-[15px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
                >
                  <Github className="w-5 h-5" strokeWidth={2.5} />
                  <span>Star on GitHub</span>
                  <LucideStar className="w-4 h-4 fill-ink" strokeWidth={0} />
                </a>
                <Link
                  to="/knowledge-planet"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-white border-2 border-white/40 rounded-full font-sans font-semibold text-[15px] transition-all duration-250 ease-spring hover:bg-white/10 hover:border-white"
                >
                  <span>عضویت در سیاره دانش</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
            </div>

            {/* راست: صحنه جشن (شخصیت اصلی ستاره را در آغوش گرفته + لایک + burst تزئینی) */}
            <div className="lg:col-span-5">
              <CTAScene />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
      <footer className="relative bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          {/* ردیف بالا */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-7">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-butter border-2 border-ink rounded-2xl shadow-stamp">
                  <span className="font-sans font-extrabold text-[18px] text-ink">
                    E
                  </span>
                </div>
                <span className="font-sans font-extrabold text-[22px] text-ink">
                  Easy AI
                </span>
              </Link>
              <p className="font-sans text-[17px] text-ink-secondary leading-relaxed max-w-md">
                مفاهیم پیچیده AI را به شکلی درمی‌آوریم که دلتان بخواهد بخوانید.
                <br />
                با ویرایش و نگهداری مستقل، آرام آرام به‌روز می‌شود.
              </p>
            </div>
            <div className="lg:col-span-5 lg:ps-8">
              <p className="font-sans text-[15px] text-ink-secondary leading-relaxed max-w-md mb-6">
                اگر مفید بود، به GitHub بیایید و یک ستاره بدهید، یا به سیاره بپیوندید و عمیق‌تر بخوانید.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-[14px] text-ink bg-butter border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
                >
                  <Github className="w-4 h-4" strokeWidth={2} />
                  <span>Star</span>
                </a>
                <Link
                  to="/knowledge-planet"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-[14px] text-ink bg-white border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
                >
                  عضویت در سیاره
                </Link>
              </div>
            </div>
          </div>

          {/* چهار ستون لینک */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t-2 border-ink/10">
            <FooterCol
              heading="Read"
              links={[
                { name: "دانش بصری AI", path: "/ai-knowledge" },
                { name: "پرامپت‌های AI", path: "/ai-prompts" },
                { name: "کاربردهای AI", path: "/ai-application" },
              ]}
            />
            <FooterCol
              heading="Reference"
              links={[
                { name: "مدل‌های AI", path: "/ai-model" },
                { name: "ارزیابی AI", path: "/ai-benchmark" },
                { name: "گزارش روزانه AI", path: "/ai-daily" },
                { name: "آموزش‌های AI", path: "/ai-tutorial" },
              ]}
            />
            <FooterCol
              heading="Community"
              links={[
                { name: "سیاره دانش", path: "/knowledge-planet" },
                {
                  name: "Bilibili",
                  path: "https://space.bilibili.com/474921808",
                  external: true,
                },
                {
                  name: "GitHub",
                  path: "https://github.com/ConardLi/easy-learn-ai",
                  external: true,
                },
              ]}
            />
            <div>
              <div className="eyebrow mb-4">About</div>
              <p className="font-sans text-[14px] text-ink-secondary leading-[1.7]">
                Curated &amp; coded by
                <br />
                <span className="font-semibold text-ink">ConardLi</span>
                <br />
                @ code باغ مخفی
              </p>
            </div>
          </div>

          {/* پایین */}
          <div className="mt-16 pt-6 border-t-2 border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-tertiary">
              © 2025 Easy AI · All rights reserved
            </p>
            <p className="font-serif italic text-[14px] text-ink-tertiary flex items-center gap-2">
              <Heart className="w-3.5 h-3.5" color="#E07A5F" filled />
              Made for AI learners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ────────────── زیرکامپوننت‌ها ────────────── */

const MetaItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
      {label}
    </div>
    <div className="font-sans font-bold text-[15px] text-ink mt-1">{value}</div>
  </div>
);

const ChapterCard: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const ch = chapter;
  return (
    <Link
      to={ch.path}
      className="group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp-lg transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15] overflow-hidden"
    >
      {/* بلوک رنگی بالا */}
      <div
        className={`relative ${ch.bgColor} border-b-2 border-ink h-32 flex items-center justify-center`}
      >
        <span
          className={`absolute top-3 start-4 font-mono text-[12px] font-bold ${
            ch.invertText ? "text-white/70" : "text-ink/55"
          }`}
        >
          {ch.serial}
        </span>
        <Sparkle4
          className="absolute top-3 end-4 w-3.5 h-3.5"
          color={ch.invertText ? "#FFFFFF" : "#241C15"}
        />
        <div className={ch.iconColor}>{ch.icon}</div>
      </div>

      {/* ناحیه متن */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-sans font-extrabold text-[22px] text-ink leading-tight">
            {ch.title}
          </h3>
        </div>
        <p className="font-serif italic text-[13px] text-ink-tertiary mb-3">
          {ch.enTitle}
        </p>
        <p className="font-sans text-[15px] text-ink-secondary leading-relaxed flex-1">
          {ch.description}
        </p>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-ink/10">
          <span className="inline-flex items-center px-3 py-1 bg-cream rounded-full text-[12px] font-semibold text-ink border border-ink/15">
            {ch.meta}
          </span>
          <ArrowUpRight
            className="w-5 h-5 text-ink transition-transform duration-250 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.5}
          />
        </div>
      </div>
    </Link>
  );
};

const TokenGatewayCard: React.FC = () => {
  const promoUrl =
    "https://token.mmh1.top/?utm_source=easy-ai&utm_medium=home_chapter_card&utm_campaign=api_gateway";

  return (
    <a
      href={promoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp-lg transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15] overflow-hidden"
    >
      <div className="relative bg-ink border-b-2 border-ink h-32 flex items-center justify-center">
        <span className="absolute top-3 start-4 font-mono text-[12px] font-bold text-white/70">
          ابزار
        </span>
        <Sparkle4
          className="absolute top-3 end-4 w-3.5 h-3.5"
          color="#F4D35E"
        />
        <div className="text-butter">
          <KeyRound strokeWidth={2} className="w-12 h-12" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="font-sans font-extrabold text-[22px] text-ink leading-tight">
            ایستگاه رله مدل
          </h3>
        </div>
        <p className="font-serif italic text-[13px] text-ink-tertiary mb-3">
          Token Gateway
        </p>
        <p className="font-sans text-[15px] text-ink-secondary leading-relaxed flex-1">
          اتصال مستقیم داخلی (چین)، فراخوانی کم‌هزینه مدل‌های پیشرو AI، سازگار با پروتکل‌های اصلی API.
        </p>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-ink/10">
          <span className="inline-flex items-center px-3 py-1 bg-butter rounded-full text-[12px] font-semibold text-ink border border-ink/15">
            همین حالا امتحان کنید
          </span>
          <ArrowUpRight
            className="w-5 h-5 text-ink transition-transform duration-250 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.5}
          />
        </div>
      </div>
    </a>
  );
};

const Reason: React.FC<{ num: string; title: string; body: string }> = ({
  num,
  title,
  body,
}) => (
  <div>
    <div className="font-serif italic text-[18px] text-coral mb-2">{num}</div>
    <h3 className="font-sans font-extrabold text-[19px] text-ink mb-2 leading-tight">
      {title}
    </h3>
    <p className="font-sans text-[14px] text-ink-secondary leading-[1.65]">
      {body}
    </p>
  </div>
);

const FooterCol: React.FC<{
  heading: string;
  links: { name: string; path: string; external?: boolean }[];
}> = ({ heading, links }) => (
  <div>
    <div className="eyebrow mb-4">{heading}</div>
    <ul className="space-y-2.5">
      {links.map((l) =>
        l.external ? (
          <li key={l.name}>
            <a
              href={l.path}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[15px] text-ink-secondary hover:text-ink transition-colors duration-250"
            >
              {l.name}
            </a>
          </li>
        ) : (
          <li key={l.name}>
            <Link
              to={l.path}
              className="font-sans text-[15px] text-ink-secondary hover:text-ink transition-colors duration-250"
            >
              {l.name}
            </Link>
          </li>
        )
      )}
    </ul>
  </div>
);

export default Home;
