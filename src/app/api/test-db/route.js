import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      success: true, 
      message: 'Connected to MongoDB successfully!' 
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to MongoDB',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
