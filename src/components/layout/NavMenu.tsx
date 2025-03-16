"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const pathname = usePathname();
  const { publicKey } = useWallet();
  
  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Generate links based on authenticated state
  const links = [
    { href: "/home", label: "Chat" },
    { href: "/shop", label: "Shop" },
    { href: "/sonic", label: "Hackathon" },
    ...(publicKey ? [{ href: "/create", label: "Create Tools" }] : []),
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-x-0 top-[72px] z-50 bg-background border-t border-border"
        >
          <div className="container mx-auto p-4">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 text-lg ${
                      pathname.startsWith(link.href)
                        ? "text-avax font-medium"
                        : "text-foreground"
                    }`}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}