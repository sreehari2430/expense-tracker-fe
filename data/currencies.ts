import type { Currency } from "@/types/expense";

export const currencies: Currency[] = [
    { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
    { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
    { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
    { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
];

export const DEFAULT_CURRENCY: Currency = currencies[0];
