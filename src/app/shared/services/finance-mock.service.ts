import { Injectable } from '@angular/core';

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
}

export interface Transaction {
  id: string;
  date: Date;
  merchant: string;
  category: string;
  categoryIcon: string;
  amount: number;
  account: string;
  pending: boolean;
}

export interface RecurringTransaction {
  id: string;
  merchant: string;
  category: string;
  categoryIcon: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'annual';
  nextDate: Date;
}

export interface DailySpending {
  label: string;
  amount: number;
  cumulative: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  color: string;
}

export interface FinanceSummary {
  netWorth: number;
  netWorthChange: number;
  monthlyIncome: number;
  monthlySpending: number;
  spendingChange: number;
  savingsRate: number;
  savingsRateChange: number;
}

@Injectable({ providedIn: 'root' })
export class FinanceMockService {
  private accounts: Account[] = [
    { id: '1', name: 'Chase Checking', institution: 'Chase', type: 'checking', balance: 4823.52 },
    { id: '2', name: 'Marcus Savings', institution: 'Goldman Sachs', type: 'savings', balance: 18240.0 },
    { id: '3', name: 'Fidelity 401k', institution: 'Fidelity', type: 'investment', balance: 52380.0 },
    { id: '4', name: 'Vanguard Brokerage', institution: 'Vanguard', type: 'investment', balance: 34120.0 },
    { id: '5', name: 'Chase Sapphire', institution: 'Chase', type: 'credit', balance: -2459.7 },
  ];

