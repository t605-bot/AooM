export type TransactionType = 'income' | 'expense' | 'transfer';

export type TransactionStatus = 'สำเร็จ' | 'ตัดบัญชีแล้ว' | 'รอดำเนินการ';

export interface Transaction {
  id: string;
  date: string; // e.g. "28 ก.พ. 2568"
  rawDate: string; // "2025-02-28"
  time: string; // e.g. "09:15 น."
  title: string;
  tag: string; // e.g. "รายได้ประจำ"
  category: string; // e.g. "เงินเดือน", "อาหาร & เครื่องดื่ม"
  account: string; // e.g. "KBank (กสิกรไทย)"
  status: TransactionStatus;
  amount: number;
  type: TransactionType;
  icon: string;
  iconBgColor?: string;
  note?: string;
}

export interface ExpenseCategorySummary {
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  colorClass: string;
  barColor: string;
}

export interface WeeklyCashflow {
  weekLabel: string;
  weekName: string;
  income: number;
  expense: number;
  incomeHeightPct: number;
  expenseHeightPct: number;
}

export interface FinancialSummary {
  netBalance: number;
  netBalanceGrowthPct: number;
  previousMonthBalance: number;
  totalIncome: number;
  incomeGrowthPct: number;
  incomeTarget: number;
  incomeTargetPct: number;
  totalExpense: number;
  expenseBudgetChangePct: number;
  expenseBudget: number;
  expenseBudgetUsedPct: number;
  totalSavings: number;
  savingsIncomePct: number;
  savingsTarget: number;
  savingsTargetPct: number;
}
