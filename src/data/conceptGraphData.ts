/**
 * دانش بصری AI · نقشه ارتباط مفاهیم (یال‌ها + گره‌های مشتق‌شده)
 *
 * گره‌ها این‌جا دوباره تعریف نمی‌شوند —— مستقیماً از منبع داده واحد aiKnowledgeConceptData مشتق می‌شوند
 * (دسته‌بندی = line، نام کوتاه = مشتق از short/title). این‌جا فقط اطلاعات معنایی خاص گراف یعنی «یال‌های ارتباط» نگهداری می‌شود.
 *
 * هنگام افزودن مفهوم: اول در aiKnowledgeConceptData مورد را اضافه کنید (شامل line)، سپس این‌جا یال‌های ارتباط آن را تکمیل کنید.
 * در حالت توسعه بررسی می‌شود: ① مفهومی که line ندارد ② یالی که به id مفهوم ناموجود ارجاع می‌دهد —— هر دو console.warn می‌دهند.
 */

import {
  aiKnowledgeConceptData,
  conceptShortLabel,
  LEARNING_LINES,
  lineById,
} from "./aiKnowledgeConceptData";

/** metadata مسیرهای یادگیری در منبع داده تعریف شده و این‌جا برای ارجاع یکپارچه در سمت گراف export می‌شود */
export { LEARNING_LINES, lineById };

/** ۶ نوع رابطه، برای رنگ‌بندی یال‌ها و راهنما */
export type RelationType =
  | "prereq" // پیش‌نیاز: اول A را بفهمید تا B را راحت بفهمید
  | "mechanism" // مکانیزم/اجزا: A بخشی از درون B است
  | "sibling" // موازی: در یک سطح و قابل مقایسه افقی
  | "solution" // راهکار: A برای حل مشکل B استفاده می‌شود
  | "vs" // مقابله: جایگزین یکدیگر / به‌راحتی اشتباه گرفته می‌شوند
  | "bridge"; // پل بین‌دسته‌ای: دو موضوع بزرگ را به هم وصل می‌کند

export interface RelationMeta {
  label: string;
  color: string;
  dashed?: boolean;
}

export const RELATION_META: Record<RelationType, RelationMeta> = {
  prereq: { label: "پیش‌نیاز · اول این را یاد بگیرید", color: "#2A9D8F" },
  mechanism: { label: "مکانیزم · بخشی از درون آن", color: "#E07A5F" },
  sibling: { label: "موازی · قابل مقایسه در یک سطح", color: "#6D597A", dashed: true },
  solution: { label: "راهکار · برای حل آن استفاده می‌شود", color: "#3D8B40" },
  vs: { label: "مقابله · به‌راحتی اشتباه گرفته می‌شود / جایگزین", color: "#C98A1C", dashed: true },
  bridge: { label: "بین‌موضوعی · به بخش دیگری وصل می‌شود", color: "#2A6F97", dashed: true },
};

export interface GraphNode {
  id: string;
  /** نام کوتاهی که روی نقشه مترو نمایش داده می‌شود */
  label: string;
  /** دسته‌بندی اصلی (به‌عنوان اطلاعات تاریخی نگه داشته شده) */
  category: string;
  /** توضیح یک‌جمله‌ای (از منبع داده، برای پنل نمای کلی) */
  desc: string;
  /** id مسیر یادگیری مربوطه */
  line: string;
  /** گره hub: درگاه اصلی / محل تلاقی چند خط، بزرگ‌تر رسم می‌شود */
  hub?: boolean;
}

export interface GraphEdge {
  a: string;
  b: string;
  type: RelationType;
}

/** نقطه شروع پیشنهادی سراسری (روی نقشه با درخشش «از این‌جا شروع کنید» نشان داده می‌شود) */
export const RECOMMENDED_START = "llm";

/**
 * گره‌های hub (اختیاری · فقط روی اندازه بصری اثر دارد): درگاه اصلی / محل تلاقی چند خط.
 * اگر علامت‌گذاری فراموش شود فقط بزرگ نمی‌شود، اثری بر عملکرد ندارد.
 */
