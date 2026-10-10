import React from 'react';
import { FinancialSummary } from '../types/finance';

interface MetricCardsProps {
  summary: FinancialSummary;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ summary }) => {
  // Format numbers helper
  const formatInteger = (val: number) => {
    const parts = val.toFixed(2).split('.');
    return parseInt(parts[0], 10).toLocaleString('en-US');
  };

  const getDecimals = (val: number) => {
    const parts = val.toFixed(2).split('.');
    return `.${parts[1]}`;
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {/* Card 1: ยอดเงินคงเหลือสุทธิ */}
      <div className="glacier-card rounded-xl p-5 hover:border-sky-400/40 hover:shadow-[0_10px_35px_-5px_rgba(14,165,233,0.15)] transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:bg-sky-400/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-slate-400 font-normal">ยอดเงินคงเหลือสุทธิ</span>
          <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold shadow-[0_0_10px_rgba(52,211,153,0.2)]">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +{summary.netBalanceGrowthPct}%
          </span>
        </div>
        <div className="text-[32px] font-bold text-white tracking-tight mb-2 leading-tight">
          ฿{formatInteger(summary.netBalance)}
          <span className="text-[20px] font-semibold text-sky-300/60">
            {getDecimals(summary.netBalance)}
          </span>
        </div>
        <div className="flex items-center justify-between text-[13px] text-slate-400 pt-2 border-t border-sky-500/15">
          <span>จากเดือนที่แล้ว</span>
          <span className="text-emerald-400 font-medium">
            ฿{summary.previousMonthBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Card 2: รายรับรวม */}
      <div className="glacier-card rounded-xl p-5 hover:border-emerald-400/40 hover:shadow-[0_10px_35px_-5px_rgba(52,211,153,0.15)] transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-400/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-slate-400 font-normal">รายรับรวม (เดือนนี้)</span>
          <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold shadow-[0_0_10px_rgba(52,211,153,0.2)]">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            +{summary.incomeGrowthPct}%
          </span>
        </div>
        <div className="text-[32px] font-bold text-emerald-400 tracking-tight mb-2 leading-tight drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
          ฿{formatInteger(summary.totalIncome)}
          <span className="text-[20px] font-semibold opacity-75">
            {getDecimals(summary.totalIncome)}
          </span>
        </div>
        <div className="space-y-1.5 pt-2 border-t border-sky-500/15">
          <div className="flex justify-between text-[13px] text-slate-400">
            <span>เป้าหมายรายได้</span>
            <span className="text-emerald-300 font-medium">
              {summary.incomeTargetPct}% สำเร็จ
            </span>
          </div>
          <div className="w-full bg-slate-950/70 rounded-full h-1.5 overflow-hidden border border-emerald-500/20">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-300 h-1.5 rounded-full shadow-[0_0_8px_#34d399]"
              style={{ width: `${Math.min(100, summary.incomeTargetPct)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 3: รายจ่ายรวม */}
      <div className="glacier-card rounded-xl p-5 hover:border-rose-400/40 hover:shadow-[0_10px_35px_-5px_rgba(244,63,94,0.15)] transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-400/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-slate-400 font-normal">รายจ่ายรวม (เดือนนี้)</span>
          <span className="inline-flex items-center gap-0.5 text-[11px] text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full font-semibold shadow-[0_0_10px_rgba(244,63,94,0.2)]">
            <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
            {summary.expenseBudgetChangePct}% คุมงบดี
          </span>
        </div>
        <div className="text-[32px] font-bold text-rose-400 tracking-tight mb-2 leading-tight drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
          ฿{formatInteger(summary.totalExpense)}
          <span className="text-[20px] font-semibold opacity-75">
            {getDecimals(summary.totalExpense)}
          </span>
        </div>
        <div className="space-y-1.5 pt-2 border-t border-sky-500/15">
          <div className="flex justify-between text-[13px] text-slate-400">
            <span>งบประมาณที่กำหนด</span>
            <span className="text-slate-200 font-medium">
              ฿{summary.expenseBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-full bg-slate-950/70 rounded-full h-1.5 overflow-hidden border border-rose-500/20">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-400 h-1.5 rounded-full shadow-[0_0_8px_#f43f5e]"
              style={{ width: `${Math.min(100, summary.expenseBudgetUsedPct)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 4: เงินออม & พอร์ตลงทุน */}
      <div className="glacier-card rounded-xl p-5 hover:border-sky-400/40 hover:shadow-[0_10px_35px_-5px_rgba(125,211,252,0.15)] transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-400/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-slate-400 font-normal">เงินออม & พอร์ตลงทุน</span>
          <span className="inline-flex items-center gap-0.5 text-[11px] text-sky-300 bg-sky-500/15 border border-sky-500/30 px-2 py-0.5 rounded-full font-semibold shadow-[0_0_10px_rgba(125,211,252,0.2)]">
            {summary.savingsIncomePct}% ของรายรับ
          </span>
        </div>
        <div className="text-[32px] font-bold text-sky-300 tracking-tight mb-2 leading-tight drop-shadow-[0_0_10px_rgba(125,211,252,0.3)]">
          ฿{formatInteger(summary.totalSavings)}
          <span className="text-[20px] font-semibold opacity-75">
            {getDecimals(summary.totalSavings)}
          </span>
        </div>
        <div className="space-y-1.5 pt-2 border-t border-sky-500/15">
          <div className="flex justify-between text-[13px] text-slate-400">
            <span>เป้าหมายสะสมรายเดือน</span>
            <span className="text-sky-200 font-medium">
              {summary.savingsTargetPct}% (เป้า ฿50k)
            </span>
          </div>
          <div className="w-full bg-slate-950/70 rounded-full h-1.5 overflow-hidden border border-sky-500/20">
            <div
              className="bg-gradient-to-r from-sky-400 to-cyan-400 h-1.5 rounded-full shadow-[0_0_8px_#7dd3fc]"
              style={{ width: `${Math.min(100, summary.savingsTargetPct)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
