import React from 'react';
import { NavigationData } from '../../types/navigation';

interface CategoryNavProps {
  data: NavigationData;
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  data,
  selectedCategory,
  onCategorySelect,
}) => {
  const categories = Object.keys(data);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 px-2">دسته‌بندی ابزارها</h3>
      
      {/* دکمه همه دسته‌بندی‌ها */}
      <button
        onClick={() => onCategorySelect(null)}
        className={`w-full text-start px-4 py-3 rounded-xl mb-2 transition-all duration-200
                   ${!selectedCategory 
                     ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                   }`}
      >
        <span className="font-medium">همه ابزارها</span>
        <span className="ms-2 text-sm opacity-75">
          ({Object.values(data).reduce((total, tools) => total + tools.length, 0)})
        </span>
      </button>

      {/* فهرست دسته‌بندی‌ها */}
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full text-start px-4 py-3 rounded-xl transition-all duration-200
                       ${selectedCategory === category
                         ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                       }`}
          >
            <span className="font-medium">{category}</span>
            <span className="ms-2 text-sm opacity-75">({data[category].length})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