const HUB_IDS = new Set([
  "llm",
  "transformer",
  "agent",
  "agent-loop",
  "lora",
  "quantization",
]);

/* ────────────────────────────────────────────────
 * جدول گره‌ها —— مشتق از منبع داده واحد، به ترتیب منبع داده (یعنی ترتیب یادگیری درون خط)
 * ──────────────────────────────────────────────── */
export const GRAPH_NODES: GraphNode[] = aiKnowledgeConceptData.map((c) => ({
  id: c.id,
  label: conceptShortLabel(c),
  category: c.category,
  desc: c.description,
  line: c.line,
  hub: HUB_IDS.has(c.id) || undefined,
}));

/** گره‌های گروه‌بندی‌شده بر اساس مسیر یادگیری (ترتیب: LEARNING_LINES ← ترتیب منبع داده درون خط) */
export const NODES_BY_LINE: Record<string, GraphNode[]> = (() => {
  const map: Record<string, GraphNode[]> = {};
  LEARNING_LINES.forEach((l) => (map[l.id] = []));
  GRAPH_NODES.forEach((n) => {
    (map[n.line] ??= []).push(n);
  });
  return map;
})();

/* ────────────────────────────────────────────────
 * یال‌های ارتباط (بی‌جهت و یکتا، شامل نوع رابطه)
 * ──────────────────────────────────────────────── */
