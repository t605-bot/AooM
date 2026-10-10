import React, { useState } from 'react';
import { ACCOUNTS_LIST, CATEGORIES_LIST } from '../data/mockData';

export interface FilterOptions {
  type: string;
  category: string;
  account: string;
  status: string;
  minAmount: string;
  maxAmount: string;
}

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  onResetFilters: () => void;
}

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  isOpen,
  onClose,
  filters: initialFilters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(initialFilters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const empty: FilterOptions = {
      type: 'all',
      category: 'all',
      account: 'all',
      status: 'all',
      minAmount: '',
      maxAmount: '',
    };
    setLocalFilters(empty);
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glacier-card rounded-xl max-w-lg w-full p-6 shadow-2xl relative border border-sky-500/30">
        <div className="flex items-center justify-between pb-3 border-b border-sky-500/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-[20px]">
              filter_list
            </span>
            <h3 className="text-[16px] font-semibold text-sky-100">ตัวกรองละเอียด</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-4 my-4">
          {/* Account Filter */}
          <div>
            <label className="block text-[13px] text-slate-400 mb-1">บัญชีการเงิน</label>
            <select
              value={localFilters.account}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, account: e.target.value })
              }
              className="w-full bg-slate-900 border border-sky-500/30 rounded-lg p-2 text-[13px] text-slate-200 focus:outline-none focus:border-sky-400"
            >
              <option value="all">ทุกบัญชี</option>
              {ACCOUNTS_LIST.filter((a) => a.id !== 'all').map((acc) => (
                <option key={acc.id} value={acc.name}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[13px] text-slate-400 mb-1">หมวดหมู่</label>
            <select
              value={localFilters.category}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, category: e.target.value })
              }
              className="w-full bg-slate-900 border border-sky-500/30 rounded-lg p-2 text-[13px] text-slate-200 focus:outline-none focus:border-sky-400"
            >
              <option value="all">ทุกหมวดหมู่</option>
              {CATEGORIES_LIST.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[13px] text-slate-400 mb-1">สถานะธุรกรรม</label>
            <select
              value={localFilters.status}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, status: e.target.value })
              }
              className="w-full bg-slate-900 border border-sky-500/30 rounded-lg p-2 text-[13px] text-slate-200 focus:outline-none focus:border-sky-400"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="สำเร็จ">สำเร็จ</option>
              <option value="ตัดบัญชีแล้ว">ตัดบัญชีแล้ว</option>
            </select>
          </div>

          {/* Amount Range */}
          <div>
            <label className="block text-[13px] text-slate-400 mb-1">
              ช่วงจำนวนเงิน (บาท)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="ขั้นต่ำ (เช่น 500)"
                value={localFilters.minAmount}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, minAmount: e.target.value })
                }
                className="w-full bg-slate-900/80 border border-sky-500/30 rounded-lg p-2 text-[13px] text-sky-100 placeholder:text-slate-500"
              />
              <input
                type="number"
                placeholder="สูงสุด (เช่น 50,000)"
                value={localFilters.maxAmount}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, maxAmount: e.target.value })
                }
                className="w-full bg-slate-900/80 border border-sky-500/30 rounded-lg p-2 text-[13px] text-sky-100 placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-sky-500/15">
          <button
            type="button"
            onClick={handleReset}
            className="text-[13px] text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            ล้างตัวกรองทั้งหมด
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 text-[13px] bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 font-semibold rounded-lg hover:brightness-110 shadow-[0_0_15px_rgba(125,211,252,0.35)] transition-all cursor-pointer"
            >
              นำไปใช้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
