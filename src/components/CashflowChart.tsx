import React, { useState } from 'react';
import { WEEKLY_CASHFLOW_DATA } from '../data/mockData';

export const CashflowChart: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  return (
    <div className="lg:col-span-8 glacier-card rounded-xl p-6 flex flex-col justify-between">
      {/* Chart Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-sky-500/15 gap-2">
        <div>
          <h3 className="text-[16px] font-semibold text-sky-100">
            กระแสเงินสดเปรียบเทียบ (Cashflow Trend)
          </h3>
          <p className="text-[13px] text-slate-400">
            เปรียบเทียบรายรับและรายจ่ายตลอด 4 สัปดาห์ของเดือนกุมภาพันธ์
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <span className="text-slate-300">รายรับ (Income)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <span className="text-slate-300">รายจ่าย (Expenses)</span>
          </div>
        </div>
      </div>

      {/* Analytical Bars Chart Visualization */}
      <div className="pt-4 pb-2">
        <div className="grid grid-cols-4 gap-4 sm:gap-8 h-48 items-end px-2 sm:px-6 border-b border-sky-500/20 pb-2 relative">
          {/* Subtle Grid Lines with y-axis hints */}
          <div className="absolute inset-x-0 top-1/4 border-b border-sky-500/10 pointer-events-none">
            <span className="text-[10px] text-slate-600 absolute -top-2 left-0">฿30k</span>
          </div>
          <div className="absolute inset-x-0 top-2/4 border-b border-sky-500/10 pointer-events-none">
            <span className="text-[10px] text-slate-600 absolute -top-2 left-0">฿20k</span>
          </div>
          <div className="absolute inset-x-0 top-3/4 border-b border-sky-500/10 pointer-events-none">
            <span className="text-[10px] text-slate-600 absolute -top-2 left-0">฿10k</span>
          </div>

          {WEEKLY_CASHFLOW_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center h-full justify-end group z-10 cursor-pointer transition-transform ${
                selectedWeek === idx ? 'scale-105' : ''
              }`}
              onClick={() => setSelectedWeek(selectedWeek === idx ? null : idx)}
            >
              <div className="flex items-end gap-2 w-full justify-center h-full">
                {/* Income Bar (Green) */}
                <div
                  className="w-5 sm:w-8 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t shadow-[0_0_12px_rgba(52,211,153,0.3)] hover:brightness-125 transition-all relative"
                  style={{ height: `${item.incomeHeightPct}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-emerald-300 border border-emerald-500/30 text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap z-20 shadow-lg pointer-events-none">
                    ฿{item.income.toLocaleString()}
                  </span>
                </div>

                {/* Expense Bar (Red) */}
                <div
                  className="w-5 sm:w-8 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t shadow-[0_0_12px_rgba(244,63,94,0.3)] hover:brightness-125 transition-all relative"
                  style={{ height: `${item.expenseHeightPct}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-rose-300 border border-rose-500/30 text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap z-20 shadow-lg pointer-events-none">
                    ฿{item.expense.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Week Label */}
              <span className="text-[13px] text-slate-400 mt-2 font-medium">
                {item.weekLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Week Detail Pill if clicked */}
      {selectedWeek !== null && (
        <div className="mt-2 p-2.5 rounded-lg bg-sky-500/10 border border-sky-400/25 flex items-center justify-between text-[12px] animate-fadeIn">
          <span className="text-sky-200">
            📊 รายละเอียด {WEEKLY_CASHFLOW_DATA[selectedWeek].weekLabel} ({WEEKLY_CASHFLOW_DATA[selectedWeek].weekName}):
          </span>
          <span className="text-white">
            รับ <strong className="text-emerald-400">฿{WEEKLY_CASHFLOW_DATA[selectedWeek].income.toLocaleString()}</strong> | 
            จ่าย <strong className="text-rose-400">฿{WEEKLY_CASHFLOW_DATA[selectedWeek].expense.toLocaleString()}</strong> | 
            คงเหลือสุทธิ <strong className="text-sky-300">+฿{(WEEKLY_CASHFLOW_DATA[selectedWeek].income - WEEKLY_CASHFLOW_DATA[selectedWeek].expense).toLocaleString()}</strong>
          </span>
        </div>
      )}

      {/* Chart Summary Footer */}
      <div className="flex flex-wrap items-center justify-between text-[13px] text-slate-400 mt-4 pt-2">
        <span>
          สัปดาห์ที่บันทึกข้อมูลสม่ำเสมอที่สุด:{' '}
          <span className="text-sky-300 font-medium">สัปดาห์ 4 (สิ้นเดือน)</span>
        </span>
        <span className="text-emerald-400 font-medium drop-shadow-[0_0_8px_rgba(52,211,153,0.25)]">
          ส่วนต่างสภาพคล่องสุทธิ: +฿42,750.00
        </span>
      </div>
    </div>
  );
};
