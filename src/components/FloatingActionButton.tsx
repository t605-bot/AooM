import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        type="button"
        className="flex items-center gap-2 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300 text-slate-950 px-5 py-3.5 rounded-full shadow-[0_0_25px_rgba(125,211,252,0.4),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:brightness-110 active:scale-[0.98] transition-all duration-150 border border-white/30 cursor-pointer group"
      >
        <span className="material-symbols-outlined text-[22px] font-bold group-hover:rotate-90 transition-transform">
          add
        </span>
        <span className="text-[13px] font-bold tracking-wide">
          + บันทึกรายการด่วน
        </span>
      </button>
    </div>
  );
};
