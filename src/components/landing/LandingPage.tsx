"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Loader2, Plus, ShoppingBag } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import ChatButton from "@/app/home/ChatButton";

// Import dynamically with no SSR
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function LandingPage() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <div className="container min-h-screen flex flex-col items-center text-foreground">
      <LampContainer className="px-6 pt-48">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-t pb-4 z-40 font-bold from-neutral-400 to-neutral-100 bg-clip-text text-transparent text-4xl tracking-tight md:text-7xl text-center leading-[1.2]"
        >
          Talk with your money
        </motion.h1>

        <p className="font-normal text-lg text-muted-foreground tracking-normal mt-1 mb-8 max-w-xl mx-auto text-center">
          Trade, swap, and manage assets with natural language. <br /> AI-powered DeFi Agent for Sonic
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          {publicKey ? (
            <>
              <ChatButton />
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => router.push('/shop')}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Tools
              </Button>
            </>
          ) : (
            <>
              <WalletMultiButton />
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => router.push('/shop')}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Tools
              </Button>
            </>
          )}
        </div>

        {/* Example Chat Prompt */}
        <div className="mt-12 w-full mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/Sonic.png"
              alt="Sonic Logo"
              width={500}
              height={500}
              className="h-8 w-8 object-contain"
            />
            <p className="text-lg text-muted-foreground">
              Hey, how can I help you on Sonic?
            </p>
          </div>
          <Textarea
            autoComplete="off"
            name="message"
            className="pointer-events-none shadow-2xl bg-accent resize-none text-avax text-bold text-xl px-4 py-6 placeholder:text-zinc-100 disabled:opacity-50 w-full rounded-md"
            placeholder="Swap 100 USDC to SONIC..."
          />
        </div>

        <div className="grid grid-cols-2 pt-12 gap-4 w-full mx-auto">
          <Button variant="outline" disabled={true}>SEND</Button>
          <Button variant="outline" disabled={true}>SWAP</Button>
          <Button variant="outline" disabled={true}>SHOW BALANCE</Button>
          <Button variant="outline" disabled={true}>CONVERT</Button>
          <Button variant="outline" className="col-span-2" disabled={true}>AND MORE...</Button>
        </div>
      </LampContainer>

      <div className="container items-center max-w-lg text-center flex flex-col w-full mt-24 mb-48">
        <p className="relative -mb-2 z-20 bg-gradient-to-b text-avax bg-clip-text py-8 text-4xl font-thin sm:text-7xl">Synto</p>
        <p className="text-lg font-light text-foreground">
          <span className="text-avax font-semibold">DE</span>centralized <span className="text-avax font-semibold">F</span>inance <span className="text-avax font-semibold">A</span>rtificial <span className="text-avax font-semibold">I</span>ntelligence
        </p>
      </div>

      <div className="justify-center mb-36 container w-full px-4 md:px-24 items-center flex flex-col">
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-2">
          <AccordionItem value="what">
            <AccordionTrigger className="text-3xl font-medium">
              What?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-base text-muted-foreground mt-2">
                We build AI agents that streamline <strong>DeFi operations and cross-chain interactions</strong> via natural language interfaces on <strong>Sonic</strong>. Instead of manually juggling
                complex protocols, our agent helps you perform trades, swaps, and more with simple commands.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how">
            <AccordionTrigger className="text-3xl font-medium">
              How?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-base text-muted-foreground mt-2">
                Connect your wallet and type what you want to do in plain English.
                Our AI will figure out the best way to execute your request on Sonic,
                whether that&apos;s swapping tokens, bridging assets, or exploring new protocols.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="why">
            <AccordionTrigger className="text-3xl font-medium">
              Why?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-base text-muted-foreground mt-2">
                DeFi can be overwhelming with all the different tools and steps.
                We believe <strong>everyone</strong> should be able to access it easily.
                By letting an AI handle the complexity, you can focus on your strategy
                instead of learning every protocol&apos;s interface.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <footer className="m-8 text-sm opacity-70 pb-8">
        Built for Sonic • Powered by Sonic & Solana & AI
      </footer>
    </div>
  );
}