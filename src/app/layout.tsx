import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Wallet } from "@/providers/solana-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Defai",
	description: "Our Hackathon project",
	icons: {
		icon: [
			{ rel: "icon", url: "/black_logo.svg", type: "image/svg+xml" },
		]
	}
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`antialiased tracking-tight ${inter.className}`}>
				<Wallet>{children}</Wallet>
				<Toaster />
			</body>
		</html>
	);
}
