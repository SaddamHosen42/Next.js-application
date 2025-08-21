import connectDB from './mongodb';
import User from './models/User';

export async function createUser({ name, email, password }) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user (password will be hashed automatically by the model)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // Return user without password
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to create user');
  }
}

export async function getUserByEmail(email) {
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}

export async function getUserById(id) {
  try {
    await connectDB();
    const user = await User.findById(id);
    
    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
}
