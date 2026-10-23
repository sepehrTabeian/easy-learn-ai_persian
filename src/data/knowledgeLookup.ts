/**
 * دانش بصری AI · درگاه یکپارچه جستجو
 *
 * توضیح مفاهیم و توضیح ویدئویی در فایل‌های جدا نگهداری می‌شوند و مسیر صفحه جزئیات همچنان /ai-knowledge/:id مشترک است،
 * با این helper در دو منبع داده جستجو می‌شود.
 */

import { aiKnowledgeConceptData } from "./aiKnowledgeConceptData";
import { aiKnowledgeVideoData } from "./aiKnowledgeVideoData";
import {
  AIKnowledgeItem,
  AIKnowledgeConceptItem,
  AIKnowledgeVideoItem,
  KnowledgeType,
} from "../types";

export function findKnowledgeItemById(
  id: string,
): AIKnowledgeItem | undefined {
  return (
    aiKnowledgeConceptData.find((item) => item.id === id) ??
    aiKnowledgeVideoData.find((item) => item.id === id)
  );
}

export function getKnowledgeType(id: string): KnowledgeType | undefined {
  if (aiKnowledgeConceptData.some((item) => item.id === id)) return "concept";
  if (aiKnowledgeVideoData.some((item) => item.id === id)) return "video";
  return undefined;
}

export function isConceptItem(
  item: AIKnowledgeItem,
): item is AIKnowledgeConceptItem {
  return getKnowledgeType(item.id) === "concept";
}

export function isVideoItem(
  item: AIKnowledgeItem,
): item is AIKnowledgeVideoItem {
  return getKnowledgeType(item.id) === "video";
}
