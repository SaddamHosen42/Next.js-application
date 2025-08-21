import { NextResponse } from 'next/server';
import { createUser } from '@/lib/userService';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Name, email, and password are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Password must be at least 6 characters long' 
        },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser({ name, email, password });

    return NextResponse.json({
      success: true,
      message: 'User registered successfully!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific error messages
    if (error.message.includes('already exists')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'A user with this email already exists' 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Registration failed. Please try again.' 
      },
      { status: 500 }
    );
  }
}
