import { Toaster } from "@/components/ui/sonner";
import { Wallet } from "@/providers/solana-provider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Synto",
	description: "Our Hackathon project",
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
				<ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
					<Wallet>{children}</Wallet>
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}
