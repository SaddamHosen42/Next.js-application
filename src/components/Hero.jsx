'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-8">
            <Star className="h-4 w-4 mr-2 fill-current" />
            Trusted by 10,000+ customers
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Discover Amazing
            <span className="block text-blue-600">Tech Products</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Find the latest and greatest technology products at unbeatable prices. 
            From headphones to smart watches, we have everything you need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
