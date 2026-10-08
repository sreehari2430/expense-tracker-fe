import type { Currency } from "@/types/expense";
import { DEFAULT_CURRENCY } from "@/data/currencies";

export function formatCurrency(amount: number, currency: Currency = DEFAULT_CURRENCY): string {
    return new Intl.NumberFormat(currency.locale, {
        style: "currency",
        currency: currency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