  private transactions: Transaction[] = [
    // Feb 1
    { id: 't1', date: new Date(2026, 1, 1), merchant: 'Property Management LLC', category: 'Housing', categoryIcon: 'home', amount: -1800.0, account: 'Chase Checking', pending: false },
    { id: 't2', date: new Date(2026, 1, 1), merchant: 'Kroger', category: 'Groceries', categoryIcon: 'shopping-cart', amount: -45.0, account: 'Chase Checking', pending: false },
    { id: 'i1', date: new Date(2026, 1, 1), merchant: 'Employer Inc.', category: 'Income', categoryIcon: 'briefcase', amount: 2600.0, account: 'Chase Checking', pending: false },
    // Feb 2
    { id: 't3', date: new Date(2026, 1, 2), merchant: 'Starbucks', category: 'Dining Out', categoryIcon: 'coffee', amount: -5.0, account: 'Chase Sapphire', pending: false },
    { id: 't4', date: new Date(2026, 1, 2), merchant: 'Panera Bread', category: 'Dining Out', categoryIcon: 'utensils', amount: -18.0, account: 'Chase Sapphire', pending: false },
    // Feb 3
    { id: 't5', date: new Date(2026, 1, 3), merchant: 'Chevron', category: 'Transportation', categoryIcon: 'car', amount: -52.0, account: 'Chase Checking', pending: false },
    { id: 't6', date: new Date(2026, 1, 3), merchant: 'Olive Garden', category: 'Dining Out', categoryIcon: 'utensils', amount: -38.0, account: 'Chase Sapphire', pending: false },
    // Feb 4
    { id: 't7', date: new Date(2026, 1, 4), merchant: 'Kroger', category: 'Groceries', categoryIcon: 'shopping-cart', amount: -82.0, account: 'Chase Checking', pending: false },
    // Feb 5
    { id: 't8', date: new Date(2026, 1, 5), merchant: 'Netflix', category: 'Entertainment', categoryIcon: 'tv', amount: -18.0, account: 'Chase Sapphire', pending: false },
    { id: 't9', date: new Date(2026, 1, 5), merchant: 'Spotify', category: 'Entertainment', categoryIcon: 'music', amount: -10.0, account: 'Chase Sapphire', pending: false },
    // Feb 6
    { id: 't10', date: new Date(2026, 1, 6), merchant: 'LA Fitness', category: 'Health & Fitness', categoryIcon: 'activity', amount: -50.0, account: 'Chase Checking', pending: false },
    { id: 't11', date: new Date(2026, 1, 6), merchant: 'CVS Pharmacy', category: 'Healthcare', categoryIcon: 'heart', amount: -23.0, account: 'Chase Checking', pending: false },
    // Feb 7
    { id: 't12', date: new Date(2026, 1, 7), merchant: 'The Capital Grille', category: 'Dining Out', categoryIcon: 'utensils', amount: -65.0, account: 'Chase Sapphire', pending: false },
    // Feb 8
    { id: 't13', date: new Date(2026, 1, 8), merchant: 'Publix', category: 'Groceries', categoryIcon: 'shopping-cart', amount: -38.0, account: 'Chase Checking', pending: false },
    { id: 't14', date: new Date(2026, 1, 8), merchant: 'Starbucks', category: 'Dining Out', categoryIcon: 'coffee', amount: -8.0, account: 'Chase Sapphire', pending: false },
    // Feb 9
    { id: 't15', date: new Date(2026, 1, 9), merchant: 'First Watch', category: 'Dining Out', categoryIcon: 'utensils', amount: -45.0, account: 'Chase Sapphire', pending: false },
    // Feb 10
    { id: 't16', date: new Date(2026, 1, 10), merchant: 'Amazon', category: 'Shopping', categoryIcon: 'package', amount: -120.0, account: 'Chase Sapphire', pending: false },
    // Feb 11
    { id: 't17', date: new Date(2026, 1, 11), merchant: 'Duke Energy', category: 'Utilities', categoryIcon: 'zap', amount: -95.0, account: 'Chase Checking', pending: false },
    // Feb 12
    { id: 't18', date: new Date(2026, 1, 12), merchant: 'Panera Bread', category: 'Dining Out', categoryIcon: 'utensils', amount: -22.0, account: 'Chase Sapphire', pending: false },
    { id: 't19', date: new Date(2026, 1, 12), merchant: 'Starbucks', category: 'Dining Out', categoryIcon: 'coffee', amount: -6.0, account: 'Chase Sapphire', pending: false },
    // Feb 13
    { id: 't20', date: new Date(2026, 1, 13), merchant: 'ExxonMobil', category: 'Transportation', categoryIcon: 'car', amount: -48.0, account: 'Chase Checking', pending: false },
    // Feb 14
    { id: 't21', date: new Date(2026, 1, 14), merchant: "Valentine's Dinner", category: 'Dining Out', categoryIcon: 'utensils', amount: -125.0, account: 'Chase Sapphire', pending: false },
    // Feb 15
    { id: 't22', date: new Date(2026, 1, 15), merchant: "Trader Joe's", category: 'Groceries', categoryIcon: 'shopping-cart', amount: -52.0, account: 'Chase Checking', pending: false },
    { id: 't23', date: new Date(2026, 1, 15), merchant: 'Walgreens', category: 'Healthcare', categoryIcon: 'heart', amount: -18.0, account: 'Chase Checking', pending: false },
    { id: 'i2', date: new Date(2026, 1, 15), merchant: 'Employer Inc.', category: 'Income', categoryIcon: 'briefcase', amount: 2600.0, account: 'Chase Checking', pending: false },
    // Feb 16
    { id: 't24', date: new Date(2026, 1, 16), merchant: 'Comcast', category: 'Utilities', categoryIcon: 'wifi', amount: -65.0, account: 'Chase Checking', pending: false },
    { id: 't25', date: new Date(2026, 1, 16), merchant: 'Starbucks', category: 'Dining Out', categoryIcon: 'coffee', amount: -7.2, account: 'Chase Sapphire', pending: false },
    // Feb 17
    { id: 't26', date: new Date(2026, 1, 17), merchant: 'Chick-fil-A', category: 'Dining Out', categoryIcon: 'utensils', amount: -28.0, account: 'Chase Sapphire', pending: false },
    // Feb 18
    { id: 't27', date: new Date(2026, 1, 18), merchant: 'Whole Foods Market', category: 'Groceries', categoryIcon: 'shopping-cart', amount: -65.0, account: 'Chase Checking', pending: false },
    // Feb 19
    { id: 't28', date: new Date(2026, 1, 19), merchant: 'AMC Theaters', category: 'Entertainment', categoryIcon: 'film', amount: -35.0, account: 'Chase Sapphire', pending: false },
    { id: 't29', date: new Date(2026, 1, 19), merchant: 'Starbucks', category: 'Dining Out', categoryIcon: 'coffee', amount: -6.4, account: 'Chase Sapphire', pending: false },
    // Feb 20
    { id: 't30', date: new Date(2026, 1, 20), merchant: 'Shell Gas Station', category: 'Transportation', categoryIcon: 'car', amount: -50.0, account: 'Chase Checking', pending: false },
    { id: 't31', date: new Date(2026, 1, 20), merchant: 'Chipotle', category: 'Dining Out', categoryIcon: 'utensils', amount: -18.0, account: 'Chase Sapphire', pending: true },
  ];

