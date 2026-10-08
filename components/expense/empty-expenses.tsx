"use client";

import { ReceiptText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyExpensesProps {
    hasFilters?: boolean;
    onAddExpense?: () => void;
}

export function EmptyExpenses({ hasFilters = false, onAddExpense }: EmptyExpensesProps) {
    if (hasFilters) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-4">
                    <ReceiptText className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                    No expenses found
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                    Try changing your search or filters to find what you&apos;re looking for.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-4">
                <ReceiptText className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
                No expenses yet
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs mb-6">
                Start recording your expenses to keep everything organized.
            </p>
            {onAddExpense && (
                <Button onClick={onAddExpense} size="sm">
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add Expense
                </Button>
            )}
        </div>
    );
}
