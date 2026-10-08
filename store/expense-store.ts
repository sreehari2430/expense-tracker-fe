import { create } from "zustand";
import type { Expense, Currency } from "@/types/expense";
import { getFromStorage, setToStorage } from "@/lib/storage";
import { DEFAULT_CURRENCY } from "@/data/currencies";
import { generateId } from "@/lib/format";

const STORAGE_KEYS = {
    expenses: "expenselog-expenses",
    currency: "expenselog-currency",
    theme: "expenselog-theme",
    categories: "expenselog-custom-categories",
} as const;

type Theme = "light" | "dark" | "system";

interface ExpenseStore {
    // State
    expenses: Expense[];
    currency: Currency;
    theme: Theme;
    hydrated: boolean;

    // Actions
    hydrate: () => void;
    addExpense: (expense: Omit<Expense, "id" | "createdAt">) => void;
    updateExpense: (id: string, expense: Partial<Omit<Expense, "id" | "createdAt">>) => void;
    deleteExpense: (id: string) => void;
    getExpenseById: (id: string) => Expense | undefined;
    setCurrency: (currency: Currency) => void;
    setTheme: (theme: Theme) => void;
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
    expenses: [],
    currency: DEFAULT_CURRENCY,
    theme: "system",
    hydrated: false,

    hydrate: () => {
        const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.expenses, []);
        const currency = getFromStorage<Currency>(STORAGE_KEYS.currency, DEFAULT_CURRENCY);
        const theme = getFromStorage<Theme>(STORAGE_KEYS.theme, "system");
        set({ expenses, currency, theme, hydrated: true });
    },

    addExpense: (expenseData) => {
        const newExpense: Expense = {
            ...expenseData,
            id: generateId(),
            createdAt: new Date().toISOString(),
        };
        const updated = [newExpense, ...get().expenses];
        set({ expenses: updated });
        setToStorage(STORAGE_KEYS.expenses, updated);
    },

    updateExpense: (id, expenseData) => {
        const updated = get().expenses.map((expense) =>
            expense.id === id ? { ...expense, ...expenseData } : expense
        );
        set({ expenses: updated });
        setToStorage(STORAGE_KEYS.expenses, updated);
    },

    deleteExpense: (id) => {
        const updated = get().expenses.filter((expense) => expense.id !== id);
        set({ expenses: updated });
        setToStorage(STORAGE_KEYS.expenses, updated);
    },

    getExpenseById: (id) => {
        return get().expenses.find((expense) => expense.id === id);
    },

    setCurrency: (currency) => {
        set({ currency });
        setToStorage(STORAGE_KEYS.currency, currency);
    },

    setTheme: (theme) => {
        set({ theme });
        setToStorage(STORAGE_KEYS.theme, theme);
    },
}));
