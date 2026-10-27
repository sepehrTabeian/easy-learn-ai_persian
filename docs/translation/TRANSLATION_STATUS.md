# وضعیت ترجمه فارسی پروژه Easy AI (Chinese → Persian, RTL)

> **قانون مهم برای هر agent یا انسانی که روی این کار ادامه می‌دهد:**
> در پایان **هر تسک** (هر بخش یا هر چند batch) این فایل را به‌روز کنید: بخش «وضعیت فعلی»، جدول «بخش‌ها»، «لاگ تغییرات» و هر نکته یا دام جدیدی که پیدا کردید. فایل‌های `glossary/` و `work/` را هم به‌روز نگه دارید.

## هدف

- فورک: `sepehrTabeian/easy-learn-ai_persian` (نسخه اصلی: ConardLi/easy-learn-ai).
- همه متن‌های چینی (رابط کاربری، کامنت‌ها، داده‌ها) به فارسی ترجمه شوند و فارسی **راست‌به‌چپ (RTL)** نمایش داده شود.
- کار فقط روی برنچ `persian` انجام می‌شود. **PR زده نمی‌شود.**
- محدودیت: کاربر گفته `npm install` / `pnpm install` بدون اجازه اجرا نشود، پس build یا اجرای سایت فعلاً ممکن نیست.

## هدف تازه: درسنامه‌های کدچه (از 2026-10-24، اولویت اول)

- کاربر فقط فایل‌های Markdown را لازم دارد تا در اپ «کدچه» به‌صورت درسنامه بیاورد. **ترجمهٔ `ai-sites` متوقف شد** (کد React است و بدون rebuild دیده نمی‌شود)؛ `work/tr_sites_013.tsv` نیمه‌کاره (قطعه‌های ۴۵۵۰ تا ۴۷۲۴) همان‌جا مانده است.
- منبع: `public/awesome-prompt/<ابزار>/` (۴۰ پرامپت). برای هر پرامپت:
  - `*.learning.md` (تحلیل آموزشی، فقط چینی موجود است) ← `kodche/<slug>/lesson.md`
  - `*.txt` (متن اصلی انگلیسی) ← `kodche/<slug>/prompt.md`. **از انگلیسی ترجمه شود، نه از `.zh.md`.**
- قالب: Markdown ساده بدون frontmatter؛ عنوان H1 با واژهٔ فارسی شروع شود؛ بلوک‌های `<example>` به بلوک کد `text` تبدیل شوند (رندرکنندهٔ Markdown تگ HTML ناشناخته را پنهان می‌کند)؛ فهرست شماره‌دار با `1.` لاتین (با `۱.` فهرست Markdown ساخته نمی‌شود؛ اپ می‌تواند `list-style: persian` بگذارد)؛ بخش «对这个项目的展示建议» (پیشنهاد نمایش در سایت Easy AI) حذف می‌شود.
- بررسی: `fa_lint.py --check` و پیش‌نمایش `persian_cleanup.py --edit` (تغییر شمارهٔ فهرست‌ها و نسخه‌هایی مثل Sonnet 4 را نپذیرید).
- انجام‌شده (۳۱ پوشه در `kodche/`، هر کدام `lesson.md` + `prompt.md`؛ methodology فقط lesson): claude-code, methodology (از article.md), xcode-system, xcode-preview-action, manus-agent-loop, manus-modules, manus-prompt, traycer-phase-mode, devin-deepwiki, devin-prompt, replit, codex-cli, codex-cli-2025-08-20, warp, trae-builder, trae-chat, cursor-agent-2-0, cursor-agent-cli, windsurf-prompt, windsurf-tools, qoder-prompt, qoder-quest-action, qoder-quest-design, gemini-cli, vscode-agent, lovable, bolt, kiro-vibe, kiro-spec, notion-ai, same-dev.
- **انجام‌شدهٔ تازه:** antigravity-planning-mode, antigravity-fast-prompt, codebuddy, claude-browser, roocode, v0, cline, comet, gemini-ai-studio-vibe-coder, claude-design (همه کامل، هر کدام `lesson.md` + `prompt.md`). مجموع: ۴۱ پوشه در `kodche/` (۴۰ پرامپت + methodology).
- **مانده:** هیچ پرامپتی از فهرست کدچه نمانده. `kodche/README.md` فهرست و ترتیب پیشنهادی مطالعه را دارد (methodology اول).
- `kodche/README.md` ساخته شد (فهرست گروه‌بندی‌شده، قالب فایل‌ها و ترتیب پیشنهادی).
- روند هر پوشه: ترجمه ← `fa_lint.py --check` (خطوط شروع‌شونده با واژهٔ لاتین را با یک واژهٔ فارسی شروع کنید؛ ارقام لاتین در نسخه/کد/IP مجازند) ← commit جدا.
- نکته‌های قالب: پرامپت‌هایی که بلوک کد تودرتو دارند، نمونه‌ها را داخل حصار `~~~` می‌گذارند؛ تعریف ابزارهای TypeScript به نثر + امضای نوع با کامنت ترجمه‌شده درمی‌آیند؛ متن خراب یا ناقص منبع با یادداشت مشخص می‌شود و چیزی به آن اضافه نمی‌شود.

