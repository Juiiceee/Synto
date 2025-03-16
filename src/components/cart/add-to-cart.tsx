'use client';

import { useProduct } from '@/components/product/product-context';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  onClick,
  isAdding
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  onClick: () => void;
  isAdding: boolean;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add to Agent
      </button>
    );
  }

  return (
    <button
      aria-label="Add to Agent"
      onClick={onClick}
      disabled={isAdding}
      type="button"
      className={clsx(buttonClasses, {
        'hover:opacity-90': !isAdding,
        [disabledClasses]: isAdding
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {isAdding ? 'Adding...' : 'Add to Agent'}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  const handleAddToWallet = async () => {
    if (!selectedVariantId) {
      setMessage('Please select an option');
      return;
    }

    setIsAdding(true);
    
    try {
      await addCartItem(finalVariant, product);
      setMessage('Added to wallet!');
    } catch (e) {
      setMessage('Error adding to wallet. Please try again.');
      console.error(e);
    } finally {
      setIsAdding(false);
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        onClick={handleAddToWallet}
        isAdding={isAdding}
      />
      {message && (
        <p aria-live="polite" className="mt-2 text-sm text-red-500" role="status">
          {message}
        </p>
      )}
    </div>
  );
}