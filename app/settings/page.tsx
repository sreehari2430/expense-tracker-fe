"use client";

import { useExpenseStore } from "@/store/expense-store";
import { currencies } from "@/data/currencies";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const themeOptions: { value: Theme; label: string; icon: React.ElementType }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
];

export default function SettingsPage() {
    const { currency, setCurrency, theme, setTheme, hydrated } = useExpenseStore();

    if (!hydrated) {
        return (
            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="h-8 w-32 bg-muted rounded-lg animate-pulse" />
                    <div className="h-24 bg-muted rounded-xl animate-pulse" />
                    <div className="h-24 bg-muted rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Customize your ExpenseLog experience
                    </p>
                </div>

                {/* Currency */}
                <div className="space-y-3">
                    <div>
                        <h2 className="text-sm font-semibold">Currency</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Choose how amounts are displayed
                        </p>
                    </div>
                    <Select
                        value={currency.code}
                        onValueChange={(code) => {
                            const selected = currencies.find((c) => c.code === code);
                            if (selected) setCurrency(selected);
                        }}
                    >
                        <SelectTrigger className="w-full sm:w-64">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {currencies.map((c) => (
                                <SelectItem key={c.code} value={c.code}>
                                    {c.symbol} — {c.name} ({c.code})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                {/* Theme */}
                <div className="space-y-3">
                    <div>
                        <h2 className="text-sm font-semibold">Appearance</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Select your preferred theme
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {themeOptions.map((opt) => {
                            const Icon = opt.icon;
                            const isActive = theme === opt.value;
                            return (
                                <Button
                                    key={opt.value}
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        "flex items-center gap-2 h-9 px-4",
                                        isActive &&
                                        "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary"
                                    )}
                                    onClick={() => setTheme(opt.value)}
                                >
                                    <Icon className="w-4 h-4" />
                                    {opt.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                <Separator />

                {/* About */}
                <div className="space-y-1">
                    <h2 className="text-sm font-semibold">About</h2>
                    <p className="text-xs text-muted-foreground">
                        ExpenseLog v0.1.0 — A simple personal expense recorder.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        All data is stored locally in your browser.
                    </p>
                </div>
            </div>
        </div>
    );
}