## قاعده نگارش فارسی (از 2026-10-24 الزامی)

- همه ترجمه‌ها و متن‌های فارسی از این به بعد باید طبق مهارت **`persian-writing`** نوشته شوند: پیش از ترجمه آن را بارگذاری کنید.
- خلاصه قواعد برای agentهایی که این مهارت را ندارند:
  - لحن: متن آموزشی و صمیمی اما معیار (نه محاوره شکسته، نه اداری خشک)؛ لحن هر بخش را از متن اصلی تشخیص دهید.
  - نیم‌فاصله (ZWNJ) درست: «می‌شود»، «داده‌ها»، «پیش‌آموزش‌دیده»، «ساختاریافته»؛ «ی» میانجی/کسره اضافه با «ٔ» یا «‌ی» در موارد لازم.
  - گیومه فارسی «» (هرگز `"` ASCII داخل رشته‌ها)؛ ویرگول «،» و نقطه‌ویرگول «؛».
  - حذف نشانه‌های متن ماشینی: ترجمه تحت‌اللفظی، تکرار «در واقع/به عبارت دیگر»، جمله‌های مجهول بی‌دلیل، ساختارهای چینی کلمه‌به‌کلمه.
  - اصطلاحات فنی را طبق واژه‌نامه همین سند یکسان نگه دارید.
- ترجمه‌های قبل از این تاریخ (glossary و `work/tr_sites_000`–`012`) پیش از اعمال نهایی یک بار با همین مهارت بازبینی شوند.

## وضعیت فعلی (2026-10-24)

| بخش | وضعیت | توضیح |
|---|---|---|
| سایت اصلی `src/`، `tailwind.config.js`، `rsbuild.config.ts` | ✅ انجام شد | commit `f222c72` |
| `data/nav/sites.json`، `data/timeline/index.json` | ✅ انجام شد | commit `f222c72` |
| `readme.md` | ✅ انجام شد | دستی بازنویسی شد، داخل `<div dir="rtl">` |
| `ai-sites/*`: راه‌اندازی RTL (۷۸ زیرسایت) | ✅ انجام شد، commit نهایی این سند | تزریق `dir=rtl`، فونت Vazirmatn، کلاس‌های منطقی Tailwind |
| `ai-sites/*`: ترجمه متن | ✅ ترجمه شد، اعمال نشد | همهٔ ۲۱٬۸۸۴ قطعه (۰ تا ۲۱٬۸۸۳) در `glossary/tr_sites_*.tsv` (۱۸۴ فایل)؛ **هنوز روی سورس اعمال نشده** |
| `public/*/static/js` (خروجی build زیرسایت‌ها) | ⛔ مانده | پس از ترجمه `ai-sites` باید rebuild شود (نیاز به نصب وابستگی + اجازه کاربر) |
| `public/awesome-prompt/` (حدود ۲۵۷ هزار) | ⛔ مانده | فایل‌های «ترجمه» پرامپت‌ها هنوز چینی‌اند |
| `public/article/` (حدود ۱۱۳ هزار) | ⛔ مانده | HTML تک‌فایلی |
| `ai-app/*` | ⛔ مانده | |
| گراف کد Graphify | ✅ ساخته شد | حالت محلی `code-only`؛ خروجی در `graphify-out/` با ۴۰٬۷۱۹ گره و ۹۸٬۴۶۸ یال (به‌روزشده 2026-10-24) |

## ساختار پوشه `docs/translation/`

