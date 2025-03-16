import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import ShopSidebar from '@/components/layout/ShopSidebar';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/shopify/index';

export const metadata = {
  title: 'Search',
  description: 'Search for tools in the marketplace.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          {searchValue ? (
            <h1 className="text-2xl font-semibold mb-6">
              {products.length === 0
                ? 'No results found for '
                : `Found ${products.length} ${resultsText} for `}
              <span className="text-avax">&quot;{searchValue}&quot;</span>
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold mb-6">All Tools</h1>
          )}
          
          {products.length > 0 ? (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No tools found matching your search.
              </p>
              <p>Try using different keywords or browse categories instead.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}