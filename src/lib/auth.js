import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from './mongodb';
import User from './models/User';

export const authOptions = {
  providers: [
    // Credentials Provider for email/password login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email',
          placeholder: 'your-email@example.com'
        },
        password: { 
          label: 'Password', 
          type: 'password',
          placeholder: 'Your password'
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        try {
          // Connect to MongoDB
          await connectDB();

          // Find user by email and include password for comparison
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          }).select('+password');
          
          if (!user) {
            throw new Error('No user found with this email');
          }

          // Check if password is correct
          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Return user object (password will be excluded)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),

    // Google Provider (optional - only if environment variables are set)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // Handle session update
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.email = session.email;
      }

      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // Events for logging (optional)
  events: {
    async signIn({ user, account, profile }) {
      console.log(`User ${user.email} signed in with ${account.provider}`);
    },
    async signOut({ session, token }) {
      console.log(`User signed out`);
    },
  },

  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
};
