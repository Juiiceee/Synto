import { GridTileImage } from '@/components/grid/tile';
import Footer from '@/components/layout/footer';
import { Gallery } from '@/components/product/gallery';
import { ProductProvider } from '@/components/product/product-context';
import { ProductDescription } from '@/components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import { getProduct, getProductRecommendations } from '@/lib/shopify/index';
import { Image } from '@/lib/shopify/types';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const tool = await getProduct(params.handle);

  if (!tool) return notFound();

  const { url, width, height, altText: alt } = tool.featuredImage || {};
  const indexable = !tool.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: `${tool.title} by ${tool.creator || 'Unknown'}`,
    description: tool.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
        images: [
          {
            url,
            width,
            height,
            alt
          }
        ]
      }
      : null
  };
}

export default async function ToolPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const tool = await getProduct(params.handle);

  if (!tool) return notFound();

  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.description,
    image: tool.featuredImage.url,
    author: {
      '@type': 'Person',
      name: tool.creator || 'Unknown Creator'
    },
    applicationCategory: 'AIAgent',
    offers: {
      '@type': 'Offer',
      price: tool.priceRange.minVariantPrice.amount,
      priceCurrency: tool.priceRange.minVariantPrice.currencyCode
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating || '0',
      reviewCount: tool.reviewCount || '0'
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolJsonLd)
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={tool.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>


          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={tool} />
            </Suspense>
          </div>
        </div>
        <SimilarTools id={tool.id} />
      </div>
      <Footer />
    </ProductProvider>
  );
}

async function SimilarTools({ id }: { id: string }) {
  const similarTools = await getProductRecommendations(id);

  if (!similarTools.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Similar Tools</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {similarTools.map((tool) => (
          <li
            key={tool.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/shop/product/${tool.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={tool.title}
                label={{
                  title: tool.title,
                  amount: tool.priceRange.maxVariantPrice.amount,
                  currencyCode: tool.priceRange.maxVariantPrice.currencyCode
                }}
                src={tool.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}