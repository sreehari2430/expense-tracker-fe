export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
};

export type SortOption = "newest" | "oldest" | "amount-high" | "amount-low";

export type DateFilter = "all" | "today" | "this-week" | "this-month" | "custom";

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  locale: string;
};
