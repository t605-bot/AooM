import React from 'react';
import { FinancialSummary, Transaction } from '../types/finance';
import { TOP_EXPENSE_CATEGORIES } from '../data/mockData';

interface ReportsViewProps {
  summary: FinancialSummary;
  transactions: Transaction[];
  onBackToOverview: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  summary,
  transactions,
  onBackToOverview,
}) => {
  // Calculate dynamic stats
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const netSavings = totalIncome - totalExpense;

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
            <span className="text-slate-300 text-[13px]">รายงานและการวิเคราะห์เชิงลึก</span>
          </div>
          <h2 className="text-[24px] font-bold text-white tracking-tight">
            รายงานวิเคราะห์สุขภาพการเงินประจำเดือน
          </h2>
          <p className="text-[13px] text-slate-400">
            สรุปโครงสร้างรายรับ-รายจ่าย สัดส่วนเงินออม และประเมินความมั่นคงทางการเงินส่วนบุคคล
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-400/30 text-right">
            <p className="text-[11px] text-sky-300">คะแนนสุขภาพการเงิน</p>
            <p className="text-[20px] font-bold text-white">
              92<span className="text-[14px] text-sky-400 font-normal">/100 (ดีเยี่ยม)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Key Analytical Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 1: 50/30/20 Rule Breakdown */}
        <div className="glacier-card rounded-xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-sky-500/15 mb-4">
            <h3 className="text-[16px] font-semibold text-sky-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[20px]">
                pie_chart
              </span>
              <span>หลักการจัดสรร 50 / 30 / 20</span>
            </h3>
            <span className="text-[11px] text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
              ผ่านเกณฑ์
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-slate-300">ความจำเป็น (Needs 50%)</span>
                <span className="font-semibold text-white">35.2% (฿30,000)</span>
              </div>
              <div className="w-full bg-slate-950/70 rounded-full h-2 overflow-hidden border border-sky-500/20">
                <div
                  className="bg-emerald-400 h-2 rounded-full shadow-[0_0_8px_#34d399]"
                  style={{ width: '35.2%' }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">ค่าน้ำไฟ ที่พัก อาหารสด น้ำมัน</p>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-slate-300">ความสุขส่วนตัว (Wants 30%)</span>
                <span className="font-semibold text-white">14.7% (฿12,650)</span>
              </div>
              <div className="w-full bg-slate-950/70 rounded-full h-2 overflow-hidden border border-sky-500/20">
                <div
                  className="bg-indigo-400 h-2 rounded-full shadow-[0_0_8px_#818cf8]"
                  style={{ width: '14.7%' }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">ช้อปปิ้ง ท่องเที่ยว สตรีมมิ่ง</p>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-slate-300">เงินออม & ลงทุน (Savings 20%)</span>
                <span className="font-semibold text-emerald-300">50.1% (฿42,750)</span>
              </div>
              <div className="w-full bg-slate-950/70 rounded-full h-2 overflow-hidden border border-sky-500/20">
                <div
                  className="bg-gradient-to-r from-sky-400 to-cyan-400 h-2 rounded-full shadow-[0_0_8px_#7dd3fc]"
                  style={{ width: '50.1%' }}
                />
              </div>
              <p className="text-[11px] text-emerald-400 mt-1">
                ✨ เกินเป้าหมาย 20% อย่างยอดเยี่ยม!
              </p>
            </div>
          </div>
        </div>

        {/* Module 2: Monthly Comparison */}
        <div className="glacier-card rounded-xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-sky-500/15 mb-4">
            <h3 className="text-[16px] font-semibold text-sky-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[20px]">
                compare_arrows
              </span>
              <span>เปรียบเทียบย้อนหลัง 3 เดือน</span>
            </h3>
          </div>

          <div className="space-y-3.5">
            {[
              {
                month: 'กุมภาพันธ์ 2568 (ปัจจุบัน)',
                income: totalIncome || 85400,
                expense: totalExpense || 42650,
                savings: netSavings || 42750,
                status: 'ประหยัดขึ้น 3.2%',
              },
              {
                month: 'มกราคม 2568',
                income: 82000,
                expense: 44100,
                savings: 37900,
                status: 'ปกติ',
              },
              {
                month: 'ธันวาคม 2567',
                income: 94000,
                expense: 58200,
                savings: 35800,
                status: 'ท่องเที่ยวปีใหม่',
              },
            ].map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-slate-900/60 border border-sky-500/15"
              >
                <div className="flex justify-between items-center text-[13px] font-medium mb-1.5">
                  <span className="text-white">{m.month}</span>
                  <span className="text-[11px] text-sky-300">{m.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[12px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">รายรับ</span>
                    <span className="text-emerald-400 font-medium">
                      ฿{m.income.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">รายจ่าย</span>
                    <span className="text-rose-400 font-medium">
                      ฿{m.expense.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">เงินออมสุทธิ</span>
                    <span className="text-sky-300 font-medium">
                      ฿{m.savings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 3: Emergency Fund & Safety Buffer */}
        <div className="glacier-card rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-sky-500/15 mb-4">
              <h3 className="text-[16px] font-semibold text-sky-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[20px]">
                  shield
                </span>
                <span>กองทุนสำรองฉุกเฉิน (Buffer)</span>
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-center mb-4">
              <p className="text-[12px] text-slate-400">ครอบคลุมค่าใช้จ่ายล่วงหน้าได้</p>
              <p className="text-[28px] font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                5.8 เดือน
              </p>
              <p className="text-[11px] text-emerald-300 mt-0.5">
                (มาตรฐานแนะนำ: 3 - 6 เดือน)
              </p>
            </div>

            <div className="space-y-2 text-[12px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">ค่าใช้จ่ายเฉลี่ยต่อเดือน:</span>
                <span className="font-medium text-white">฿42,650.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">เงินสดและสภาพคล่องรวม:</span>
                <span className="font-medium text-white">฿248,590.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">เป้าหมายสำรอง 6 เดือน:</span>
                <span className="font-medium text-sky-300">฿255,900.00</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sky-500/15">
            <div className="w-full bg-slate-950/70 rounded-full h-1.5 overflow-hidden border border-sky-500/20">
              <div
                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-1.5 rounded-full"
                style={{ width: '97.1%' }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 text-right">
              สะสมได้ 97.1% ของเป้าหมาย 6 เดือน
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Category Expense Analysis Table */}
      <div className="glacier-card rounded-xl p-6">
        <h3 className="text-[18px] font-semibold text-white mb-4">
          รายละเอียดการกระจายตัวของรายจ่ายแยกหมวดหมู่
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOP_EXPENSE_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/15 hover:border-sky-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`material-symbols-outlined text-[20px] ${cat.colorClass}`}>
                    {cat.icon}
                  </span>
                  <span className="text-[13px] font-semibold text-slate-200">
                    {cat.name}
                  </span>
                </div>
                <p className="text-[20px] font-bold text-white">
                  ฿{cat.amount.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400">{cat.percentage}% ของรายจ่ายทั้งหมด</p>
              </div>

              <div className="mt-3 pt-2 border-t border-sky-500/10 text-[11px] text-slate-400 flex justify-between">
                <span>งบประมาณคุมได้</span>
                <span className="text-emerald-300 font-medium">✓ ปกติ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
