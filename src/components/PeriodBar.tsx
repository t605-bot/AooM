import React, { useState } from 'react';
import { ACCOUNTS_LIST } from '../data/mockData';

interface PeriodBarProps {
  activePeriod: string;
  setActivePeriod: (period: string) => void;
  selectedAccount: string;
  setSelectedAccount: (accId: string) => void;
  onOpenExport: () => void;
  dateRangeText: string;
  setDateRangeText: (range: string) => void;
}

export const PeriodBar: React.FC<PeriodBarProps> = ({
  activePeriod,
  setActivePeriod,
  selectedAccount,
  setSelectedAccount,
  onOpenExport,
  dateRangeText,
  setDateRangeText,
}) => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customStart, setCustomStart] = useState('2025-02-01');
  const [customEnd, setCustomEnd] = useState('2025-02-28');

  const periodOptions = [
    { id: 'today', label: 'วันนี้' },
    { id: 'this_week', label: 'สัปดาห์นี้' },
    { id: 'this_month', label: 'เดือนนี้ (กุมภาพันธ์)' },
    { id: 'this_quarter', label: 'ไตรมาสนี้', hideMobile: true },
    { id: 'custom', label: 'กำหนดเอง' },
  ];

  const handlePeriodClick = (periodId: string) => {
    setActivePeriod(periodId);
    if (periodId === 'today') {
      setDateRangeText('28 ก.พ. 2568');
    } else if (periodId === 'this_week') {
      setDateRangeText('22 ก.พ. 2568 - 28 ก.พ. 2568');
    } else if (periodId === 'this_month') {
      setDateRangeText('1 ก.พ. 2568 - 28 ก.พ. 2568');
    } else if (periodId === 'this_quarter') {
      setDateRangeText('1 ม.ค. 2568 - 31 มี.ค. 2568');
    } else if (periodId === 'custom') {
      setShowDatePicker(true);
    }
  };

  const applyCustomRange = () => {
    if (customStart && customEnd) {
      setDateRangeText(`${customStart} ถึง ${customEnd}`);
      setActivePeriod('custom');
      setShowDatePicker(false);
    }
  };

  const currentAccountObj =
    ACCOUNTS_LIST.find((a) => a.id === selectedAccount) || ACCOUNTS_LIST[0];

  return (
    <section className="glacier-card rounded-xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
      {/* Date Picker Anchor & Filter Segment */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Date Trigger Button */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            type="button"
            className="flex items-center bg-slate-900/80 border border-sky-500/25 rounded-lg px-3 py-2 gap-2 text-[#e0e8f0] hover:border-sky-400/50 transition-colors cursor-pointer text-left"
          >
            <span className="material-symbols-outlined text-sky-400 text-[18px]">
              calendar_month
            </span>
            <span className="text-[12px] text-slate-400">เลือกช่วงเวลา:</span>
            <span className="text-[13px] font-semibold text-sky-100">{dateRangeText}</span>
            <span className="material-symbols-outlined text-sky-400/70 text-[16px] hover:text-sky-200">
              arrow_drop_down
            </span>
          </button>

          {/* Date Picker Dropdown */}
          {showDatePicker && (
            <div className="absolute left-0 mt-2 z-50 w-72 glacier-card rounded-xl p-4 shadow-2xl border border-sky-500/30">
              <p className="text-white text-[13px] font-semibold mb-3 flex items-center justify-between">
                <span>เลือกช่วงวันที่</span>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="text-slate-400 hover:text-white text-[11px]"
                >
                  ปิด
                </button>
              </p>
              <div className="space-y-2.5 text-[12px]">
                <div>
                  <label className="text-slate-400 block mb-1">ตั้งแต่วันที่</label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded-lg px-2.5 py-1.5 text-sky-100"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">ถึงวันที่</label>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded-lg px-2.5 py-1.5 text-sky-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={applyCustomRange}
                  className="w-full mt-2 bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 font-semibold py-1.5 rounded-lg text-[12px] hover:brightness-110 shadow-sm"
                >
                  ใช้งานช่วงเวลานี้
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Filter Buttons */}
        <div className="inline-flex p-1 bg-slate-950/60 rounded-lg gap-1 border border-sky-500/20">
          {periodOptions.map((opt) => {
            const isActive = activePeriod === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handlePeriodClick(opt.id)}
                type="button"
                className={`px-3 py-1 text-[12px] rounded transition-all cursor-pointer ${
                  opt.hideMobile ? 'hidden sm:inline-block' : ''
                } ${
                  isActive
                    ? 'font-semibold bg-sky-500/20 text-sky-200 border border-sky-400/30 shadow-sm'
                    : 'text-slate-400 hover:text-sky-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Auxiliary Dropdowns: Account selection & Export */}
      <div className="flex items-center gap-2.5 self-end lg:self-center">
        {/* Account Filter */}
        <div className="relative">
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="inline-flex items-center gap-2 bg-slate-900/80 border border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-800/80 text-sky-100 px-3 py-2 rounded-lg text-[13px] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sky-400 text-[18px]">
              account_balance
            </span>
            <span>{currentAccountObj.name}</span>
            <span className="material-symbols-outlined text-slate-400 text-[16px]">
              expand_more
            </span>
          </button>

          {/* Account Dropdown */}
          {showAccountDropdown && (
            <div className="absolute right-0 mt-2 w-64 glacier-card rounded-xl p-2 shadow-2xl z-50 border border-sky-500/30 text-[13px]">
              <p className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                เลือกแสดงตามบัญชี
              </p>
              {ACCOUNTS_LIST.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setSelectedAccount(acc.id);
                    setShowAccountDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                    selectedAccount === acc.id
                      ? 'bg-sky-500/20 text-sky-200 font-medium'
                      : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: acc.color }}
                    />
                    <span>{acc.name}</span>
                  </div>
                  {acc.balance !== undefined && (
                    <span className="text-[11px] text-slate-400">
                      ฿{acc.balance.toLocaleString()}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Action */}
        <button
          onClick={onOpenExport}
          className="inline-flex items-center gap-1.5 bg-slate-900/80 border border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-800/80 text-sky-100 px-3 py-2 rounded-lg text-[13px] transition-all cursor-pointer"
          title="ส่งออกรายงาน Excel หรือ PDF"
          type="button"
        >
          <span className="material-symbols-outlined text-sky-400 text-[18px]">
            file_download
          </span>
          <span>ส่งออกข้อมูล</span>
        </button>
      </div>
    </section>
  );
};