```
docs/translation/
├── TRANSLATION_STATUS.md      ← همین فایل
├── tools/                     ← اسکریپت‌ها (Python 3، بدون وابستگی)
│   ├── extract.py             استخراج قطعه‌های چینی ← JSON
│   ├── show.py                چاپ قطعه‌ها از i تا j برای ترجمه
│   ├── apply2.py              اعمال ترجمه‌ها (چند جدول با هم، طولانی‌ترین اول)
│   ├── fixurl.py              بازگرداندن فیلدهای url/icon/ref در JSON از نسخه HEAD
│   ├── rtl.py                 تبدیل کلاس‌های جهت‌دار Tailwind به منطقی
│   ├── inject_rtl.py          تزریق dir=rtl + فونت + CSS در entry زیرسایت‌ها (انجام شده)
│   ├── files.py               شمارش کاراکتر چینی در فایل‌ها
│   └── count.py               شمارش کاراکتر چینی کل مخزن به تفکیک پوشه
├── glossary/                  ← جدول‌های ترجمه انجام‌شده (منبع یکنواختی واژگان)
│   ├── seg_code.json + tr_code_*.tsv    (کد سایت اصلی)
│   ├── seg_data.json + tr_data_*.tsv    (داده‌های src)
│   └── seg_misc.json + tr_misc_*.tsv    (nav و timeline)
└── work/                      ← کار در جریان
    ├── seg_sites.json                   ۲۱٬۸۸۴ قطعه جدید ai-sites
    └── (ترجمه‌های tr_sites_000 تا tr_sites_183 به glossary/ منتقل شدند)
```

## روش کار (pipeline)

همه دستورها از ریشه مخزن اجرا می‌شوند. `T=docs/translation`.

1. **فهرست فایل‌ها**
   ```bash
   git ls-files ai-sites | grep -vE 'lock|\.(png|jpg|jpeg|gif|webp|mp3|mp4|svg|ico|woff2?)$' > /tmp/files.txt
   python3 -I $T/tools/files.py $(cat /tmp/files.txt) | awk '{print $3}' > /tmp/zh_files.txt
   ```
2. **استخراج قطعه‌ها** (هر رشته پیوسته‌ای که بین `" ' \` < > { }` یا خط جدید است و حرف چینی دارد؛ کامنت `//` جدا می‌شود):
   ```bash
   python3 -I $T/tools/extract.py /tmp/seg_all.json $(cat /tmp/zh_files.txt)
   ```
   سپس قطعه‌هایی را که در `glossary/seg_*.json` هستند حذف کنید (ترجمه‌شان موجود است) → `work/seg_<section>.json`.
3. **ترجمه**: با `show.py` دسته‌های حدود ۳۵۰ تایی را ببینید:
   ```bash
   python3 -I $T/tools/show.py $T/work/seg_sites.json 700 1050
   ```
   ترجمه را در `work/tr_sites_NNN.tsv` بنویسید، **هر خط: `index<TAB>ترجمه`**.
   - مقدار `=` یعنی «دست نزن» (برای URL و موارد خاص).
   - مقدار خالی مجاز است (وقتی ترتیب کلمات فارسی قطعه را بی‌نیاز می‌کند).
   - فایل‌هایی که بعداً در ترتیب الفبایی می‌آیند ترجمه‌های قبلی را **override** می‌کنند (برای اصلاح).
4. **اعمال** (همه جدول‌ها با هم تا اصطلاحات یکسان بمانند):
   ```bash
   python3 -I $T/tools/apply2.py "$T/work/seg_sites.json:$T/work/tr_sites_*.tsv" \
     "$T/glossary/seg_misc.json:$T/glossary/tr_misc_*.tsv" \
     "$T/glossary/seg_data.json:$T/glossary/tr_data_*.tsv" \
     "$T/glossary/seg_code.json:$T/glossary/tr_code_*.tsv" -- $(cat /tmp/zh_files.txt)
   ```
   `apply2.py` اگر قطعه‌ای ترجمه نداشته باشد خطای `MISSING` می‌دهد و چیزی اعمال نمی‌کند؛ اگر تعداد `" ' \` { } < > \` بین اصل و ترجمه فرق کند `QUOTE?` چاپ می‌کند (باید صفر باشد مگر عمدی).
   > برای اعمال بخشی از کار پیش از تمام شدن همه ترجمه‌ها، یا همه قطعه‌ها را ترجمه کنید، یا `seg_*.json` را به محدوده ترجمه‌شده کوتاه کنید.
5. **ترمیم URLها در JSON**: `python3 -I $T/tools/fixurl.py <json files>`.
6. **بررسی‌ها**
   - چینی باقی‌مانده: `python3 -I $T/tools/files.py <files>` (فقط باید در URLها بماند).
   - JSON معتبر: `node -e "JSON.parse(require('fs').readFileSync('f','utf8'))"`.
   - نحو `.ts`: `node --experimental-strip-types --check file.ts`.
   - مقایسه تعداد `{ } < > " ' \` ;` هر فایل با `git show HEAD:file` (فقط پرانتزها مجاز به تغییرند، چون پرانتز تمام‌عرض چینی `（）` به ASCII تبدیل می‌شود).
