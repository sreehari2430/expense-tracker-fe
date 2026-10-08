"use client";

import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { categories } from "@/data/categories";
import type { SortOption, DateFilter } from "@/types/expense";

interface ExpenseFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
    dateFilter: DateFilter;
    onDateFilterChange: (value: DateFilter) => void;
    sort: SortOption;
    onSortChange: (value: SortOption) => void;
    activeFilterCount: number;
    onClearFilters: () => void;
}

export function ExpenseFilters({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    dateFilter,
    onDateFilterChange,
    sort,
    onSortChange,
    activeFilterCount,
    onClearFilters,
}: ExpenseFiltersProps) {
    return (
        <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search expenses..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 h-10"
                />
                {search && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Category filter */}
                <Select
                    value={category}
                    onValueChange={(v) => {
                        if (v !== null) onCategoryChange(v);
                    }}
                >
                    <SelectTrigger className="w-auto h-8 text-xs gap-1.5 px-3">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Date filter */}
                <Popover>
                    <PopoverTrigger
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 text-xs rounded-lg border border-input bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        {dateFilter === "all"
                            ? "Date"
                            : dateFilter === "today"
                                ? "Today"
                                : dateFilter === "this-week"
                                    ? "This Week"
                                    : dateFilter === "this-month"
                                        ? "This Month"
                                        : "Date"}
                    </PopoverTrigger>
                    <PopoverContent className="w-44 p-1" align="start">
                        {(
                            [
                                { value: "all", label: "All Time" },
                                { value: "today", label: "Today" },
                                { value: "this-week", label: "This Week" },
                                { value: "this-month", label: "This Month" },
                            ] as { value: DateFilter; label: string }[]
                        ).map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onDateFilterChange(option.value)}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${dateFilter === option.value
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-accent/50"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </PopoverContent>
                </Popover>

                {/* Sort */}
                <Select
                    value={sort}
                    onValueChange={(v) => {
                        if (v !== null) onSortChange(v as SortOption);
                    }}
                >
                    <SelectTrigger className="w-auto h-8 text-xs gap-1.5 px-3">
                        <ArrowUpDown className="w-3.5 h-3.5" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest first</SelectItem>
                        <SelectItem value="oldest">Oldest first</SelectItem>
                        <SelectItem value="amount-high">Amount: high to low</SelectItem>
                        <SelectItem value="amount-low">Amount: low to high</SelectItem>
                    </SelectContent>
                </Select>

                {/* Active filter indicator */}
                {activeFilterCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs gap-1.5 text-muted-foreground"
                        onClick={onClearFilters}
                    >
                        <X className="w-3.5 h-3.5" />
                        Clear
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-medium">
                            {activeFilterCount}
                        </Badge>
                    </Button>
                )}
            </div>
        </div>
    );
}
