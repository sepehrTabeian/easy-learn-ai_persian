/**
 * ConceptMap — «نمای کلی» دانش بصری AI (نقشه خطوط مترو + برجسته‌سازی ارتباط‌ها)
 *
 * هدف طراحی (پاسخ به نیاز کاربر: از کجا شروع کنم / چطور یاد بگیرم / چه یاد می‌گیرم / ارتباط‌ها چیست):
 *   ۱. بالا «نگاه کلی به مسیرهای یادگیری» با ۷ کارت —— در یک نگاه ببینید چند مسیر یادگیری وجود دارد و هر کدام از کجا شروع می‌شود
 *   ۲. وسط «نقشه خطوط مترو» —— هر خط رنگی یک ترتیب یادگیری است، از چپ به راست و در انتها برمی‌گردد به ردیف پایین
 *   ۳. ماوس را روی هر مفهومی ببرید (یا یک بار کلیک کنید) —— ارتباط آن با مفاهیم دیگر برجسته می‌شود و بر اساس ۶ نوع رابطه رنگ می‌گیرد
 *   ۴. روی «باز کردن توضیح» کلیک کنید —— وارد سایت توضیح تعاملی آن مفهوم می‌شوید
 *
 * چیدمان: خم مارپیچ (boustrophedon) —— هر خط حداکثر COLS ایستگاه دارد و بیشتر از آن به ردیف بعد می‌رود
 * و در جهت مخالف برمی‌گردد (پیچ با گوشه گرد)، خطوط بلند خودکار جمع می‌شوند و عرض کل نقشه کنترل‌شده است و بی‌نهایت کش نمی‌آید.
 *
 * فقط SVG + React، بدون کتابخانه گرافیکی شخص ثالث.
 */

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MousePointerClick,
  Sparkles,
  X,
} from "lucide-react";
import {
  ADJACENCY,
  GRAPH_NODES,
  LEARNING_LINES,
  lineById,
  NODES_BY_LINE,
  RECOMMENDED_START,
  RELATION_META,
  type GraphNode,
  type RelationType,
} from "../data/conceptGraphData";

/* ── ثابت‌های چیدمان ── */
const COLS = 6; // حداکثر ایستگاه در هر ردیف، بیشتر از آن برمی‌گردد
const LABEL_W = 150; // فضای خالی سمت چپ برای نام خط
const COL_GAP = 178; // فاصله افقی ایستگاه‌های مجاور در یک ردیف
const ROW_GAP = 88; // فاصله ردیف‌های برگشتی
const PAD_TOP = 30; // فضای خالی بالای ردیف اول در نوار خط
const PAD_BOTTOM = 26; // فضای خالی پایین ردیف آخر در نوار خط
const PILL_H = 36;
const HUB_H = 44;
const MAX_H = HUB_H; // مبنای ارتفاع ردیف
const DETAIL_PANEL_W = 290;
const DETAIL_PANEL_H = 420;
const DETAIL_PANEL_MARGIN = 16;
const DETAIL_PANEL_GAP = 18;

/** تخمین عرض station (عرض حرف چینی حدود ۱۵، انگلیسی حدود ۸) */
const estWidth = (label: string): number => {
  let w = 0;
  for (const ch of label) w += /[\x00-\xff]/.test(ch) ? 8 : 15;
  return Math.max(80, w + 30);
};

interface Placed extends GraphNode {
  cx: number;
  cy: number;
  w: number;
  h: number;
  lineColor: string;
}

interface LineLayout {
  id: string;
  name: string;
  startHint: string;
  color: string;
  yTop: number;
  bandH: number;
  /** دنباله نقاط مرکزی گره‌های این خط (برای رسم خط شکسته مترو) */
  path: { cx: number; cy: number }[];
}

