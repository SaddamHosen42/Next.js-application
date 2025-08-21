'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, ZoomIn } from 'lucide-react';

export default function ProductImageGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // For demo purposes, we'll use the same image multiple times
  // In a real app, you'd have multiple product images
  const images = [
    product.image,
    product.image, // Duplicate for demo
    product.image, // Duplicate for demo
  ];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={images[selectedImage]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
        
        {/* Featured Badge */}
        {product.featured && (
          <Badge className="absolute top-4 left-4 bg-blue-600">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Featured
          </Badge>
        )}
        
        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-4 w-4 text-gray-700" />
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index 
                ? 'border-blue-500' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
