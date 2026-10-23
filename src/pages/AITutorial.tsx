/**
 * کامپوننت صفحه آموزش‌های AI
 * محتوای آموزش AI از اسناد Feishu را با iframe جاسازی می‌کند
 */

import React, { useState } from 'react';

const AITutorial: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tutorialUrl = 'https://rncg5jvpme.feishu.cn/wiki/U9rYwRHQoil6vBkitY8cbh5tnL9';

  return (
    <div className="min-h-screen bg-white">
      {/* Content - نمایش مستقیم iframe تمام‌صفحه */}
      <div className="h-screen relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <div className="text-lg font-medium text-gray-700">در حال بارگذاری سند آموزشی...</div>
            </div>
          </div>
        )}
        <iframe
          src={tutorialUrl}
          className="w-full h-full border-0"
          title="آموزش‌های AI"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default AITutorial;