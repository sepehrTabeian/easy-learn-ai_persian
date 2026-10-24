# درسنامه‌های کدچه: پرامپت‌های سیستمی ابزارهای هوش مصنوعی

## دربارهٔ این مجموعه

این پوشه درسنامه‌های فارسی پرامپت‌های سیستمی ابزارهای هوش مصنوعی و Agent را نگه می‌دارد. هر ابزار یک پوشه دارد با دو فایل:

- فایل `lesson.md`: درسنامهٔ آموزشی (هدف پرامپت، ساختار بخش‌به‌بخش، الگوهای قابل‌استفادهٔ دوباره و آنچه نباید عیناً کپی کرد). از تحلیل آموزشی چینی (`*.learning.md`) ترجمه شده است.
- فایل `prompt.md`: ترجمهٔ فارسی خود پرامپت، **از متن اصلی انگلیسی** (نه از نسخهٔ چینی). برچسب‌های XML به تیتر تبدیل شده‌اند، نام ابزارها و کدها به انگلیسی مانده‌اند و بخش‌های خراب یا تکراری منبع با یادداشت مشخص شده‌اند.

پوشهٔ `methodology` فقط `lesson.md` دارد، چون از مقالهٔ روش‌شناسی ساخته شده، نه از یک پرامپت.

## قالب فایل‌ها

- قالب Markdown ساده، بدون frontmatter؛ عنوان H1 با واژهٔ فارسی شروع می‌شود.
- نمونه‌های درون پرامپت به بلوک کد (`text` یا `~~~`) تبدیل شده‌اند تا رندر Markdown برچسب ناشناخته را پنهان نکند.
- فهرست‌های شماره‌دار با ارقام لاتین (`1.`) نوشته شده‌اند تا Markdown فهرست بسازد؛ اپ می‌تواند با CSS (`list-style: persian`) ارقام فارسی نشان بدهد.
- بخش «پیشنهاد نمایش در سایت» منبع حذف شده است.

## فهرست

### روش‌شناسی (اول این را بخوانید)

| ابزار | درسنامه | پرامپت |
|---|---|---|
| روش‌شناسی طراحی پرامپت برای Agentهای هوش مصنوعی | [`methodology/lesson.md`](methodology/lesson.md) | — |

### عامل‌های کدنویسی در IDE و ویرایشگر

