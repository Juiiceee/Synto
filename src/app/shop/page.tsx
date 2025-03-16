import { Carousel } from '@/components/carousel';
import { ThreeItemGrid } from '@/components/grid/three-items';
import Footer from '@/components/layout/footer';

export const metadata = {
  description:
    'Explore and acquire AI tools for Sonic DeFi operations.',
  openGraph: {
    type: 'website'
  }
};

export default function ShopPage() {
  return (
    <>
      <div className="mx-auto max-w-(--breakpoint-2xl)">
        <h1 className="text-3xl font-bold mb-8 text-center pt-6">Tool Marketplace</h1>
        <ThreeItemGrid />
        <Carousel />
      </div>
      <Footer />
    </>
  );
}