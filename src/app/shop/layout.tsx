'use client';

import { CartProvider } from '@/components/cart/cart-context';
import { Navbar } from '@/components/layout/navbar';
import ReturnToChatButton from '@/components/layout/ReturnToChatButton';
import { getCart } from '@/lib/shopify/index';
import { baseUrl } from '@/lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

const { SITE_NAME } = process.env;

export default function ShopLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, passper
  const cart = getCart();

  return (
    <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
      <CartProvider cartPromise={cart}>
        <Navbar />
        <main>
          {children}
          <Toaster closeButton />
        </main>
        <ReturnToChatButton />
      </CartProvider>
    </div>
  );
}