import React, { useState } from 'react';
import { Transaction } from '../types/finance';

interface TransactionTableProps {
  transactions: Transaction[];
  onOpenAdvancedFilter: () => void;
  activeTypeFilter: 'all' | 'income' | 'expense' | 'transfer';
  setActiveTypeFilter: (filter: 'all' | 'income' | 'expense' | 'transfer') => void;
  onDeleteTransaction?: (id: string) => void;
  onEditTransaction?: (transaction: Transaction) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onOpenAdvancedFilter,
  activeTypeFilter,
  setActiveTypeFilter,
  onDeleteTransaction,
  onEditTransaction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter based on activeTypeFilter
  const filtered = transactions.filter((tx) => {
    if (activeTypeFilter === 'all') return true;
    return tx.type === activeTypeFilter;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'สำเร็จ') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium shadow-[0_0_8px_rgba(52,211,153,0.15)]">
          สำเร็จ
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] bg-slate-800/80 border border-sky-500/15 text-slate-300 font-medium">
        {status}
      </span>
    );
  };

  const getAmountDisplay = (tx: Transaction) => {
    const formatted = tx.amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    if (tx.type === 'income') {
      return (
        <span className="text-[16px] font-semibold text-emerald-400 tabular-nums drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
          + ฿{formatted}
        </span>
      );
    }
    if (tx.type === 'expense') {
      return (
        <span className="text-[16px] font-semibold text-rose-400 tabular-nums drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]">
          - ฿{formatted}
        </span>
      );
    }
    return (
      <span className="text-[16px] font-semibold text-sky-300 tabular-nums">
        ฿{formatted}
      </span>
    );
  };

  const getAccountDot = (account: string) => {
    if (account.includes('KTC') || account.includes('เครดิต')) {
      return <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />;
    }
    if (account.includes('เงินสด') || account.includes('PromptPay')) {
      return <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />;
    }
    return (
      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] shrink-0" />
    );
  };

  const getIconContainer = (tx: Transaction) => {
    if (tx.type === 'income') {
      return (
        <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.15)] shrink-0">
          <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
        </div>
      );
    }
    if (tx.type === 'expense') {
      return (
        <div className="w-10 h-10 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.15)] shrink-0">
          <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.15)] shrink-0">
        <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
      </div>
    );
  };

  return (
    <section className="glacier-card rounded-xl overflow-hidden">
      {/* Table Header & Controls Bar */}
      <div className="p-6 border-b border-sky-500/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-semibold text-sky-100">
            บันทึกรายการธุรกรรมล่าสุด
          </h2>
          <p className="text-[13px] text-slate-400">
            ประวัติการเงินแบบแยกประเภทและช่องทางการชำระ
          </p>
        </div>

        {/* Filter Segment & Quick Search */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="inline-flex p-1 bg-slate-950/70 rounded-lg gap-1 border border-sky-500/20">
            <button
              onClick={() => {
                setActiveTypeFilter('all');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3 py-1 rounded text-[13px] font-medium transition-all cursor-pointer ${
                activeTypeFilter === 'all'
                  ? 'bg-sky-500/25 border border-sky-400/30 text-sky-100 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-sky-200'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => {
                setActiveTypeFilter('income');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3 py-1 rounded text-[13px] font-medium transition-all cursor-pointer ${
                activeTypeFilter === 'income'
                  ? 'bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              รายรับ (+)
            </button>
            <button
              onClick={() => {
                setActiveTypeFilter('expense');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3 py-1 rounded text-[13px] font-medium transition-all cursor-pointer ${
                activeTypeFilter === 'expense'
                  ? 'bg-rose-500/25 border border-rose-400/30 text-rose-200 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-rose-300'
              }`}
            >
              รายจ่าย (-)
            </button>
            <button
              onClick={() => {
                setActiveTypeFilter('transfer');
                setCurrentPage(1);
              }}
              type="button"
              className={`px-3 py-1 rounded text-[13px] font-medium transition-all cursor-pointer ${
                activeTypeFilter === 'transfer'
                  ? 'bg-sky-500/25 border border-sky-400/30 text-sky-100 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-sky-200'
              }`}
            >
              โอนย้าย
            </button>
          </div>

          <div className="relative">
            <button
              onClick={onOpenAdvancedFilter}
              type="button"
              className="bg-slate-900/80 border border-sky-500/20 pl-8 pr-3 py-1.5 rounded-lg text-[13px] text-slate-300 hover:text-sky-200 hover:bg-slate-800/80 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-sky-400/80 text-[16px]">
                filter_list
              </span>
              <span>ตัวกรองละเอียด</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabular List Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-sky-500/15 bg-slate-950/50 text-[12px] text-slate-400">
              <th className="py-3 px-6 font-medium whitespace-nowrap">วันที่ / เวลา</th>
              <th className="py-3 px-6 font-medium">หมวดหมู่ & รายการ</th>
              <th className="py-3 px-6 font-medium whitespace-nowrap">บัญชี / ช่องทาง</th>
              <th className="py-3 px-6 font-medium whitespace-nowrap">สถานะ</th>
              <th className="py-3 px-6 font-medium text-right whitespace-nowrap">
                จำนวนเงิน (บาท)
              </th>
              {onDeleteTransaction && (
                <th className="py-3 px-4 font-medium text-center w-16">จัดการ</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-500/10 text-[14px]">
            {displayedItems.length === 0 ? (
              <tr>
                <td
                  colSpan={onDeleteTransaction ? 6 : 5}
                  className="py-12 text-center text-slate-400"
                >
                  <span className="material-symbols-outlined text-[36px] text-slate-500 mb-2 block">
                    search_off
                  </span>
                  ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา
                </td>
              </tr>
            ) : (
              displayedItems.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-sky-500/5 transition-colors group cursor-default"
                >
                  {/* Date / Time */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <p className="font-medium text-slate-200">{tx.date}</p>
                    <p className="text-[12px] text-slate-400">{tx.time}</p>
                  </td>

                  {/* Category & Item */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {getIconContainer(tx)}
                      <div>
                        <p className="font-semibold text-white group-hover:text-sky-200 transition-colors">
                          {tx.title}
                        </p>
                        <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-slate-800/80 border border-sky-500/15 text-slate-300 mt-0.5">
                          {tx.tag}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Account / Channel */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-300">
                      {getAccountDot(tx.account)}
                      <span>{tx.account}</span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {getStatusBadge(tx.status)}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {getAmountDisplay(tx)}
                  </td>

                  {/* Actions */}
                  {onDeleteTransaction && (
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        {onEditTransaction && (
                          <button
                            onClick={() => onEditTransaction(tx)}
                            title="แก้ไข"
                            className="p-1 text-slate-400 hover:text-sky-300 rounded"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteTransaction(tx.id)}
                          title="ลบ"
                          className="p-1 text-slate-400 hover:text-rose-400 rounded"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 sm:px-6 border-t border-sky-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-slate-400">
          แสดง{' '}
          <span className="font-semibold text-sky-200">
            {filtered.length === 0 ? 0 : startIndex + 1} -{' '}
            {Math.min(startIndex + itemsPerPage, filtered.length)}
          </span>{' '}
          จากทั้งหมด{' '}
          <span className="font-semibold text-sky-200">{filtered.length}</span>{' '}
          รายการ
        </p>

        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            className={`px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-all ${
              currentPage === 1
                ? 'border-sky-500/15 text-slate-500 cursor-not-allowed bg-slate-900/40'
                : 'border-sky-500/20 text-sky-200 hover:bg-slate-800/80 cursor-pointer'
            }`}
          >
            ก่อนหน้า
          </button>

          {/* Numbered Page Buttons */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              // Show pages if <= 5 or handle ellipsis
              if (
                totalPages <= 5 ||
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - currentPage) <= 1
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    type="button"
                    className={`w-8 h-8 rounded-lg font-medium text-[13px] transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(125,211,252,0.35)]'
                        : 'hover:bg-slate-800 text-slate-300 border border-transparent hover:border-sky-500/20'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === 2 && currentPage > 3) {
                return (
                  <span key="el-1" className="text-slate-500 px-1">
                    ...
                  </span>
                );
              }
              if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                return (
                  <span key="el-2" className="text-slate-500 px-1">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            type="button"
            className={`px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-all ${
              currentPage >= totalPages
                ? 'border-sky-500/15 text-slate-500 cursor-not-allowed bg-slate-900/40'
                : 'border-sky-500/20 text-sky-200 hover:bg-slate-800/80 cursor-pointer'
            }`}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </section>
  );
};
