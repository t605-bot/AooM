import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glacier-card rounded-xl max-w-lg w-full p-6 shadow-2xl relative border border-sky-500/30">
        <div className="flex items-center justify-between pb-3 border-b border-sky-500/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-[20px]">
              help_outline
            </span>
            <h3 className="text-[16px] font-semibold text-sky-100">
              คู่มือการใช้งานระบบ &quot;การเงินมั่นคง&quot;
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-4 my-4 text-[13px] text-slate-300">
          <div>
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">
                dashboard
              </span>
              <span>1. แผงควบคุมภาพรวม (Overview)</span>
            </h4>
            <p className="text-slate-400 text-[12px] leading-relaxed">
              แสดงยอดเงินคงเหลือสุทธิ, สรุปรายรับ-รายจ่ายประจำเดือน, และอัตราการออมเงิน
              พร้อมกราฟเปรียบเทียบกระแสเงินสด 4 สัปดาห์ และสัดส่วนค่าใช้จ่าย 5 หมวดหลัก
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                add_circle
              </span>
              <span>2. การบันทึกรายการด่วน</span>
            </h4>
            <p className="text-slate-400 text-[12px] leading-relaxed">
              คลิกปุ่ม <strong>&quot;+ รายการใหม่&quot;</strong> ที่แถบด้านบน หรือปุ่มลอย
              ด้านขวาล่างเพื่อบันทึก รายรับ, รายจ่าย, หรือการโอนย้ายเงินระหว่างบัญชีได้ทันที
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">
                filter_list
              </span>
              <span>3. การค้นหาและตัวกรองละเอียด</span>
            </h4>
            <p className="text-slate-400 text-[12px] leading-relaxed">
              พิมพ์ค้นหาในช่องค้นหา หรือใช้ตัวกรองเพื่อแยกดูเฉพาะรายรับ, รายจ่าย,
              หรือเจาะจงตามบัญชีธนาคารและช่วงจำนวนเงิน
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">
                file_download
              </span>
              <span>4. การส่งออกข้อมูล (Export)</span>
            </h4>
            <p className="text-slate-400 text-[12px] leading-relaxed">
              คลิกปุ่ม <strong>&quot;ส่งออกข้อมูล&quot;</strong> เพื่อดาวน์โหลดข้อมูลเป็นไฟล์ CSV สำหรับ
              Excel หรือไฟล์ JSON หรือพิมพ์เป็นรายงานสรุป
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-sky-500/15">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-[13px] bg-sky-500/20 text-sky-200 border border-sky-400/30 rounded-lg hover:bg-sky-500/30 transition-all cursor-pointer font-medium"
          >
            เข้าใจแล้ว
          </button>
        </div>
      </div>
    </div>
  );
};
