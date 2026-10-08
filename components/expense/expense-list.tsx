"use client";

import type { Expense } from "@/types/expense";
import { ExpenseCard } from "./expense-card";
import { EmptyExpenses } from "./empty-expenses";

interface ExpenseListProps {
    expenses: Expense[];
    hasFilters: boolean;
    onAddExpense: () => void;
    onView: (expense: Expense) => void;
    onEdit: (expense: Expense) => void;
    onDelete: (expense: Expense) => void;
}

export function ExpenseList({
    expenses,
    hasFilters,
    onAddExpense,
    onView,
    onEdit,
    onDelete,
}: ExpenseListProps) {
    if (expenses.length === 0) {
        return <EmptyExpenses hasFilters={hasFilters} onAddExpense={onAddExpense} />;
    }

    return (
        <div className="flex flex-col gap-2">
            {expenses.map((expense) => (
                <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