7. **commit** روی برنچ `persian` با پیام روشن، و به‌روز کردن همین فایل. فایل‌های `tr_*.tsv` تمام‌شده را به `glossary/` منتقل کنید.

## قواعد RTL پیاده‌شده

- سایت اصلی: `src/entry.tsx` مقدار `lang="fa"` و `dir="rtl"` را روی `<html>` می‌گذارد؛ `src/entry.css` قواعد زیر را دارد.
- زیرسایت‌ها: `tools/inject_rtl.py` همین کار را در entry هر زیرسایت انجام داده (لینک فونت Vazirmatn از Google Fonts + یک `<style>` درون‌خطی).
- قواعد CSS:
  - `pre, code, kbd, samp` → `direction: ltr`.
  - `[dir=rtl] :not(pre, code, …) { letter-spacing: normal !important }`؛ letter-spacing اتصال حروف فارسی را می‌شکند.
  - آیکون‌های فلش lucide (`arrow-right/left`، `chevron-*`، `arrow-up-right`، `external-link`) با `scale: -1 1` قرینه می‌شوند.
- فونت: `Noto Sans SC` → `Vazirmatn`، `PingFang SC` → `Tahoma` (در tailwind config و CSS).
- Tailwind: `ml/mr → ms/me`، `pl/pr → ps/pe`، `left/right → start/end`، `text-left/right → text-start/end`، `border-l/r → border-s/e`، `rounded-l/r → rounded-s/e`، `space-x-*` ← اضافه شدن `rtl:space-x-reverse` (اسکریپت `rtl.py`). `translate-x` و `origin-left` عمداً دست نخورده‌اند.

## نکات و دام‌ها (حتماً رعایت شود)

