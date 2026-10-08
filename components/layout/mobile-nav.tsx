"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Receipt, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Expenses", icon: Receipt },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
            <div className="flex items-center justify-around h-16 px-4">
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
                                "flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg transition-colors",
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
                            <span className="text-[11px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
