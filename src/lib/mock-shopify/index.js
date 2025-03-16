// lib/mock-shopify/index.js
import { cookies } from 'next/headers';
import { 
  products as mockProducts, 
  collections as mockCollections, 
  menus as mockMenus,
  pages as mockPages,
  getCart as getMockCart,
  createCart as createMockCart,
  addToCart as addToMockCart,
  removeFromCart as removeFromMockCart,
  updateCart as updateMockCart
} from '../mock-data';

import { TAGS } from '../constants';

// Helper function to simulate asynchronous behavior
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Reshaping functions similar to the original
const reshapeProduct = (product) => {
  if (!product) return undefined;
  return {
    ...product,
    // Already in the right format in our mock data
  };
};

const reshapeProducts = (products) => {
  return products.map(product => reshapeProduct(product)).filter(Boolean);
};

const reshapeCollection = (collection) => {
  if (!collection) return undefined;
  return collection; // Already in the right format
};

const reshapeCollections = (collections) => {
  return collections.map(collection => reshapeCollection(collection)).filter(Boolean);
};

// Implement the same interface as the original shopify.js
export async function createCart() {
  await delay(100); // Simulate network latency
  return createMockCart();
}

export async function addToCart(lines) {
  await delay(100);
  return addToMockCart(lines);
}

export async function removeFromCart(lineIds) {
  await delay(100);
  return removeFromMockCart(lineIds);
}

export async function updateCart(lines) {
  await delay(100);
  return updateMockCart(lines);
}

export async function getCart() {
  await delay(100);
  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) {
    return undefined;
  }
  return getMockCart();
}

export async function getCollection(handle) {
  // Cache tag for collection data
  
  await delay(100);
  return mockCollections.find(collection => collection.handle === handle);
}

export async function getCollectionProducts({ 
  collection, 
  reverse = false, 
  sortKey = 'RELEVANCE' 
}) {
  // Cache tags for collections and products
  
  await delay(100);
  
  // Filter products based on collection
  let filteredProducts = [...mockProducts];
  
  if (collection && collection !== 'all') {
    // You'll need to implement logic to filter products by collection
    // For now, we'll just return all products
  }
  
  // Sort products (simplified)
  if (sortKey === 'PRICE') {
    filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? priceB - priceA : priceA - priceB;
    });
  } else if (sortKey === 'CREATED') {
    // Sort by date (assuming updatedAt is a timestamp string)
    filteredProducts.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return reverse ? dateB - dateA : dateA - dateB;
    });
  }
  
  return filteredProducts;
}

export async function getCollections() {
  // Cache tag for collections
  
  await delay(100);
  
  // Add "All" option like in the original code
  const allCollection = {
    handle: '',
    title: 'All',
    description: 'All products',
    seo: {
      title: 'All',
      description: 'All products'
    },
    path: '/shop/search',
    updatedAt: new Date().toISOString()
  };
  
  return [allCollection, ...mockCollections];
}

export async function getMenu(handle) {
  // Cache tag for collections (menus are cached with collections in original code)
  
  await delay(100);
  return mockMenus[handle] || [];
}

export async function getPage(handle) {
  await delay(100);
  return mockPages.find(page => page.handle === handle);
}

export async function getPages() {
  await delay(100);
  return mockPages;
}

export async function getProduct(handle) {
  // Cache tag for products
  
  await delay(100);
  return mockProducts.find(product => product.handle === handle);
}

export async function getProductRecommendations(productId) {
  // Cache tag for products
  
  await delay(100);
  // Return 2 random products as recommendations
  const otherProducts = mockProducts.filter(p => p.id !== productId);
  const shuffled = otherProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}) {
  // Cache tag for products
  
  await delay(100);
  
  let filteredProducts = [...mockProducts];
  
  // Basic search implementation
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  // Sorting (simplified)
  if (sortKey === 'PRICE') {
    filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? priceB - priceA : priceA - priceB;
    });
  } else if (sortKey === 'CREATED_AT') {
    filteredProducts.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return reverse ? dateB - dateA : dateA - dateB;
    });
  }
  
  return filteredProducts;
}

export async function revalidate(req) {
  // Not needed for mock data, but keeping the interface consistent
  return new Response(JSON.stringify({ revalidated: true, now: Date.now() }), {
    status: 200
  });
}