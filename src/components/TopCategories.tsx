import React from 'react';
import { TOP_EXPENSE_CATEGORIES } from '../data/mockData';

interface TopCategoriesProps {
  onViewFullReport: () => void;
}

export const TopCategories: React.FC<TopCategoriesProps> = ({ onViewFullReport }) => {
  return (
    <div className="lg:col-span-4 glacier-card rounded-xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-sky-500/15">
          <h3 className="text-[16px] font-semibold text-sky-100">หมวดหมู่รายจ่ายยอดนิยม</h3>
          <span className="text-[11px] font-semibold text-sky-400/80 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            5 หมวดหลัก
          </span>
        </div>

        <div className="space-y-4 mt-4">
          {TOP_EXPENSE_CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center text-[13px] mb-1.5">
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <span className={`material-symbols-outlined text-[16px] ${cat.colorClass}`}>
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </span>
                <span className="font-semibold text-white">
                  ฿{cat.amount.toLocaleString()}{' '}
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({cat.percentage}%)
                  </span>
                </span>
              </div>
              <div className="w-full bg-slate-950/70 rounded-full h-1.5 overflow-hidden border border-sky-500/15">
                <div
                  className={`bg-gradient-to-r ${cat.barColor} rounded-full h-1.5 shadow-[0_0_8px_#7dd3fc]`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-sky-500/15 text-center mt-4">
        <button
          onClick={onViewFullReport}
          type="button"
          className="text-[13px] font-medium text-sky-300 hover:text-sky-100 inline-flex items-center gap-1 transition-colors group cursor-pointer"
        >
          <span>ดูรายงานแยกหมวดหมู่ทั้งหมด</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};
