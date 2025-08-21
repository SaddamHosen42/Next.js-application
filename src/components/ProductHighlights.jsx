'use client';

import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProductHighlights({ products = [] }) {
  // Get featured products or first 6 products
  const highlightedProducts = products.filter(product => product.featured).slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular tech products, carefully selected for quality and innovation.
          </p>
        </div>
        
        {highlightedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {highlightedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showFeaturedBadge={true} 
                />
              ))}
            </div>
            
            {/* View All Products Button */}
            <div className="text-center">
              <Link href="/products">
                <Button size="lg" className="flex items-center space-x-2 mx-auto">
                  <span>View All Products</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">No featured products available at the moment.</p>
            <Link href="/products">
              <Button variant="outline">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
