import { Toaster } from "@/components/ui/sonner";
import { Wallet } from "@/providers/solana-provider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import AppHeader from "@/components/layout/AppHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synto",
  description: "AI-powered DeFi Agent for Sonic",
  icons: {
    icon: [{ rel: "icon", url: "/logoSynto.png", type: "image/png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased tracking-tight ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Wallet>
            <div className="flex flex-col min-h-screen">
              <AppHeader />
              <main className="flex-grow">
                {children}
              </main>
            </div>
            <Toaster richColors />
          </Wallet>
        </ThemeProvider>
      </body>
    </html>
  );
}