/**
 * کامپوننت نمای درختی مدل
 * نمایش روابط سلسله‌مراتبی مدل‌ها به‌صورت ساختار درختی
 */

import React, { useMemo } from "react";
import { AIModel } from "../../types/model";
import { buildModelTree } from "../../utils/modelTreeUtils";
import { TreeNode } from "./TreeNode";

interface ModelTreeViewProps {
  models: AIModel[];
}

export const ModelTreeView: React.FC<ModelTreeViewProps> = ({ models }) => {
  // ساخت ساختار درختی
  const treeData = useMemo(() => buildModelTree(models), [models]);

  // گروه‌بندی بر اساس کشور
  const { chinaCompanies, overseasCompanies } = useMemo(() => {
    const china: typeof treeData = [];
    const overseas: typeof treeData = [];

    // یافتن بازگشتی اولین گره‌ای که داده model دارد، برای دریافت اطلاعات کشور
    const findCountry = (node: any): string | undefined => {
      if (node.model?.country) {
        return node.model.country;
      }
      if (node.children) {
        for (const child of node.children) {
          const country = findCountry(child);
          if (country) return country;
        }
      }
      return undefined;
    };

    treeData.forEach((companyNode) => {
      // یافتن بازگشتی اطلاعات کشور این شرکت
      const country = findCountry(companyNode);

      if (country === "چین") {
        china.push(companyNode);
      } else {
        // همه شرکت‌های غیرچینی در دسته خارجی قرار می‌گیرند
        overseas.push(companyNode);
      }
    });

    return { chinaCompanies: china, overseasCompanies: overseas };
  }, [treeData]);

  if (treeData.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🌳</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">داده‌ای موجود نیست</h3>
        <p className="text-gray-500">اطلاعات مدلی برای نمایش وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* نمایش دوستونه چپ و راست */}
      <div className="grid grid-cols-2 gap-6">
        {/* چپ: شرکت‌های چینی */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-red-200">
            <span className="text-2xl">🇨🇳</span>
            <h3 className="text-lg font-bold text-gray-800">شرکت‌های چینی</h3>
            <span className="text-sm text-gray-500">
              ({chinaCompanies.length})
            </span>
          </div>
          <div className="space-y-1">
            {chinaCompanies.length > 0 ? (
              chinaCompanies.map((node) => (
                <TreeNode key={node.id} node={node} level={0} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                داده‌ای از شرکت‌های چینی موجود نیست
              </div>
            )}
          </div>
        </div>

        {/* راست: شرکت‌های خارجی */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-200">
            <span className="text-2xl">�</span>
            <h3 className="text-lg font-bold text-gray-800">شرکت‌های خارجی</h3>
            <span className="text-sm text-gray-500">
              ({overseasCompanies.length})
            </span>
          </div>
          <div className="space-y-1">
            {overseasCompanies.length > 0 ? (
              overseasCompanies.map((node) => (
                <TreeNode key={node.id} node={node} level={0} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                داده‌ای از شرکت‌های خارجی موجود نیست
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
