import {
    UtensilsCrossed,
    ShoppingBag,
    Car,
    Receipt,
    Clapperboard,
    HeartPulse,
    GraduationCap,
    Plane,
    MoreHorizontal,
    type LucideIcon,
} from "lucide-react";

export type Category = {
    value: string;
    label: string;
    icon: LucideIcon;
    color: string;
};

export const categories: Category[] = [
    { value: "food", label: "Food", icon: UtensilsCrossed, color: "#f97316" },
    { value: "shopping", label: "Shopping", icon: ShoppingBag, color: "#8b5cf6" },
    { value: "transport", label: "Transport", icon: Car, color: "#3b82f6" },
    { value: "bills", label: "Bills", icon: Receipt, color: "#ef4444" },
    { value: "entertainment", label: "Entertainment", icon: Clapperboard, color: "#ec4899" },
    { value: "health", label: "Health", icon: HeartPulse, color: "#10b981" },
    { value: "education", label: "Education", icon: GraduationCap, color: "#6366f1" },
    { value: "travel", label: "Travel", icon: Plane, color: "#0ea5e9" },
    { value: "other", label: "Other", icon: MoreHorizontal, color: "#71717a" },
];

export const getCategoryByValue = (value: string): Category | undefined => {
    return categories.find((cat) => cat.value === value);
};

export const paymentMethods = [
    { value: "upi", label: "UPI" },
    { value: "cash", label: "Cash" },
    { value: "card", label: "Card" },
    { value: "net-banking", label: "Net Banking" },
    { value: "wallet", label: "Wallet" },
    { value: "other", label: "Other" },
];
