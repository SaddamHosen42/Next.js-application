import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');

    // Connect to MongoDB
    await connectDB();

    // Build query object - Remove inStock filter to show all products
    let query = {};

    // Search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice) {
      query.price = { ...query.price, $gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      query.price = { ...query.price, $lte: parseFloat(maxPrice) };
    }

    // Build sort object
    let sortObject = {};
    if (sort) {
      switch (sort) {
        case 'price-low':
          sortObject = { price: 1 };
          break;
        case 'price-high':
          sortObject = { price: -1 };
          break;
        case 'name':
          sortObject = { name: 1 };
          break;
        case 'newest':
          sortObject = { createdAt: -1 };
          break;
        default:
          // Default order - featured first, then newest
          sortObject = { featured: -1, createdAt: -1 };
          break;
      }
    } else {
      // Default order - featured first, then newest
      sortObject = { featured: -1, createdAt: -1 };
    }

    // Fetch products from MongoDB
    const mongoProducts = await Product.find(query)
      .sort(sortObject)
      .lean(); // Use lean() for better performance
    
    const products = mongoProducts.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category || 'other',
      brand: product.brand || '',
      featured: product.featured || false,
      inStock: product.inStock !== false, // Default to true if not specified
      stockQuantity: product.stockQuantity || 0,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      createdBy: 'Admin', // Default value since manually added data might not have this
      createdAt: product.createdAt || new Date(),
    }));

    return NextResponse.json({
      products: products,
      total: products.length,
      filters: {
        search,
        category,
        minPrice,
        maxPrice,
        sort
      }
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
