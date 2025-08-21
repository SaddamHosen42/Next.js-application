import { NextResponse } from 'next/server';
import products from '@/lib/data/products.json';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Find the product by ID
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get related products (same category or random selection)
    const relatedProducts = products
      .filter(p => p.id !== id)
      .slice(0, 4); // Get first 4 different products as related

    return NextResponse.json({
      product,
      relatedProducts
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
