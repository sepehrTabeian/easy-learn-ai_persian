/**
 * تعریف نوع‌های سراسری
 * تعریف همه نوع‌های داده استفاده‌شده در وب‌سایت
 */

/**
 * دو حالت دانش بصری AI (حالت مرور فهرست، نه فیلد داده):
 *   - concept   وب‌سایت تعاملی که مفاهیم AI را از صفر کامل توضیح می‌دهد
 *   - video     وب‌سایت PPT همراه ویدئوهای Bilibili
 */
export type KnowledgeType = "concept" | "video";

/** توضیح مفاهیم · نگاه کنید به aiKnowledgeConceptData.ts */
export interface AIKnowledgeConceptItem {
  id: string;
  title: string;
  description: string;
  /**
   * دسته‌بندی اصلی (مبانی مدل / Agent / …).
   * معیار گروه‌بندی نمای مفاهیم یکپارچه شده به `line`(مسیر یادگیری)، این فیلد به‌عنوان اطلاعات تاریخی + استفاده مجدد از رنگ‌بندی در نمای ویدئویی نگه داشته شده است.
   */
  category: string;
  /**
   * id مسیر یادگیری مربوطه (معیار دسته‌بندی یکپارچه، متناظر با LEARNING_LINES).
   * نمای فهرست بر اساس آن گروه‌بندی می‌شود و نمای کلی بر اساس آن خطوط مترو را می‌چیند. برای مفهوم جدید الزامی است.
   */
  line: string;
  /**
   * نام کوتاه برای نقشه مترو / برچسب گوشه کارت. اگر خالی باشد خودکار با حذف پیشوند «درک آسان» از title مشتق می‌شود.
   */
  short?: string;
  imageUrl: string;
  htmlUrl?: string;
}

/** metadata مسیر یادگیری (سیستم دسته‌بندی یکپارچه، مشترک بین فهرست و نمای کلی) */
export interface LearningLine {
  id: string;
  /** نام کامل مسیر، برای عنوان گروه در فهرست / عنوان ردیف در نمای کلی، مثل «مسیر مبانی مقدماتی» */
  name: string;
  /** نام کوتاه برچسب، برای برچسب گوشه کارت / chip فیلتر، مثل «مبانی مقدماتی» */
  tag: string;
  /** یک جمله: پس از تمام کردن این مسیر چه کاری می‌توانید انجام دهید */
  blurb: string;
  /** رنگ اصلی مسیر (hex) */
  color: string;
  /** راهنمای نقطه شروع: این مسیر از کجا شروع می‌شود */
  startHint: string;
}

/** توضیح ویدئویی · نگاه کنید به aiKnowledgeVideoData.ts */
export interface AIKnowledgeVideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  htmlUrl?: string;
  /** آدرس ویدئو در Bilibili */
  bilibiliUrl?: string;
  /** تصویر جلد ویدئو، اگر خالی باشد صفحه فهرست جای‌نگهدار نمایش می‌دهد */
  videoCoverUrl?: string;
  /** متن نشان مدت زمان، مثل "23:45" */
  duration?: string;
}

/** نوع union مشترک صفحه جزئیات / مسیریابی */
export type AIKnowledgeItem = AIKnowledgeConceptItem | AIKnowledgeVideoItem;

/**
 * مقالات AI (ستون سردبیری) · یک مورد
 *
 * منبع داده HTML تک‌فایلی تولیدشده با skill به نام beautiful-article است که در
 * `public/article/<id>.html` یا `public/article/<id>/index.html`，
 * صفحه جزئیات با iframe بارگذاری می‌شود، صفحه فهرست خط زمانی است (بدون تصویر جلد).
 */
export interface AIArticleItem {
  /** slug، مثلاً "beautiful-article-intro" — هم‌زمان به‌عنوان پارامتر مسیر */
  id: string;
  /** عنوان مقاله (هم در صفحه فهرست و هم در برچسب chrome صفحه جزئیات استفاده می‌شود) */
  title: string;
  /** یک خلاصه Lead، متن فرعی صفحه فهرست */
  lead: string;
  /**
   * نوع (برچسب گوشه chip و نشان رنگی صفحه فهرست را تعیین می‌کند). برای نوع جدید مستقیم مقدار جدید در داده بنویسید،
   * صفحه به ترتیب ظهور خودکار آن‌ها را به chip جمع می‌کند.
   */
  category: string;
  /** تاریخ انتشار YYYY-MM-DD، برای مرتب‌سازی خط زمانی و گروه‌بندی سال */
  publishDate: string;
  /** زمان تخمینی خواندن (دقیقه)، برای ردیف metadata "12 min" */
  readingMinutes?: number;
  /** تم beautiful-article (tufte / press / غیره)، برچسب گوشه کوچک اختیاری */
  theme?: string;
  /** برچسب‌های مقاله، در ردیف metadata صفحه فهرست به شکل #tag */
  tags?: string[];
  /**
   * آدرس مقصد iframe. طبق قرارداد در `/article/<id>.html`، نوع چندمنبعی
   * هم می‌تواند استفاده کند `/article/<id>/index.html`。
   */
  htmlUrl: string;
}

/**
 * نوع عمل دکمه اثر
 *   - embed    باز کردن iframe درون‌خطی در سایت (حفظ رفتار demoUrl قبلی)
 *   - external پرش به صفحه بیرونی در پنجره جدید (مستندات / مخزن / ویدئو / مقاله…)
 */
export type WorkActionType = "embed" | "external";

/**
 * پیکربندی دکمه سفارشی اثر
 *
 * @example
 *   { label: "تجربه آنلاین", type: "embed",    url: "/translate/index.html" }
 *   { label: "خواندن مستندات",   type: "external", url: "https://example.com/docs" }
 *   { label: "کد منبع",     type: "external", url: "https://github.com/..." }
 */
export interface WorkAction {
  /** متن دکمه */
  label: string;
  /** نوع عمل icon و رفتار را تعیین می‌کند: embed باعث iframe / external پرش به پنجره جدید */
  type: WorkActionType;
  /** URL مقصد */
  url: string;
  /**
   * اولویت بصری اختیاری. اگر خالی باشد بر اساس ترتیب آرایه خودکار تعیین می‌شود:
   * اولی primary (coral توپر)، بقیه secondary (پس‌زمینه سفید با حاشیه ink).
   */
  variant?: "primary" | "secondary";
}

export interface AIApplicationItem {
  id: string;
  title: string;
  description: string;
  /** دسته‌بندی اثر. نام‌گذاری آزاد است، UI به ترتیب ظهور خودکار بین چهار رنگ butter / coral / teal / cream می‌چرخد */
  category: string;
  /** اسکرین‌شات اثر. نسبت پیشنهادی 16:10 */
  imageUrl: string;
  tags: string[];

  /**
   * فیلد پیشنهادی: گروه دکمه‌های سفارشی.
   * پشتیبانی از هر تعداد، هر متن و هر نوع عمل.
   * اگر نوشته نشود خودکار از demoUrl / githubUrl مشتق می‌شود (سازگاری با نسخه قبل).
   */
  actions?: WorkAction[];

  /** @deprecated فیلد قدیمی، فقط برای سازگاری با نسخه قبل نگه داشته شده؛ برای آثار جدید از actions استفاده کنید */
  demoUrl?: string;
  /** @deprecated فیلد قدیمی، فقط برای سازگاری با نسخه قبل نگه داشته شده؛ برای آثار جدید از actions استفاده کنید */
  githubUrl?: string;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}
