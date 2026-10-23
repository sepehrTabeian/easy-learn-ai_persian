/**
 * Hook سفارشی مدیریت داده مدل
 * منطق دریافت، جستجو، فیلتر، مرتب‌سازی و گروه‌بندی داده فهرست مدل‌ها را کپسوله می‌کند
 */

import { useState, useEffect, useMemo } from 'react';
import { AIModel, SortOption, GroupByOption, ModelFilters } from '../types/model';
import { modelApiUtils } from '../utils/modelApi';
import toast from 'react-hot-toast';

/**
 * Hook: دریافت فهرست مدل‌ها
 */
export const useModelList = () => {
  const [modelList, setModelList] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModelList = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('شروع دریافت فهرست مدل‌ها...');
        
        const data = await modelApiUtils.fetchModelList();
        console.log('داده مدل‌ها دریافت شد:', data.length, 'مدل');
        
        setModelList(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'خطای ناشناخته';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Failed to load model list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModelList();
  }, []);

  return { modelList, loading, error };
};

/**
 * Hook: جستجو و فیلتر مدل
 */
export const useModelFilters = (modelList: AIModel[]) => {
  const [filters, setFilters] = useState<ModelFilters>({
    searchQuery: '',
    selectedCompanies: [],
    selectedTags: [],
    selectedOpenSourceStatus: [],
  });

  // دریافت فهرست همه شرکت‌ها
  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    modelList.forEach(model => companies.add(model.company));
    return Array.from(companies).sort();
  }, [modelList]);

  // دریافت فهرست همه برچسب‌ها
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    modelList.forEach(model => {
      model.modelTags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [modelList]);

  // دریافت همه وضعیت‌های متن‌باز
  const allOpenSourceStatuses = useMemo(() => {
    return ['متن‌باز', 'متن‌بسته'];
  }, []);

  // اعمال فیلتر
  const filteredModels = useMemo(() => {
    let result = [...modelList];

    // فیلتر جستجو
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(model =>
        model.modelName.toLowerCase().includes(query) ||
        model.company.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        model.modelTags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // فیلتر شرکت
    if (filters.selectedCompanies.length > 0) {
      result = result.filter(model => 
        filters.selectedCompanies.includes(model.company)
      );
    }

    // فیلتر برچسب
    if (filters.selectedTags.length > 0) {
      result = result.filter(model =>
        filters.selectedTags.some(tag => model.modelTags.includes(tag))
      );
    }

    // فیلتر وضعیت متن‌باز
    if (filters.selectedOpenSourceStatus.length > 0) {
      result = result.filter(model =>
        filters.selectedOpenSourceStatus.includes(model.openSourceStatus)
      );
    }

    // فیلتر پنجره context
    if (filters.minContextWindow !== undefined) {
      result = result.filter(model => model.contextWindow >= filters.minContextWindow!);
    }
    if (filters.maxContextWindow !== undefined) {
      result = result.filter(model => model.contextWindow <= filters.maxContextWindow!);
    }

    return result;
  }, [modelList, filters]);

  const updateFilters = (updates: Partial<ModelFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCompanies: [],
      selectedTags: [],
      selectedOpenSourceStatus: [],
    });
  };

  const hasActiveFilters = 
    filters.searchQuery.trim() !== '' ||
    filters.selectedCompanies.length > 0 ||
    filters.selectedTags.length > 0 ||
    filters.selectedOpenSourceStatus.length > 0 ||
    filters.minContextWindow !== undefined ||
    filters.maxContextWindow !== undefined;

  return {
    filters,
    filteredModels,
    allCompanies,
    allTags,
    allOpenSourceStatuses,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };
};

/**
 * Hook: مرتب‌سازی مدل
 */
export const useModelSort = (models: AIModel[]) => {
  const [sortOption, setSortOption] = useState<SortOption>('releaseDate-desc');

  const sortedModels = useMemo(() => {
    const result = [...models];

    switch (sortOption) {
      case 'releaseDate-desc':
        return result.sort((a, b) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      case 'releaseDate-asc':
        return result.sort((a, b) => 
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      case 'contextWindow-desc':
        return result.sort((a, b) => b.contextWindow - a.contextWindow);
      case 'contextWindow-asc':
        return result.sort((a, b) => a.contextWindow - b.contextWindow);
      case 'modelName-asc':
        return result.sort((a, b) => a.modelName.localeCompare(b.modelName));
      case 'modelName-desc':
        return result.sort((a, b) => b.modelName.localeCompare(a.modelName));
      default:
        return result;
    }
  }, [models, sortOption]);

  return {
    sortOption,
    setSortOption,
    sortedModels,
  };
};

/**
 * Hook: گروه‌بندی مدل
 */
export const useModelGroup = (models: AIModel[], groupBy: GroupByOption) => {
  const groupedModels = useMemo(() => {
    if (groupBy === 'none') {
      return { 'همه مدل‌ها': models };
    }

    const groups: Record<string, AIModel[]> = {};

    models.forEach(model => {
      let groupKey: string;

      switch (groupBy) {
        case 'company':
          groupKey = model.company;
          break;
        case 'openSourceStatus':
          groupKey = model.openSourceStatus;
          break;
        case 'tag':
          // در گروه‌بندی برچسب، یک مدل ممکن است به چند گروه تعلق داشته باشد
          model.modelTags.forEach(tag => {
            if (!groups[tag]) {
              groups[tag] = [];
            }
            groups[tag].push(model);
          });
          return;
        default:
          groupKey = 'دسته‌بندی‌نشده';
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(model);
    });

    return groups;
  }, [models, groupBy]);

  return groupedModels;
};