const ConceptMap: React.FC<{
  /** هنگام کلیک روی «باز کردن توضیح»، id مفهوم را callback می‌کند و کامپوننت والد مسئول انتقال است */
  onSelectConcept: (id: string) => void;
}> = ({ onSelectConcept }) => {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const displayId = selectedId ?? hoverId;

  /* چیدمان خم مارپیچ: مختصات هر گره + نوار و خط شکسته هر خط را حساب می‌کند */
  const { placed, byId, lineLayouts, width, height } = useMemo(() => {
    const map = new Map<string, Placed>();
    const list: Placed[] = [];
    const layouts: LineLayout[] = [];
    const baseX = LABEL_W + 96; // مرکز دایره ایستگاه اول x (نصف عرض برای pill سمت چپ کنار گذاشته می‌شود)

    let cursorY = 8;
    LEARNING_LINES.forEach((line) => {
      const lineNodes = NODES_BY_LINE[line.id] ?? [];
      const len = lineNodes.length;
      const rows = Math.max(1, Math.ceil(len / COLS));
      const firstRowY = cursorY + PAD_TOP + MAX_H / 2;
      const path: { cx: number; cy: number }[] = [];

      lineNodes.forEach((node, i) => {
        const row = Math.floor(i / COLS);
        const colInRow = i % COLS;
        // مارپیچ: ردیف‌های زوج از چپ به راست، ردیف‌های فرد از راست به چپ (محل برگشت در همان ستون ← اتصال عمودی)
        const col = row % 2 === 0 ? colInRow : COLS - 1 - colInRow;
        const cx = baseX + col * COL_GAP;
        const cy = firstRowY + row * ROW_GAP;
        const w = estWidth(node.label);
        const p: Placed = {
          ...node,
          cx,
          cy,
          w,
          h: node.hub ? HUB_H : PILL_H,
          lineColor: line.color,
        };
        map.set(node.id, p);
        list.push(p);
        path.push({ cx, cy });
      });

      const bandH = PAD_TOP + (rows - 1) * ROW_GAP + MAX_H + PAD_BOTTOM;
      layouts.push({
        id: line.id,
        name: line.name,
        startHint: line.startHint,
        color: line.color,
        yTop: cursorY,
        bandH,
        path,
      });
      cursorY += bandH;
    });

    const maxRight = list.reduce((m, p) => Math.max(m, p.cx + p.w / 2), 0);
    return {
      placed: list,
      byId: map,
      lineLayouts: layouts,
      width: maxRight + 40,
      height: cursorY + 12,
    };
  }, []);

  /* مجموعه همسایه‌های گره برجسته فعلی (شامل نوع رابطه) */
  const neighbors = useMemo(() => {
    if (!displayId) return null;
    const m = new Map<string, RelationType>();
    (ADJACENCY[displayId] ?? []).forEach((n) => m.set(n.id, n.type));
    return m;
  }, [displayId]);

  const isDimmed = (id: string): boolean => {
    if (!displayId) return false;
    return id !== displayId && !neighbors?.has(id);
  };

  const selectedNode = selectedId ? byId.get(selectedId) : null;
  const detailPanelTop = selectedNode
    ? Math.max(
        DETAIL_PANEL_MARGIN,
        Math.min(
          selectedNode.cy - DETAIL_PANEL_H / 2,
          Math.max(DETAIL_PANEL_MARGIN, height - DETAIL_PANEL_H - DETAIL_PANEL_MARGIN),
        ),
      )
    : DETAIL_PANEL_MARGIN;
  const detailPanelLeft = selectedNode
    ? (() => {
        const rightOfNode =
          selectedNode.cx + selectedNode.w / 2 + DETAIL_PANEL_GAP;
        const leftOfNode =
          selectedNode.cx - selectedNode.w / 2 - DETAIL_PANEL_GAP - DETAIL_PANEL_W;

        if (rightOfNode + DETAIL_PANEL_W <= width - DETAIL_PANEL_MARGIN) {
          return rightOfNode;
        }
        if (leftOfNode >= DETAIL_PANEL_MARGIN) {
          return leftOfNode;
        }

        return Math.max(
          DETAIL_PANEL_MARGIN,
          Math.min(
            selectedNode.cx - DETAIL_PANEL_W / 2,
            width - DETAIL_PANEL_W - DETAIL_PANEL_MARGIN,
          ),
        );
      })()
    : DETAIL_PANEL_MARGIN;

  /* ارتباط‌های گره انتخاب‌شده، گروه‌بندی بر اساس نوع رابطه (برای پنل کناری) */
  const groupedRelations = useMemo(() => {
    if (!selectedId) return [];
    const groups = new Map<RelationType, { id: string; label: string }[]>();
    (ADJACENCY[selectedId] ?? []).forEach(({ id, type }) => {
      const n = byId.get(id);
      if (!n) return;
      if (!groups.has(type)) groups.set(type, []);
      groups.get(type)!.push({ id, label: n.label });
    });
    return Array.from(groups.entries());
  }, [selectedId, byId]);

  return (
    <div>
      {/* ───────── متن راهنما ───────── */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] text-ink mb-5">
          <Sparkles className="w-3.5 h-3.5 text-coral" strokeWidth={2.5} />
          نمای کلی · نقشه دانش بصری
        </div>
        <h2 className="font-display font-extrabold text-[28px] md:text-[36px] leading-[1.15] text-ink">
          این ۴۰ مفهوم در واقع یک شبکه‌اند
        </h2>
        <p className="font-sans text-[15px] md:text-[16px] leading-[1.7] text-ink/70 mt-4">
          هر خط رنگی یک مسیر یادگیری از ابتدا تا انتهاست؛ کافی است در امتداد آن پیش بروید (در انتها به ردیف بعد برمی‌گردد).
          ماوس را روی هر مفهومی ببرید تا ببینید با چه چیزهایی ارتباط دارد؛
          <span className="font-semibold text-ink">یک بار کلیک کنید تا وارد توضیح آن شوید.</span>
          نمی‌دانید از کجا شروع کنید؟ اول ببینید <StartTag /> آن ایستگاه را.
        </p>
      </div>

      {/* ───────── نگاه کلی به مسیرهای یادگیری (۷ کارت) ───────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {LEARNING_LINES.map((line) => (
          <div
            key={line.id}
            className="relative bg-white border-2 border-ink rounded-2xl p-4 shadow-stamp"
          >
            <span
              className="absolute top-0 start-5 -translate-y-1/2 inline-flex items-center px-2.5 py-0.5 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold text-white"
              style={{ backgroundColor: line.color }}
            >
              {NODES_BY_LINE[line.id]?.length ?? 0} ایستگاه
            </span>
            <h3 className="font-display font-extrabold text-[16px] text-ink mt-1 flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full border border-ink"
                style={{ backgroundColor: line.color }}
              />
              {line.name}
            </h3>
            <p className="font-sans text-[12.5px] leading-[1.55] text-ink/65 mt-1.5">
              {line.blurb}
            </p>
            <div className="font-sans text-[11px] text-ink/45 mt-2.5 flex items-center gap-1">
              <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              {line.startHint}
            </div>
          </div>
        ))}
      </div>

      {/* ───────── نقشه خطوط مترو ───────── */}
      <div className="relative">
        <div className="lg:hidden font-sans text-[12px] text-ink/45 mb-2 flex items-center gap-1.5">
          <MousePointerClick className="w-3.5 h-3.5" strokeWidth={2.5} />
          روی مفهوم کلیک کنید تا ارتباط‌ها را ببینید و وارد توضیح شوید
        </div>

        <div className="overflow-x-auto rounded-3xl border-2 border-ink bg-cream shadow-stamp-lg">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="block min-w-full"
            onMouseLeave={() => setHoverId(null)}
            role="img"
            aria-label="نقشه متروی ارتباط مفاهیم AI"
          >
            {/* نوار پس‌زمینه ردیف + عنوان ردیف */}
            {lineLayouts.map((ln, li) => (
              <g key={`band-${ln.id}`}>
                <rect
                  x={0}
                  y={ln.yTop}
                  width={width}
                  height={ln.bandH}
                  fill={li % 2 === 0 ? "#FFFFFF" : "#FBF7EE"}
                  opacity={0.55}
                />
                <rect
                  x={14}
                  y={ln.yTop + ln.bandH / 2 - 7}
                  width={14}
                  height={14}
                  rx={4}
                  fill={ln.color}
                  stroke="#241C15"
                  strokeWidth={1.5}
                />
                <text
                  x={36}
                  y={ln.yTop + ln.bandH / 2 - 2}
                  fontSize={13}
                  fontWeight={800}
                  fill="#241C15"
                >
                  {ln.name}
                </text>
                <text
                  x={36}
                  y={ln.yTop + ln.bandH / 2 + 15}
                  fontSize={10.5}
                  fill="#241C15"
                  opacity={0.5}
                >
                  {ln.startHint}
                </text>
              </g>
            ))}

            {/* خط شکسته مترو (پیچ مارپیچ) —— ایستگاه‌های یک خط را با گوشه گرد به هم وصل می‌کند */}
            {lineLayouts.map((ln) => {
              if (ln.path.length < 2) return null;
              const d =
                `M ${ln.path[0].cx} ${ln.path[0].cy} ` +
                ln.path
                  .slice(1)
                  .map((p) => `L ${p.cx} ${p.cy}`)
                  .join(" ");
              return (
                <path
                  key={`metro-${ln.id}`}
                  d={d}
                  fill="none"
                  stroke={ln.color}
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={displayId ? 0.12 : 0.5}
                />
              );
            })}

            {/* منحنی برجسته‌سازی ارتباط (فقط هنگام hover/انتخاب) —— رابطه بین خطوط */}
            {displayId &&
              neighbors &&
              Array.from(neighbors.entries()).map(([nid, type]) => {
                const a = byId.get(displayId);
                const b = byId.get(nid);
                if (!a || !b) return null;
                const meta = RELATION_META[type];
                const midX = (a.cx + b.cx) / 2;
                const midY = (a.cy + b.cy) / 2;
                const dist = Math.hypot(a.cx - b.cx, a.cy - b.cy);
                const cpY = midY - Math.min(90, dist * 0.28 + 24);
                return (
                  <path
                    key={`rel-${nid}`}
                    d={`M ${a.cx} ${a.cy} Q ${midX} ${cpY} ${b.cx} ${b.cy}`}
                    fill="none"
                    stroke={meta.color}
                    strokeWidth={2.5}
                    strokeDasharray={meta.dashed ? "6 5" : undefined}
                    opacity={0.85}
                  />
                );
              })}

            {/* ایستگاه‌ها */}
            {placed.map((p) => {
              const dimmed = isDimmed(p.id);
              const isActive = p.id === displayId;
              const relType = neighbors?.get(p.id);
              const ringColor = isActive
                ? p.lineColor
                : relType
                  ? RELATION_META[relType].color
                  : null;
              const isStart = p.id === RECOMMENDED_START;
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.cx} ${p.cy})`}
                  opacity={dimmed ? 0.22 : 1}
                  style={{ cursor: "pointer", transition: "opacity .2s" }}
                  onMouseEnter={() => setHoverId(p.id)}
                  onClick={() => setSelectedId(p.id)}
                >
                  {isStart && !displayId && (
                    <rect
                      x={-p.w / 2 - 6}
                      y={-p.h / 2 - 6}
                      width={p.w + 12}
                      height={p.h + 12}
                      rx={(p.h + 12) / 2}
                      fill="none"
                      stroke={p.lineColor}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      opacity={0.7}
                    />
                  )}
                  {ringColor && (
                    <rect
                      x={-p.w / 2 - 4}
                      y={-p.h / 2 - 4}
                      width={p.w + 8}
                      height={p.h + 8}
                      rx={(p.h + 8) / 2}
                      fill="none"
                      stroke={ringColor}
                      strokeWidth={3}
                    />
                  )}
                  <rect
                    x={-p.w / 2}
                    y={-p.h / 2}
                    width={p.w}
                    height={p.h}
                    rx={p.h / 2}
                    fill={p.hub ? p.lineColor : "#FFFFFF"}
                    stroke="#241C15"
                    strokeWidth={2}
                    style={{
                      filter: isActive
                        ? "drop-shadow(2px 3px 0 #241C15)"
                        : undefined,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={p.hub ? 14 : 12.5}
                    fontWeight={p.hub ? 800 : 600}
                    fill={p.hub ? "#FFFFFF" : "#241C15"}
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* پنل جزئیات انتخاب‌شده */}
        {selectedNode && (
          <div
            className="absolute w-[290px] max-w-[calc(100%-2rem)] max-h-[min(520px,calc(100vh-7rem))] overflow-y-auto bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 z-10"
            style={{ top: detailPanelTop, left: detailPanelLeft }}
          >
            <button
              onClick={() => setSelectedId(null)}
              aria-label="بستن"
              className="absolute top-3 end-3 p-1 rounded-full hover:bg-ink/5 transition-colors"
            >
              <X className="w-4 h-4 text-ink/60" strokeWidth={2.5} />
            </button>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold text-white mb-2.5"
              style={{ backgroundColor: selectedNode.lineColor }}
            >
              {lineById[selectedNode.line]?.tag ?? selectedNode.category}
            </div>
            <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight">
              {selectedNode.label}
            </h3>
            {selectedNode.desc && (
              <p className="font-sans text-[13px] leading-[1.6] text-ink/65 mt-2">
                {selectedNode.desc}
              </p>
            )}

            {groupedRelations.length > 0 ? (
              <div className="mt-4 space-y-3 max-h-[240px] overflow-y-auto pe-1">
                {groupedRelations.map(([type, items]) => {
                  const meta = RELATION_META[type];
                  return (
                    <div key={type}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                        <span className="font-sans font-semibold text-[11.5px] text-ink/70">
                          {meta.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((it) => (
                          <button
                            key={it.id}
                            onClick={() => setSelectedId(it.id)}
                            className="inline-flex items-center px-2.5 py-1 bg-cream border border-ink rounded-full font-sans text-[12px] text-ink hover:bg-butter transition-colors"
                          >
                            {it.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="font-sans text-[13px] text-ink/55 mt-4">
                برای این مفهوم هنوز ارتباطی ثبت نشده است.
              </p>
            )}

            <button
              onClick={() => onSelectConcept(selectedNode.id)}
              className="group w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-white border-2 border-ink rounded-full font-sans font-bold text-[13.5px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:5px_5px_0_0_#241C15]"
            >
              باز کردن «{selectedNode.label}» توضیح
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>
        )}
      </div>

      {/* ───────── راهنمای روابط ───────── */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="font-sans font-semibold text-[12px] text-ink/55">
          رنگ خط نشان‌دهنده نوع رابطه است:
        </span>
        {(Object.keys(RELATION_META) as RelationType[]).map((t) => {
          const meta = RELATION_META[t];
          return (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 font-sans text-[12px] text-ink/70"
            >
              <svg width={22} height={8}>
                <line
                  x1={0}
                  y1={4}
                  x2={22}
                  y2={4}
                  stroke={meta.color}
                  strokeWidth={2.5}
                  strokeDasharray={meta.dashed ? "5 4" : undefined}
                />
              </svg>
              {meta.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** قرص کوچک نقطه شروع پیشنهادی (هم‌رنگ نقطه شروع درخشان روی نقشه) */
const StartTag: React.FC = () => {
  const node = GRAPH_NODES.find((n) => n.id === RECOMMENDED_START);
  const line = LEARNING_LINES.find((l) => l.id === node?.line);
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full border-2 border-ink font-sans font-bold text-[13px] text-white align-middle"
      style={{ backgroundColor: line?.color ?? "#241C15" }}
    >
      {node?.label ?? "LLM"}
    </span>
  );
};

export default ConceptMap;
