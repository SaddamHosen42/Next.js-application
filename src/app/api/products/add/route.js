import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const {
      name,
      description,
      price,
      category,
      brand,
      image,
      images = [],
      featured = false,
      inStock = true,
      stockQuantity = 0,
      specifications = {},
      tags = []
    } = await request.json();

    // Validate required fields
    if (!name || !description || !price || !category || !image) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, description, price, category, and image are required'
        },
        { status: 400 }
      );
    }

    // Validate price
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Price must be a valid positive number'
        },
        { status: 400 }
      );
    }

    // Validate stock quantity
    if (isNaN(stockQuantity) || stockQuantity < 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Stock quantity must be a valid non-negative number'
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Create product
    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      brand: brand?.trim() || '',
      image,
      images,
      featured: Boolean(featured),
      inStock: Boolean(inStock),
      stockQuantity: parseInt(stockQuantity),
      specifications,
      tags: tags.filter(tag => tag.trim().length > 0),
      createdBy: session.user.id,
    });

    return NextResponse.json({
      success: true,
      message: 'Product added successfully!',
      product: {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        image: product.image,
        featured: product.featured,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        createdAt: product.createdAt,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Add product error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add product. Please try again.'
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get products created by the authenticated user
    const products = await Product.find({ createdBy: session.user.id })
      .sort({ createdAt: -1 })
      .select('-createdBy');

    return NextResponse.json({
      success: true,
      products: products.map(product => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        image: product.image,
        featured: product.featured,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }))
    });

  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products'
      },
      { status: 500 }
    );
  }
}
