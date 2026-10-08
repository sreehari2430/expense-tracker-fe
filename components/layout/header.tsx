"use client";

import { Wallet } from "lucide-react";

export function MobileHeader() {
    return (
        <header className="md:hidden flex items-center gap-2.5 h-14 px-4 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary">
                <Wallet className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold tracking-tight">ExpenseLog</span>
        </header>
    );
}