1. **URLها**: URLهایی که حروف چینی دارند نباید ترجمه شوند (قطعه‌های کوتاه داخل آن‌ها جایگزین می‌شوند). در TSV مقدار `=` بگذارید و پس از اعمال `fixurl.py` را اجرا کنید.
2. **رشته‌های حاوی `//`** (مثل `"... // ... existing code ..."`) توسط extract در `//` شکسته می‌شوند؛ پس از اعمال، اگر چینی باقی ماند دستی اصلاح کنید.
3. **کلیدهای شیء بدون گیومه** (`模型基础: "..."`): اگر ترجمه فاصله دارد، ترجمه را به شکل `"مبانی مدل":` بنویسید. کلیدهای تک‌کلمه‌ای فارسی (مثل `آمریکا:`) شناسه معتبر JS هستند.
4. **یکنواختی داده و کد**: کد با مقدارهای داده مقایسه می‌کند (کشور، وضعیت متن‌باز، دسته‌ها). ترجمه یک قطعه باید در همه فایل‌ها یکسان باشد؛ برای همین همه جدول‌ها با هم اعمال می‌شوند.
5. **regex و قالب تاریخ**: کدهایی که متن چینی را parse می‌کنند (مثلاً `年/月` در `src/pages/AIDaily.tsx` و `src/components/daily/DailyList.tsx` (این دو فایل از پروژه حذف شده‌اند)) دستی بازنویسی شدند. پیش از ترجمه دنبال regexهای حاوی حروف چینی بگردید: `grep -nP '/[^/]*[\x{4e00}-\x{9fff}][^/]*/' -r <dir>`.
6. **قطعه‌های تک‌حرفی** (token‌های نمایشی مثل `猫`, `坐`) سراسری جایگزین می‌شوند؛ ترجمه‌ای انتخاب کنید که در جاهای دیگر هم معنا بدهد.
7. **`\n` لیترال** داخل رشته‌ها باید در ترجمه هم دقیقاً `\n` بماند (validator تعداد `\` را چک می‌کند).
8. **داخل JSON از گیومه `"` استفاده نکنید**؛ از «» استفاده کنید.
9. **prompt-cache**: فایل `ai-sites/prompt-cache/audio-segments.json` متن صوت‌های چینی است؛ ترجمه آن زیرنویس فارسی می‌سازد ولی صدا چینی می‌ماند.
10. **نام محصولات چینی** با آوانویسی لاتین (pinyin) یا نام انگلیسی رسمی نوشته شوند (مثل iFlytek Huiwen، Doubao، Hunyuan). نام شرکت‌ها انگلیسی: Alibaba, Baidu, ByteDance, Tencent, Kuaishou, Moonshot AI, Zhipu AI.
11. **ماه‌ها**: «مارس 2017»، «ژوئن 2017» (ارقام لاتین).
12. **Graphify**: شش فایل SQL به‌دلیل نصب نبودن افزونهٔ اختیاری `tree_sitter_sql` وارد گراف نشدند؛ دو فایل TSX نیز خطای نحوی داشتند و فقط بخشی از نمادهایشان استخراج شد.

## واژه‌نامه کلیدی (برای یکنواختی)

| چینی | فارسی |
|---|---|
| 轻松理解 | درک آسان |
| 知视 / AI 知视 | دانش بصری / دانش بصری AI |
| 开源 / 闭源 | متن‌باز / متن‌بسته |
| 提示词 | پرامپت (جمع: پرامپت‌ها) |
| 微调 | تنظیم دقیق |
| 预训练 | پیش‌آموزش |
| 推理 | استدلال (برای reasoning) / استنتاج (برای inference) |
| 上下文 | context |
| 智能体 | عامل هوشمند (Agent را خود Agent بنویسید) |
| 大模型 | مدل بزرگ |
| 多模态 | چندوجهی |
| 幻觉 | توهم |
| 知识星球 | سیاره دانش |
| 花园老师 | معلم «باغ» |
| code秘密花园 | code باغ مخفی |
| 中国 / 美国 / 英国 / 德国 | چین / آمریکا / انگلیس / آلمان |

جدول کامل همان `glossary/tr_*.tsv` است.

## مرحله بعد



1. ترجمهٔ `ai-sites` کامل است (قطعه‌های ۰ تا ۲۱٬۸۸۳ در `glossary/tr_sites_*.tsv`). بعدی: اعمال آن‌ها روی سورس با `tools/apply2.py` و بررسی خروجی؛ هنوز انجام نشده.
2. پس از اتمام: اعمال، بررسی‌ها، commit.
3. اجازه گرفتن از کاربر برای نصب وابستگی‌ها و rebuild خروجی هر زیرسایت (`cd ai-sites/<name> && pnpm install && pnpm build` که خروجی را در `public/<name>` می‌ریزد؛ ۴ زیرسایت با vite هستند: evaluation, harness, prompt-cache, skills).

## لاگ تغییرات

- **2026-10-23** — فاز ۱: سایت اصلی، nav، timeline و README ترجمه شد + RTL (commit `f222c72`).
- **2026-10-23** — فاز ۲ شروع: RTL برای ۷۸ زیرسایت ai-sites (entry + فونت + کلاس‌ها)؛ ۷۰۰ قطعه ترجمه در `work/`؛ ابزارها و این سند به مخزن اضافه شد.
- **2026-10-24** — تکمیل دسته سوم ترجمه ai-sites شامل قطعه‌های ۷۰۰ تا ۱۰۴۹ در فایل `work/tr_sites_002.tsv` (مجموعاً ۱٬۰۵۰ قطعه ترجمه‌شده در work).
- **2026-10-24** — Graphify در حالت محلی `code-only` اجرا شد؛ `graphify-out/graph.json`، گزارش Markdown و نمای HTML تولید شدند.
- **2026-10-24** — تکمیل دستهٔ چهارم ترجمهٔ ai-sites شامل قطعه‌های ۱۰۵۰ تا ۱۳۹۹ در فایل `work/tr_sites_003.tsv` (مجموعاً ۱٬۴۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستهٔ پنجم ترجمهٔ ai-sites شامل قطعه‌های ۱۴۰۰ تا ۱۷۴۹ در فایل `work/tr_sites_004.tsv` (مجموعاً ۱٬۷۵۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستی دستهٔ ششم ترجمهٔ ai-sites شامل قطعه‌های ۱۷۵۰ تا ۲۰۹۹ در فایل `work/tr_sites_005.tsv`؛ مسیر ترجمه با مدل محلی به درخواست کاربر کنار گذاشته شد (مجموعاً ۲٬۱۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستی دستهٔ هفتم ترجمهٔ ai-sites شامل قطعه‌های ۲۱۰۰ تا ۲۴۴۹ در فایل `work/tr_sites_006.tsv` (مجموعاً ۲٬۴۵۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستی دستهٔ هشتم ترجمهٔ ai-sites شامل قطعه‌های ۲۴۵۰ تا ۲۷۹۹ در فایل `work/tr_sites_007.tsv` (مجموعاً ۲٬۸۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستی دستهٔ نهم ترجمهٔ ai-sites شامل قطعه‌های ۲۸۰۰ تا ۳۱۴۹ در فایل `work/tr_sites_008.tsv` (مجموعاً ۳٬۱۵۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستی دستهٔ دهم ترجمهٔ ai-sites شامل قطعه‌های ۳۱۵۰ تا ۳۴۹۹ در فایل `work/tr_sites_009.tsv` (مجموعاً ۳٬۵۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستی دستهٔ یازدهم ترجمهٔ ai-sites شامل قطعه‌های ۳۵۰۰ تا ۳۸۴۹ در فایل `work/tr_sites_010.tsv` (مجموعاً ۳٬۸۵۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستی دستهٔ دوازدهم ترجمهٔ ai-sites شامل قطعه‌های ۳۸۵۰ تا ۴۱۹۹ در فایل `work/tr_sites_011.tsv` (مجموعاً ۴٬۲۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — تکمیل دستهٔ سیزدهم ترجمهٔ ai-sites شامل قطعه‌های ۴۲۰۰ تا ۴۵۴۹ در فایل `work/tr_sites_012.tsv`؛ اصلاح گیومه ASCII در ترجمه قطعه ۲۴ (override در همین فایل) (مجموعاً ۴٬۵۵۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-24** — قاعده الزامی استفاده از مهارت `persian-writing` برای همه ترجمه‌ها اضافه شد؛ ترجمه‌های قبلی نیاز به بازبینی با این مهارت دارند.
- **2026-10-24** — هدف به درسنامه‌های Markdown برای اپ کدچه تغییر کرد؛ ترجمهٔ ai-sites متوقف شد. نمونهٔ `kodche/claude-code/` (درسنامه از learning.md، پرامپت از متن انگلیسی) طبق مهارت persian-writing ساخته شد.
- **2026-10-24** — ۳۰ درسنامهٔ کدچه (از ۴۱ پرامپت + روش‌شناسی) ترجمه و commit شد؛ ۱۲ مورد مانده در بخش «هدف تازه» ثبت شد. گراف Graphify به‌روز شد.
- **2026-10-24** — درسنامهٔ کدچه تمام شد: claude-browser (lesson)، roocode، v0، cline، comet، gemini-ai-studio-vibe-coder و claude-design (هر کدام lesson + prompt از متن انگلیسی) و `kodche/README.md` اضافه شد؛ مجموع ۴۱ پوشه (۴۰ پرامپت + methodology). نکتهٔ روند: خطوط شروع‌شونده با واژهٔ لاتین با یک واژهٔ فارسی شروع شدند و ایرادهای منبع (کد/تگ خراب، بخش تکراری، قالب ناقص) در یادداشت بالای هر `prompt.md` ثبت شد.
- **2026-10-25** — بازبینی درسنامه‌ها و پرامپت‌های کدچه با persian-writing: همهٔ خطوطی که با واژهٔ لاتین شروع می‌شدند اصلاح شد (claude-browser: «دستیار Claude …»، v0)؛ «گاهاً» ← «گاهی»؛ مصدرهای مرکب جدا شدند («یاد گرفتن»، «رد کردن»، «اجرا شدن»…، ۴۵ فایل)؛ چند ساخت مجهول با «توسط» بازنویسی شد. `fa_lint.py --check` حالا فقط ارقام لاتینِ مجاز (نسخه، کد، ابعاد) را گزارش می‌کند. نکتهٔ روند: برای جایگزینی متن فارسی از `perl -pi` بدون `use utf8` استفاده نکنید (متن را دوبار رمزگذاری می‌کند)؛ از Python استفاده کنید.
- **2026-10-25** — تکمیل دستهٔ بیستم ترجمهٔ ai-sites شامل قطعه‌های ۵۴۹۹ تا ۵۵۹۸ در فایل `work/tr_sites_020.tsv` (مجموعاً ۵٬۵۹۸ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌ویکم ترجمهٔ ai-sites شامل قطعه‌های ۵۵۹۹ تا ۵۶۹۷ در فایل `work/tr_sites_021.tsv` (مجموعاً ۵٬۶۹۷ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌ودوم ترجمهٔ ai-sites شامل قطعه‌های ۵۶۹۸ تا ۵۷۹۹ در فایل `work/tr_sites_022.tsv` (مجموعاً ۵٬۷۹۹ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌ودوم ترجمهٔ ai-sites شامل قطعه‌های ۵۸۰۰ تا ۵۸۹۹ در فایل `work/tr_sites_023.tsv` (مجموعاً ۵٬۸۹۹ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌وسوم ترجمهٔ ai-sites شامل قطعه‌های ۵۹۰۰ تا ۵۹۹۹ در فایل `work/tr_sites_024.tsv` (مجموعاً ۶٬۰۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌وچهارم ترجمهٔ ai-sites شامل قطعه‌های ۶۰۰۰ تا ۶۰۹۹ در فایل `work/tr_sites_025.tsv` (مجموعاً ۶٬۱۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌وپنجم ترجمهٔ ai-sites شامل قطعه‌های ۶۱۰۰ تا ۶۱۹۹ در فایل `work/tr_sites_026.tsv` (مجموعاً ۶٬۲۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌وششم ترجمهٔ ai-sites شامل قطعه‌های ۶۲۰۰ تا ۶۲۹۹ در فایل `work/tr_sites_027.tsv` (مجموعاً ۶٬۳۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌وهفتم ترجمهٔ ai-sites شامل قطعه‌های ۶۳۰۰ تا ۶۳۹۹ در فایل `work/tr_sites_028.tsv` (مجموعاً ۶٬۴۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌وهشتم ترجمهٔ ai-sites شامل قطعه‌های ۶۴۰۰ تا ۶۴۹۹ در فایل `work/tr_sites_029.tsv` (مجموعاً ۶٬۵۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ بیست‌ونهم ترجمهٔ ai-sites شامل قطعه‌های ۶۵۰۰ تا ۶۵۹۹ در فایل `work/tr_sites_030.tsv` (مجموعاً ۶٬۶۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل دستهٔ سی‌ام ترجمهٔ ai-sites شامل قطعه‌های ۶۶۰۰ تا ۶۶۹۹ در فایل `work/tr_sites_031.tsv` (مجموعاً ۶٬۷۰۰ قطعهٔ ترجمه‌شده در work).
- **2026-10-25** — تکمیل قطعه‌های 6700 تا 6799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_032.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 6800 تا 6899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_033.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 6900 تا 6999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_034.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7000 تا 7099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_035.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7100 تا 7199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_036.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7200 تا 7299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_037.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7300 تا 7399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_038.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7400 تا 7499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_039.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7500 تا 7599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_040.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7600 تا 7699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_041.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7700 تا 7799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_042.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7800 تا 7899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_043.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 7900 تا 7999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_044.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8000 تا 8099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_045.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8100 تا 8199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_046.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8200 تا 8299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_047.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8300 تا 8399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_048.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8400 تا 8499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_049.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8500 تا 8599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_050.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8600 تا 8699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_051.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8700 تا 8799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_052.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8800 تا 8899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_053.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 8900 تا 8999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_054.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9000 تا 9099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_055.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9100 تا 9199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_056.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9200 تا 9299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_057.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9300 تا 9399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_058.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9400 تا 9499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_059.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9500 تا 9599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_060.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9600 تا 9699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_061.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9700 تا 9799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_062.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9800 تا 9899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_063.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 9900 تا 9999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_064.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10000 تا 10099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_065.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10100 تا 10199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_066.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10200 تا 10299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_067.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10300 تا 10399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_068.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10400 تا 10499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_069.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10500 تا 10599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_070.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10600 تا 10699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_071.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10700 تا 10799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_072.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10800 تا 10899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_073.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 10900 تا 10999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_074.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11000 تا 11099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_075.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11100 تا 11199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_076.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11200 تا 11299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_077.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11300 تا 11399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_078.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11400 تا 11499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_079.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11500 تا 11599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_080.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11600 تا 11699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_081.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11700 تا 11799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_082.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11800 تا 11899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_083.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 11900 تا 11999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_084.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12000 تا 12099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_085.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12100 تا 12199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_086.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12200 تا 12299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_087.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12300 تا 12399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_088.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12400 تا 12499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_089.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12500 تا 12599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_090.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12600 تا 12699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_091.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12700 تا 12799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_092.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12800 تا 12899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_093.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 12900 تا 12999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_094.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13000 تا 13099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_095.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13100 تا 13199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_096.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13200 تا 13299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_097.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13300 تا 13399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_098.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13400 تا 13499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_099.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13500 تا 13599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_100.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13600 تا 13699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_101.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13700 تا 13799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_102.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13800 تا 13899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_103.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 13900 تا 13999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_104.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14000 تا 14099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_105.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14100 تا 14199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_106.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14200 تا 14299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_107.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14300 تا 14399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_108.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14400 تا 14499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_109.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14500 تا 14599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_110.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14600 تا 14699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_111.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14700 تا 14799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_112.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14800 تا 14899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_113.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 14900 تا 14999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_114.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15000 تا 15099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_115.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15100 تا 15199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_116.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15200 تا 15299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_117.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15300 تا 15399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_118.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15400 تا 15499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_119.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15500 تا 15599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_120.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15600 تا 15699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_121.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15700 تا 15799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_122.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15800 تا 15899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_123.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 15900 تا 15999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_124.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16000 تا 16099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_125.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16100 تا 16199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_126.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16200 تا 16299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_127.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16300 تا 16399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_128.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16400 تا 16499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_129.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16500 تا 16599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_130.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16600 تا 16699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_131.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16700 تا 16799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_132.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16800 تا 16899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_133.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 16900 تا 16999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_134.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17000 تا 17099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_135.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17100 تا 17199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_136.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17200 تا 17299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_137.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17300 تا 17399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_138.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17400 تا 17499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_139.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17500 تا 17599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_140.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17600 تا 17699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_141.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17700 تا 17799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_142.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17800 تا 17899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_143.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 17900 تا 17999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_144.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18000 تا 18099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_145.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18100 تا 18199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_146.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18200 تا 18299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_147.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18300 تا 18399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_148.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18400 تا 18499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_149.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18500 تا 18599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_150.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18600 تا 18699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_151.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18700 تا 18799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_152.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18800 تا 18899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_153.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 18900 تا 18999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_154.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19000 تا 19099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_155.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19100 تا 19199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_156.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19200 تا 19299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_157.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19300 تا 19399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_158.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19400 تا 19499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_159.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19500 تا 19599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_160.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19600 تا 19699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_161.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19700 تا 19799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_162.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19800 تا 19899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_163.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 19900 تا 19999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_164.tsv`.
- **2026-10-25** — تکمیل قطعه‌های 20000 تا 20099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_165.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20100 تا 20199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_166.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20200 تا 20299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_167.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20300 تا 20399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_168.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20400 تا 20499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_169.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20500 تا 20599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_170.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20600 تا 20699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_171.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20700 تا 20799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_172.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20800 تا 20899 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_173.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 20900 تا 20999 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_174.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21000 تا 21099 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_175.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21100 تا 21199 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_176.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21200 تا 21299 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_177.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21300 تا 21399 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_178.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21400 تا 21499 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_179.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21500 تا 21599 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_180.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21600 تا 21699 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_181.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21700 تا 21799 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_182.tsv`.
- **2026-10-27** — تکمیل قطعه‌های 21800 تا 21883 ترجمهٔ ai-sites در فایل `docs/translation/work/tr_sites_183.tsv` (آخرین دسته؛ ۸۴ خط).
- **2026-10-27** — ترجمهٔ کامل ai-sites (۲۱٬۸۸۴ قطعه، ۰ تا ۲۱۸۸۳) انجام شد. فایل‌های `tr_sites_000` تا `tr_sites_183` از `work/` به `glossary/` منتقل شدند (مسیرهای `work/tr_sites_*` در لاگ‌های بالا تاریخی‌اند). هنوز اعمال روی سورس و rebuild انجام نشده است.
