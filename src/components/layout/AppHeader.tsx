"use client";

import { useMediaQuery } from "@mui/material";
import { ChevronDown, ChevronUp, Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTheme } from "next-themes";

// Import dynamically with no SSR
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { publicKey } = useWallet();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onClose() {
    setIsMenuOpen(false);
  }

  // Don't display this header in the shop section - we'll use the existing shop header
  if (pathname.startsWith('/shop')) {
    return null;
  }

  // Determine active section
  const getActiveSection = () => {
    if (pathname.startsWith('/home')) return 'chat';
    if (pathname.startsWith('/create')) return 'create';
    if (pathname.startsWith('/sonic')) return 'sonic';
    return 'home';
  };

  return (
    <header
      className={`sticky left-0 top-0 z-50 w-full bg-background/80 text-foreground backdrop-blur-lg transition-all duration-300 
      ${isScrolled ? "border-b border-border py-4 md:py-2" : "border-b-0 py-4"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 2xl:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logoSynto.png"
            alt="Synto Logo"
            width={36}
            height={36}
            className="w-8 h-8"
          />
          <h1 className="text-sm font-bold text-foreground hidden sm:block">Synto</h1>
        </Link>

        {/* Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/home" 
            className={`text-sm hover:text-avax transition-colors ${getActiveSection() === 'chat' ? 'text-avax font-semibold' : 'text-foreground'}`}
          >
            Chat
          </Link>
          <Link 
            href="/shop" 
            className={`text-sm hover:text-avax transition-colors text-foreground`}
          >
            Shop
          </Link>
          <Link 
            href="/sonic" 
            className={`text-sm hover:text-avax transition-colors ${getActiveSection() === 'sonic' ? 'text-avax font-semibold' : 'text-foreground'}`}
          >
            Hackathon
          </Link>
          {publicKey && (
            <Link 
              href="/create" 
              className={`text-sm hover:text-avax transition-colors ${getActiveSection() === 'create' ? 'text-avax font-semibold' : 'text-foreground'}`}
            >
              Create Tools
            </Link>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Shop Link */}
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/shop">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>

          {/* Wallet Connect Button */}
          <WalletMultiButton />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border py-4 px-6 absolute w-full">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/home"
              className={`text-base py-2 ${getActiveSection() === 'chat' ? 'text-avax font-semibold' : 'text-foreground'}`}
              onClick={onClose}
            >
              Chat
            </Link>
            <Link 
              href="/shop"
              className="text-base py-2 text-foreground"
              onClick={onClose}
            >
              Shop
            </Link>
            <Link 
              href="/sonic"
              className={`text-base py-2 ${getActiveSection() === 'sonic' ? 'text-avax font-semibold' : 'text-foreground'}`}
              onClick={onClose}
            >
              Hackathon
            </Link>
            {publicKey && (
              <Link 
                href="/create"
                className={`text-base py-2 ${getActiveSection() === 'create' ? 'text-avax font-semibold' : 'text-foreground'}`}
                onClick={onClose}
              >
                Create Tools
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}