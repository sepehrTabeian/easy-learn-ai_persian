import React from 'react';
import { Grid, List } from 'lucide-react';
import { AITool, SearchResult } from '../../types/navigation';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import { usePagination } from '../../hooks/useNavigationData';

interface ToolListProps {
  tools: AITool[] | SearchResult[];
  title: string;
  showCategory?: boolean;
  emptyMessage?: string;
}

const ToolList: React.FC<ToolListProps> = ({ 
  tools, 
  title, 
  showCategory = false,
  emptyMessage = "هنوز ابزاری نیست"
}) => {
  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(tools, 30);

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  if (tools.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Grid className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">{emptyMessage}</h3>
        <p className="text-sm text-gray-400">کلیدواژه جستجوی دیگری امتحان کنید یا دسته‌بندی دیگری را مرور کنید</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* سربرگ فهرست ابزارها */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-1">
              در مجموع <span className="font-semibold text-orange-600">{tools.length}</span> ابزار پیدا شد
              {totalPages > 1 && (
                <span className="ms-2">
                  صفحه {currentPage} / {totalPages} 
                </span>
              )}
            </p>
          </div>
          
          {/* تغییر نما */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200
                         ${viewMode === 'grid' 
                           ? 'bg-white text-orange-600 shadow-sm' 
                           : 'text-gray-500 hover:text-gray-700'
                         }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200
                         ${viewMode === 'list' 
                           ? 'bg-white text-orange-600 shadow-sm' 
                           : 'text-gray-500 hover:text-gray-700'
                         }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* شبکه ابزارها */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {currentItems.map((tool, index) => (
          <ToolCard
            key={`${tool.title}-${index}`}
            tool={tool}
            category={showCategory && 'category' in tool ? (tool as SearchResult).category : undefined}
            showCategory={showCategory}
          />
        ))}
      </div>

      {/* صفحه‌بندی */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
};

export default ToolList;
