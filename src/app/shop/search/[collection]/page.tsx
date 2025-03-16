import { getCollectionProducts } from '@/lib/shopify/index';
import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import ShopSidebar from '@/components/layout/ShopSidebar';
import { defaultSort, sorting } from '@/lib/constants';

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <ShopSidebar />
        
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6 capitalize">
            {params.collection.replace(/-/g, ' ')} Tools
          </h1>
          
          {products.length === 0 ? (
            <p className="py-3 text-lg text-muted-foreground">
              No tools found in this category yet.
            </p>
          ) : (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}