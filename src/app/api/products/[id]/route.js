import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    // Unwrap params using use() for Next.js 15
    const { id } = params;

    // Connect to MongoDB
    await connectDB();

    // Check if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Find the product by ID
    const product = await Product.findById(id)
      .populate('createdBy', 'name email');

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Format the product data
    const productData = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      images: product.images || [],
      category: product.category,
      brand: product.brand,
      featured: product.featured,
      inStock: product.inStock,
      stockQuantity: product.stockQuantity,
      specifications: product.specifications || {},
      tags: product.tags || [],
      rating: product.rating,
      reviewCount: product.reviewCount,
      createdBy: product.createdBy?.name || 'Admin',
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    // Get related products (same category, different product)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      inStock: true
    })
      .limit(4)
      .sort({ featured: -1, createdAt: -1 });

    const relatedProductsData = relatedProducts.map(relatedProduct => ({
      id: relatedProduct._id.toString(),
      name: relatedProduct.name,
      description: relatedProduct.description,
      price: relatedProduct.price,
      image: relatedProduct.image,
      category: relatedProduct.category,
      brand: relatedProduct.brand,
      featured: relatedProduct.featured,
      rating: relatedProduct.rating,
      reviewCount: relatedProduct.reviewCount,
    }));

    return NextResponse.json({
      product: productData,
      relatedProducts: relatedProductsData
    });

  } catch (error) {
    console.error('Product detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
