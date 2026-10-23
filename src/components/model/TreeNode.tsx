/**
 * کامپوننت گره درخت
 * رندر بازگشتی هر گره ساختار درختی
 */

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Building2,
  Shield,
  Cpu,
  GitBranch,
  Calendar,
} from "lucide-react";
import { TreeNode as TreeNodeType } from "../../utils/modelTreeUtils";
import { ModelDetailModal } from "./ModelDetailModal";

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
  parentExpanded?: boolean; // آیا گره والد باز است
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  parentExpanded = false,
}) => {
  // به‌طور پیش‌فرض سطح شرکت باز است، یا وقتی گره والد از نوع status است و باز شده، خودکار باز می‌شود
  const [isExpanded, setIsExpanded] = useState(
    level === 0 || (level === 2 && parentExpanded)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // وقتی وضعیت باز بودن گره والد تغییر کند، وضعیت گره فرزند به‌روزرسانی می‌شود
  React.useEffect(() => {
    if (level === 2 && parentExpanded) {
      setIsExpanded(true);
    }
  }, [parentExpanded, level]);

  const hasChildren = node.children && node.children.length > 0;

  // قالب‌بندی تاریخ
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date
        .toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");
    } catch {
      return dateStr;
    }
  };

  // دریافت آیکون کشور
  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      آمریکا: "🇺🇸",
      چین: "🇨🇳",
      انگلیس: "🇬🇧",
      آلمان: "🇩🇪",
    };
    return flags[country] || "🌍";
  };

  // دریافت آیکون گره
  const getIcon = () => {
    switch (node.type) {
      case "company":
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case "status":
        return <Shield className="w-4 h-4 text-green-600" />;
      case "model":
        return null; // گره مدل آیکون شرکت را نمایش می‌دهد
      case "submodel":
        return <GitBranch className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Cpu className="w-4 h-4 text-gray-600" />;
    }
  };

  // دریافت استایل گره
  const getNodeStyle = () => {
    const baseStyle =
      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200";

    switch (node.type) {
      case "company":
        return `${baseStyle} hover:bg-blue-50 cursor-pointer font-semibold text-gray-800`;
      case "status":
        return `${baseStyle} hover:bg-green-50 cursor-pointer font-medium text-gray-700`;
      case "model":
        return `${baseStyle} hover:bg-purple-50 cursor-pointer text-gray-700`;
      case "submodel":
        return `${baseStyle} hover:bg-purple-50 cursor-pointer text-gray-700`; // هم‌اندازه با فونت مدل والد
      default:
        return baseStyle;
    }
  };

  // پردازش کلیک روی گره
  const handleNodeClick = () => {
    if ((node.type === "model" || node.type === "submodel") && node.model) {
      // گره‌هایی که داده مدل واقعی دارند: باز کردن پنجره جزئیات
      setIsModalOpen(true);
    } else if (hasChildren) {
      // سایر گره‌هایی که فرزند دارند (شامل گره والد مجازی): باز/بسته کردن
      setIsExpanded(!isExpanded);
    }
  };

  // پردازش کلیک دکمه باز/بسته
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  console.log(111, node);

  return (
    <div>
      {/* محتوای گره */}
      <div
        className={getNodeStyle()}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={handleNodeClick}
      >
        {/* دکمه باز/بسته یا جای‌نگهدار */}
        {hasChildren ? (
          <button
            onClick={handleToggleClick}
            className="flex-shrink-0 hover:bg-gray-200 rounded p-0.5 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        ) : (
          // همه گره‌ها جای‌نگهدار نمایش می‌دهند تا هم‌تراز بمانند
          <div className="w-5 flex-shrink-0" />
        )}

        {/* سطح شرکت آیکون کشور را نمایش می‌دهد (پیش از آیکون) */}
        {node.type === "company" &&
          node.children &&
          node.children.length > 0 && (
            <span className="text-lg flex-shrink-0 me-1">
              {getCountryFlag(node.country || "")}
            </span>
          )}

        {/* آیکون گره */}
        {node.type === "model" || node.type === "submodel" ? (
          // گره مدل آیکون شرکت را نمایش می‌دهد، زیرمدل‌ها با تورفتگی سلسله‌مراتب را نشان می‌دهند
          <div className="flex items-center gap-2 flex-shrink-0">
            {node.type === "submodel" && (
              <div className="w-4 border-s-2 border-b-2 border-gray-300 h-6 -mb-3" />
            )}
            {node.model ? (
              <img
                src={`/imgs/${node.model.company}.png`}
                alt={node.model.company}
                className="w-6 h-6 rounded-full object-cover border border-gray-200 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              // گره والد مجازی (parent یک دسته‌بندی نمادین است) آیکون پوشه نمایش می‌دهد
              <GitBranch className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </div>
        ) : (
          <div className="flex-shrink-0">{getIcon()}</div>
        )}

        {/* نام گره و تاریخ انتشار */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate">{node.name}</span>

          {/* تاریخ انتشار مدل (فقط برای مدل و زیرمدل نمایش داده می‌شود) - استایل برچسب فرعی */}
          {(node.type === "model" || node.type === "submodel") &&
            node.model && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600 flex-shrink-0">
                {formatDate(node.model.releaseDate)}
              </span>
            )}
        </div>

        {/* تعداد گره‌های فرزند */}
        {node.count !== undefined && node.count > 0 && (
          <span className="flex-shrink-0 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            {node.count}
          </span>
        )}
      </div>

      {/* گره‌های فرزند */}
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              parentExpanded={node.type === "status" && isExpanded}
            />
          ))}
        </div>
      )}

      {/* پنجره جزئیات */}
      {node.model && (
        <ModelDetailModal
          model={node.model}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
