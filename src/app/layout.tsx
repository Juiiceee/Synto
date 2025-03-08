import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Wallet } from "@/providers/solana-provider";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Synto",
	description: "Our Hackathon project",
	icons: {
		icon: [{ rel: "icon", url: "/soin.png", type: "image/png" }],
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
					<Wallet>{children}</Wallet>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
