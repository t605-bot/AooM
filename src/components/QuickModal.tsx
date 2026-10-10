import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types/finance';
import { ACCOUNTS_LIST, CATEGORIES_LIST } from '../data/mockData';

interface QuickModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: Omit<Transaction, 'id'>) => void;
  editingTransaction?: Transaction | null;
}

export const QuickModal: React.FC<QuickModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTransaction,
}) => {
  const [type, setType] = useState<TransactionType>(
    editingTransaction?.type || 'expense'
  );
  const [amount, setAmount] = useState<string>(
    editingTransaction ? String(editingTransaction.amount) : ''
  );
  const [title, setTitle] = useState<string>(editingTransaction?.title || '');
  const [category, setCategory] = useState<string>(
    editingTransaction?.category || 'อาหาร & เครื่องดื่ม'
  );
  const [account, setAccount] = useState<string>(
    editingTransaction?.account || 'KBank (กสิกรไทย)'
  );
  const [tag, setTag] = useState<string>(editingTransaction?.tag || 'ของใช้และอาหารสด');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }
    if (!title.trim()) {
      return;
    }

    const now = new Date();
    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const thaiYear = now.getFullYear() + 543;
    const formattedDate = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${thaiYear}`;
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')} น.`;

    let icon = 'receipt_long';
    if (type === 'income') {
      icon = category === 'เงินเดือน' ? 'payments' : category === 'การลงทุน' ? 'show_chart' : 'savings';
    } else if (type === 'expense') {
      if (category.includes('อาหาร')) icon = 'restaurant';
      else if (category.includes('ที่อยู่อาศัย')) icon = 'home';
      else if (category.includes('เดินทาง')) icon = 'local_gas_station';
      else if (category.includes('ช้อปปิ้ง')) icon = 'shopping_bag';
      else if (category.includes('บันเทิง')) icon = 'sports_esports';
      else icon = 'shopping_cart';
    } else {
      icon = 'swap_horiz';
    }

    onSave({
      date: editingTransaction?.date || formattedDate,
      rawDate: editingTransaction?.rawDate || now.toISOString().split('T')[0],
      time: editingTransaction?.time || formattedTime,
      title: title.trim(),
      tag: tag.trim() || (type === 'income' ? 'รายได้' : 'รายจ่าย'),
      category,
      account,
      status: 'สำเร็จ',
      amount: parsedAmount,
      type,
      icon,
    });

    onClose();
    // Reset form
    setAmount('');
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glacier-card rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-sky-500/30 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-500/15">
          <h3 className="text-[16px] font-semibold text-sky-100">
            {editingTransaction ? 'แก้ไขรายการธุรกรรม' : 'บันทึกรายการด่วน'}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* 3 Mode buttons */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`py-2.5 rounded-lg border flex flex-col items-center gap-1 transition-all cursor-pointer ${
              type === 'income'
                ? 'border-emerald-400 bg-emerald-500/25 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                : 'border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/10 text-emerald-300/80 hover:bg-emerald-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-emerald-400">add_circle</span>
            <span className="text-[12px] font-medium">บันทึกรายรับ</span>
          </button>

          <button
            type="button"
            onClick={() => setType('expense')}
            className={`py-2.5 rounded-lg border flex flex-col items-center gap-1 transition-all cursor-pointer ${
              type === 'expense'
                ? 'border-rose-400 bg-rose-500/25 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'border-rose-500/30 hover:border-rose-400 bg-rose-500/10 text-rose-300/80 hover:bg-rose-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-rose-400">remove_circle</span>
            <span className="text-[12px] font-medium">บันทึกรายจ่าย</span>
          </button>

          <button
            type="button"
            onClick={() => setType('transfer')}
            className={`py-2.5 rounded-lg border flex flex-col items-center gap-1 transition-all cursor-pointer ${
              type === 'transfer'
                ? 'border-sky-400 bg-sky-500/25 text-sky-200 shadow-[0_0_12px_rgba(125,211,252,0.3)]'
                : 'border-sky-500/30 hover:border-sky-400 bg-sky-500/10 text-sky-300/80 hover:bg-sky-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-sky-400">swap_horiz</span>
            <span className="text-[12px] font-medium">โอนเงิน</span>
          </button>
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[13px] text-slate-400 mb-1">
              จำนวนเงิน (THB) <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              step="any"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full text-[20px] font-semibold text-right bg-slate-900/80 border border-sky-500/30 rounded-lg p-2.5 focus:outline-none focus:border-sky-400 text-sky-100"
            />
          </div>

          <div>
            <label className="block text-[13px] text-slate-400 mb-1">
              ชื่อรายการ / คำอธิบาย <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น ค่าอาหารกลางวัน, เงินเดือน"
              className="w-full text-[14px] bg-slate-900/80 border border-sky-500/30 rounded-lg p-2.5 focus:outline-none focus:border-sky-400 text-sky-100 placeholder:text-slate-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] text-slate-400 mb-1">หมวดหมู่</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-[13px] bg-slate-900 border border-sky-500/30 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-sky-400"
              >
                {CATEGORIES_LIST.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-slate-400 mb-1">
                ป้ายกำกับ / แท็ก
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="เช่น ของใช้สด"
                className="w-full text-[13px] bg-slate-900/80 border border-sky-500/30 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] text-slate-400 mb-1">
              บัญชี / ช่องทางชำระ
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full text-[13px] bg-slate-900 border border-sky-500/30 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-sky-400"
            >
              {ACCOUNTS_LIST.filter((a) => a.id !== 'all').map((acc) => (
                <option key={acc.id} value={acc.name} className="bg-slate-900 text-white">
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-[13px] bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 font-semibold rounded-lg hover:brightness-110 shadow-[0_0_15px_rgba(125,211,252,0.35)] transition-all cursor-pointer"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
