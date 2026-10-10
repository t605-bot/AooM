import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { PeriodBar } from './components/PeriodBar';
import { MetricCards } from './components/MetricCards';
import { CashflowChart } from './components/CashflowChart';
import { TopCategories } from './components/TopCategories';
import { TransactionTable } from './components/TransactionTable';
import { QuickModal } from './components/QuickModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AdvancedFilterModal, FilterOptions } from './components/AdvancedFilterModal';
import { ExportModal } from './components/ExportModal';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { HelpModal } from './components/HelpModal';
import { INITIAL_SUMMARY, INITIAL_TRANSACTIONS } from './data/mockData';
import { FinancialSummary, Transaction } from './types/finance';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'overview' | 'reports' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePeriod, setActivePeriod] = useState('this_month');
  const [dateRangeText, setDateRangeText] = useState('1 ก.พ. 2568 - 28 ก.พ. 2568');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'income' | 'expense' | 'transfer'>('all');

  // Load from localStorage or defaults
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('finance_app_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [summary, setSummary] = useState<FinancialSummary>(() => {
    try {
      const saved = localStorage.getItem('finance_app_summary');
      return saved ? JSON.parse(saved) : INITIAL_SUMMARY;
    } catch {
      return INITIAL_SUMMARY;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('finance_app_transactions', JSON.stringify(transactions));
    } catch {
      // ignore
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('finance_app_summary', JSON.stringify(summary));
    } catch {
      // ignore
    }
  }, [summary]);

  // Modals state
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Advanced Filters
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    type: 'all',
    category: 'all',
    account: 'all',
    status: 'all',
    minAmount: '',
    maxAmount: '',
  });

  // Handle adding or updating transaction
  const handleSaveTransaction = (txData: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editingTransaction.id ? { ...txData, id: t.id } : t))
      );
      setEditingTransaction(null);
    } else {
      const newTx: Transaction = {
        ...txData,
        id: `tx-${Date.now()}`,
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Update summary numbers accordingly
      setSummary((prev) => {
        let newNet = prev.netBalance;
        let newIncome = prev.totalIncome;
        let newExpense = prev.totalExpense;
        let newSavings = prev.totalSavings;

        if (txData.type === 'income') {
          newNet += txData.amount;
          newIncome += txData.amount;
        } else if (txData.type === 'expense') {
          newNet -= txData.amount;
          newExpense += txData.amount;
        } else if (txData.type === 'transfer') {
          newSavings += txData.amount;
        }

        return {
          ...prev,
          netBalance: newNet,
          totalIncome: newIncome,
          totalExpense: newExpense,
          totalSavings: newSavings,
          expenseBudgetUsedPct: Math.round((newExpense / prev.expenseBudget) * 1000) / 10,
          incomeTargetPct: Math.round((newIncome / prev.incomeTarget) * 1000) / 10,
          savingsTargetPct: Math.round((newSavings / prev.savingsTarget) * 1000) / 10,
        };
      });
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditTransaction = (tx: Transaction) => {
    setEditingTransaction(tx);
    setIsQuickModalOpen(true);
  };

  const handleResetData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setSummary(INITIAL_SUMMARY);
    localStorage.removeItem('finance_app_transactions');
    localStorage.removeItem('finance_app_summary');
  };

  // Filtered transactions for the overview table
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchCategory = t.category.toLowerCase().includes(q);
        const matchTag = t.tag.toLowerCase().includes(q);
        const matchAccount = t.account.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchTag && !matchAccount) {
          return false;
        }
      }

      // Account filter from PeriodBar
      if (selectedAccount !== 'all') {
        const matchAccount = t.account.toLowerCase().includes(selectedAccount.toLowerCase()) ||
          (selectedAccount === 'kbank' && t.account.includes('KBank')) ||
          (selectedAccount === 'scb' && t.account.includes('SCB')) ||
          (selectedAccount === 'ktc' && t.account.includes('KTC')) ||
          (selectedAccount === 'cash' && t.account.includes('เงินสด'));
        if (!matchAccount) return false;
      }

      // Advanced filters
      if (advancedFilters.account !== 'all' && t.account !== advancedFilters.account) {
        return false;
      }
      if (advancedFilters.category !== 'all' && t.category !== advancedFilters.category) {
        return false;
      }
      if (advancedFilters.status !== 'all' && t.status !== advancedFilters.status) {
        return false;
      }
      if (advancedFilters.minAmount && t.amount < parseFloat(advancedFilters.minAmount)) {
        return false;
      }
      if (advancedFilters.maxAmount && t.amount > parseFloat(advancedFilters.maxAmount)) {
        return false;
      }

      return true;
    });
  }, [transactions, searchQuery, selectedAccount, advancedFilters]);

  return (
    <div className="bg-[#090d16] text-[#e0e8f0] antialiased min-h-screen pb-20 selection:bg-sky-500/20 selection:text-sky-300 relative overflow-x-hidden">
      {/* Subtle Ambient Background Glows for Glacier Aesthetic */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* TOP APP BAR */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewTransaction={() => {
          setEditingTransaction(null);
          setIsQuickModalOpen(true);
        }}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 space-y-6">
        {currentTab === 'overview' && (
          <>
            {/* PERIOD SELECTOR & CONTROL BAR */}
            <PeriodBar
              activePeriod={activePeriod}
              setActivePeriod={setActivePeriod}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              onOpenExport={() => setIsExportModalOpen(true)}
              dateRangeText={dateRangeText}
              setDateRangeText={setDateRangeText}
            />

            {/* FINANCIAL SUMMARY METRIC CARDS (Bento Grid 4 Cards) */}
            <MetricCards summary={summary} />

            {/* MID SECTION: ANALYTICS & CATEGORY BREAKDOWN */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Cashflow Trend Bar Chart (8 Cols) */}
              <CashflowChart />

              {/* Top Expense Categories (4 Cols) */}
              <TopCategories
                onViewFullReport={() => setCurrentTab('reports')}
              />
            </section>

            {/* TRANSACTION LOGS LIST VIEW SECTION */}
            <TransactionTable
              transactions={filteredTransactions}
              onOpenAdvancedFilter={() => setIsAdvancedFilterOpen(true)}
              activeTypeFilter={activeTypeFilter}
              setActiveTypeFilter={setActiveTypeFilter}
              onDeleteTransaction={handleDeleteTransaction}
              onEditTransaction={handleEditTransaction}
            />

            {/* FLOATING ACTION BUTTON */}
            <FloatingActionButton
              onClick={() => {
                setEditingTransaction(null);
                setIsQuickModalOpen(true);
              }}
            />
          </>
        )}

        {currentTab === 'reports' && (
          <ReportsView
            summary={summary}
            transactions={transactions}
            onBackToOverview={() => setCurrentTab('overview')}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            summary={summary}
            onUpdateSummary={setSummary}
            onResetData={handleResetData}
            onBackToOverview={() => setCurrentTab('overview')}
          />
        )}
      </main>

      {/* QUICK ENTRY MODAL */}
      <QuickModal
        isOpen={isQuickModalOpen}
        onClose={() => {
          setIsQuickModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />

      {/* ADVANCED FILTER MODAL */}
      <AdvancedFilterModal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
        filters={advancedFilters}
        onApplyFilters={setAdvancedFilters}
        onResetFilters={() =>
          setAdvancedFilters({
            type: 'all',
            category: 'all',
            account: 'all',
            status: 'all',
            minAmount: '',
            maxAmount: '',
          })
        }
      />

      {/* EXPORT DATA MODAL */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        transactions={filteredTransactions}
      />

      {/* HELP GUIDE MODAL */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
