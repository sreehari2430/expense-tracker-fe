import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileHeader } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExpenseLog — Track Your Expenses",
  description:
    "A simple, clean personal expense recorder. Quickly add, find, edit, and delete your expense records.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-dvh">
            <MobileHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
