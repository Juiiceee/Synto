// lib/shopify/index.js
// Ce fichier remplace complètement l'implémentation Shopify
// avec nos données de test pour le développement

import {
  createCart,
  addToCart,
  removeFromCart,
  updateCart,
  getCart,
  getCollection,
  getCollectionProducts,
  getCollections,
  getMenu,
  getPage,
  getPages,
  getProduct,
  getProductRecommendations,
  getProducts,
  revalidate
} from '../mock-shopify';

// Re-export toutes les fonctions pour qu'elles soient accessibles comme lib/shopify
export {
  createCart,
  addToCart,
  removeFromCart,
  updateCart,
  getCart,
  getCollection,
  getCollectionProducts,
  getCollections,
  getMenu,
  getPage,
  getPages,
  getProduct,
  getProductRecommendations,
  getProducts,
  revalidate
};