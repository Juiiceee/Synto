'use client';

import { getCollections } from '@/lib/shopify/index';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createUrl } from '@/lib/utils';
import { Button } from '../ui/button';
import { ChevronRight, Home, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Input } from '../ui/input';
import { DEFAULT_OPTION } from '@/lib/constants';

export default function ShopSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Fetch collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionsData = await getCollections();
        setCollections(collectionsData);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    window.location.href = `/shop/search?${params.toString()}`;
  };

  return (
    <div className="w-full md:w-64 md:mr-8 mb-6 md:mb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Search</h2>
        <form onSubmit={handleSearch} className="flex">
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-r-none border-r-0"
          />
          <Button type="submit" className="rounded-l-none">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="space-y-1">
          <Link
            href="/shop"
            className={`block p-2 rounded hover:bg-secondary transition-colors ${
              pathname === '/shop' ? 'bg-secondary font-medium' : ''
            }`}
          >
            All Tools
          </Link>
          
          {loading ? (
            <div className="space-y-2 mt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 bg-muted animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {collections.map((collection) => (
                <Link
                  key={collection.handle}
                  href={`/shop/search/${collection.handle}`}
                  className={`block p-2 rounded hover:bg-secondary transition-colors ${
                    pathname === `/shop/search/${collection.handle}` ? 'bg-secondary font-medium' : ''
                  }`}
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}