| ابزار | درسنامه | پرامپت |
|---|---|---|
| درسنامهٔ پرامپت سیستمی Claude Code | [`claude-code/lesson.md`](claude-code/lesson.md) | [`claude-code/prompt.md`](claude-code/prompt.md) |
| درسنامهٔ پرامپت سیستمی Cline | [`cline/lesson.md`](cline/lesson.md) | [`cline/prompt.md`](cline/prompt.md) |
| درسنامهٔ پرامپت سیستمی Roo Code | [`roocode/lesson.md`](roocode/lesson.md) | [`roocode/prompt.md`](roocode/prompt.md) |
| درسنامهٔ پرامپت سیستمی VSCode Agent (GitHub Copilot) | [`vscode-agent/lesson.md`](vscode-agent/lesson.md) | [`vscode-agent/prompt.md`](vscode-agent/prompt.md) |
| درسنامهٔ پرامپت Agent در Cursor 2.0 | [`cursor-agent-2-0/lesson.md`](cursor-agent-2-0/lesson.md) | [`cursor-agent-2-0/prompt.md`](cursor-agent-2-0/prompt.md) |
| درسنامهٔ پرامپت Cursor Agent CLI | [`cursor-agent-cli/lesson.md`](cursor-agent-cli/lesson.md) | [`cursor-agent-cli/prompt.md`](cursor-agent-cli/prompt.md) |
| درسنامهٔ پرامپت سیستمی Windsurf (Wave 11) | [`windsurf-prompt/lesson.md`](windsurf-prompt/lesson.md) | [`windsurf-prompt/prompt.md`](windsurf-prompt/prompt.md) |
| درسنامهٔ تعریف ابزارهای Windsurf (Wave 11) | [`windsurf-tools/lesson.md`](windsurf-tools/lesson.md) | [`windsurf-tools/prompt.md`](windsurf-tools/prompt.md) |
| درسنامهٔ پرامپت Builder در Trae | [`trae-builder/lesson.md`](trae-builder/lesson.md) | [`trae-builder/prompt.md`](trae-builder/prompt.md) |
| درسنامهٔ پرامپت Chat در Trae | [`trae-chat/lesson.md`](trae-chat/lesson.md) | [`trae-chat/prompt.md`](trae-chat/prompt.md) |
| درسنامهٔ پرامپت سیستمی Qoder | [`qoder-prompt/lesson.md`](qoder-prompt/lesson.md) | [`qoder-prompt/prompt.md`](qoder-prompt/prompt.md) |
| درسنامهٔ پرامپت Quest Action در Qoder | [`qoder-quest-action/lesson.md`](qoder-quest-action/lesson.md) | [`qoder-quest-action/prompt.md`](qoder-quest-action/prompt.md) |
| درسنامهٔ پرامپت Quest Design در Qoder | [`qoder-quest-design/lesson.md`](qoder-quest-design/lesson.md) | [`qoder-quest-design/prompt.md`](qoder-quest-design/prompt.md) |
| درسنامهٔ پرامپت سیستمی CodeBuddy | [`codebuddy/lesson.md`](codebuddy/lesson.md) | [`codebuddy/prompt.md`](codebuddy/prompt.md) |
| درسنامهٔ پرامپت حالت Vibe در Kiro | [`kiro-vibe/lesson.md`](kiro-vibe/lesson.md) | [`kiro-vibe/prompt.md`](kiro-vibe/prompt.md) |
| درسنامهٔ پرامپت حالت Spec در Kiro | [`kiro-spec/lesson.md`](kiro-spec/lesson.md) | [`kiro-spec/prompt.md`](kiro-spec/prompt.md) |
| درسنامهٔ پرامپت حالت Planning در Antigravity | [`antigravity-planning-mode/lesson.md`](antigravity-planning-mode/lesson.md) | [`antigravity-planning-mode/prompt.md`](antigravity-planning-mode/prompt.md) |
| درسنامهٔ پرامپت حالت Fast در Antigravity | [`antigravity-fast-prompt/lesson.md`](antigravity-fast-prompt/lesson.md) | [`antigravity-fast-prompt/prompt.md`](antigravity-fast-prompt/prompt.md) |
| درسنامهٔ پرامپت حالت مرحله‌بندی Traycer AI | [`traycer-phase-mode/lesson.md`](traycer-phase-mode/lesson.md) | [`traycer-phase-mode/prompt.md`](traycer-phase-mode/prompt.md) |

### عامل‌های خط فرمان

| ابزار | درسنامه | پرامپت |
|---|---|---|
| درسنامهٔ پرامپت سیستمی Codex CLI | [`codex-cli/lesson.md`](codex-cli/lesson.md) | [`codex-cli/prompt.md`](codex-cli/prompt.md) |
| درسنامهٔ پرامپت سیستمی Codex CLI (نسخهٔ ۲۰ اوت ۲۰۲۵) | [`codex-cli-2025-08-20/lesson.md`](codex-cli-2025-08-20/lesson.md) | [`codex-cli-2025-08-20/prompt.md`](codex-cli-2025-08-20/prompt.md) |
| درسنامهٔ پرامپت سیستمی Gemini CLI | [`gemini-cli/lesson.md`](gemini-cli/lesson.md) | [`gemini-cli/prompt.md`](gemini-cli/prompt.md) |
| درسنامهٔ پرامپت سیستمی Warp | [`warp/lesson.md`](warp/lesson.md) | [`warp/prompt.md`](warp/prompt.md) |

### عامل‌های مستقل و عمومی

| ابزار | درسنامه | پرامپت |
|---|---|---|
| درسنامهٔ پرامپت سیستمی Devin AI | [`devin-prompt/lesson.md`](devin-prompt/lesson.md) | [`devin-prompt/prompt.md`](devin-prompt/prompt.md) |
| درسنامهٔ پرامپت DeepWiki در Devin AI | [`devin-deepwiki/lesson.md`](devin-deepwiki/lesson.md) | [`devin-deepwiki/prompt.md`](devin-deepwiki/prompt.md) |
| درسنامهٔ پرامپت سیستمی Manus | [`manus-prompt/lesson.md`](manus-prompt/lesson.md) | [`manus-prompt/prompt.md`](manus-prompt/prompt.md) |
| درسنامهٔ چرخهٔ Agent در Manus | [`manus-agent-loop/lesson.md`](manus-agent-loop/lesson.md) | [`manus-agent-loop/prompt.md`](manus-agent-loop/prompt.md) |
| درسنامهٔ ماژول‌های پرامپت Manus | [`manus-modules/lesson.md`](manus-modules/lesson.md) | [`manus-modules/prompt.md`](manus-modules/prompt.md) |

