/**
 * توابع ابزار ساختار درختی مدل
 * تبدیل فهرست تخت مدل‌ها به ساختار درختی
 */

import { AIModel } from "../types/model";

export interface TreeNode {
  id: string;
  name: string;
  type: "company" | "status" | "model" | "submodel";
  count?: number;
  model?: AIModel;
  children?: TreeNode[];
  country?: string;
}

/**
 * ساخت ساختار درختی
 * ساختار: شرکت -> وضعیت متن‌باز -> مدل والد -> زیرمدل
 */
export const buildModelTree = (models: AIModel[]): TreeNode[] => {
  // گروه‌بندی بر اساس شرکت
  const companyMap = new Map<string, AIModel[]>();

  models.forEach((model) => {
    if (!companyMap.has(model.company)) {
      companyMap.set(model.company, []);
    }
    companyMap.get(model.company)!.push(model);
  });

  // ساخت ساختار درختی
  const tree: TreeNode[] = [];

  companyMap.forEach((companyModels, companyName) => {
    // گروه‌بندی بر اساس وضعیت متن‌باز
    const statusMap = new Map<string, AIModel[]>();

    companyModels.forEach((model) => {
      if (!statusMap.has(model.openSourceStatus)) {
        statusMap.set(model.openSourceStatus, []);
      }
      statusMap.get(model.openSourceStatus)!.push(model);
    });

    // ساخت گره وضعیت متن‌باز
    const statusNodes: TreeNode[] = [];

    statusMap.forEach((statusModels, status) => {
      // جدا کردن مدل‌های والد و زیرمدل‌ها
      const parentModels = statusModels.filter((m) => !m.parent);
      const childModels = statusModels.filter((m) => m.parent);

      // ساخت گره مدل
      const modelNodes: TreeNode[] = parentModels.map((model) => {
        // یافتن زیرمدل‌های این مدل
        const children = childModels
          .filter((child) => child.parent === model.modelName)
          .map((child) => ({
            id: `${companyName}-${status}-${model.modelName}-${child.modelName}`,
            name: child.modelName,
            type: "submodel" as const,
            model: child,
          }));

        return {
          id: `${companyName}-${status}-${model.modelName}`,
          name: model.modelName,
          type: "model" as const,
          model,
          count: children.length,
          children: children.length > 0 ? children : undefined,
        };
      });

      // پردازش زیرمدل‌های یتیم (وقتی parent نام یک مدل واقعی نیست)
      const orphanChildren = childModels.filter((child) => {
        // بررسی وجود مدل والد واقعی
        return !parentModels.some(
          (parent) => parent.modelName === child.parent
        );
      });

      // گروه‌بندی زیرمدل‌های یتیم بر اساس parent
      const orphanGroups = new Map<string, AIModel[]>();
      orphanChildren.forEach((child) => {
        if (!orphanGroups.has(child.parent!)) {
          orphanGroups.set(child.parent!, []);
        }
        orphanGroups.get(child.parent!)!.push(child);
      });

      // ساخت گره والد مجازی برای هر گروه یتیم
      orphanGroups.forEach((children, parentName) => {
        const virtualChildren = children.map((child) => ({
          id: `${companyName}-${status}-${parentName}-${child.modelName}`,
          name: child.modelName,
          type: "submodel" as const,
          model: child,
        }));

        modelNodes.push({
          id: `${companyName}-${status}-${parentName}`,
          name: parentName,
          type: "model" as const,
          count: virtualChildren.length,
          children: virtualChildren,
        });
      });

      statusNodes.push({
        id: `${companyName}-${status}`,
        name: status,
        type: "status",
        count: statusModels.length, // تعداد همه مدل‌ها در این دسته متن‌باز/متن‌بسته
        children: modelNodes,
      });
    });

    tree.push({
      id: companyName,
      name: companyName,
      type: "company",
      count: companyModels.length,
      children: statusNodes,
      country: companyModels[0].country,
    });
  });

  // مرتب‌سازی بر اساس نام شرکت
  return tree.sort((a, b) => a.name.localeCompare(b.name));
};
