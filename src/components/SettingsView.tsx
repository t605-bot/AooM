import React, { useState } from 'react';
import { FinancialSummary } from '../types/finance';
import { ACCOUNTS_LIST } from '../data/mockData';

interface SettingsViewProps {
  summary: FinancialSummary;
  onUpdateSummary: (newSummary: FinancialSummary) => void;
  onResetData: () => void;
  onBackToOverview: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  summary,
  onUpdateSummary,
  onResetData,
  onBackToOverview,
}) => {
  const [expenseBudget, setExpenseBudget] = useState(summary.expenseBudget);
  const [incomeTarget, setIncomeTarget] = useState(summary.incomeTarget);
  const [savingsTarget, setSavingsTarget] = useState(summary.savingsTarget);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveBudgets = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FinancialSummary = {
      ...summary,
      expenseBudget,
      incomeTarget,
      savingsTarget,
      expenseBudgetUsedPct: Math.round((summary.totalExpense / expenseBudget) * 1000) / 10,
      incomeTargetPct: Math.round((summary.totalIncome / incomeTarget) * 1000) / 10,
      savingsTargetPct: Math.round((summary.totalSavings / savingsTarget) * 1000) / 10,
    };
    onUpdateSummary(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="glacier-card rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={onBackToOverview}
              className="text-sky-400 hover:text-sky-200 inline-flex items-center gap-1 text-[13px] font-medium transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>กลับสู่ภาพรวม</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 text-[13px]">การตั้งค่าระบบ</span>
          </div>
          <h2 className="text-[24px] font-bold text-white tracking-tight">
            ตั้งค่างบประมาณและบัญชีการเงิน
          </h2>
          <p className="text-[13px] text-slate-400">
            ปรับแต่งเป้าหมายรายได้ เพดานรายจ่าย และจัดการกระเป๋าเงินของคุณ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Budget & Goals */}
        <div className="glacier-card rounded-xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-sky-500/15 mb-4">
            <h3 className="text-[16px] font-semibold text-sky-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[20px]">
                tune
              </span>
              <span>กำหนดเป้าหมายรายเดือน</span>
            </h3>
          </div>

          <form onSubmit={handleSaveBudgets} className="space-y-4">
            <div>
              <label className="block text-[13px] text-slate-300 mb-1">
                เป้าหมายรายได้รวมต่อเดือน (บาท)
              </label>
              <input
                type="number"
                value={incomeTarget}
                onChange={(e) => setIncomeTarget(Number(e.target.value))}
                className="w-full bg-slate-900 border border-sky-500/30 rounded-lg p-2.5 text-sky-100 font-semibold text-[16px] focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                ปัจจุบันทำได้ ฿{summary.totalIncome.toLocaleString()} (
                {Math.round((summary.totalIncome / incomeTarget) * 100)}%)
              </p>
            </div>

            <div>
              <label className="block text-[13px] text-slate-300 mb-1">
                เพดานงบประมาณรายจ่ายต่อเดือน (บาท)
              </label>
              <input
                type="number"
                value={expenseBudget}
                onChange={(e) => setExpenseBudget(Number(e.target.value))}
                className="w-full bg-slate-900 border border-sky-500/30 rounded-lg p-2.5 text-rose-300 font-semibold text-[16px] focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                ปัจจุบันใช้ไป ฿{summary.totalExpense.toLocaleString()} (
                {Math.round((summary.totalExpense / expenseBudget) * 100)}%)
              </p>
            </div>

            <div>
              <label className="block text-[13px] text-slate-300 mb-1">
                เป้าหมายเงินออมและลงทุนต่อเดือน (บาท)
              </label>
              <input
                type="number"
                value={savingsTarget}
                onChange={(e) => setSavingsTarget(Number(e.target.value))}
                className="w-full bg-slate-900 border border-sky-500/30 rounded-lg p-2.5 text-cyan-300 font-semibold text-[16px] focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                ปัจจุบันออมได้ ฿{summary.totalSavings.toLocaleString()} (
                {Math.round((summary.totalSavings / savingsTarget) * 100)}%)
              </p>
            </div>

            {savedSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[12px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>บันทึกการตั้งค่าเป้าหมายเรียบร้อยแล้ว</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 font-semibold rounded-lg hover:brightness-110 shadow-[0_0_15px_rgba(125,211,252,0.35)] transition-all cursor-pointer text-[13px]"
            >
              บันทึกเป้าหมาย
            </button>
          </form>
        </div>

        {/* Module 2: Connected Accounts */}
        <div className="glacier-card rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-sky-500/15 mb-4">
              <h3 className="text-[16px] font-semibold text-sky-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[20px]">
                  account_balance
                </span>
                <span>บัญชีและช่องทางการเงินที่เชื่อมต่อ</span>
              </h3>
            </div>

            <div className="space-y-3">
              {ACCOUNTS_LIST.filter((a) => a.id !== 'all').map((acc) => (
                <div
                  key={acc.id}
                  className="p-3 rounded-lg bg-slate-900/60 border border-sky-500/15 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shadow-[0_0_8px]"
                      style={{
                        backgroundColor: acc.color,
                        boxShadow: `0 0 8px ${acc.color}`,
                      }}
                    />
                    <div>
                      <p className="text-white text-[13px] font-medium">{acc.name}</p>
                      <p className="text-slate-400 text-[11px]">{acc.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sky-200 font-semibold text-[14px]">
                      ฿{acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="block text-[10px] text-emerald-400">เชื่อมต่อแล้ว</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Demo Data Action */}
          <div className="mt-6 pt-4 border-t border-sky-500/15 flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-[13px] font-medium">คืนค่าข้อมูลตัวอย่าง</p>
              <p className="text-slate-500 text-[11px]">
                รีเซ็ตข้อมูลธุรกรรมและตัวเลขกลับสู่ค่าเริ่มต้นในภาพตัวอย่าง
              </p>
            </div>
            <button
              type="button"
              onClick={onResetData}
              className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-[12px] font-medium transition-all cursor-pointer"
            >
              รีเซ็ตข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
