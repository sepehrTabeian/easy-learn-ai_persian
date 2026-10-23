/**
 * تعریف نوع‌های مرتبط با مدل AI
 */

export interface RelatedLink {
  title: string;
  url: string;
}

export interface AIModel {
  modelName: string;
  company: string;
  country: string;
  openSourceStatus: "متن‌باز" | "متن‌بسته";
  releaseDate: string;
  description: string;
  modelTags: string[];
  contextWindow: number;
  maxGenerationTokenLength: number;
  maxOutputResolution?: string;
  relatedLinks: RelatedLink[];
  parent?: string;
}

export type SortOption =
  | "releaseDate-desc"
  | "releaseDate-asc"
  | "contextWindow-desc"
  | "contextWindow-asc"
  | "modelName-asc"
  | "modelName-desc";

export type GroupByOption = "none" | "company" | "openSourceStatus" | "tag";

export interface ModelFilters {
  searchQuery: string;
  selectedCompanies: string[];
  selectedTags: string[];
  selectedOpenSourceStatus: string[];
  minContextWindow?: number;
  maxContextWindow?: number;
}
