'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye } from 'lucide-react';

export default function ProductCard({ product, showFeaturedBadge = false }) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 group">
      <CardContent className="p-6 flex-1">
        <div className="aspect-square relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {showFeaturedBadge && product.featured && (
            <Badge className="absolute top-2 right-2 bg-blue-600">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-600">
            ${product.price}
          </p>
          <div className="flex items-center text-gray-400">
            <Eye className="h-4 w-4 mr-1" />
            <span className="text-xs">View</span>
          </div>
        </div>
      </CardContent>
    

      <CardFooter className="p-6 pt-0">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
