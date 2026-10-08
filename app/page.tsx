"use client";

import { useState, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";
import {
  isToday,
  isThisWeek,
  isThisMonth,
} from "date-fns";

import type { Expense, SortOption, DateFilter } from "@/types/expense";
import { useExpenseStore } from "@/store/expense-store";
import { ExpenseList } from "@/components/expense/expense-list";
import { ExpenseFilters } from "@/components/expense/expense-filters";
import { DeleteExpenseDialog } from "@/components/expense/delete-expense-dialog";
import { ExpenseForm } from "@/components/expense/expense-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { getCategoryByValue } from "@/data/categories";
import { formatCurrency } from "@/lib/format";
import { format } from "date-fns";

export default function ExpensesPage() {
  const {
    expenses,
    hydrated,
    addExpense,
    updateExpense,
    deleteExpense,
    currency,
  } = useExpenseStore();

  // Filter/sort state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");

  // Dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [viewExpense, setViewExpense] = useState<Expense | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (category !== "all") count++;
    if (dateFilter !== "all") count++;
    return count;
  }, [search, category, dateFilter]);

  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          (e.notes && e.notes.toLowerCase().includes(q)) ||
          e.paymentMethod.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((e) => e.category === category);
    }

    // Date
    if (dateFilter !== "all") {
      result = result.filter((e) => {
        const d = new Date(e.date);
        switch (dateFilter) {
          case "today":
            return isToday(d);
          case "this-week":
            return isThisWeek(d, { weekStartsOn: 1 });
          case "this-month":
            return isThisMonth(d);
          default:
            return true;
        }
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-high":
          return b.amount - a.amount;
        case "amount-low":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return result;
  }, [expenses, search, category, dateFilter, sort]);

  const handleAddExpense = useCallback(
    (data: Omit<Expense, "id" | "createdAt">) => {
      addExpense(data);
      setAddDialogOpen(false);
    },
    [addExpense]
  );

  const handleEditExpense = useCallback(
    (data: Omit<Expense, "id" | "createdAt">) => {
      if (editExpense) {
        updateExpense(editExpense.id, data);
        setEditExpense(null);
      }
    },
    [editExpense, updateExpense]
  );

  const handleDeleteExpense = useCallback(() => {
    if (deleteTarget) {
      deleteExpense(deleteTarget.id);
      setDeleteTarget(null);
    }
  }, [deleteTarget, deleteExpense]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("all");
    setDateFilter("all");
  }, []);

  // Show a loading skeleton during hydration
  if (!hydrated) {
    return (
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-muted rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage your spending
            </p>
          </div>
          <Button onClick={() => setAddDialogOpen(true)} size="sm" className="shrink-0">
            <Plus className="w-4 h-4 mr-1.5" />
            Add Expense
          </Button>
        </div>

        {/* Filters - only show when there are expenses */}
        {expenses.length > 0 && (
          <ExpenseFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            sort={sort}
            onSortChange={setSort}
            activeFilterCount={activeFilterCount}
            onClearFilters={clearFilters}
          />
        )}

        {/* Expense List */}
        <ExpenseList
          expenses={filteredExpenses}
          hasFilters={activeFilterCount > 0}
          onAddExpense={() => setAddDialogOpen(true)}
          onView={(e) => setViewExpense(e)}
          onEdit={(e) => setEditExpense(e)}
          onDelete={(e) => setDeleteTarget(e)}
        />
      </div>

      {/* Add Expense Dialog */}
      <Sheet open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Expense</SheetTitle>
            <SheetDescription>Record a new expense</SheetDescription>
          </SheetHeader>
          <div className="px-1 py-4">
            <ExpenseForm
              onSubmit={handleAddExpense}
              onCancel={() => setAddDialogOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Expense Dialog */}
      <Sheet
        open={!!editExpense}
        onOpenChange={(open) => {
          if (!open) setEditExpense(null);
        }}
      >
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Expense</SheetTitle>
            <SheetDescription>Update your expense details</SheetDescription>
          </SheetHeader>
          <div className="px-1 py-4">
            {editExpense && (
              <ExpenseForm
                key={editExpense.id}
                defaultValues={editExpense}
                onSubmit={handleEditExpense}
                onCancel={() => setEditExpense(null)}
                isEditing
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* View Expense Details */}
      <Dialog
        open={!!viewExpense}
        onOpenChange={(open) => {
          if (!open) setViewExpense(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>Full details of this expense</DialogDescription>
          </DialogHeader>
          {viewExpense && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                {(() => {
                  const cat = getCategoryByValue(viewExpense.category);
                  const Icon = cat?.icon;
                  return (
                    <>
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-xl"
                        style={{
                          backgroundColor: cat ? `${cat.color}14` : undefined,
                        }}
                      >
                        {Icon && (
                          <Icon
                            className="w-6 h-6"
                            style={{ color: cat?.color }}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{viewExpense.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {cat?.label ?? viewExpense.category}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Amount</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {formatCurrency(viewExpense.amount, currency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                  <p className="text-sm font-medium">
                    {format(new Date(viewExpense.date), "PPP")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Payment Method
                  </p>
                  <p className="text-sm font-medium capitalize">
                    {viewExpense.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Recorded
                  </p>
                  <p className="text-sm font-medium">
                    {format(new Date(viewExpense.createdAt), "PPP")}
                  </p>
                </div>
              </div>

              {viewExpense.notes && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {viewExpense.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewExpense(null);
                    setEditExpense(viewExpense);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setViewExpense(null);
                    setDeleteTarget(viewExpense);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <DeleteExpenseDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={handleDeleteExpense}
        expenseTitle={deleteTarget?.title}
      />
    </div>
  );
}
