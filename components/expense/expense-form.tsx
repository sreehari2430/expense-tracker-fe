"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import type { Expense } from "@/types/expense";
import { categories, paymentMethods } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const expenseSchema = z.object({
    title: z
        .string()
        .min(1, "Expense name is required")
        .max(100, "Name must be 100 characters or less"),
    amount: z.coerce
        .number({ invalid_type_error: "Amount is required" })
        .gt(0, "Amount must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    notes: z.string().max(500, "Notes must be 500 characters or less").optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
    defaultValues?: Expense;
    onSubmit: (data: ExpenseFormValues) => void;
    onCancel: () => void;
    isEditing?: boolean;
}

export function ExpenseForm({
    defaultValues,
    onSubmit,
    onCancel,
    isEditing = false,
}: ExpenseFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: defaultValues
            ? {
                title: defaultValues.title,
                amount: defaultValues.amount,
                category: defaultValues.category,
                date: defaultValues.date,
                paymentMethod: defaultValues.paymentMethod,
                notes: defaultValues.notes ?? "",
            }
            : {
                title: "",
                amount: undefined,
                category: "",
                date: format(new Date(), "yyyy-MM-dd"),
                paymentMethod: "",
                notes: "",
            },
    });

    const dateValue = watch("date");
    const categoryValue = watch("category");
    const paymentMethodValue = watch("paymentMethod");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Expense name */}
            <div className="space-y-2">
                <Label htmlFor="title">Expense name</Label>
                <Input
                    id="title"
                    placeholder="e.g. Lunch, Uber, Groceries"
                    {...register("title")}
                    aria-invalid={!!errors.title}
                />
                {errors.title && (
                    <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    id="amount"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    placeholder="0"
                    {...register("amount")}
                    aria-invalid={!!errors.amount}
                />
                {errors.amount && (
                    <p className="text-xs text-destructive">{errors.amount.message}</p>
                )}
            </div>

            {/* Category */}
            <div className="space-y-2">
                <Label>Category</Label>
                <Select
                    value={categoryValue}
                    onValueChange={(v) => {
                        if (v !== null) setValue("category", v, { shouldValidate: true });
                    }}
                >
                    <SelectTrigger aria-invalid={!!errors.category} className="w-full">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <SelectItem key={cat.value} value={cat.value}>
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" style={{ color: cat.color }} />
                                        {cat.label}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                {errors.category && (
                    <p className="text-xs text-destructive">{errors.category.message}</p>
                )}
            </div>

            {/* Date */}
            <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                    <PopoverTrigger
                        className={cn(
                            "inline-flex items-center w-full justify-start h-10 px-3 rounded-lg border border-input bg-transparent text-sm font-normal cursor-pointer hover:bg-accent/40 transition-colors",
                            !dateValue && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        {dateValue ? format(new Date(dateValue), "PPP") : "Pick a date"}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dateValue ? new Date(dateValue) : undefined}
                            onSelect={(day) => {
                                if (day) {
                                    setValue("date", format(day, "yyyy-MM-dd"), {
                                        shouldValidate: true,
                                    });
                                }
                            }}
                            autoFocus
                        />
                    </PopoverContent>
                </Popover>
                {errors.date && (
                    <p className="text-xs text-destructive">{errors.date.message}</p>
                )}
            </div>

            {/* Payment method */}
            <div className="space-y-2">
                <Label>Payment method</Label>
                <Select
                    value={paymentMethodValue}
                    onValueChange={(v) => {
                        if (v !== null) setValue("paymentMethod", v, { shouldValidate: true });
                    }}
                >
                    <SelectTrigger aria-invalid={!!errors.paymentMethod} className="w-full">
                        <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        {paymentMethods.map((pm) => (
                            <SelectItem key={pm.value} value={pm.value}>
                                {pm.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.paymentMethod && (
                    <p className="text-xs text-destructive">
                        {errors.paymentMethod.message}
                    </p>
                )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <Label htmlFor="notes">
                    Notes <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                    id="notes"
                    placeholder="Add any additional details..."
                    rows={3}
                    {...register("notes")}
                    aria-invalid={!!errors.notes}
                />
                {errors.notes && (
                    <p className="text-xs text-destructive">{errors.notes.message}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isEditing ? "Save Changes" : "Add Expense"}
                </Button>
            </div>
        </form>
    );
}
