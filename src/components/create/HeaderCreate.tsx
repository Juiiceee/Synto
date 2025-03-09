"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Hexagon } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


// Import dynamically with no SSR
const WalletMultiButton = dynamic(
	() => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
	{ ssr: false }
);

interface HeaderProps {
  title?: string;
}

const HeaderCreate = ({ title }: HeaderProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { publicKey } = useWallet();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	function onClose() {
		setIsMenuOpen(false);
	}

	const activeLink = typeof window !== "undefined" ? window.location.pathname : "";

	return (
		<header
			className={`sticky left-0 top-0 z-50 w-full bg-background/80 text-foreground backdrop-blur-lg transition-all duration-300 
	  ${isScrolled ? "border-b border-border py-4 md:py-2" : "border-b-0 py-4"}`}
		>
			<div className="container mx-auto flex items-center justify-between 2xl:px-0">
			<div className="border-b border-border/40">
					<div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Link href="/">
								<Button variant="ghost" size="icon">
									<ArrowLeft className="h-5 w-5" />
								</Button>
							</Link>
							<span className="text-sm font-medium">{!title ? "Create your tools" : title}</span>
						</div>
					</div>
				</div>
					{publicKey && (
						<WalletMultiButton />
					)}
			</div>
		</header>
	);
};

export default HeaderCreate;