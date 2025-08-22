# TechStore - Next.js E-commerce Application

A modern e-commerce web application built with Next.js 15, featuring authentication, product management, and a beautiful user interface.

## 🌐 Live Demo

**[🚀 View Live Application](https://techstore-swart.vercel.app/)**

*Try the demo with these credentials:*
- **Email**: `demo@example.com`
- **Password**: `password123`

## 🚀 Project Description

TechStore is a full-stack e-commerce application that allows users to browse products, register/login, and manage product listings. The application features:

- **Authentication System**: NextAuth.js with credentials provider and MongoDB integration
- **Product Management**: Add, view, and filter products with advanced search capabilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS and shadcn/ui components
- **Modern Tech Stack**: Next.js 15 App Router, MongoDB, Mongoose, and TypeScript support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React Icons
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose ODM
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications
- **Password Hashing**: bcryptjs

## 📋 Setup & Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/SaddamHosen42/Next.js-application.git
cd Next.js-application
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/TechStore?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Additional configurations (if needed)
NODE_ENV=development
```

### 4. Database Setup

- Create a MongoDB Atlas cluster or use local MongoDB
- Create a database named `TechStore`
- The application will automatically create required collections

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Build for Production

```bash
npm run build
npm start
```

## 🗺️ Route Summary

### Public Routes
| Route | Description | Features |
|-------|-------------|----------|
| `/` | Homepage | Hero section, featured products, navigation |
| `/products` | Products listing | Product grid, filters, search, pagination |
| `/products/[id]` | Product detail | Product info, related products, specifications |
| `/login` | User login | Credentials login, demo account info |
| `/register` | User registration | Form validation, password hashing |

### Protected Routes (Require Authentication)
| Route | Description | Access Level |
|-------|-------------|--------------|
| `/products/add` | Add new product | Authenticated users only |

### API Routes
| Route | Method | Description | Authentication |
|-------|--------|-------------|----------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js authentication handler | Public |
| `/api/register` | POST | User registration endpoint | Public |
| `/api/products` | GET | Fetch products with filters/search | Public |
| `/api/products/[id]` | GET | Get single product details | Public |
| `/api/products/add` | POST | Create new product | Protected |
| `/api/test` | GET | Database connection test | Public |

## 🔧 Key Features

### Authentication
- **Credentials Provider**: Email/password authentication
- **Session Management**: JWT-based sessions
- **Password Security**: bcryptjs hashing with salt rounds
- **Protected Routes**: Automatic redirection for unauthorized access

### Product Management
- **Product Listing**: Grid view with responsive design
- **Advanced Filtering**: Search, price range, sorting options
- **Product Details**: Comprehensive product information
- **Add Products**: Form-based product creation (authenticated users)

### User Interface
- **Responsive Design**: Mobile-first approach
- **Modern Components**: shadcn/ui component library
- **Icons**: Lucide React icon set
- **Notifications**: Toast notifications for user feedback
- **Loading States**: Skeleton loaders and loading indicators

### Data Management
- **MongoDB Integration**: Mongoose ODM for data modeling
- **Schema Validation**: Server-side validation with Zod
- **Error Handling**: Comprehensive error handling and user feedback

## 📝 Demo Credentials

For testing purposes, use these demo credentials:

- **Email**: `demo@example.com`
- **Password**: `password123`

## 🚀 Deployment

**Live Application**: [https://techstore-swart.vercel.app/](https://techstore-swart.vercel.app/)

The application can be deployed on various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

**Developer**: Saddam Hosen  
**GitHub**: [@SaddamHosen42](https://github.com/SaddamHosen42)  
**Repository**: [Next.js-application](https://github.com/SaddamHosen42/Next.js-application)

---

⭐ Star this repository if you found it helpful!