export const GRAPH_EDGES: GraphEdge[] = [
  // —— درون خانواده مهندسی پرامپت ——
  { a: "prompt", b: "system-prompt", type: "mechanism" },
  { a: "prompt", b: "few-shot", type: "mechanism" },
  { a: "prompt", b: "chain-of-thought", type: "mechanism" },
  { a: "few-shot", b: "chain-of-thought", type: "sibling" },
  { a: "system-prompt", b: "few-shot", type: "sibling" },
  // —— مهندسی پرامپت ← پل به مبانی / خانواده‌های دیگر ——
  { a: "prompt", b: "llm", type: "bridge" },
  { a: "prompt", b: "token", type: "bridge" },
  { a: "system-prompt", b: "context-window", type: "mechanism" },
  { a: "system-prompt", b: "prompt-injection", type: "bridge" },
  { a: "few-shot", b: "context-window", type: "bridge" },
  { a: "few-shot", b: "whyfinetune", type: "vs" },
  { a: "chain-of-thought", b: "deepseek-r1", type: "bridge" },
  { a: "chain-of-thought", b: "token", type: "bridge" },
  // —— درون خانواده Agent ——
  { a: "agent", b: "agent-loop", type: "mechanism" },
  { a: "agent", b: "function-calling", type: "mechanism" },
  { a: "agent", b: "context-window", type: "mechanism" },
  { a: "agent", b: "agent-memory", type: "mechanism" },
  { a: "agent", b: "sub-agent", type: "mechanism" },
  { a: "agent", b: "agent-todo", type: "mechanism" },
  { a: "agent", b: "agent-modes", type: "mechanism" },
  { a: "agent", b: "agent-sandbox", type: "mechanism" },
  { a: "agent-loop", b: "function-calling", type: "mechanism" },
  { a: "agent-loop", b: "context-window", type: "mechanism" },
  { a: "agent-loop", b: "sub-agent", type: "vs" },
  { a: "agent-loop", b: "agent-todo", type: "mechanism" },
  { a: "agent-loop", b: "mcp", type: "mechanism" },
  { a: "function-calling", b: "mcp", type: "vs" },
  { a: "sub-agent", b: "agent-todo", type: "vs" },
  { a: "sub-agent", b: "context-window", type: "mechanism" },
  { a: "agent-modes", b: "agent-sandbox", type: "vs" },
  { a: "agent", b: "prompt-injection", type: "bridge" },
  { a: "agent-sandbox", b: "prompt-injection", type: "solution" },
  { a: "mcp", b: "prompt-injection", type: "bridge" },
  { a: "agent-memory", b: "context-window", type: "mechanism" },
  // —— Multi Agent ——
  { a: "multi-agent", b: "agent", type: "mechanism" },
  { a: "multi-agent", b: "sub-agent", type: "vs" },
  { a: "multi-agent", b: "agent-loop", type: "mechanism" },
  { a: "multi-agent", b: "context-engineering", type: "bridge" },
  // —— Context Engineering ——
  { a: "context-engineering", b: "context-window", type: "mechanism" },
  { a: "context-engineering", b: "prompt", type: "vs" },
  { a: "context-engineering", b: "agent-memory", type: "vs" },
  { a: "context-engineering", b: "kv-cache", type: "bridge" },
  { a: "context-engineering", b: "agent", type: "bridge" },
  // —— خانواده Agent ← پل به مبانی مدل ——
  { a: "agent", b: "llm", type: "bridge" },
  { a: "context-window", b: "llm", type: "bridge" },
  { a: "context-window", b: "token", type: "bridge" },
  { a: "function-calling", b: "llm", type: "bridge" },
  { a: "agent-loop", b: "token", type: "bridge" },
  { a: "agent-memory", b: "token", type: "bridge" },
  // —— مبانی مدل / معماری ——
  { a: "llm", b: "token", type: "prereq" },
  { a: "llm", b: "nlp", type: "prereq" },
  { a: "nlp", b: "token", type: "prereq" },
  { a: "transformer", b: "bert", type: "prereq" },
  { a: "transformer", b: "gpt", type: "prereq" },
  { a: "transformer", b: "t5", type: "prereq" },
  { a: "transformer", b: "llama", type: "prereq" },
  { a: "gpt", b: "llm", type: "prereq" },
  { a: "llama", b: "llm", type: "prereq" },
  { a: "llama", b: "gpt", type: "sibling" },
  { a: "bert", b: "gpt", type: "sibling" },
  { a: "gpt", b: "t5", type: "sibling" },
  { a: "moe", b: "transformer", type: "prereq" },
  { a: "moe", b: "llm", type: "bridge" },
  { a: "moe", b: "deepseek-r1", type: "sibling" },
  { a: "multimodality", b: "token", type: "prereq" },
  { a: "multimodality", b: "transformer", type: "prereq" },
  { a: "multimodality", b: "llm", type: "sibling" },
  { a: "multimodality", b: "modality-encoding", type: "mechanism" },
  { a: "modality-encoding", b: "representation-space", type: "prereq" },
  { a: "modality-encoding", b: "transformer", type: "bridge" },
  { a: "representation-space", b: "embedding", type: "bridge" },
  { a: "representation-space", b: "multimodality", type: "mechanism" },
  { a: "representation-space", b: "transformer", type: "mechanism" },
  { a: "transformer", b: "attention", type: "mechanism" },
  { a: "attention", b: "multi-head-attention", type: "prereq" },
  { a: "multi-head-attention", b: "multi-query-attention", type: "prereq" },
  { a: "multi-query-attention", b: "kv-cache", type: "mechanism" },
  { a: "multi-query-attention", b: "transformer", type: "mechanism" },
  // —— استنتاج / فشرده‌سازی ——
  { a: "deepseek-r1", b: "distill", type: "mechanism" },
  { a: "deepseek-r1", b: "rlhf", type: "mechanism" },
  { a: "deepseek-r1", b: "llm", type: "bridge" },
  { a: "distill", b: "quantization", type: "vs" },
  // —— توهم / بازیابی ——
  { a: "illusion", b: "rag", type: "solution" },
  { a: "illusion", b: "agent-memory", type: "bridge" },
  { a: "rag", b: "embedding", type: "mechanism" },
  { a: "rag", b: "chunk", type: "mechanism" },
  { a: "chunk", b: "embedding", type: "mechanism" },
  { a: "chunk", b: "vector-database", type: "mechanism" },
  { a: "chunk", b: "context-window", type: "bridge" },
  { a: "chunk", b: "token", type: "bridge" },
  { a: "embedding", b: "vector-database", type: "mechanism" },
  { a: "vector-database", b: "rag", type: "mechanism" },
  { a: "vector-database", b: "recall-rerank", type: "mechanism" },
  { a: "rag", b: "recall-rerank", type: "mechanism" },
  { a: "knowledge-graph", b: "graphrag", type: "prereq" },
  { a: "rag", b: "graphrag", type: "mechanism" },
  { a: "rag", b: "knowledge-graph", type: "bridge" },
  { a: "vector-database", b: "graphrag", type: "vs" },
  { a: "recall-rerank", b: "graphrag", type: "bridge" },
  { a: "chunk", b: "recall-rerank", type: "mechanism" },
  { a: "embedding", b: "recall-rerank", type: "mechanism" },
  { a: "vector-database", b: "context-window", type: "bridge" },
  { a: "embedding", b: "token", type: "mechanism" },
  { a: "embedding", b: "context-window", type: "bridge" },
  { a: "embedding", b: "llm", type: "bridge" },
  { a: "rag", b: "context-window", type: "mechanism" },
  { a: "rag", b: "agent", type: "solution" },
  { a: "rag", b: "whyfinetune", type: "vs" },
  // —— امنیت AI ——
  { a: "prompt-injection", b: "jailbreak", type: "vs" },
  { a: "prompt-injection", b: "ai-guardrails", type: "solution" },
  { a: "jailbreak", b: "ai-guardrails", type: "solution" },
  { a: "ai-guardrails", b: "agent-sandbox", type: "mechanism" },
  // —— آموزش / هم‌ترازی ——
  { a: "pretrain", b: "sft", type: "prereq" },
  { a: "sft", b: "rlhf", type: "prereq" },
  { a: "rlhf", b: "pretrain", type: "mechanism" },
  { a: "rlhf", b: "reward-model", type: "mechanism" },
  { a: "reward-model", b: "dpo", type: "vs" },
  { a: "rlhf", b: "dpo", type: "solution" },
  { a: "sft", b: "dpo", type: "prereq" },
  { a: "loss", b: "dpo", type: "mechanism" },
  { a: "mga", b: "pretrain", type: "solution" },
  { a: "mga", b: "distill", type: "vs" },
  { a: "loss", b: "pretrain", type: "mechanism" },
  { a: "loss", b: "sft", type: "mechanism" },
  // —— داده آموزشی (خط داده) ——
  { a: "training-dataset", b: "pretrain", type: "prereq" },
  { a: "training-dataset", b: "sft", type: "prereq" },
  { a: "data-cleaning", b: "training-dataset", type: "mechanism" },
  { a: "data-annotation", b: "training-dataset", type: "mechanism" },
  { a: "data-cleaning", b: "data-annotation", type: "sibling" },
  { a: "data-annotation", b: "sft", type: "solution" },
  { a: "data-annotation", b: "dpo", type: "solution" },
  { a: "data-annotation", b: "reward-model", type: "mechanism" },
  { a: "dataset-construction", b: "training-dataset", type: "solution" },
  { a: "dataset-construction", b: "data-cleaning", type: "mechanism" },
  { a: "dataset-construction", b: "data-annotation", type: "mechanism" },
  { a: "dataset-construction", b: "mga", type: "sibling" },
  { a: "dataset-construction", b: "chunk", type: "bridge" },
  // —— تنظیم دقیق / پارامترها ——
  { a: "whyfinetune", b: "finetune", type: "prereq" },
  { a: "finetune", b: "lora", type: "mechanism" },
  { a: "finetune", b: "sft", type: "sibling" },
  { a: "lora", b: "quantization", type: "bridge" },
  { a: "lora", b: "lora-rank", type: "mechanism" },
  { a: "lora-rank", b: "lr", type: "sibling" },
  { a: "lora-rank", b: "bs", type: "sibling" },
  { a: "lora-rank", b: "epochs", type: "sibling" },
  { a: "lr", b: "bs", type: "sibling" },
  { a: "lr", b: "epochs", type: "sibling" },
  { a: "lr", b: "loss", type: "mechanism" },
  { a: "epochs", b: "bs", type: "sibling" },
  { a: "epochs", b: "whyfinetune", type: "bridge" },
  { a: "deepspeed", b: "bs", type: "mechanism" },
  { a: "deepspeed", b: "lora", type: "mechanism" },
  { a: "deepspeed", b: "quantization", type: "bridge" },
  // —— استقرار ——
  { a: "quantization", b: "gguf", type: "mechanism" },
  { a: "quantization", b: "deployment", type: "mechanism" },
  { a: "gguf", b: "deployment", type: "mechanism" },
  { a: "deployment", b: "deepspeed", type: "mechanism" },
  { a: "deployment", b: "bs", type: "bridge" },
  // —— استقرار · قالب وزن / دقت (safetensors / onnx / precision-formats) ——
  { a: "safetensors", b: "precision-formats", type: "bridge" },
  { a: "safetensors", b: "gguf", type: "vs" },
  { a: "safetensors", b: "onnx", type: "vs" },
  { a: "safetensors", b: "deployment", type: "mechanism" },
  { a: "onnx", b: "deployment", type: "mechanism" },
  { a: "onnx", b: "quantization", type: "bridge" },
  { a: "onnx", b: "model-inference", type: "mechanism" },
  { a: "precision-formats", b: "quantization", type: "vs" },
  { a: "precision-formats", b: "gguf", type: "bridge" },
  { a: "precision-formats", b: "deployment", type: "bridge" },
  { a: "token", b: "model-inference", type: "prereq" },
  { a: "transformer", b: "model-inference", type: "prereq" },
  { a: "model-inference", b: "deployment", type: "mechanism" },
  { a: "model-inference", b: "kv-cache", type: "mechanism" },
  { a: "transformer", b: "kv-cache", type: "prereq" },
  { a: "kv-cache", b: "deployment", type: "mechanism" },
  { a: "kv-cache", b: "context-window", type: "bridge" },
  { a: "model-inference", b: "continuous-batching", type: "mechanism" },
  { a: "kv-cache", b: "continuous-batching", type: "mechanism" },
  { a: "deployment", b: "continuous-batching", type: "mechanism" },
  { a: "model-inference", b: "speculative-decoding", type: "mechanism" },
  { a: "continuous-batching", b: "speculative-decoding", type: "sibling" },
  { a: "deployment", b: "speculative-decoding", type: "mechanism" },
  { a: "model-inference", b: "structured-output", type: "mechanism" },
  { a: "structured-output", b: "function-calling", type: "vs" },
  { a: "structured-output", b: "ai-guardrails", type: "mechanism" },
];