### ساخت برنامهٔ وب و طراحی

| ابزار | درسنامه | پرامپت |
|---|---|---|
| درسنامهٔ پرامپت سیستمی v0 | [`v0/lesson.md`](v0/lesson.md) | [`v0/prompt.md`](v0/prompt.md) |
| درسنامهٔ پرامپت Agent در Lovable | [`lovable/lesson.md`](lovable/lesson.md) | [`lovable/prompt.md`](lovable/prompt.md) |
| درسنامهٔ پرامپت سیستمی Bolt | [`bolt/lesson.md`](bolt/lesson.md) | [`bolt/prompt.md`](bolt/prompt.md) |
| درسنامهٔ پرامپت سیستمی Replit | [`replit/lesson.md`](replit/lesson.md) | [`replit/prompt.md`](replit/prompt.md) |
| درسنامهٔ پرامپت سیستمی Same.dev | [`same-dev/lesson.md`](same-dev/lesson.md) | [`same-dev/prompt.md`](same-dev/prompt.md) |
| درسنامهٔ پرامپت سیستمی Gemini AI Studio (Vibe Coder) | [`gemini-ai-studio-vibe-coder/lesson.md`](gemini-ai-studio-vibe-coder/lesson.md) | [`gemini-ai-studio-vibe-coder/prompt.md`](gemini-ai-studio-vibe-coder/prompt.md) |
| درسنامهٔ پرامپت سیستمی Claude Design | [`claude-design/lesson.md`](claude-design/lesson.md) | [`claude-design/prompt.md`](claude-design/prompt.md) |

### عامل‌های مرورگر

| ابزار | درسنامه | پرامپت |
|---|---|---|
| درسنامهٔ پرامپت سیستمی Claude برای خودکارسازی مرورگر | [`claude-browser/lesson.md`](claude-browser/lesson.md) | [`claude-browser/prompt.md`](claude-browser/prompt.md) |
| درسنامهٔ پرامپت سیستمی Comet | [`comet/lesson.md`](comet/lesson.md) | [`comet/prompt.md`](comet/prompt.md) |

### دستیار محصول و ابزار پلتفرم

| ابزار | درسنامه | پرامپت |
|---|---|---|
| درسنامهٔ پرامپت سیستمی Notion AI | [`notion-ai/lesson.md`](notion-ai/lesson.md) | [`notion-ai/prompt.md`](notion-ai/prompt.md) |
| درسنامهٔ پرامپت سیستمی Xcode | [`xcode-system/lesson.md`](xcode-system/lesson.md) | [`xcode-system/prompt.md`](xcode-system/prompt.md) |
| درسنامهٔ پرامپت Preview Action در Xcode | [`xcode-preview-action/lesson.md`](xcode-preview-action/lesson.md) | [`xcode-preview-action/prompt.md`](xcode-preview-action/prompt.md) |

## ترتیب پیشنهادی مطالعه

1. [روش‌شناسی](methodology/lesson.md) برای چارچوب کلی طراحی پرامپت Agent.
2. [Claude Code](claude-code/lesson.md) و [Cline](cline/lesson.md) برای دو مکتب «فراخوانی ابزار بومی» و «پروتکل XML».
3. یکی از پرامپت‌های ساخت برنامهٔ وب ([v0](v0/lesson.md)، [Lovable](lovable/lesson.md) یا [Bolt](bolt/lesson.md)) برای Agentهای صاحب‌نظر.
4. [Claude Browser](claude-browser/lesson.md) و [Comet](comet/lesson.md) برای دفاع در برابر تزریق پرامپت و مجوزدهی اقدام‌ها.
5. بقیه به تناسب علاقه.

## یادداشت دربارهٔ منبع

این پرامپت‌ها عکس‌های لحظه‌ای جمع‌آوری‌شده از جامعه‌اند، بدون تاریخ و مرجع رسمی. برای یادگیری ساختار و روش‌اند، نه به‌عنوان سند رسمی یا پیکربندی قابل‌کپی. نام مدل‌ها، نسخه‌ها، مسیرها و نام ابزارهای خصوصی هر پلتفرم زمان‌دار یا وابسته به محیط‌اند.
