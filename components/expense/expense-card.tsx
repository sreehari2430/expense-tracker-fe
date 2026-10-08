"use client";

import type { Expense } from "@/types/expense";
import { getCategoryByValue } from "@/data/categories";
import { formatCurrency } from "@/lib/format";
import { format } from "date-fns";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useExpenseStore } from "@/store/expense-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExpenseCardProps {
    expense: Expense;
    onView: (expense: Expense) => void;
    onEdit: (expense: Expense) => void;
    onDelete: (expense: Expense) => void;
}

export function ExpenseCard({ expense, onView, onEdit, onDelete }: ExpenseCardProps) {
    const currency = useExpenseStore((s) => s.currency);
    const category = getCategoryByValue(expense.category);
    const CategoryIcon = category?.icon;

    const paymentLabel =
        expense.paymentMethod.charAt(0).toUpperCase() + expense.paymentMethod.slice(1);

    return (
        <div className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-card hover:bg-accent/40 transition-colors">
            {/* Category Icon */}
            <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{ backgroundColor: category ? `${category.color}14` : undefined }}
            >
                {CategoryIcon && (
                    <CategoryIcon
                        className="w-5 h-5"
                        style={{ color: category?.color }}
                    />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                    {expense.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                    {category?.label ?? expense.category}
                    <span className="mx-1.5">·</span>
                    {paymentLabel}
                    <span className="hidden sm:inline">
                        <span className="mx-1.5">·</span>
                        {format(new Date(expense.date), "MMM d")}
                    </span>
                </p>
            </div>

            {/* Amount & Date */}
            <div className="flex flex-col items-end shrink-0">
                <span className="text-sm font-semibold text-foreground tabular-nums">
                    {formatCurrency(expense.amount, currency)}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5 sm:hidden">
                    {format(new Date(expense.date), "MMM d")}
                </span>
            </div>

            {/* Actions */}
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="inline-flex items-center justify-center h-8 w-8 shrink-0 rounded-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Expense actions"
                >
                    <MoreVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onView(expense)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(expense)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onDelete(expense)}
                        variant="destructive"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