/** نمایه مجاورت: id ← مرتبط‌ها { id, type }[] (بی‌جهت) */
export const ADJACENCY: Record<string, { id: string; type: RelationType }[]> =
  (() => {
    const map: Record<string, { id: string; type: RelationType }[]> = {};
    for (const n of GRAPH_NODES) map[n.id] = [];
    for (const e of GRAPH_EDGES) {
      map[e.a]?.push({ id: e.b, type: e.type });
      map[e.b]?.push({ id: e.a, type: e.type });
    }
    return map;
  })();

/* ────────────────────────────────────────────────
 * بررسی حالت توسعه: خط فراموش‌شده / typo در یال زود آشکار شود
 * ──────────────────────────────────────────────── */
declare const process: { env: { NODE_ENV?: string } };

if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  const ids = new Set(GRAPH_NODES.map((n) => n.id));

  aiKnowledgeConceptData.forEach((c) => {
    if (!c.line) {
      console.warn(`[نقشه دانش بصری] مفهوم «${c.id}» فیلد line ندارد و نمای کلی آن را شامل نمی‌شود`);
    } else if (!lineById[c.line]) {
      console.warn(
        `[نقشه دانش بصری] مفهوم «${c.id}» دارای line="${c.line}" است که در LEARNING_LINES وجود ندارد`,
      );
    }
  });

  GRAPH_EDGES.forEach((e, i) => {
    if (!ids.has(e.a) || !ids.has(e.b)) {
      console.warn(
        `[نقشه دانش بصری] یال شماره ${i + 1} به id مفهوم ناموجود ارجاع می‌دهد: ${e.a} ↔ ${e.b}`,
      );
    }
  });
}
