"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Receipt, Settings, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Expenses", icon: Receipt },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex md:w-60 lg:w-64 flex-col border-r border-border bg-sidebar">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-6 h-16 border-b border-border">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                    <Wallet className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
                    ExpenseLog
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/" || pathname.startsWith("/expenses")
                            : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                            )}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} ExpenseLog
                </p>
            </div>
        </aside>
    );
}