  private recurringTransactions: RecurringTransaction[] = [
    { id: 'r1', merchant: 'Netflix', category: 'Entertainment', categoryIcon: 'tv', amount: 18.99, frequency: 'monthly', nextDate: new Date(2026, 1, 22) },
    { id: 'r2', merchant: 'Spotify', category: 'Entertainment', categoryIcon: 'music', amount: 10.99, frequency: 'monthly', nextDate: new Date(2026, 1, 25) },
    { id: 'r3', merchant: 'Comcast Internet', category: 'Utilities', categoryIcon: 'wifi', amount: 65.0, frequency: 'monthly', nextDate: new Date(2026, 1, 28) },
    { id: 'r4', merchant: 'Property Management LLC', category: 'Housing', categoryIcon: 'home', amount: 1800.0, frequency: 'monthly', nextDate: new Date(2026, 2, 1) },
    { id: 'r5', merchant: 'LA Fitness', category: 'Health & Fitness', categoryIcon: 'activity', amount: 49.99, frequency: 'monthly', nextDate: new Date(2026, 2, 6) },
    { id: 'r6', merchant: 'State Farm Auto', category: 'Insurance', categoryIcon: 'shield', amount: 127.5, frequency: 'monthly', nextDate: new Date(2026, 2, 10) },
  ];

  getRecentTransactions(limit = 10): Transaction[] {
    return this.transactions
      .filter(t => t.amount < 0)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  getRecurringTransactions(): RecurringTransaction[] {
    return [...this.recurringTransactions].sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());
  }

  getSummary(): FinanceSummary {
    const netWorth = this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const expenses = this.transactions.filter(t => t.amount < 0);
    const income = this.transactions.filter(t => t.amount > 0);
    const monthlyIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const monthlySpending = Math.abs(expenses.reduce((sum, t) => sum + t.amount, 0));
    const savingsRate = ((monthlyIncome - monthlySpending) / monthlyIncome) * 100;
    return {
      netWorth,
      netWorthChange: 3.2,
      monthlyIncome,
      monthlySpending,
      spendingChange: -8.2,
      savingsRate: Math.max(0, savingsRate),
      savingsRateChange: 4.3,
    };
  }

  getDailySpending(): DailySpending[] {
    const dailyMap = new Map<number, number>();
    this.transactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        const day = t.date.getDate();
        dailyMap.set(day, (dailyMap.get(day) ?? 0) + Math.abs(t.amount));
      });

    let cumulative = 0;
    const result: DailySpending[] = [];
    for (let day = 1; day <= 20; day++) {
      const amount = parseFloat((dailyMap.get(day) ?? 0).toFixed(2));
      cumulative = parseFloat((cumulative + amount).toFixed(2));
      result.push({ label: `Feb ${day}`, amount, cumulative });
    }
    return result;
  }

  getCategorySpending(): CategorySpending[] {
    const colorMap: Record<string, string> = {
      Housing: '#14b8a6',
      Groceries: '#0891b2',
      'Dining Out': '#8b5cf6',
      Transportation: '#f59e0b',
      Entertainment: '#ec4899',
      Utilities: '#6366f1',
      Shopping: '#f97316',
      Healthcare: '#ef4444',
      'Health & Fitness': '#10b981',
    };

    const categoryMap = new Map<string, number>();
    this.transactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        categoryMap.set(t.category, (categoryMap.get(t.category) ?? 0) + Math.abs(t.amount));
      });

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount: parseFloat(amount.toFixed(2)),
        color: colorMap[category] ?? '#6b7280',
      }))
      .sort((a, b) => b.amount - a.amount);
  }
}
