import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import products from '@/lib/data/products.json';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');

    // Get products from JSON file
    let jsonProducts = [...products];

    // Get products from MongoDB
    let dbProducts = [];
    try {
      await connectDB();
      const mongoProducts = await Product.find({ inStock: true })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
      
      dbProducts = mongoProducts.map(product => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        featured: product.featured,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        rating: product.rating,
        reviewCount: product.reviewCount,
        createdBy: product.createdBy?.name || 'User',
        createdAt: product.createdAt,
      }));
    } catch (error) {
      console.error('Error fetching MongoDB products:', error);
      // Continue with just JSON products if MongoDB fails
    }

    // Combine both product sources
    let allProducts = [...jsonProducts, ...dbProducts];

    // Search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      allProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (category) {
      allProducts = allProducts.filter(product => 
        product.category === category
      );
    }

    // Price range filter
    if (minPrice) {
      allProducts = allProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      allProducts = allProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      );
    }

    // Sort products
    if (sort) {
      switch (sort) {
        case 'price-low':
          allProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          allProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          allProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'newest':
          allProducts.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
          });
          break;
        default:
          // Default order - featured first, then newest
          allProducts.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
          });
          break;
      }
    }

    return NextResponse.json({
      products: allProducts,
      total: allProducts.length,
      dbProductsCount: dbProducts.length,
      jsonProductsCount: jsonProducts.length,
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
