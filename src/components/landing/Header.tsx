//"use client";

//import { useMediaQuery } from "@mui/material";
//import { useWallet } from "@solana/wallet-adapter-react";
//import { ChevronDown, ChevronUp } from "lucide-react";
//import dynamic from "next/dynamic";
//import Image from "next/image";
//import { useEffect, useState } from "react";
//import NavLinkMobile from "./NavLinkMobile";

//// Import dynamically with no SSR
//const WalletMultiButton = dynamic(
//	() => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
//	{ ssr: false }
//);

//const Header = () => {
//	const [isMenuOpen, setIsMenuOpen] = useState(false);
//	const [isScrolled, setIsScrolled] = useState(false);
//	const isDesktop = useMediaQuery("(min-width: 768px)");
//	const { publicKey } = useWallet();

//	useEffect(() => {
//		const handleScroll = () => setIsScrolled(window.scrollY > 50);
//		window.addEventListener("scroll", handleScroll);
//		return () => window.removeEventListener("scroll", handleScroll);
//	}, []);

//	function onClose() {
//		setIsMenuOpen(false);
//	}

//	const activeLink = typeof window !== "undefined" ? window.location.pathname : "";

//	return (
//		<header
//			className={`sticky left-0 top-0 z-50 w-full bg-background/80 text-foreground backdrop-blur-lg transition-all duration-300 
//      ${isScrolled ? "border-b border-border py-4 md:py-2" : "border-b-0 py-4"}`}
//		>
//			<div className="container mx-auto flex items-center justify-between 2xl:px-0">
//				{/* Logo */}
//				<a href="/" className="flex items-center space-x-4">
//					<div className="flex items-center space-x-4">
//						<Image
//							src="/logoSynto.png"
//							alt="Synto Logo"
//							width={36}
//							height={36}
//							className="w-8 h-8"
//						/>
//						<h1 className="text-sm font-bold text-foreground">Synto</h1>
//					</div>
//				</a>

//				{/* Navigation */}
//				<div className="flex items-center md:space-x-8">
//					{/* Mobile Menu Toggle */}
//					<button
//						onClick={() => setIsMenuOpen(!isMenuOpen)}
//						className="mr-4 block p-2 transition-all duration-300"
//						aria-label="Toggle menu"
//					>
//						{isMenuOpen ? (
//							<ChevronUp size={30} className="stroke-[1.5] text-foreground" />
//						) : (
//							<ChevronDown size={30} className="stroke-[1.5] text-foreground" />
//						)}
//					</button>

//					{/* Navigation Links */}
//					<NavLinkMobile activeLink={activeLink} isMenuOpen={isMenuOpen} onClose={onClose} />
//					{publicKey && (
//						<WalletMultiButton />
//					)}
//				</div>
//			</div>
//		</header>
//	);
//};

//export default Header;