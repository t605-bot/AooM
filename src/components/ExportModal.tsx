import React, { useState } from 'react';
import { Transaction } from '../types/finance';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  const [format, setFormat] = useState<'csv' | 'json' | 'print'>('csv');

  if (!isOpen) return null;

  const handleDownload = () => {
    if (format === 'csv') {
      const headers = ['ID,วันที่,เวลา,รายการ,ป้ายกำกับ,หมวดหมู่,บัญชี,สถานะ,ประเภท,จำนวนเงิน'];
      const rows = transactions.map(
        (t) =>
          `"${t.id}","${t.date}","${t.time}","${t.title}","${t.tag}","${t.category}","${t.account}","${t.status}","${t.type}",${t.amount}`
      );
      const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `รายงานการเงิน_${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(transactions, null, 2));
      const link = document.createElement('a');
      link.href = dataStr;
      link.download = `รายงานการเงิน_${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
    } else {
      window.print();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glacier-card rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-sky-500/30">
        <div className="flex items-center justify-between pb-3 border-b border-sky-500/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-[20px]">
              file_download
            </span>
            <h3 className="text-[16px] font-semibold text-sky-100">ส่งออกข้อมูลการเงิน</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-4 my-4">
          <p className="text-[13px] text-slate-300">
            เลือกรูปแบบไฟล์ที่ต้องการส่งออกสำหรับนำไปจัดทำบัญชีหรือวิเคราะห์เพิ่มเติม:
          </p>

          <div className="space-y-2.5">
            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                format === 'csv'
                  ? 'bg-sky-500/20 border-sky-400/50 text-white'
                  : 'bg-slate-900/60 border-sky-500/15 text-slate-300 hover:border-sky-500/30'
              }`}
            >
              <input
                type="radio"
                name="export_format"
                value="csv"
                checked={format === 'csv'}
                onChange={() => setFormat('csv')}
                className="accent-sky-400"
              />
              <div>
                <p className="font-semibold text-[13px]">CSV / Microsoft Excel (.csv)</p>
                <p className="text-[11px] text-slate-400">
                  เหมาะสำหรับการนำเข้า Excel, Google Sheets เพื่อคำนวณสูตร
                </p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                format === 'json'
                  ? 'bg-sky-500/20 border-sky-400/50 text-white'
                  : 'bg-slate-900/60 border-sky-500/15 text-slate-300 hover:border-sky-500/30'
              }`}
            >
              <input
                type="radio"
                name="export_format"
                value="json"
                checked={format === 'json'}
                onChange={() => setFormat('json')}
                className="accent-sky-400"
              />
              <div>
                <p className="font-semibold text-[13px]">JSON Raw Data (.json)</p>
                <p className="text-[11px] text-slate-400">
                  ไฟล์โครงสร้างข้อมูลแบบสมบูรณ์ เหมาะสำหรับโปรแกรมเมอร์และสำรองข้อมูล
                </p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                format === 'print'
                  ? 'bg-sky-500/20 border-sky-400/50 text-white'
                  : 'bg-slate-900/60 border-sky-500/15 text-slate-300 hover:border-sky-500/30'
              }`}
            >
              <input
                type="radio"
                name="export_format"
                value="print"
                checked={format === 'print'}
                onChange={() => setFormat('print')}
                className="accent-sky-400"
              />
              <div>
                <p className="font-semibold text-[13px]">พิมพ์รายงานสรุป (Print / PDF)</p>
                <p className="text-[11px] text-slate-400">
                  พิมพ์ออกเครื่องพิมพ์หรือบันทึกเป็นเอกสาร PDF
                </p>
              </div>
            </label>
          </div>

          <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-[12px] text-sky-200">
            📊 จำนวนรายการที่จะส่งออก: <strong>{transactions.length} รายการ</strong>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2 text-[13px] bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 font-semibold rounded-lg hover:brightness-110 shadow-[0_0_15px_rgba(125,211,252,0.35)] transition-all cursor-pointer"
          >
            เริ่มดาวน์โหลด
          </button>
        </div>
      </div>
    </div>
  );
};
