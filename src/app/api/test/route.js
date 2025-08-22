import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    // Get all products directly from MongoDB
    const products = await Product.find({});
    
    console.log('MongoDB Products found:', products.length);
    console.log('Products data:', products);
    
    return Response.json({ 
      success: true, 
      count: products.length,
      products: products 
    });
  } catch (error) {
    console.error('Database test error:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
