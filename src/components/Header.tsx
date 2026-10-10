import React, { useState } from 'react';

interface HeaderProps {
  currentTab: 'overview' | 'reports' | 'settings';
  setCurrentTab: (tab: 'overview' | 'reports' | 'settings') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNewTransaction: () => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  onOpenNewTransaction,
  onOpenHelp,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'เงินปันผลเข้าบัญชีสำเร็จ',
      desc: 'เงินปันผลหุ้นสามัญ ฿15,200.00 เข้าบัญชี SCB แล้ว',
      time: 'เมื่อ 3 ชั่วโมงที่แล้ว',
      read: false,
      icon: 'savings',
      color: 'text-emerald-400 bg-emerald-500/20',
    },
    {
      id: 2,
      title: 'คุมงบประมาณยอดเยี่ยม',
      desc: 'รายจ่ายเดือนนี้ต่ำกว่างบที่ตั้งไว้ 3.2% (เหลือ ฿2,350)',
      time: 'เมื่อวานนี้',
      read: false,
      icon: 'verified',
      color: 'text-sky-400 bg-sky-500/20',
    },
    {
      id: 3,
      title: 'ใกล้บรรลุเป้าหมายเงินออม',
      desc: 'สะสมแล้ว 85.5% ของเป้าหมายประจำเดือน (เหลือ ฿7,250)',
      time: '3 วันที่แล้ว',
      read: true,
      icon: 'flag',
      color: 'text-purple-400 bg-purple-500/20',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-xl border-b border-sky-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-2">
        {/* Logo & Navigation */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <button
            onClick={() => setCurrentTab('overview')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-slate-950 shadow-md shadow-sky-500/30 group-hover:shadow-sky-400/50 transition-all">
              <span className="material-symbols-outlined text-[20px] text-slate-950">
                account_balance_wallet
              </span>
            </div>
            <span className="text-[20px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-100 to-white tracking-tight">
              การเงินมั่นคง
            </span>
          </button>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-7 ml-4">
            {/* Tab: ภาพรวม */}
            <button
              onClick={() => setCurrentTab('overview')}
              className={`pb-3 -mb-3.5 text-[14px] flex items-center gap-1.5 transition-all font-medium cursor-pointer ${
                currentTab === 'overview'
                  ? 'text-sky-300 font-semibold border-b-2 border-sky-400 drop-shadow-[0_0_8px_rgba(125,211,252,0.6)]'
                  : 'text-slate-400 hover:text-sky-200 border-b-2 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>ภาพรวม</span>
            </button>

            {/* Tab: รายงาน */}
            <button
              onClick={() => setCurrentTab('reports')}
              className={`pb-3 -mb-3.5 text-[14px] flex items-center gap-1.5 transition-all font-medium cursor-pointer ${
                currentTab === 'reports'
                  ? 'text-sky-300 font-semibold border-b-2 border-sky-400 drop-shadow-[0_0_8px_rgba(125,211,252,0.6)]'
                  : 'text-slate-400 hover:text-sky-200 border-b-2 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
              <span>รายงาน</span>
            </button>

            {/* Tab: ตั้งค่า */}
            <button
              onClick={() => setCurrentTab('settings')}
              className={`pb-3 -mb-3.5 text-[14px] flex items-center gap-1.5 transition-all font-medium cursor-pointer ${
                currentTab === 'settings'
                  ? 'text-sky-300 font-semibold border-b-2 border-sky-400 drop-shadow-[0_0_8px_rgba(125,211,252,0.6)]'
                  : 'text-slate-400 hover:text-sky-200 border-b-2 border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span>ตั้งค่า</span>
            </button>
          </nav>
        </div>

        {/* Search Box & Trailing User Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Global Search Input */}
          <div className="relative hidden xl:block w-72">
            <span className="material-symbols-outlined absolute left-3 top-2 text-sky-400/70 text-[18px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหารายการ, หมวดหมู่, หรือผู้รับ..."
              className="w-full bg-slate-900/60 border border-sky-500/20 rounded-lg pl-9 pr-8 py-1.5 text-[13px] focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 placeholder:text-slate-500 backdrop-blur-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Trailing Action: Help */}
          <button
            onClick={onOpenHelp}
            title="คู่มือ & ช่วยเหลือ"
            className="p-2 text-slate-400 hover:text-sky-200 hover:bg-slate-800/60 rounded-lg transition-all border border-transparent hover:border-sky-500/20"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>

          {/* Trailing Action: Notifications with badge */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              title="การแจ้งเตือน"
              className="p-2 relative text-slate-400 hover:text-sky-200 hover:bg-slate-800/60 rounded-lg transition-all border border-transparent hover:border-sky-500/20"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950 shadow-[0_0_8px_#f43f5e]" />
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 glacier-card rounded-xl shadow-2xl z-50 p-4 border border-sky-500/30">
                <div className="flex items-center justify-between pb-3 border-b border-sky-500/15">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-[14px]">การแจ้งเตือนล่าสุด</span>
                    <span className="px-1.5 py-0.5 rounded text-[11px] bg-sky-500/20 text-sky-300 font-medium">
                      3 ใหม่
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-white text-[12px]"
                  >
                    ปิด
                  </button>
                </div>
                <div className="space-y-3 mt-3 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-lg bg-slate-900/60 border border-sky-500/10 hover:border-sky-500/30 transition-all flex gap-3 items-start"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.color}`}>
                        <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[13px] font-medium leading-snug">{n.title}</p>
                        <p className="text-slate-400 text-[12px] leading-tight mt-0.5">{n.desc}</p>
                        <p className="text-slate-500 text-[10px] mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Cluster */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-2 border-l border-sky-500/20 text-left focus:outline-none cursor-pointer"
            >
              <img
                className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-400/40 shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoLLfjQnqDj7brWwT9uV2X_avHkey7NIHQipKI-O-stxVTFn8DDXLFYVbO3LgNf7tdRQ9sraDahLn5m90P9RCbD0VCdCqkZ1qKLh1-hDy-jgVAoS1uc7qsyNmVO_c5hk020A-oOdYf7O-sjb0BgmjlZGf9DH6dgAyLogtGavnQII3L3Uy_yPOkd5pwieBnza6fmhy3x5eKLPZF66Rg4KyxqydyvGyuLr18v38BTMd-3hkwsCJaf3qC"
                alt="กิตติศักดิ์ พ."
              />
              <div className="hidden sm:block text-left">
                <p className="text-[13px] text-sky-100 font-semibold leading-none">กิตติศักดิ์ พ.</p>
                <p className="text-[11px] text-sky-400/80 leading-tight mt-0.5 font-medium">สมาชิกพรีเมียม</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 glacier-card rounded-xl p-3 shadow-2xl z-50 border border-sky-500/30 text-[13px]">
                <div className="pb-2 mb-2 border-b border-sky-500/15">
                  <p className="text-white font-semibold">กิตติศักดิ์ พันธุมิตร</p>
                  <p className="text-slate-400 text-[11px]">kittisak.p@finance.co.th</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-sky-200 hover:bg-slate-800/80 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
                  <span>ตั้งค่าบัญชี & การเงิน</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('reports');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-sky-200 hover:bg-slate-800/80 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">analytics</span>
                  <span>รายงานประจำปี 2568</span>
                </button>
                <div className="pt-2 mt-2 border-t border-sky-500/15">
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-300 hover:bg-rose-500/10 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Trailing Primary Action Button */}
          <button
            onClick={onOpenNewTransaction}
            type="button"
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(125,211,252,0.35)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ รายการใหม่</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden items-center justify-around border-t border-sky-500/15 px-4 py-2 bg-slate-950/80">
        <button
          onClick={() => setCurrentTab('overview')}
          className={`flex flex-col items-center gap-0.5 text-[11px] ${
            currentTab === 'overview' ? 'text-sky-300 font-semibold' : 'text-slate-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span>ภาพรวม</span>
        </button>
        <button
          onClick={() => setCurrentTab('reports')}
          className={`flex flex-col items-center gap-0.5 text-[11px] ${
            currentTab === 'reports' ? 'text-sky-300 font-semibold' : 'text-slate-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">query_stats</span>
          <span>รายงาน</span>
        </button>
        <button
          onClick={() => setCurrentTab('settings')}
          className={`flex flex-col items-center gap-0.5 text-[11px] ${
            currentTab === 'settings' ? 'text-sky-300 font-semibold' : 'text-slate-400'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>ตั้งค่า</span>
        </button>
      </div>
    </header>
  );
};
